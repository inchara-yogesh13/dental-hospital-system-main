"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Eye, Download, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function InvoiceList() {
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [search, setSearch] = useState("");

    const statuses = ["ALL", "DRAFT", "ISSUED", "PARTIAL", "PAID", "CANCELLED"];

    // MOCK DATA
    const allInvoices = [
        { id: 'INV-2024-001', patient: 'Rahul Sharma', pId: 'P-1001', doctor: 'Dr. Priya', date: new Date().toISOString(), grandTotal: 2500, paid: 1000, pending: 1500, status: 'PARTIAL' },
        { id: 'INV-2024-002', patient: 'Anita Desai', pId: 'P-1002', doctor: 'Dr. Rajan', date: new Date(Date.now() - 86400000 * 2).toISOString(), grandTotal: 1500, paid: 1500, pending: 0, status: 'PAID' },
        { id: 'INV-2024-003', patient: 'Vikram Singh', pId: 'P-1003', doctor: 'Dr. Priya', date: new Date(Date.now() - 86400000 * 5).toISOString(), grandTotal: 12000, paid: 0, pending: 12000, status: 'ISSUED' },
        { id: 'INV-2024-004', patient: 'Sneha Patel', pId: 'P-1004', doctor: 'Dr. Rajan', date: new Date().toISOString(), grandTotal: 500, paid: 0, pending: 500, status: 'DRAFT' },
        { id: 'INV-2024-005', patient: 'Amit Kumar', pId: 'P-1005', doctor: 'Dr. Priya', date: new Date(Date.now() - 86400000 * 10).toISOString(), grandTotal: 3500, paid: 3500, pending: 0, status: 'CANCELLED' },
    ];

    const filteredInvoices = allInvoices.filter(inv => {
        const matchesStatus = statusFilter === 'ALL' || inv.status === statusFilter;
        const matchesSearch = inv.patient.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'DRAFT': return <Badge variant="outline" className="text-gray-500 border-gray-500">Draft</Badge>;
            case 'ISSUED': return <Badge variant="outline" className="text-blue-500 border-blue-500 bg-blue-50 dark:bg-blue-950/30">Issued</Badge>;
            case 'PARTIAL': return <Badge variant="outline" className="text-orange-500 border-orange-500 bg-orange-50 dark:bg-orange-950/30">Partial</Badge>;
            case 'PAID': return <Badge variant="outline" className="text-emerald-600 border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30">Paid</Badge>;
            case 'CANCELLED': return <Badge variant="outline" className="text-red-500 border-red-500 bg-red-50 dark:bg-red-950/30">Cancelled</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-950 p-4 rounded-xl shadow-sm border dark:border-gray-800 space-y-4 h-full flex flex-col min-h-0">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search invoice # or patient..."
                            className="pl-9 bg-slate-50 dark:bg-gray-900 border-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Select defaultValue="all_doctors">
                        <SelectTrigger className="w-[180px] bg-slate-50 dark:bg-gray-900 border-none">
                            <SelectValue placeholder="Doctor" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all_doctors">All Doctors</SelectItem>
                            <SelectItem value="dr_priya">Dr. Priya</SelectItem>
                            <SelectItem value="dr_rajan">Dr. Rajan</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="shrink-0"><SlidersHorizontal className="w-4 h-4 mr-2" /> Filters</Button>
                </div>

                <div className="flex gap-2 bg-slate-100 p-1 rounded-lg overflow-x-auto dark:bg-gray-900 hide-scrollbar">
                    {statuses.map(s => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${statusFilter === s ? 'bg-white dark:bg-gray-800 shadow-sm text-teal-700 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="border rounded-md overflow-x-auto dark:border-gray-800 flex-1 relative">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-gray-900 text-xs uppercase font-semibold text-muted-foreground border-b dark:border-gray-800 sticky top-0 z-10">
                        <tr>
                            <th className="px-5 py-3 truncate">Invoice #</th>
                            <th className="px-5 py-3">Patient</th>
                            <th className="px-5 py-3">Doctor</th>
                            <th className="px-5 py-3">Date</th>
                            <th className="px-5 py-3 text-right">Grand Total</th>
                            <th className="px-5 py-3 text-right">Paid</th>
                            <th className="px-5 py-3 text-right">Pending</th>
                            <th className="px-5 py-3">Status</th>
                            <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-800">
                        {filteredInvoices.map((inv) => (
                            <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-900/50">
                                <td className="px-5 py-3.5 font-medium text-teal-700 dark:text-teal-400 whitespace-nowrap">
                                    <Link href={`/billing/${inv.id}`}>{inv.id}</Link>
                                </td>
                                <td className="px-5 py-3.5 whitespace-nowrap">
                                    <div className="font-medium">{inv.patient}</div>
                                    <div className="text-xs text-muted-foreground">{inv.pId}</div>
                                </td>
                                <td className="px-5 py-3.5 whitespace-nowrap">{inv.doctor}</td>
                                <td className="px-5 py-3.5 whitespace-nowrap">{formatDate(inv.date)}</td>
                                <td className="px-5 py-3.5 font-semibold text-right">{formatCurrency(inv.grandTotal)}</td>
                                <td className="px-5 py-3.5 text-right text-emerald-600 dark:text-emerald-400">{formatCurrency(inv.paid)}</td>
                                <td className="px-5 py-3.5 text-right text-orange-600 dark:text-orange-400">{formatCurrency(inv.pending)}</td>
                                <td className="px-5 py-3.5 whitespace-nowrap">
                                    {getStatusBadge(inv.status)}
                                </td>
                                <td className="px-5 py-3.5 text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-teal-600" asChild>
                                            <Link href={`/billing/${inv.id}`}><Eye className="w-4 h-4" /></Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-teal-600">
                                            <Printer className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-teal-600">
                                            <Download className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredInvoices.length === 0 && (
                            <tr>
                                <td colSpan={9} className="text-center py-10 text-muted-foreground">
                                    No invoices found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
