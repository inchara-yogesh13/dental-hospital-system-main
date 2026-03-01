"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import { useEffect } from "react";

const schema = z.object({
    patientId: z.string().min(1, "Patient is required"),
    doctorId: z.string().min(1, "Doctor is required"),
    chairId: z.string().min(1, "Chair is required"),
    date: z.date(),
    startTime: z.string().min(1, "Time slot is required"),
    type: z.string().min(1, "Type is required"),
    procedures: z.string().optional(),
    chiefComplaint: z.string().optional(),
    notes: z.string().optional(),
});

export function NewAppointmentSheet({
    open,
    onOpenChange,
    initialDate,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialDate?: Date;
}) {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            date: initialDate || new Date(),
            type: "CONSULTATION",
        },
    });

    useEffect(() => {
        if (initialDate && open) {
            form.setValue('date', initialDate);
            // Try mapping start time to slot if it exists
            const h = String(initialDate.getHours()).padStart(2, '0');
            const m = String(initialDate.getMinutes()).padStart(2, '0');
            form.setValue('startTime', `${h}:${m}`);
        }
    }, [initialDate, open, form]);

    const onSubmit = async (values: z.infer<typeof schema>) => {
        toast.success("Appointment created successfully!");
        console.log("Submit:", values);
        onOpenChange(false);
        form.reset();
    };

    const slots = ["09:00", "09:30", "10:00", "11:30", "14:00", "15:30"];

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto bg-white dark:bg-gray-950 p-6">
                <SheetHeader className="mb-6">
                    <SheetTitle>Book Appointment</SheetTitle>
                    <SheetDescription>Schedule a new visit for a patient.</SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="patientId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Patient</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Search patient name or phone..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="doctorId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Doctor</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Select doctor" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="doc_1">Dr. Priya Sharma</SelectItem>
                                                <SelectItem value="doc_2">Dr. Rajan Kumar</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="chairId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Chair</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Select chair" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="CHAIR-1">CHAIR-1</SelectItem>
                                                <SelectItem value="CHAIR-2">CHAIR-2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="startTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Available Slots</FormLabel>
                                    <FormControl>
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {slots.map(slot => (
                                                <Badge
                                                    key={slot}
                                                    variant={field.value === slot ? "default" : "outline"}
                                                    className={cn(
                                                        "cursor-pointer px-4 py-1.5 text-sm font-medium transition-colors",
                                                        field.value === slot ? "bg-teal-600 hover:bg-teal-700 text-white" : "hover:bg-slate-100 dark:hover:bg-gray-800"
                                                    )}
                                                    onClick={() => field.onChange(slot)}
                                                >
                                                    {slot}
                                                </Badge>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="chiefComplaint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chief Complaint</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Reason for visit..." className="resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-6 flex gap-3 justify-end">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                            <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">Confirm Booking</Button>
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
