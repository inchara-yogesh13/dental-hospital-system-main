import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WhatsAppSessionDocument = WhatsAppSession & Document;

export enum SessionState {
  IDLE = 'IDLE',
  AWAITING_NAME = 'AWAITING_NAME',
  AWAITING_DATE = 'AWAITING_DATE',
  AWAITING_DOCTOR_CHOICE = 'AWAITING_DOCTOR_CHOICE',
  AWAITING_SLOT = 'AWAITING_SLOT',
  BOOKING_CONFIRM = 'BOOKING_CONFIRM',
  RESCHEDULE_SELECT = 'RESCHEDULE_SELECT',
  CANCEL_SELECT = 'CANCEL_SELECT',
}

@Schema({ timestamps: true, collection: 'wa_sessions' })
export class WhatsAppSession {
  @Prop({ required: true, index: true })
  phone: string;

  @Prop({ type: Types.ObjectId, ref: 'Tenant', required: true })
  tenantId: Types.ObjectId;

  @Prop({ enum: SessionState, default: SessionState.IDLE })
  state: SessionState;

  @Prop({ type: Object, default: {} })
  context: Record<string, any>;

  // TTL index: automatically delete/expire documents after 30 minutes of inactivity
  @Prop({ required: true, index: { expires: '30m' }, default: Date.now })
  lastInteraction: Date;
}

export const WhatsAppSessionSchema =
  SchemaFactory.createForClass(WhatsAppSession);
