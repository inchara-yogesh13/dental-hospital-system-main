"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, Stethoscope, BriefcaseMedical } from "lucide-react";
import { ClinicProfileSettings } from "@/components/settings/ClinicProfileSettings";
import { TeamSettings } from "@/components/settings/TeamSettings";
import { ProcedureCatalog } from "@/components/settings/ProcedureCatalog";

export default function SettingsPage() {
    return (
        <PageWrapper
            title="Settings"
            subtitle="Configure your clinic details, manage team members, and update procedure catalogs."
        >
            <Tabs defaultValue="clinic" className="w-full flex-1 flex flex-col min-h-0">
                <div className="flex border-b mb-6 overflow-x-auto hide-scrollbar">
                    <TabsList className="bg-transparent p-0 h-auto justify-start border-none">
                        <TabsTrigger
                            value="clinic"
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:shadow-none rounded-none py-3 px-6 text-muted-foreground font-medium"
                        >
                            <Building2 className="w-4 h-4 mr-2" /> Clinic Profile
                        </TabsTrigger>
                        <TabsTrigger
                            value="team"
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:shadow-none rounded-none py-3 px-6 text-muted-foreground font-medium"
                        >
                            <Users className="w-4 h-4 mr-2" /> Team & Access
                        </TabsTrigger>
                        <TabsTrigger
                            value="procedures"
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:shadow-none rounded-none py-3 px-6 text-muted-foreground font-medium"
                        >
                            <Stethoscope className="w-4 h-4 mr-2" /> Procedure Catalog
                        </TabsTrigger>
                        <TabsTrigger
                            value="chairs"
                            className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:text-teal-700 data-[state=active]:shadow-none rounded-none py-3 px-6 text-muted-foreground font-medium"
                        >
                            <BriefcaseMedical className="w-4 h-4 mr-2" /> Chairs & Facilities
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="clinic" className="mt-0 outline-none flex-1 min-h-0 overflow-y-auto">
                    <ClinicProfileSettings />
                </TabsContent>
                <TabsContent value="team" className="mt-0 outline-none flex-1 min-h-0 overflow-y-auto">
                    <TeamSettings />
                </TabsContent>
                <TabsContent value="procedures" className="mt-0 outline-none flex-1 min-h-0 overflow-y-auto">
                    <ProcedureCatalog />
                </TabsContent>
                <TabsContent value="chairs" className="mt-0 outline-none flex-1 min-h-0 overflow-y-auto">
                    <div className="p-12 text-center border-2 border-dashed rounded-xl m-4 text-muted-foreground">
                        Manage Dental Chairs and scheduling configurations here.
                    </div>
                </TabsContent>

            </Tabs>
        </PageWrapper>
    );
}
