"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Download, Send, CreditCard, Banknote, Landmark, Edit, Ban } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
    // MOCK DATA
    const invoice = {
        id: params.id,
        date: new Date().toISOString(),
        status: 'PARTIAL',
        doctor: 'Dr. Priya Sharma',
        patient: {
            id: 'P-1001',
            name: 'Rahul Sharma',
            phone: '+91 98765 43210',
            address: '123 Main St, Mumbai',
        },
        items: [
            { id: '1', desc: 'Root Canal Treatment (Session 1)', qty: 1, unit: 4000, disc: 0, tax: 0, total: 4000 },
            { id: '2', desc: 'X-Ray OPG', qty: 1, unit: 500, disc: 100, tax: 0, total: 400 },
        ],
        subtotal: 4500,
        discount: 100,
        tax: 0,
        grandTotal: 4400,
        paid: 2000,
        pending: 2400,
        payments: [
            { id: 'pay_1', date: new Date().toISOString(), amount: 2000, mode: 'UPI', ref: 'UPI/1239847120' }
        ],
        notes: 'Thank you for your visit.'
    };

    return (
        <PageWrapper
            title={`Invoice ${invoice.id}`}
            headerContent={
                <div className="flex items-center gap-4 mb-4">
                    <Button variant="ghost" size="icon" asChild className="shrink-0 -ml-2">
                        <Link href="/billing"><ChevronLeft className="w-5 h-5" /></Link>
                    </Button>
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 hover:text-orange-700 border-none px-3 py-1">
                        {invoice.status}
                    </Badge>
                </div>
            }
            action={
                <div className="flex gap-2">
                    <Button variant="outline" className="hidden sm:flex">
                        <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button variant="outline" className="text-teal-600 border-teal-200 hover:bg-teal-50">
                        <Send className="w-4 h-4 mr-2" /> WhatsApp
                    </Button>
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" /> PDF
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-md">
                        Record Payment
                    </Button>
                </div>
            }
        >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start pb-8">

                {/* Left Column - Invoice Document */}
                <div className="xl:col-span-2 space-y-6">
                    <Card className="shadow-sm overflow-hidden">
                        {/* Print friendly area starts */}
                        <div className="p-8 sm:p-12 bg-white">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b pb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-600 mb-1">DentalCloud Clinic</h2>
                                    <p className="text-sm text-gray-500">123 Health Avenue, Med City</p>
                                    <p className="text-sm text-gray-500">Phone: +91 99999 00000</p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <h1 className="text-3xl font-light text-gray-400 uppercase tracking-widest mb-2">Invoice</h1>
                                    <p className="text-sm font-medium text-gray-900">#{invoice.id}</p>
                                    <p className="text-sm text-gray-500">Date: {formatDate(invoice.date)}</p>
                                    <p className="text-sm text-gray-500">Doctor: {invoice.doctor}</p>
                                </div>
                            </div>

                            <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Bill To</p>
                                    <p className="text-base font-semibold text-gray-900">{invoice.patient.name}</p>
                                    <p className="text-sm text-gray-600 mt-1">ID: {invoice.patient.id}</p>
                                    <p className="text-sm text-gray-600 mt-1">{invoice.patient.phone}</p>
                                    <p className="text-sm text-gray-600 mt-1">{invoice.patient.address}</p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <table className="w-full text-left text-sm text-gray-900">
                                    <thead className="bg-gray-50 text-gray-500 border-y border-gray-200">
                                        <tr>
                                            <th className="py-3 px-4 font-semibold">Description</th>
                                            <th className="py-3 px-4 font-semibold text-center">Qty</th>
                                            <th className="py-3 px-4 font-semibold text-right">Price</th>
                                            <th className="py-3 px-4 font-semibold text-right">Disc.</th>
                                            <th className="py-3 px-4 font-semibold text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {invoice.items.map(item => (
                                            <tr key={item.id}>
                                                <td className="py-4 px-4 font-medium">{item.desc}</td>
                                                <td className="py-4 px-4 text-center">{item.qty}</td>
                                                <td className="py-4 px-4 text-right">{formatCurrency(item.unit)}</td>
                                                <td className="py-4 px-4 text-right text-rose-500">{item.disc > 0 ? formatCurrency(item.disc) : '-'}</td>
                                                <td className="py-4 px-4 text-right font-semibold">{formatCurrency(item.total)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row justify-between items-start pt-8 border-t border-gray-200 gap-8">
                                <div className="w-full sm:w-1/2">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Notes / Terms</p>
                                    <p className="text-sm text-gray-600">{invoice.notes}</p>
                                </div>
                                <div className="w-full sm:w-[300px] space-y-3 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>{formatCurrency(invoice.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-rose-600">
                                        <span>Discount</span>
                                        <span>- {formatCurrency(invoice.discount)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax</span>
                                        <span>+ {formatCurrency(invoice.tax)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 text-gray-900">
                                        <span>Grand Total</span>
                                        <span>{formatCurrency(invoice.grandTotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-emerald-600 font-medium pt-2">
                                        <span>Amount Paid</span>
                                        <span>{formatCurrency(invoice.paid)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-base text-orange-600 bg-orange-50 p-2 rounded pt-2">
                                        <span>Amount Due</span>
                                        <span>{formatCurrency(invoice.pending)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Print friendly area ends */}
                    </Card>
                </div>

                {/* Right Column - Payments & Actions */}
                <div className="xl:col-span-1 space-y-6">
                    <Card className="shadow-sm border-orange-100 dark:border-orange-900/50">
                        <CardHeader className="bg-orange-50/50 dark:bg-orange-900/10 border-b pb-4">
                            <CardTitle className="text-lg flex justify-between items-center">
                                Payment Status
                                <span className="text-2xl font-bold text-orange-600 dark:text-orange-500">{formatCurrency(invoice.pending)} Due</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y dark:divide-gray-800">
                                {invoice.payments.map(pay => (
                                    <div key={pay.id} className="p-4 flex justify-between items-center bg-white dark:bg-gray-950">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full text-emerald-600 dark:text-emerald-400">
                                                {pay.mode === 'UPI' ? <Banknote className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">{formatCurrency(pay.amount)}</p>
                                                <p className="text-xs text-muted-foreground">{formatDate(pay.date)} • {pay.mode}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5">Ref: {pay.ref}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {invoice.payments.length === 0 && (
                                    <div className="p-6 text-center text-sm text-muted-foreground">
                                        No payments recorded yet.
                                    </div>
                                )}
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-gray-900/50 border-t flex gap-2">
                                <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">Record Payment</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Button variant="outline" className="w-full text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200">
                        <Ban className="w-4 h-4 mr-2" /> Cancel Invoice
                    </Button>
                </div>

            </div>
        </PageWrapper>
    );
}
