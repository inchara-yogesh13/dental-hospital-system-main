"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Calendar, CalendarPlus, FileText, IndianRupee, Activity } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export function PatientProfileHeader({ patient }: { patient: any }) {
    return (
        <div className="space-y-6">
            <Card className="shadow-sm border-t-4 border-t-teal-600 dark:border-t-teal-500">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="space-y-4 flex-1">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{patient.name}</h2>
                                    <Badge variant="secondary" className="bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
                                        {patient.pid}
                                    </Badge>
                                    <Badge variant="outline" className="border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30">Active</Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1.5"><Activity className="w-4 h-4" /> {patient.age} yrs • {patient.gender}</span>
                                    <span>Blood: <strong className="font-medium text-zinc-800 dark:text-zinc-300">{patient.bloodGroup || 'N/A'}</strong></span>
                                    <span>{patient.phone}</span>
                                </div>
                            </div>

                            {patient.allergies?.length > 0 && (
                                <div className="flex items-center gap-2 mt-4">
                                    <AlertCircle className="w-4 h-4 text-red-500" />
                                    <span className="text-sm font-medium text-red-600 dark:text-red-400">Allergies:</span>
                                    <div className="flex gap-2">
                                        {patient.allergies.map((a: string) => (
                                            <Badge key={a} variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/40 border-red-200 dark:border-red-800 dark:text-red-300">{a}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {patient.medicalHistory && (
                                <div className="text-sm bg-slate-50 dark:bg-gray-900 p-3 flex flex-col gap-1 rounded-md border border-slate-200 dark:border-gray-800 text-muted-foreground mt-4">
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300 uppercase text-xs tracking-wider">Medical History</span>
                                    <p>{patient.medicalHistory}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 min-w-[200px] shrink-0">
                            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                                <Link href={`/appointments?new=true&patientId=${patient.id}`}><CalendarPlus className="w-4 h-4 mr-2" /> Book Appt</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full text-teal-700 border-teal-200 hover:bg-teal-50 dark:text-teal-400 dark:border-teal-900 dark:hover:bg-teal-950/50">
                                <Link href={`/billing/new?patientId=${patient.id}`}><IndianRupee className="w-4 h-4 mr-2" /> New Invoice</Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-sm">
                    <CardContent className="p-4 flex flex-col justify-center gap-1">
                        <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider text-[11px]">Total Visits</span>
                        <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{patient.totalVisits}</span>
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardContent className="p-4 flex flex-col justify-center gap-1">
                        <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider text-[11px]">Last Visit</span>
                        <span className="text-xl font-bold text-zinc-800 dark:text-zinc-100">{formatDate(patient.lastVisit)}</span>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-orange-100 dark:border-orange-900">
                    <CardContent className="p-4 flex flex-col justify-center gap-1 bg-orange-50/20 dark:bg-orange-950/10 rounded-xl">
                        <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider text-[11px]">Pending Balance</span>
                        <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">{formatCurrency(patient.pendingBalance)}</span>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-teal-100 dark:border-teal-900 bg-teal-50/50 dark:bg-teal-950/20">
                    <CardContent className="p-4 flex flex-col justify-center gap-1">
                        <span className="font-medium flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-teal-700 dark:text-teal-400"><Calendar className="w-3.5 h-3.5" /> Upcoming Appt</span>
                        <span className="text-xl font-bold text-teal-900 dark:text-teal-300">
                            {patient.upcomingAppointment ? formatDate(patient.upcomingAppointment) : 'None Scheduled'}
                        </span>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
