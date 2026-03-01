"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, CalendarDays, Users, FileText, Package, BarChart3, Settings } from 'lucide-react';

const routes = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', color: 'text-sky-500' },
    { label: 'Appointments', icon: CalendarDays, href: '/appointments', color: 'text-violet-500' },
    { label: 'Patients', icon: Users, href: '/patients', color: 'text-pink-700' },
    { label: 'Billing', icon: FileText, href: '/billing', color: 'text-orange-700' },
    { label: 'Inventory', icon: Package, href: '/inventory', color: 'text-emerald-500' },
    { label: 'Reports', icon: BarChart3, href: '/reports', color: 'text-blue-700' },
    { label: 'Settings', icon: Settings, href: '/settings', color: 'text-gray-500' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-white dark:bg-gray-950 shadow-sm border-r">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <h1 className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                        DentalCloud
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/50 rounded-lg transition',
                                pathname.startsWith(route.href) ? 'text-teal-700 bg-teal-50 dark:text-teal-400 dark:bg-teal-950/50' : 'text-zinc-500 dark:text-zinc-400'
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
