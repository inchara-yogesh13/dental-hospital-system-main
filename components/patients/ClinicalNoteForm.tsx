"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

const schema = z.object({
    chiefComplaint: z.string().min(2, "Chief complaint is required"),
    clinicalFindings: z.string().optional(),
    diagnosis: z.string().optional(),
    treatmentPlan: z.string().optional(),
    prescriptions: z.array(z.any()).optional(), // Keeping simple for now
    followUpInDays: z.coerce.number().optional().nullable(),
})

type ClinicalNoteValues = z.infer<typeof schema>

interface ClinicalNoteFormProps {
    onSubmit: (data: ClinicalNoteValues) => void
    isLoading?: boolean
}

export function ClinicalNoteForm({ onSubmit, isLoading }: ClinicalNoteFormProps) {
    const form = useForm<ClinicalNoteValues>({
        resolver: zodResolver(schema) as any,
        defaultValues: {
            chiefComplaint: "",
            clinicalFindings: "",
            diagnosis: "",
            treatmentPlan: "",
            prescriptions: [],
            followUpInDays: null,
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="chiefComplaint"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Chief Complaint *</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Patient reports pain in..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="clinicalFindings"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Clinical Findings</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Upon examination..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="diagnosis"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Diagnosis</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Primary diagnosis..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="treatmentPlan"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Treatment Plan</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Planned procedures..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={() => form.reset()}>Clear</Button>
                    <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Save Note"}</Button>
                </div>
            </form>
        </Form>
    )
}
