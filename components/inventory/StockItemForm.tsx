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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const stockSchema = z.object({
    name: z.string().min(2, "Name is required"),
    category: z.string().min(2, "Category is required"),
    sku: z.string().optional(),
    currentStock: z.coerce.number().min(0, "Stock cannot be negative"),
    minimumStockLevel: z.coerce.number().min(0, "Minimum level required"),
    unit: z.string().min(1, "Unit of measurement is required (e.g., box, pieces)"),
    pricePerUnit: z.coerce.number().min(0).optional()
})

type StockFormValues = z.infer<typeof stockSchema>

interface StockItemFormProps {
    initialData?: Partial<StockFormValues>
    onSubmit: (data: StockFormValues) => void
    isLoading?: boolean
}

export function StockItemForm({ initialData, onSubmit, isLoading }: StockItemFormProps) {
    const form = useForm<StockFormValues>({
        resolver: zodResolver(stockSchema) as any,
        defaultValues: {
            name: initialData?.name || "",
            category: initialData?.category || "",
            sku: initialData?.sku || "",
            currentStock: initialData?.currentStock || 0,
            minimumStockLevel: initialData?.minimumStockLevel || 10,
            unit: initialData?.unit || "pieces",
            pricePerUnit: initialData?.pricePerUnit || 0
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Item Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="category" render={({ field }) => (
                        <FormItem><FormLabel>Category *</FormLabel><FormControl><Input placeholder="e.g., Consumables" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="sku" render={({ field }) => (
                        <FormItem><FormLabel>SKU / Reorder ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="currentStock" render={({ field }) => (
                        <FormItem><FormLabel>Current Quantity *</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="minimumStockLevel" render={({ field }) => (
                        <FormItem><FormLabel>Reorder Alert Level *</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="unit" render={({ field }) => (
                        <FormItem><FormLabel>Unit (box, pack, etc) *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="pricePerUnit" render={({ field }) => (
                        <FormItem><FormLabel>Est. Cost Per Unit</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Saving..." : "Save Item"}</Button>
            </form>
        </Form>
    )
}
