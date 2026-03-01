"use client";

import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Plus, Search, MoreHorizontal, FileText, Activity } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';

// Use standard mocked data for now
export default function PatientsPage() {
    const [search, setSearch] = useState('');

    const patients = [
        { id: '1', pid: 'P-1001', name: 'Rahul Sharma', phone: '+91 98765 43210', age: 34, lastVisit: new Date().toISOString(), totalVisits: 5, balance: 0 },
        { id: '2', pid: 'P-1002', name: 'Anita Desai', phone: '+91 87654 32109', age: 28, lastVisit: new Date(Date.now() - 86400000 * 5).toISOString(), totalVisits: 2, balance: 1500 },
        { id: '3', pid: 'P-1003', name: 'Vikram Singh', phone: '+91 76543 21098', age: 45, lastVisit: new Date(Date.now() - 86400000 * 30).toISOString(), totalVisits: 12, balance: -500 },
    ];

    return (
        <PageWrapper
            title="Patients"
            subtitle="Directory of all registered patients."
            action={
                <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Link href="/patients/new">
                        <Plus className="mr-2 h-4 w-4" /> Register New Patient
                    </Link>
                </Button>
            }
        >
            <div className="bg-white dark:bg-gray-950 p-4 rounded-xl shadow-sm border dark:border-gray-800 space-y-4">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, phone, or patient ID..."
                        className="pl-9 bg-slate-50 dark:bg-gray-900 border-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="border rounded-md xl:overflow-visible dark:border-gray-800 overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50 dark:bg-gray-900/50">
                            <TableRow>
                                <TableHead>Patient ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Last Visit</TableHead>
                                <TableHead>Visits</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patients.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-medium text-teal-700 dark:text-teal-400">
                                        <Link href={`/patients/${p.id}`}>{p.pid}</Link>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <Link href={`/patients/${p.id}`} className="hover:underline">{p.name}</Link>
                                    </TableCell>
                                    <TableCell>{p.phone}</TableCell>
                                    <TableCell>{p.age} yrs</TableCell>
                                    <TableCell>{formatDate(p.lastVisit)}</TableCell>
                                    <TableCell>{p.totalVisits}</TableCell>
                                    <TableCell>
                                        {p.balance > 0 ? (
                                            <span className="text-red-600 font-medium">{formatCurrency(p.balance)}</span>
                                        ) : p.balance < 0 ? (
                                            <span className="text-emerald-600 font-medium whitespace-nowrap">Adv {formatCurrency(Math.abs(p.balance))}</span>
                                        ) : (
                                            <span className="text-muted-foreground">₹0.00</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/patients/${p.id}`}>
                                                        <Activity className="mr-2 h-4 w-4" /> View Profile
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/billing/new?patientId=${p.id}`}>
                                                        <FileText className="mr-2 h-4 w-4" /> Create Invoice
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </PageWrapper>
    );
}
