"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TagInput } from "@/components/shared/TagInput"

const patientFormSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters."),
    phone: z.string().min(10, "Valid phone number required."),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    dateOfBirth: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    bloodGroup: z.string().optional(),

    address: z.object({
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional()
    }).optional(),

    medicalHistory: z.object({
        allergies: z.array(z.string()).default([]),
        conditions: z.string().optional(),
        currentMedications: z.string().optional()
    }).optional(),

    preferences: z.object({
        whatsappOptIn: z.boolean().default(true)
    }).optional()
})

type PatientFormValues = z.infer<typeof patientFormSchema>

interface PatientFormProps {
    initialData?: Partial<PatientFormValues>
    onSubmit: (data: PatientFormValues) => void
    isLoading?: boolean
}

export function PatientForm({ initialData, onSubmit, isLoading }: PatientFormProps) {
    const form = useForm<PatientFormValues>({
        resolver: zodResolver(patientFormSchema) as any,
        defaultValues: {
            fullName: initialData?.fullName || "",
            phone: initialData?.phone || "",
            email: initialData?.email || "",
            gender: initialData?.gender || "OTHER",
            bloodGroup: initialData?.bloodGroup || "",
            address: {
                street: initialData?.address?.street || "",
                city: initialData?.address?.city || "",
                state: initialData?.address?.state || "",
                zipCode: initialData?.address?.zipCode || ""
            },
            medicalHistory: {
                allergies: initialData?.medicalHistory?.allergies || [],
                conditions: initialData?.medicalHistory?.conditions || "",
                currentMedications: initialData?.medicalHistory?.currentMedications || ""
            },
            preferences: {
                whatsappOptIn: initialData?.preferences?.whatsappOptIn ?? true
            }
        },
    })

    function handleSubmit(data: PatientFormValues) {
        onSubmit(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">

                    {/* Basic Info */}
                    <Card>
                        <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name *</FormLabel>
                                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number *</FormLabel>
                                            <FormControl><Input placeholder="+91 9876543210" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl><Input placeholder="john@example.com" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gender</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="MALE">Male</SelectItem>
                                                    <SelectItem value="FEMALE">Female</SelectItem>
                                                    <SelectItem value="OTHER">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bloodGroup"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Blood Group</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="A+">A+</SelectItem>
                                                    <SelectItem value="A-">A-</SelectItem>
                                                    <SelectItem value="B+">B+</SelectItem>
                                                    <SelectItem value="O+">O+</SelectItem>
                                                    <SelectItem value="AB+">AB+</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact & Preferences */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Address</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="address.street"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl><Input placeholder="Street Address" {...field} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="address.city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl><Input placeholder="City" {...field} /></FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address.zipCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl><Input placeholder="Pin Code" {...field} /></FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="preferences.whatsappOptIn"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">WhatsApp Notifications</FormLabel>
                                                <FormDescription>
                                                    Receive appointment reminders via WhatsApp.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Medical History */}
                <Card>
                    <CardHeader><CardTitle>Medical History</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="medicalHistory.allergies"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Allergies</FormLabel>
                                    <FormControl>
                                        <TagInput
                                            tags={field.value ?? []}
                                            setTags={field.onChange}
                                            placeholder="Type allergy and press enter..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="medicalHistory.conditions"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pre-existing Conditions</FormLabel>
                                        <FormControl><Textarea className="resize-none" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="medicalHistory.currentMedications"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Medications</FormLabel>
                                        <FormControl><Textarea className="resize-none" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                    <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Save Patient"}</Button>
                </div>
            </form>
        </Form>
    )
}
