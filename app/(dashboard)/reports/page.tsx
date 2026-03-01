"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RevenueChart } from "@/components/reports/RevenueChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils/format";
import { Activity, Download, Users, BriefcaseMedical } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
    // MOCK DATA
    const treatmentData = [
        { name: 'Root Canal', count: 45 },
        { name: 'Extraction', count: 30 },
        { name: 'Implants', count: 12 },
        { name: 'Scaling', count: 85 },
        { name: 'Orthodontics', count: 20 },
    ];

    const appointmentStatusData = [
        { name: 'Showed Up', value: 85, color: '#0d9488' }, // teal-600
        { name: 'Cancelled', value: 10, color: '#f43f5e' }, // rose-500
        { name: 'No Show', value: 5, color: '#f59e0b' }, // amber-500
    ];

    const summaryStats = [
        { title: 'Total Revenue', value: formatCurrency(125000), trend: '+12%', icon: Activity },
        { title: 'New Patients', value: '45', trend: '+5%', icon: Users },
        { title: 'Treatments Done', value: '192', trend: '+8%', icon: BriefcaseMedical },
    ];

    return (
        <PageWrapper
            title="Reports & Analytics"
            subtitle="Comprehensive view of clinic performance, financials, and patient demographics."
            action={
                <div className="flex gap-2">
                    <Select defaultValue="this_month">
                        <SelectTrigger className="w-[140px] bg-white dark:bg-gray-950">
                            <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="this_week">This Week</SelectItem>
                            <SelectItem value="this_month">This Month</SelectItem>
                            <SelectItem value="this_year">This Year</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="hidden sm:flex">
                        <Download className="w-4 h-4 mr-2" /> Export Data
                    </Button>
                </div>
            }
        >
            <div className="space-y-6 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {summaryStats.map((stat, i) => (
                        <Card key={i} className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                                <stat.icon className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{stat.trend} from last period</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                    {/* Revenue Chart */}
                    <Card className="shadow-sm xl:col-span-2">
                        <CardHeader>
                            <CardTitle>Revenue Analytics</CardTitle>
                            <CardDescription>Daily revenue breakdown for the selected period.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <RevenueChart />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Appointment Status */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Appointment Status</CardTitle>
                            <CardDescription>Attendance and cancellation rates.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={appointmentStatusData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {appointmentStatusData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value, name) => [`${value}%`, name]}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm xl:col-span-3">
                        <CardHeader>
                            <CardTitle>Treatments Performed</CardTitle>
                            <CardDescription>Breakdown of procedures and treatments.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={treatmentData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} />
                                        <Tooltip
                                            cursor={{ fill: '#f3f4f6' }}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Bar dataKey="count" fill="#0d9488" radius={[4, 4, 0, 0]} maxBarSize={60} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </PageWrapper>
    );
}
