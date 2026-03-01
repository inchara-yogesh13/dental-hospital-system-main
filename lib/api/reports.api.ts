import client from './client';
import { DashboardReport, RevenueReport, Appointment } from '../types';

export const reportsApi = {
    getDashboardStats: async () => {
        return client.get<DashboardReport>('/reports/dashboard');
    },
    getRevenueChart: async () => {
        return client.get<RevenueReport[]>('/reports/revenue/chart');
    }
};

export const appointmentsApi = {
    getToday: async () => {
        return client.get<Appointment[]>('/appointments/today');
    }
};
