"use client";

import { useTodayAppointments } from '@/lib/hooks/useAppointments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getStatusColor, formatTime } from '@/lib/utils/format';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export function TodayAppointmentList() {
    const { data, isLoading } = useTodayAppointments();

    if (isLoading) {
        return <Skeleton className="h-[350px] w-full rounded-xl" />;
    }

    // Fallback mock
    const appointments: any[] = (data as any) || [
        { id: '1', time: '09:00', patientName: 'Rahul Sharma', token: '1', status: 'SCHEDULED', doctorName: 'Dr. Priya', color: '#8b5cf6' },
        { id: '2', time: '10:00', patientName: 'Anita Desai', token: '2', status: 'IN_PROGRESS', doctorName: 'Dr. Priya', color: '#8b5cf6' },
        { id: '3', time: '11:30', patientName: 'Vikram Singh', token: '3', status: 'CONFIRMED', doctorName: 'Dr. Rajan', color: '#3b82f6' },
        { id: '4', time: '14:00', patientName: 'Sneha Patel', token: '4', status: 'COMPLETED', doctorName: 'Dr. Priya', color: '#8b5cf6' },
    ];

    return (
        <Card className="flex flex-col h-full border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Today's Appointments</CardTitle>
                <Link href="/appointments" className="text-sm font-medium text-teal-600 hover:text-teal-700 hover:underline">
                    View All
                </Link>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto mt-2">
                <div className="space-y-4">
                    {appointments.map((apt: any) => (
                        <div key={apt.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 last:border-0 last:pb-0 gap-3 sm:gap-0">
                            <div className="flex items-center gap-4">
                                <div className="text-sm font-semibold w-14 text-left sm:text-center text-zinc-900 dark:text-zinc-100">
                                    {formatTime(apt.time) || apt.time}
                                </div>
                                <div className="w-1.5 h-10 rounded-full shrink-0" style={{ backgroundColor: apt.color || '#0D9488' }} />
                                <div>
                                    <div className="font-medium">{apt.patientName}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                        <span className="font-medium text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-900 rounded px-1">T-{apt.token}</span>
                                        <span>•</span>
                                        <span>{apt.doctorName}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className={getStatusColor(apt.status)}>
                                    {apt.status}
                                </Badge>
                                {/* Actions contextually */}
                                {apt.status === 'SCHEDULED' && (
                                    <Button size="sm" variant="outline" className="h-7 text-xs px-3">Confirm</Button>
                                )}
                                {apt.status === 'CONFIRMED' && (
                                    <Button size="sm" className="h-7 text-xs px-3 bg-teal-600 hover:bg-teal-700">Start</Button>
                                )}
                                {apt.status === 'IN_PROGRESS' && (
                                    <Button size="sm" variant="outline" className="h-7 text-xs px-3 border-green-500 text-green-600 hover:bg-green-50">Complete</Button>
                                )}
                            </div>
                        </div>
                    ))}
                    {appointments.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            No appointments scheduled for today.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
