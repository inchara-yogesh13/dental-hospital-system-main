"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function LabCaseTable() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const statuses = ["ALL", "SENT", "RECEIVED", "FITTED", "REJECTED"];

    // MOCK DATA
    const labCases = [
        { id: 'LC-1020', patient: 'Ramesh Patel', pId: 'P-1045', doctor: 'Dr. Priya', labName: 'SmileCraft Dental Lab', caseType: 'PFM Crown (Tooth 46)', shade: 'A2', sentDate: new Date(Date.now() - 86400000 * 5).toISOString(), expectedReturn: new Date(Date.now() + 86400000 * 2).toISOString(), status: 'SENT', cost: 1200 },
        { id: 'LC-1021', patient: 'Sunita Sharma', pId: 'P-1012', doctor: 'Dr. Rajan', labName: 'Precision Mills', caseType: 'Zirconia Bridge (11-13)', shade: 'B1', sentDate: new Date(Date.now() - 86400000 * 10).toISOString(), expectedReturn: new Date(Date.now() - 86400000 * 1).toISOString(), status: 'RECEIVED', cost: 4500 },
        { id: 'LC-1022', patient: 'Vikram Singh', pId: 'P-1003', doctor: 'Dr. Priya', labName: 'SmileCraft Dental Lab', caseType: 'Night Guard', shade: 'N/A', sentDate: new Date(Date.now() - 86400000 * 20).toISOString(), expectedReturn: new Date(Date.now() - 86400000 * 15).toISOString(), status: 'FITTED', cost: 800 },
        { id: 'LC-1023', patient: 'Sneha Patel', pId: 'P-1004', doctor: 'Dr. Rajan', labName: 'Precision Mills', caseType: 'E-max Veneer (21)', shade: 'Bleach1', sentDate: new Date(Date.now() - 86400000 * 3).toISOString(), expectedReturn: new Date(Date.now() + 86400000 * 4).toISOString(), status: 'REJECTED', cost: 2500 },
    ];

    const filteredCases = labCases.filter(c => {
        const matchesSearch = c.patient.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'SENT': return <Badge variant="outline" className="text-blue-600 border-blue-500 bg-blue-50 dark:bg-blue-950/30">Sent out</Badge>;
            case 'RECEIVED': return <Badge variant="outline" className="text-emerald-600 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30">Received</Badge>;
            case 'FITTED': return <Badge variant="outline" className="text-teal-700 border-teal-600 bg-teal-50 dark:bg-teal-950/30">Fitted in Patient</Badge>;
            case 'REJECTED': return <Badge variant="outline" className="text-rose-600 border-rose-500 bg-rose-50 dark:bg-rose-950/30">Rejected/Rework</Badge>;
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
                            placeholder="Search case ID or patient..."
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
                            <th className="px-5 py-3 truncate">Case ID</th>
                            <th className="px-5 py-3">Patient</th>
                            <th className="px-5 py-3 hidden lg:table-cell">Lab Name</th>
                            <th className="px-5 py-3">Case Type</th>
                            <th className="px-5 py-3">Dates</th>
                            <th className="px-5 py-3 text-right hidden xl:table-cell">Cost</th>
                            <th className="px-5 py-3">Status</th>
                            <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-800">
                        {filteredCases.map((c) => (
                            <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-900/50">
                                <td className="px-5 py-3.5 font-medium text-teal-700 dark:text-teal-400 whitespace-nowrap">
                                    {c.id}
                                </td>
                                <td className="px-5 py-3.5 whitespace-nowrap">
                                    <div className="font-medium">{c.patient}</div>
                                    <div className="text-xs text-muted-foreground">{c.pId} • {c.doctor}</div>
                                </td>
                                <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground hidden lg:table-cell">{c.labName}</td>
                                <td className="px-5 py-3.5 whitespace-nowrap">
                                    <div className="font-medium">{c.caseType}</div>
                                    <div className="text-xs text-muted-foreground">Shade: {c.shade}</div>
                                </td>
                                <td className="px-5 py-3.5 whitespace-nowrap">
                                    <div className="text-xs text-muted-foreground">Sent: {formatDate(c.sentDate)}</div>
                                    <div className="text-xs text-gray-900 dark:text-gray-100 font-medium mt-0.5">Rtn: {formatDate(c.expectedReturn)}</div>
                                </td>
                                <td className="px-5 py-3.5 font-semibold text-right hidden xl:table-cell">{formatCurrency(c.cost)}</td>
                                <td className="px-5 py-3.5 whitespace-nowrap">
                                    {getStatusBadge(c.status)}
                                </td>
                                <td className="px-5 py-3.5 text-right">
                                    <Button variant="outline" size="sm" className="h-8">
                                        <Settings2 className="w-3.5 h-3.5 mr-1.5" /> Update
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {filteredCases.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center py-10 text-muted-foreground">
                                    No lab cases found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
