import { Injectable, Logger } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFDocument = require('pdfkit');

export interface InvoicePdfData {
  invoiceNumber: string;
  invoiceDate: string;
  clinicName: string;
  clinicAddress: string;
  clinicPhone: string;
  clinicGstin?: string;
  patientName: string;
  patientId: string;
  patientPhone: string;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    taxPercent: number;
    taxAmount: number;
    totalAmount: number;
  }>;
  subtotal: number;
  totalDiscount: number;
  totalTax: number;
  grandTotal: number;
  paidAmount: number;
  pendingAmount: number;
  payments: Array<{ amount: number; mode: string; paidAt: string }>;
}

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  /**
   * Generate invoice PDF as a Buffer (never writes to disk).
   * Uses pdfkit streams collected into a Buffer.
   */
  async generateInvoice(data: InvoicePdfData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // ── Header ─────────────────────────────────────────────────────────
      doc
        .fontSize(20)
        .font('Helvetica-Bold')
        .text(data.clinicName, { align: 'center' });
      doc
        .fontSize(9)
        .font('Helvetica')
        .text(data.clinicAddress, { align: 'center' });
      doc.text(`Phone: ${data.clinicPhone}`, { align: 'center' });
      if (data.clinicGstin)
        doc.text(`GSTIN: ${data.clinicGstin}`, { align: 'center' });
      doc.moveDown();

      // ── Invoice Info ────────────────────────────────────────────────────
      doc.lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(0.5);
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('TAX INVOICE', { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(9).font('Helvetica');
      doc.text(`Invoice No: ${data.invoiceNumber}`, 50);
      doc.text(`Date: ${data.invoiceDate}`, 50);
      doc.moveDown(0.5);

      // ── Patient Info ────────────────────────────────────────────────────
      doc.font('Helvetica-Bold').text('Patient Details:');
      doc
        .font('Helvetica')
        .text(`Name: ${data.patientName}`)
        .text(`ID: ${data.patientId}`)
        .text(`Phone: ${data.patientPhone}`);
      doc.moveDown();

      // ── Line Items Table Header ─────────────────────────────────────────
      doc.lineWidth(0.5).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(0.3);
      doc.font('Helvetica-Bold').fontSize(8);
      doc.text('Procedure', 50, doc.y, { width: 180 });
      doc.text('Qty', 230, doc.y - doc.currentLineHeight(), {
        width: 30,
        align: 'center',
      });
      doc.text('Price', 265, doc.y - doc.currentLineHeight(), {
        width: 60,
        align: 'right',
      });
      doc.text('Disc', 330, doc.y - doc.currentLineHeight(), {
        width: 50,
        align: 'right',
      });
      doc.text('Tax', 385, doc.y - doc.currentLineHeight(), {
        width: 50,
        align: 'right',
      });
      doc.text('Total', 440, doc.y - doc.currentLineHeight(), {
        width: 105,
        align: 'right',
      });
      doc.moveDown(0.3);
      doc.lineWidth(0.5).moveTo(50, doc.y).lineTo(545, doc.y).stroke();

      // ── Line Items ─────────────────────────────────────────────────────
      doc.font('Helvetica').fontSize(8);
      for (const item of data.lineItems) {
        doc.moveDown(0.3);
        const y = doc.y;
        doc.text(item.description, 50, y, { width: 180 });
        doc.text(String(item.quantity), 230, y, { width: 30, align: 'center' });
        doc.text(`₹${item.unitPrice.toFixed(2)}`, 265, y, {
          width: 60,
          align: 'right',
        });
        doc.text(`₹${item.discount.toFixed(2)}`, 330, y, {
          width: 50,
          align: 'right',
        });
        doc.text(`₹${item.taxAmount.toFixed(2)}`, 385, y, {
          width: 50,
          align: 'right',
        });
        doc.text(`₹${item.totalAmount.toFixed(2)}`, 440, y, {
          width: 105,
          align: 'right',
        });
      }

      doc.moveDown(0.5);
      doc.lineWidth(0.5).moveTo(50, doc.y).lineTo(545, doc.y).stroke();

      // ── Totals ─────────────────────────────────────────────────────────
      const totalsX = 350;
      doc.moveDown(0.5);
      doc.font('Helvetica').fontSize(9);
      doc
        .text('Subtotal:', totalsX)
        .moveUp()
        .text(`₹${data.subtotal.toFixed(2)}`, { align: 'right' });
      doc
        .text('Discount:', totalsX)
        .moveUp()
        .text(`-₹${data.totalDiscount.toFixed(2)}`, { align: 'right' });
      doc
        .text('GST:', totalsX)
        .moveUp()
        .text(`₹${data.totalTax.toFixed(2)}`, { align: 'right' });
      doc.font('Helvetica-Bold').fontSize(10);
      doc
        .text('Grand Total:', totalsX)
        .moveUp()
        .text(`₹${data.grandTotal.toFixed(2)}`, { align: 'right' });
      doc.font('Helvetica').fontSize(9);
      doc
        .text('Paid:', totalsX)
        .moveUp()
        .text(`₹${data.paidAmount.toFixed(2)}`, { align: 'right' });

      if (data.pendingAmount > 0) {
        doc.fillColor('red').font('Helvetica-Bold');
        doc
          .text('Balance Due:', totalsX)
          .moveUp()
          .text(`₹${data.pendingAmount.toFixed(2)}`, { align: 'right' });
        doc.fillColor('black').font('Helvetica');
      }

      // ── Payment History ─────────────────────────────────────────────────
      if (data.payments.length > 0) {
        doc.moveDown();
        doc.font('Helvetica-Bold').fontSize(9).text('Payment History:');
        doc.font('Helvetica').fontSize(8);
        for (const p of data.payments) {
          doc.text(`${p.paidAt} — ${p.mode} — ₹${p.amount.toFixed(2)}`);
        }
      }

      // ── Footer ─────────────────────────────────────────────────────────
      doc.moveDown(2);
      doc.lineWidth(0.5).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(0.5);
      doc
        .fontSize(8)
        .fillColor('grey')
        .text(
          'Thank you for choosing us! For queries, contact: ' +
            data.clinicPhone,
          { align: 'center' },
        );

      doc.end();
    });
  }
}
