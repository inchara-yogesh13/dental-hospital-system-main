import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '../api/reports.api';

export function useDashboardStats() {
    return useQuery({
        queryKey: ['reports', 'dashboard', 'stats'],
        queryFn: reportsApi.getDashboardStats,
    });
}

export function useRevenueChart() {
    return useQuery({
        queryKey: ['reports', 'revenue', 'chart'],
        queryFn: reportsApi.getRevenueChart,
    });
}
