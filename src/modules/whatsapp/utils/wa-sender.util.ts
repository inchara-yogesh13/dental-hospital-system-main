import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WaSenderUtil {
  private readonly logger = new Logger(WaSenderUtil.name);

  async sendTextMessage(
    to: string,
    body: string,
    phoneNumberId: string,
    token: string,
  ): Promise<void> {
    try {
      await axios.post(
        `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      this.logger.log(`Message sent to ${to}`);
    } catch (error: any) {
      this.logger.error(
        `Failed to send WhatsApp message to ${to}: ${error.response?.data?.error?.message || error.message
        }`,
      );
    }
  }
}
