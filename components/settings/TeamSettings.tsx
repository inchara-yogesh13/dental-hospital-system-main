"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, UserCog, Trash2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TeamSettings() {
    const team = [
        { id: '1', name: 'Dr. Priya Sharma', role: 'ADMIN', title: 'Chief Dentist', email: 'priya@dentalcloud.com' },
        { id: '2', name: 'Dr. Rajan Kumar', role: 'DOCTOR', title: 'Orthodontist', email: 'rajan@dentalcloud.com' },
        { id: '3', name: 'Alok Singh', role: 'RECEPTIONIST', title: 'Front Desk', email: 'alok@dentalcloud.com' },
    ];

    return (
        <div className="space-y-6 pt-4 max-w-5xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-semibold">Team Members</h3>
                    <p className="text-sm text-muted-foreground mt-1">Manage access for doctors and staff.</p>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Member
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {team.map(member => (
                    <Card key={member.id} className="shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex justify-between items-start">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border">
                                        <UserCog className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{member.name}</h4>
                                        <p className="text-sm text-muted-foreground">{member.title}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{member.email}</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className={
                                    member.role === 'ADMIN' ? "text-purple-600 border-purple-200 bg-purple-50" :
                                        member.role === 'DOCTOR' ? "text-teal-600 border-teal-200 bg-teal-50" :
                                            "text-blue-600 border-blue-200 bg-blue-50"
                                }>
                                    {member.role}
                                </Badge>
                            </div>

                            <div className="mt-6 flex justify-end gap-2 border-t pt-4">
                                <Button variant="ghost" size="sm" className="h-8">
                                    <Edit className="w-4 h-4 mr-2" /> Edit
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                                    <Trash2 className="w-4 h-4 mr-2" /> Remove
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
