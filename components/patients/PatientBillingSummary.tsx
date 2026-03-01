"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils/format";
import { Download, FileText, Send } from "lucide-react";

export function PatientBillingSummary({ patientId }: { patientId: string }) {
    // MOCK DATA
    const invoices = [
        { id: 'INV-1001', date: new Date().toISOString(), amount: 1500, status: 'UNPAID', type: 'Consultation & X-Ray' },
        { id: 'INV-0982', date: new Date(Date.now() - 86400000 * 30).toISOString(), amount: 4500, status: 'PAID', type: 'Root Canal (Session 1)' },
        { id: 'INV-0845', date: new Date(Date.now() - 86400000 * 60).toISOString(), amount: 1200, status: 'PAID', type: 'Scaling' },
    ];

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Billing & Invoices</h3>
                    <p className="text-sm text-muted-foreground mt-1">Payment history and pending dues.</p>
                </div>
                <Button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white">
                    <FileText className="mr-2 h-4 w-4" /> Create Invoice
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-orange-50/50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Total Pending Dues</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{formatCurrency(1500)}</div>
                        <p className="text-xs text-orange-700/80 dark:text-orange-300/80 mt-1">Action recommended.</p>
                    </CardContent>
                </Card>
                <Card className="bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-[11px]">Advance Balance / Wallet</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(0)}</div>
                        <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80 mt-1">Available to use for future treatments.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-xl overflow-hidden shadow-sm mt-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-gray-900 text-xs uppercase font-semibold text-muted-foreground border-b dark:border-gray-800">
                            <tr>
                                <th className="px-5 py-3">Invoice #</th>
                                <th className="px-5 py-3">Date</th>
                                <th className="px-5 py-3">Description</th>
                                <th className="px-5 py-3">Amount</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-gray-800">
                            {invoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-900/50">
                                    <td className="px-5 py-4 font-medium text-teal-700 dark:text-teal-400">{inv.id}</td>
                                    <td className="px-5 py-4 whitespace-nowrap">{formatDate(inv.date)}</td>
                                    <td className="px-5 py-4 truncate max-w-[200px]">{inv.type}</td>
                                    <td className="px-5 py-4 font-semibold">{formatCurrency(inv.amount)}</td>
                                    <td className="px-5 py-4">
                                        <Badge variant="outline" className={getStatusColor(inv.status)}>{inv.status}</Badge>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400" title="Send via WhatsApp">
                                                <Send className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400" title="Download PDF">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
