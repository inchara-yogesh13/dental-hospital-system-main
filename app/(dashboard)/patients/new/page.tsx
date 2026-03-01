"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";

const formSchema = z.object({
    // Section 1
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Valid phone number required").max(15),
    email: z.string().email().optional().or(z.literal('')),
    dob: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    // Section 2
    street: z.string().optional(),
    city: z.string().optional(),
    pincode: z.string().optional(),
    // Section 3
    allergies: z.string().optional(),
    medicalHistory: z.string().optional(),
    currentMedications: z.string().optional(),
    // Section 4
    emergencyName: z.string().optional(),
    emergencyPhone: z.string().optional(),
    emergencyRelation: z.string().optional(),
    // Section 5
    whatsappOptIn: z.boolean(),
    referralSource: z.string().optional(),
    abhaId: z.string().optional(),
    notes: z.string().optional(),
});

export default function NewPatientPage() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            whatsappOptIn: true,
            gender: "UNSPECIFIED",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // API Call goes here: POST /patients
        console.log("Submitting:", values);
        toast.success("Patient registered successfully!");
        router.push("/patients/123"); // Mock ID
    };

    return (
        <PageWrapper
            title="Register Patient"
            subtitle="Enter patient details to create a new profile."
            action={
                <Button variant="outline" asChild>
                    <Link href="/patients"><ChevronLeft className="mr-2 h-4 w-4" /> Back to Directory</Link>
                </Button>
            }
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl pb-10">

                    {/* SECTION 1: BASIC INFO */}
                    <Card className="shadow-sm">
                        <CardHeader className="bg-slate-50 dark:bg-gray-900 border-b pb-4 rounded-t-xl">
                            <CardTitle className="text-lg">1. Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem><FormLabel>Phone Number *</FormLabel><FormControl><Input placeholder="9876543210" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="john@example.com" type="email" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="dob" render={({ field }) => (
                                <FormItem><FormLabel>Date of Birth</FormLabel>
                                    <div className="flex gap-4 items-center">
                                        <FormControl><Input type="date" className="flex-1" {...field} /></FormControl>
                                        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap bg-slate-100 dark:bg-gray-800 px-3 py-2 border rounded-md">
                                            {field.value ? `${dayjs().diff(dayjs(field.value), 'year')} yrs` : "Age"}
                                        </span>
                                    </div>
                                    <FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="gender" render={({ field }) => (
                                <FormItem><FormLabel>Gender</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="MALE">Male</SelectItem>
                                            <SelectItem value="FEMALE">Female</SelectItem>
                                            <SelectItem value="OTHER">Other</SelectItem>
                                            <SelectItem value="UNSPECIFIED">Prefer not to say</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="bloodGroup" render={({ field }) => (
                                <FormItem><FormLabel>Blood Group</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select group" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage /></FormItem>
                            )} />
                        </CardContent>
                    </Card>

                    {/* SECTION 2: ADDRESS */}
                    <Card className="shadow-sm">
                        <CardHeader className="bg-slate-50 dark:bg-gray-900 border-b pb-4 rounded-t-xl">
                            <CardTitle className="text-lg">2. Contact Address</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                            <div className="md:col-span-2">
                                <FormField control={form.control} name="street" render={({ field }) => (
                                    <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="Flat no, Building, Street..." {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>
                            <FormField control={form.control} name="city" render={({ field }) => (
                                <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Mumbai" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="pincode" render={({ field }) => (
                                <FormItem><FormLabel>PIN Code</FormLabel><FormControl><Input placeholder="400001" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </CardContent>
                    </Card>

                    {/* SECTION 3: MEDICAL HISTORY */}
                    <Card className="shadow-sm">
                        <CardHeader className="bg-slate-50 dark:bg-gray-900 border-b pb-4 rounded-t-xl">
                            <CardTitle className="text-lg">3. Medical History</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-6 pt-6">
                            <FormField control={form.control} name="allergies" render={({ field }) => (
                                <FormItem><FormLabel>Allergies</FormLabel>
                                    <FormControl><Input placeholder="E.g. Penicillin, Peanuts (comma separated)" {...field} /></FormControl>
                                    <FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="medicalHistory" render={({ field }) => (
                                <FormItem><FormLabel>Past Medical History</FormLabel>
                                    <FormControl><Textarea className="resize-none" placeholder="Diabetes, Hypertension, etc." {...field} /></FormControl>
                                    <FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="currentMedications" render={({ field }) => (
                                <FormItem><FormLabel>Current Medications</FormLabel>
                                    <FormControl><Textarea className="resize-none" placeholder="List any ongoing medications..." {...field} /></FormControl>
                                    <FormMessage /></FormItem>
                            )} />
                        </CardContent>
                    </Card>

                    {/* SECTION 4: EMERGENCY CONTACT */}
                    <Card className="shadow-sm">
                        <CardHeader className="bg-slate-50 dark:bg-gray-900 border-b pb-4 rounded-t-xl">
                            <CardTitle className="text-lg">4. Emergency Contact</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                            <FormField control={form.control} name="emergencyName" render={({ field }) => (
                                <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Relative's Name" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="emergencyPhone" render={({ field }) => (
                                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="Emergency Number" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="emergencyRelation" render={({ field }) => (
                                <FormItem><FormLabel>Relation</FormLabel><FormControl><Input placeholder="E.g. Spouse, Parent" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </CardContent>
                    </Card>

                    {/* SECTION 5: PREFERENCES */}
                    <Card className="shadow-sm border-teal-100 dark:border-teal-900">
                        <CardHeader className="bg-teal-50 dark:bg-teal-950/20 border-b border-teal-100 dark:border-teal-900 pb-4 rounded-t-xl">
                            <CardTitle className="text-lg text-teal-800 dark:text-teal-400">5. Preferences & Other Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 bg-slate-50/50 dark:bg-gray-950/50 rounded-b-xl">
                            <div className="md:col-span-2">
                                <FormField control={form.control} name="whatsappOptIn" render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm bg-white dark:bg-gray-900">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base font-medium">WhatsApp Notifications</FormLabel>
                                            <FormDescription>Send appointment reminders and automated communication via WhatsApp.</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            </div>

                            <FormField control={form.control} name="referralSource" render={({ field }) => (
                                <FormItem><FormLabel>Referral Source</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="How did they find us?" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="GOOGLE">Google Search</SelectItem>
                                            <SelectItem value="PRACTO">Practo / JustDial</SelectItem>
                                            <SelectItem value="WORD_OF_MOUTH">Friend / Family</SelectItem>
                                            <SelectItem value="CLINIC_BOARD">Walk-in</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage /></FormItem>
                            )} />

                            <FormField control={form.control} name="abhaId" render={({ field }) => (
                                <FormItem><FormLabel>ABHA ID (Ayushman Bharat)</FormLabel><FormControl><Input placeholder="14-digit ABHA Number" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />

                            <div className="md:col-span-2">
                                <FormField control={form.control} name="notes" render={({ field }) => (
                                    <FormItem><FormLabel>Internal Notes</FormLabel>
                                        <FormControl><Textarea className="resize-none" placeholder="Any internal remarks for staff..." {...field} /></FormControl>
                                        <FormMessage /></FormItem>
                                )} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4 pt-4 pb-12">
                        <Button type="button" variant="outline" asChild><Link href="/patients">Cancel</Link></Button>
                        <Button type="submit" size="lg" className="bg-teal-600 hover:bg-teal-700 text-white min-w-[200px]">Register Patient</Button>
                    </div>
                </form>
            </Form>
        </PageWrapper>
    );
}
