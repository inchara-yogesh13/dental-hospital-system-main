"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStatusColor, formatDateTime } from "@/lib/utils/format";
import { CalendarDays, Clock, User, Phone, FileText } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function AppointmentDetailSheet({
    appointment,
    open,
    onOpenChange,
}: {
    appointment: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    if (!appointment) return null;

    // Use either the resource status (from calendar mock) or flat status (from list mock)
    const status = appointment.status || appointment.resource?.status || 'SCHEDULED';
    const displayToken = appointment.token || appointment.title?.match(/Token #(\d+)/)?.[1] || 'N/A';
    const displayPatient = appointment.patientName || appointment.title?.split(' -')[0] || 'Unknown';
    const displayDoctor = appointment.doctorName || 'Dr. Priya Sharma';

    const handleStatusUpdate = (newStatus: string) => {
        toast.success(`Appointment marked as ${newStatus}`);
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md bg-white dark:bg-gray-950 flex flex-col p-0">
                <div className="p-6 pb-4 border-b">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <SheetTitle className="text-xl">Appointment Details</SheetTitle>
                            <SheetDescription className="mt-1">
                                Token <strong className="text-teal-600 dark:text-teal-400">#{displayToken}</strong>
                            </SheetDescription>
                        </div>
                        <Badge variant="outline" className={getStatusColor(status)}>
                            {status}
                        </Badge>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Patient Card */}
                    <section className="space-y-3">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Patient</h4>
                        <div className="flex items-center gap-4 bg-slate-50 dark:bg-gray-900 border dark:border-gray-800 p-4 rounded-xl">
                            <div className="bg-teal-100 dark:bg-teal-900/40 p-3 rounded-full text-teal-700 dark:text-teal-400">
                                <User className="h-6 w-6" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Link href={`/patients/123`} className="font-semibold text-base hover:text-teal-600 transition-colors">
                                    {displayPatient}
                                </Link>
                                <div className="flex items-center text-sm text-muted-foreground gap-1">
                                    <Phone className="h-3 w-3" />
                                    <span>+91 98765 43210</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Schedule Summary */}
                    <section className="space-y-3">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Schedule</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 dark:bg-gray-900 border dark:border-gray-800 rounded-xl p-4 flex items-center gap-3">
                                <CalendarDays className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                <span className="text-sm font-medium">{formatDateTime(appointment.start || appointment.date).split(',')[0]}</span>
                            </div>
                            <div className="bg-slate-50 dark:bg-gray-900 border dark:border-gray-800 rounded-xl p-4 flex items-center gap-3">
                                <Clock className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                <span className="text-sm font-medium">{appointment.time || '10:00 AM'}</span>
                            </div>
                        </div>
                    </section>

                    {/* Clinical Info */}
                    <section className="space-y-3">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Clinical Details</h4>
                        <div className="bg-slate-50 dark:bg-gray-900 border dark:border-gray-800 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between text-sm items-center border-b pb-3 dark:border-gray-800">
                                <span className="text-muted-foreground flex items-center gap-2"><User className="h-4 w-4" /> Doctor</span>
                                <span className="font-medium">{displayDoctor}</span>
                            </div>
                            <div className="flex justify-between text-sm items-center border-b pb-3 dark:border-gray-800">
                                <span className="text-muted-foreground flex items-center gap-2">- Chair</span>
                                <span className="font-medium">{appointment.chair || 'CHAIR-1'}</span>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span className="text-muted-foreground flex items-center gap-2"><FileText className="h-4 w-4" /> Procedures</span>
                                <span className="font-medium max-w-[150px] truncate text-right">{appointment.procedures || 'Consultation'}</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Action Footer */}
                <div className="p-4 border-t bg-slate-50 dark:bg-gray-900 flex flex-col gap-3">
                    {status === 'SCHEDULED' && (
                        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={() => handleStatusUpdate('CONFIRMED')}>Confirm Visit</Button>
                    )}
                    {['SCHEDULED', 'CONFIRMED'].includes(status) && (
                        <Button variant="outline" className="w-full">Reschedule</Button>
                    )}
                    {status === 'CONFIRMED' && (
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleStatusUpdate('IN_PROGRESS')}>Start Treatment</Button>
                    )}
                    {status === 'IN_PROGRESS' && (
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => handleStatusUpdate('COMPLETED')}>Mark as Completed</Button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
