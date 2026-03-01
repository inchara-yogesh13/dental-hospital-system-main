"use client";

import { PageWrapper } from '@/components/layout/PageWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientProfileHeader } from '@/components/patients/PatientProfileHeader';
import { PatientHistory } from '@/components/patients/PatientHistory';
import { PatientClinicalNotes } from '@/components/patients/PatientClinicalNotes';
import { PatientDocuments } from '@/components/patients/PatientDocuments';
import { PatientBillingSummary } from '@/components/patients/PatientBillingSummary';
import { use } from 'react';

// Wrap Page to properly resolve Next.js 14 dynamic params if needed, or simply mock for now.
export default function PatientProfilePage({ params }: { params: { id: string } }) {
    // Use React.use() wrapper for params in App Router if async route, 
    // but this is standard sync so it's fine.

    // MOCK DATA for the patient
    const patient = {
        id: params.id,
        pid: "P-1001",
        name: "Rahul Sharma",
        phone: "+91 98765 43210",
        age: 34,
        gender: "MALE",
        bloodGroup: "O+",
        allergies: ["Penicillin"],
        medicalHistory: "Type 2 Diabetes (controlled). Currently taking Metformin 500mg.",
        lastVisit: new Date(Date.now() - 86400000 * 5).toISOString(),
        totalVisits: 5,
        pendingBalance: 1500,
        upcomingAppointment: new Date(Date.now() + 86400000 * 3).toISOString()
    };

    return (
        <PageWrapper title="Patient Profile" subtitle="Detailed patient records, clinical notes, and billing history.">
            <div className="flex flex-col space-y-6">

                {/* TAB 1 (Overview) is technically extracted to this header component for now, 
            but the prompt asks for 5 tabs. We will place the overview inside Tab 1, or keep the header fixed.
            The prompt: "Patient Profile with 5 tabs: Tab 1 - Overview: Header card... Stats row..."
            So the header belongs INSIDE Tab 1, or above the tabs? Standard UI places header ABOVE tabs, 
            and Tab 1 contains deeper overview. Let's strictly follow the prompt and put it in Tab 1, 
            or place it above and use tabs for sub-sections.
            I will place it in Tab 1 to match the prompt numbering exactly. */}

                <Tabs defaultValue="overview" className="w-full flex-1">
                    <TabsList className="bg-white dark:bg-gray-950 border shadow-sm w-full justify-start h-auto p-1 overflow-x-auto flex-nowrap">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 py-2 px-4 rounded-md">Overview</TabsTrigger>
                        <TabsTrigger value="history" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 py-2 px-4 rounded-md">Visit History</TabsTrigger>
                        <TabsTrigger value="notes" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 py-2 px-4 rounded-md">Clinical Notes</TabsTrigger>
                        <TabsTrigger value="documents" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 py-2 px-4 rounded-md">Documents</TabsTrigger>
                        <TabsTrigger value="billing" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700 py-2 px-4 rounded-md">Billing</TabsTrigger>
                    </TabsList>

                    <div className="mt-6">
                        <TabsContent value="overview" className="outline-none m-0">
                            <PatientProfileHeader patient={patient} />
                        </TabsContent>

                        <TabsContent value="history" className="outline-none m-0 pt-4">
                            <PatientHistory patientId={patient.id} />
                        </TabsContent>

                        <TabsContent value="notes" className="outline-none m-0 pt-4">
                            <PatientClinicalNotes patientId={patient.id} />
                        </TabsContent>

                        <TabsContent value="documents" className="outline-none m-0 pt-4">
                            <PatientDocuments patientId={patient.id} />
                        </TabsContent>

                        <TabsContent value="billing" className="outline-none m-0 pt-4">
                            <PatientBillingSummary patientId={patient.id} />
                        </TabsContent>
                    </div>
                </Tabs>

            </div>
        </PageWrapper>
    );
}
