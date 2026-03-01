"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export function AdvancePayments() {
    // MOCK DATA
    const advanceRecords = [
        { id: 'ADV-001', patient: 'Anita Desai', pId: 'P-1002', date: new Date(Date.now() - 86400000 * 3).toISOString(), amount: 5000, used: 3500, balance: 1500, notes: 'Ortho treatment advance' },
        { id: 'ADV-002', patient: 'Sunil Verma', pId: 'P-1008', date: new Date(Date.now() - 86400000 * 15).toISOString(), amount: 10000, used: 10000, balance: 0, notes: 'Implant advance' },
    ];

    return (
        <div className="bg-white dark:bg-gray-950 p-4 rounded-xl shadow-sm border dark:border-gray-800 space-y-4 h-full flex flex-col min-h-0">
            <div className="flex justify-between items-center gap-4">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search patient..."
                        className="pl-9 bg-slate-50 dark:bg-gray-900 border-none"
                    />
                </div>
                <Button className="shrink-0 bg-teal-600 hover:bg-teal-700 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Record Advance
                </Button>
            </div>

            <div className="border rounded-md overflow-x-auto dark:border-gray-800 flex-1 relative">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-gray-900 text-xs uppercase font-semibold text-muted-foreground border-b dark:border-gray-800 sticky top-0 z-10">
                        <tr>
                            <th className="px-5 py-3 truncate">Receipt #</th>
                            <th className="px-5 py-3">Patient</th>
                            <th className="px-5 py-3">Date</th>
                            <th className="px-5 py-3">Notes</th>
                            <th className="px-5 py-3 text-right">Total Amount</th>
                            <th className="px-5 py-3 text-right">Used</th>
                            <th className="px-5 py-3 text-right">Balance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-800">
                        {advanceRecords.map((adv) => (
                            <tr key={adv.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-900/50">
                                <td className="px-5 py-3.5 font-medium text-teal-700 dark:text-teal-400 whitespace-nowrap">{adv.id}</td>
                                <td className="px-5 py-3.5 whitespace-nowrap">
                                    <div className="font-medium">{adv.patient}</div>
                                    <div className="text-xs text-muted-foreground">{adv.pId}</div>
                                </td>
                                <td className="px-5 py-3.5 whitespace-nowrap">{formatDate(adv.date)}</td>
                                <td className="px-5 py-3.5 text-muted-foreground max-w-[200px] truncate" title={adv.notes}>{adv.notes}</td>
                                <td className="px-5 py-3.5 font-semibold text-right">{formatCurrency(adv.amount)}</td>
                                <td className="px-5 py-3.5 text-right font-medium">{formatCurrency(adv.used)}</td>
                                <td className="px-5 py-3.5 text-right font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(adv.balance)}</td>
                            </tr>
                        ))}
                        {advanceRecords.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-10 text-muted-foreground">
                                    No advance payments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
