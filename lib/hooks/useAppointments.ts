import { useQuery } from '@tanstack/react-query';
import { appointmentsApi } from '../api/reports.api';

export function useTodayAppointments() {
    return useQuery({
        queryKey: ['appointments', 'today'],
        queryFn: appointmentsApi.getToday,
    });
}
