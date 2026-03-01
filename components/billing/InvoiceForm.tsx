"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Trash2, Plus } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PatientSearch } from "@/components/patients/PatientSearch"
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay"
import { InvoiceTotals } from "./InvoiceTotals"

const lineItemSchema = z.object({
    procedureId: z.string().min(1, "Procedure is required"),
    description: z.string(),
    quantity: z.coerce.number().min(1),
    unitPrice: z.coerce.number().min(0),
    discount: z.coerce.number().min(0).default(0),
    taxRate: z.coerce.number().min(0).default(0),
    total: z.coerce.number()
})

const invoiceSchema = z.object({
    patientId: z.string().min(1, "Patient is required"),
    items: z.array(lineItemSchema).min(1, "At least one item is required"),
    discountType: z.enum(["PERCENTAGE", "FIXED"]),
    discountValue: z.coerce.number().min(0).default(0),
    notes: z.string().optional()
})

type InvoiceFormValues = z.infer<typeof invoiceSchema>

interface InvoiceFormProps {
    onSubmit: (data: InvoiceFormValues) => void
    isLoading?: boolean
}

// Mock procedures for now
const PROCEDURES = [
    { id: "P1", name: "Composite Filling", price: 1500, defaultTax: 18 },
    { id: "P2", name: "Root Canal Treatment", price: 5000, defaultTax: 18 },
    { id: "P3", name: "Teeth Cleaning", price: 1000, defaultTax: 18 },
    { id: "P4", name: "Consultation", price: 500, defaultTax: 0 }
]

export function InvoiceForm({ onSubmit, isLoading }: InvoiceFormProps) {
    const form = useForm<InvoiceFormValues>({
        resolver: zodResolver(invoiceSchema) as any,
        defaultValues: {
            patientId: "",
            items: [{ procedureId: "", description: "", quantity: 1, unitPrice: 0, discount: 0, taxRate: 0, total: 0 }],
            discountType: "PERCENTAGE",
            discountValue: 0,
            notes: ""
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items"
    })

    // Watch values for live calculation
    const items = form.watch("items")
    const discountType = form.watch("discountType")
    const discountValue = form.watch("discountValue")

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0)
    const itemDiscounts = items.reduce((sum: number, item: any) => sum + item.discount, 0)

    let globalDiscount = 0
    if (discountValue > 0) {
        if (discountType === "PERCENTAGE") {
            globalDiscount = (subtotal - itemDiscounts) * (discountValue / 100)
        } else {
            globalDiscount = discountValue
        }
    }

    const taxAmount = items.reduce((sum: number, item: any) => {
        const itemTotalAfterItemDiscount = (item.quantity * item.unitPrice) - item.discount
        const proportionOfGlobalDiscount = subtotal > 0 ? (itemTotalAfterItemDiscount / subtotal) * globalDiscount : 0
        const taxableAmount = Math.max(0, itemTotalAfterItemDiscount - proportionOfGlobalDiscount)
        return sum + (taxableAmount * (item.taxRate / 100))
    }, 0)

    const total = subtotal - itemDiscounts - globalDiscount + taxAmount

    const handleProcedureChange = (index: number, procedureId: string) => {
        const procedure = PROCEDURES.find((p: any) => p.id === procedureId)
        if (procedure) {
            form.setValue(`items.${index}.description`, procedure.name)
            form.setValue(`items.${index}.unitPrice`, procedure.price)
            form.setValue(`items.${index}.taxRate`, procedure.defaultTax)
            form.setValue(`items.${index}.total`, procedure.price)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8">

                {/* Patient Selection */}
                <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-lg font-medium mb-4">Patient Information</h3>
                    <FormField
                        control={form.control}
                        name="patientId"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Select Patient *</FormLabel>
                                <FormControl>
                                    <PatientSearch
                                        onSelect={(p: any) => form.setValue("patientId", p._id)}
                                        redirectOnSelect={false}
                                    />
                                </FormControl>
                                {field.value && <div className="text-sm text-green-600 mt-2">Patient Selected</div>}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Line Items */}
                <div className="bg-card p-6 rounded-lg border">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Line Items</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="hidden md:grid gap-4 grid-cols-12 text-sm font-medium text-muted-foreground mb-2 px-2">
                            <div className="col-span-3">Procedure</div>
                            <div className="col-span-1">Qty</div>
                            <div className="col-span-2">Price</div>
                            <div className="col-span-2">Tax %</div>
                            <div className="col-span-2">Discount (₹)</div>
                            <div className="col-span-1">Total</div>
                            <div className="col-span-1"></div>
                        </div>

                        {fields.map((field: any, index: number) => (
                            <div key={field.id} className="grid gap-4 grid-cols-1 md:grid-cols-12 items-end border p-4 md:p-2 md:border-0 rounded-md">
                                <div className="col-span-3">
                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.procedureId`}
                                        render={({ field: f }) => (
                                            <FormItem>
                                                <Select
                                                    onValueChange={(val) => {
                                                        f.onChange(val)
                                                        handleProcedureChange(index, val)
                                                    }}
                                                    defaultValue={f.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger><SelectValue placeholder="Select procedure" /></SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {PROCEDURES.map(p => (
                                                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-1">
                                    <FormField control={form.control} name={`items.${index}.quantity`} render={({ field: f }) => (
                                        <FormItem><FormControl><Input type="number" {...f} /></FormControl></FormItem>
                                    )} />
                                </div>

                                <div className="col-span-2">
                                    <FormField control={form.control} name={`items.${index}.unitPrice`} render={({ field: f }) => (
                                        <FormItem><FormControl><Input type="number" {...f} /></FormControl></FormItem>
                                    )} />
                                </div>

                                <div className="col-span-2">
                                    <FormField control={form.control} name={`items.${index}.taxRate`} render={({ field: f }) => (
                                        <FormItem><FormControl><Input type="number" {...f} /></FormControl></FormItem>
                                    )} />
                                </div>

                                <div className="col-span-2">
                                    <FormField control={form.control} name={`items.${index}.discount`} render={({ field: f }) => (
                                        <FormItem><FormControl><Input type="number" {...f} /></FormControl></FormItem>
                                    )} />
                                </div>

                                <div className="col-span-1 py-2 font-medium">
                                    {/* Dynamic item total display */}
                                    <CurrencyDisplay amount={(items[index]?.quantity || 0) * (items[index]?.unitPrice || 0) - (items[index]?.discount || 0)} />
                                </div>

                                <div className="col-span-1 text-right md:text-center">
                                    <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => remove(index)} disabled={fields.length === 1}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => append({ procedureId: "", description: "", quantity: 1, unitPrice: 0, discount: 0, taxRate: 0, total: 0 })}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                    </Button>
                </div>

                {/* Global Discounts & Totals */}
                <div className="bg-card p-6 rounded-lg border grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Discounts & Notes</h3>
                        <div className="flex gap-4">
                            <FormField control={form.control} name="discountType" render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Discount Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                                            <SelectItem value="FIXED">Fixed Amount (₹)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="discountValue" render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Global Discount</FormLabel>
                                    <FormControl><Input type="number" {...field} /></FormControl>
                                </FormItem>
                            )} />
                        </div>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-md">
                        <InvoiceTotals
                            subtotal={subtotal}
                            discount={globalDiscount + itemDiscounts} // Simplifying display for now
                            discountType="FIXED"
                            taxAmount={taxAmount}
                            total={total}
                            amountPaid={0}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                    <Button type="submit" disabled={isLoading}>{isLoading ? "Generating..." : "Generate Invoice"}</Button>
                </div>
            </form>
        </Form>
    )
}
