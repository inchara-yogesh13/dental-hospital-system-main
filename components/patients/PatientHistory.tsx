"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStatusColor, formatDateTime } from "@/lib/utils/format";
import { CalendarDays, Clock, FileText, ChevronRight, User } from "lucide-react";

export function PatientHistory({ patientId }: { patientId: string }) {
    // MOCK DATA for History
    const history = [
        { id: 'app_1', date: new Date().toISOString(), time: '10:00 AM', doctor: 'Dr. Priya Sharma', chair: 'CHAIR-1', status: 'COMPLETED', token: '101', procedures: 'Root Canal Treatment' },
        { id: 'app_2', date: new Date(Date.now() - 86400000 * 30).toISOString(), time: '02:30 PM', doctor: 'Dr. Rajan Kumar', chair: 'CHAIR-2', status: 'COMPLETED', token: '42', procedures: 'Consultation & X-Ray' },
        { id: 'app_3', date: new Date(Date.now() - 86400000 * 60).toISOString(), time: '11:15 AM', doctor: 'Dr. Priya Sharma', chair: 'CHAIR-1', status: 'NO_SHOW', token: '15', procedures: 'Follow-up' },
    ];

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Visit History</h3>
                <Badge variant="secondary">{history.length} Total Visits</Badge>
            </div>

            <div className="relative border-l-2 border-slate-200 dark:border-gray-800 ml-3 md:ml-6 space-y-8 pb-4">
                {history.map((visit, idx) => (
                    <div key={visit.id} className="relative pl-6 md:pl-8">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-white dark:border-gray-950 bg-teal-500 shadow-sm" />

                        <div className="bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-teal-500/20" />

                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="space-y-3 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge variant="outline" className="font-semibold text-teal-700 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-400">
                                            {formatDateTime(visit.date).split(',')[0]}
                                        </Badge>
                                        <Badge variant="outline" className={getStatusColor(visit.status)}>{visit.status}</Badge>
                                        <span className="text-xs font-medium text-muted-foreground px-2 py-0.5 rounded-md bg-slate-100 dark:bg-gray-900">
                                            Token #{visit.token}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                                        <span className="flex items-center text-muted-foreground"><Clock className="w-3.5 h-3.5 mr-1.5" /> {visit.time}</span>
                                        <span className="flex items-center text-muted-foreground"><User className="w-3.5 h-3.5 mr-1.5" /> {visit.doctor}</span>
                                        <span className="flex items-center text-muted-foreground"><CalendarDays className="w-3.5 h-3.5 mr-1.5" /> {visit.chair}</span>
                                    </div>

                                    <div className="text-sm border-t border-slate-100 dark:border-gray-800 pt-3 mt-3 flex items-start gap-2">
                                        <FileText className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                        <span className="font-medium text-zinc-700 dark:text-zinc-300">
                                            {visit.procedures}
                                        </span>
                                    </div>
                                </div>

                                <div className="md:self-center">
                                    <Button variant="ghost" size="sm" className="w-full md:w-auto text-teal-700 hover:text-teal-800 hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-950">
                                        Details <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
