"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStatusColor, formatTime, formatDate } from "@/lib/utils/format";
import { MoreHorizontal, FileEdit, XCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppointmentList({
    onSelectEvent
}: {
    onSelectEvent: (event: any) => void;
}) {
    const appointments = [
        { id: '1', date: new Date().toISOString(), time: '09:00', patientName: 'Rahul Sharma', token: '1', status: 'CONFIRMED', doctorName: 'Dr. Priya', chair: 'CHAIR-1', procedures: 'Consultation' },
        { id: '2', date: new Date().toISOString(), time: '11:00', patientName: 'Anita Desai', token: '2', status: 'SCHEDULED', doctorName: 'Dr. Rajan', chair: 'CHAIR-2', procedures: 'Extraction' },
    ];

    return (
        <div className="bg-white dark:bg-gray-950 rounded-xl shadow-sm border dark:border-gray-800 p-1">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50 dark:bg-gray-900/50 hover:bg-slate-50 dark:hover:bg-gray-900/50">
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Chair</TableHead>
                        <TableHead>Procedures</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments.map((apt) => (
                        <TableRow key={apt.id} className="cursor-pointer" onClick={() => onSelectEvent(apt)}>
                            <TableCell className="font-medium">
                                <div>{formatDate(apt.date)}</div>
                                <div className="text-xs text-muted-foreground">{formatTime(apt.time)}</div>
                            </TableCell>
                            <TableCell>{apt.patientName}</TableCell>
                            <TableCell>{apt.doctorName}</TableCell>
                            <TableCell>{apt.chair}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{apt.procedures}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={getStatusColor(apt.status)}>
                                    {apt.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => onSelectEvent(apt)}>
                                            <FileEdit className="mr-2 h-4 w-4" />
                                            View / Update
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Cancel Appointment
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
