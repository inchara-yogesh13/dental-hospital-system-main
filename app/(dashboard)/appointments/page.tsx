"use client";

import { PageWrapper } from '@/components/layout/PageWrapper';
import { AppointmentCalendar } from '@/components/appointments/AppointmentCalendar';
import { AppointmentList } from '@/components/appointments/AppointmentList';
import { NewAppointmentSheet } from '@/components/appointments/NewAppointmentSheet';
import { AppointmentDetailSheet } from '@/components/appointments/AppointmentDetailSheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Plus, CalendarDays, List } from 'lucide-react';
import { useState } from 'react';

export default function AppointmentsPage() {
    const [activeTab, setActiveTab] = useState('calendar');
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [initialDate, setInitialDate] = useState<Date | undefined>(undefined);

    const handleSelectEvent = (event: any) => {
        setSelectedEvent(event);
        setIsDetailOpen(true);
    };

    const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
        setInitialDate(slotInfo.start);
        setIsNewOpen(true);
    };

    return (
        <PageWrapper
            title="Appointments"
            subtitle="Manage your clinic schedule and bookings."
            action={
                <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => { setInitialDate(new Date()); setIsNewOpen(true); }}>
                    <Plus className="mr-2 h-4 w-4" /> Book Appointment
                </Button>
            }
        >
            <Tabs defaultValue="calendar" className="w-full flex-1 flex flex-col min-h-0" onValueChange={setActiveTab}>
                <div className="flex justify-between items-center mb-4">
                    <TabsList className="bg-white dark:bg-gray-950 border shadow-sm">
                        <TabsTrigger value="calendar" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900 dark:data-[state=active]:text-teal-300">
                            <CalendarDays className="w-4 h-4 mr-2" /> Calendar
                        </TabsTrigger>
                        <TabsTrigger value="list" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 dark:data-[state=active]:bg-teal-900 dark:data-[state=active]:text-teal-300">
                            <List className="w-4 h-4 mr-2" /> List View
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="calendar" className="mt-0 outline-none flex-1 min-h-0">
                    <AppointmentCalendar
                        onSelectEvent={handleSelectEvent}
                        onSelectSlot={handleSelectSlot}
                    />
                </TabsContent>
                <TabsContent value="list" className="mt-0 outline-none flex-1 min-h-0">
                    <AppointmentList onSelectEvent={handleSelectEvent} />
                </TabsContent>
            </Tabs>

            <NewAppointmentSheet
                open={isNewOpen}
                onOpenChange={setIsNewOpen}
                initialDate={initialDate}
            />
            <AppointmentDetailSheet
                open={isDetailOpen}
                onOpenChange={setIsDetailOpen}
                appointment={selectedEvent}
            />
        </PageWrapper>
    );
}
