import { PageWrapper } from '@/components/layout/PageWrapper';
import { DashboardWidgets } from '@/components/reports/DashboardWidgets';
import { RevenueChart } from '@/components/reports/RevenueChart';
import { TodayAppointmentList } from '@/components/appointments/TodayAppointmentList';
import { AlertsSection } from '@/components/reports/AlertsSection';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
    return (
        <PageWrapper
            title="Dashboard"
            subtitle="Overview of your clinic's performance today."
            action={
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> New Appointment
                </Button>
            }
        >
            <div className="flex flex-col space-y-6 pb-8">
                {/* Top Row: 4 Stat Cards */}
                <DashboardWidgets />

                {/* Second Row: Appointments (60%) + Revenue Chart (40%) */}
                <div className="grid gap-6 md:grid-cols-5 lg:grid-cols-5 min-h-[400px]">
                    <div className="md:col-span-3">
                        <TodayAppointmentList />
                    </div>
                    <div className="md:col-span-2">
                        <RevenueChart />
                    </div>
                </div>

                {/* Third Row: Alerts */}
                <div className="pt-2">
                    <h3 className="text-lg font-medium mb-4 text-zinc-900 dark:text-zinc-100 mt-2">Attention Required</h3>
                    <AlertsSection />
                </div>
            </div>
        </PageWrapper>
    );
}
