"use client";

import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import client from '@/lib/api/client';

const locales = { 'en-US': enUS }

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

export function AppointmentCalendar({
    onSelectEvent,
    onSelectSlot,
}: {
    onSelectEvent: (event: any) => void;
    onSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
}) {
    const [view, setView] = useState<View>('week');
    const [date, setDate] = useState(new Date());

    // Using mock events since backend is pending
    const events = [
        {
            id: '1',
            title: 'Rahul Sharma - Token #1',
            start: new Date(new Date().setHours(9, 0, 0, 0)),
            end: new Date(new Date().setHours(9, 30, 0, 0)),
            resource: { doctorColor: '#8b5cf6', status: 'CONFIRMED' }
        },
        {
            id: '2',
            title: 'Anita Desai - Token #2',
            start: new Date(new Date().setHours(11, 0, 0, 0)),
            end: new Date(new Date().setHours(11, 45, 0, 0)),
            resource: { doctorColor: '#3b82f6', status: 'SCHEDULED' }
        }
    ];

    const eventPropGetter = (event: any) => {
        return {
            style: {
                backgroundColor: event.resource?.doctorColor || '#0D9488',
                borderRadius: '6px',
                opacity: 0.9,
                color: 'white',
                border: 'none',
                fontSize: '0.8rem',
                padding: '2px 4px',
            }
        };
    };

    return (
        <div className="h-full bg-white dark:bg-gray-950 p-4 rounded-xl shadow-sm border dark:border-gray-800">
            <style dangerouslySetInnerHTML={{
                __html: `
        .rbc-calendar { font-family: inherit; }
        .rbc-toolbar button { border-radius: 6px; }
        .rbc-toolbar button.rbc-active { background-color: #0f766e; color: white; border-color: #0f766e; }
        .dark .rbc-month-view, .dark .rbc-time-view, .dark .rbc-header { border-color: #1f2937; }
        .dark .rbc-day-bg { border-color: #1f2937; }
        .dark .rbc-timeslot-group { border-color: #1f2937; }
        .dark .rbc-time-content { border-color: #1f2937; }
        .dark .rbc-time-header-content { border-color: #1f2937; }
        .dark .rbc-today { background-color: #111827; }
        .dark .rbc-off-range-bg { background-color: #030712; }
      `}} />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 220px)' }}
                view={view}
                onView={setView}
                date={date}
                onNavigate={setDate}
                selectable
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                eventPropGetter={eventPropGetter}
                views={['month', 'week', 'day']}
                step={15}
                timeslots={2}
                min={new Date(0, 0, 0, 8, 0, 0)} // Starts at 8 AM
                max={new Date(0, 0, 0, 21, 0, 0)} // Ends at 9 PM
            />
        </div>
    )
}
