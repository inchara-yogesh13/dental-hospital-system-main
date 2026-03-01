import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import dayjs from 'dayjs';

import {
  WhatsAppSession,
  WhatsAppSessionDocument,
  SessionState,
} from './schemas/whatsapp-session.schema';
import {
  WhatsAppPhoneMapping,
  WhatsAppPhoneMappingDocument,
} from './schemas/whatsapp-phone-mapping.schema';
import { TenantService } from '../tenant/tenant.service';
import { AiService } from '../ai/ai.service';
import { BookingFlow } from './flows/booking.flow';
import { CancelFlow } from './flows/cancel.flow';
import { MyAppointmentsFlow } from './flows/my-appointments.flow';
import { MenuFlow } from './flows/menu.flow';
import { WaSenderUtil } from './utils/wa-sender.util';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);

  constructor(
    @InjectModel(WhatsAppSession.name)
    private sessionModel: Model<WhatsAppSessionDocument>,
    @InjectModel(WhatsAppPhoneMapping.name)
    private mappingModel: Model<WhatsAppPhoneMappingDocument>,
    private configService: ConfigService,
    private tenantService: TenantService,
    private aiService: AiService,
    private bookingFlow: BookingFlow,
    private cancelFlow: CancelFlow,
    private myAppointmentsFlow: MyAppointmentsFlow,
    private menuFlow: MenuFlow,
    private waSender: WaSenderUtil,
  ) { }

  async processMessage(
    from: string,
    text: string,
    phoneNumberId: string,
  ): Promise<void> {
    const normalizedText = text.trim().toLowerCase();

    // 1. Find Tenant via Phone Number mapping
    const mapping = await this.mappingModel.findOne({
      whatsappPhoneNumberId: phoneNumberId,
    });
    if (!mapping || !mapping.isActive) {
      this.logger.warn(
        `Received message on unmapped/inactive number ID: ${phoneNumberId}`,
      );
      return;
    }

    const tenantIdStr = mapping.tenantId.toString();

    // 2. Load or Create Session
    const now = new Date();
    let session = await this.sessionModel.findOne({
      phone: from,
      tenantId: mapping.tenantId,
    });

    if (!session) {
      session = new this.sessionModel({
        phone: from,
        tenantId: mapping.tenantId,
      });
    } else {
      // TTL Check: reset session if inactive for >30m
      const diffMs = now.getTime() - session.lastInteraction.getTime();
      const diffMins = diffMs / 60000;
      if (diffMins > 30) {
        session.state = SessionState.IDLE;
        session.context = {};
      }
    }

    session.lastInteraction = now;

    // 3. Priority Keyword Overrides
    const isPriorityKeyword = await this.handlePriorityKeywords(
      from,
      normalizedText,
      phoneNumberId,
      tenantIdStr,
      session,
    );

    if (isPriorityKeyword) {
      await session.save();
      return;
    }

    // 4. State-Based Routing
    switch (session.state) {
      case SessionState.AWAITING_NAME:
      case SessionState.AWAITING_DATE:
      case SessionState.AWAITING_DOCTOR_CHOICE:
      case SessionState.AWAITING_SLOT:
      case SessionState.BOOKING_CONFIRM:
        await this.bookingFlow.handleBookingStep(
          session,
          text,
          from,
          phoneNumberId,
          tenantIdStr,
          this.configService.get<string>('WHATSAPP_TOKEN') || ''
        );
        break;
      case SessionState.RESCHEDULE_SELECT:
      case SessionState.CANCEL_SELECT:
        await this.cancelFlow.handleCancel(from, phoneNumberId, this.configService.get<string>('WHATSAPP_TOKEN') || '');
        break;
      case SessionState.IDLE:
      default:
        // Route to Gemini for conversational fallback
        const aiReply = await this.aiService.generateReply(
          tenantIdStr,
          text,
          session.context,
        );
        await this.sendMessage(from, aiReply, phoneNumberId);
        break;
    }

    // 5. Save updated session state
    await session.save();
  }

  // --- Core Helpers ---
  private async sendMessage(to: string, body: string, phoneNumberId: string) {
    const token = this.configService.get<string>('WHATSAPP_TOKEN') || '';
    await this.waSender.sendTextMessage(to, body, phoneNumberId, token);
  }

  private async handlePriorityKeywords(
    from: string,
    text: string,
    phoneNumberId: string,
    tenantId: string,
    session: WhatsAppSessionDocument,
  ): Promise<boolean> {
    const greetings = ['hi', 'hello', 'hey', 'start', 'menu'];
    const token = this.configService.get<string>('WHATSAPP_TOKEN') || '';

    if (greetings.includes(text)) {
      const tenant = await this.tenantService.getTenantById(tenantId);
      await this.menuFlow.sendMenu(from, phoneNumberId, tenant?.name || 'our Clinic', token);
      session.state = SessionState.IDLE;
      return true;
    }

    if (text === '1' || text === 'book' || text === 'appointment') {
      session.state = 'BOOKING_START' as any;
      await this.bookingFlow.handleBookingStep(session, text, from, phoneNumberId, tenantId, token);
      return true;
    }

    if (text === '2' || text === 'my appointments') {
      await this.myAppointmentsFlow.handleRetrieval(from, phoneNumberId, tenantId, token);
      session.state = SessionState.IDLE;
      return true;
    }

    if (text === '3' || text === 'cancel') {
      await this.cancelFlow.handleCancel(from, phoneNumberId, token);
      session.state = SessionState.IDLE;
      return true;
    }

    if (text === '4' || text === 'hours' || text === 'clinic hours') {
      const tenant = await this.tenantService.getTenantById(tenantId);
      const msg = `🕐 Clinic Hours\n\n${tenant?.name || 'Our Clinic'}\nMon-Sat: 9:00 AM - 8:00 PM\nSunday: Closed\n\n📞 Contact Us\n📍 See Maps`;
      await this.sendMessage(from, msg, phoneNumberId);
      session.state = SessionState.IDLE;
      return true;
    }

    if (text === '5' || text === 'staff' || text === 'help') {
      await this.sendMessage(
        from,
        'A staff member will reach out to you shortly! 😊',
        phoneNumberId,
      );
      session.state = SessionState.IDLE;
      return true;
    }

    return false; // Did not match priority keyword
  }
}
