import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full relative overflow-hidden">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-40 bg-gray-900 border-r dark:border-gray-800">
                <Sidebar />
            </div>
            <main className="md:pl-72 h-full bg-slate-50 dark:bg-black transition-all">
                <Header />
                <div className="h-[calc(100vh-72px)] overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
