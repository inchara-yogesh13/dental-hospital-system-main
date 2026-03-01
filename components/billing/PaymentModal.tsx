"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay"

const paymentSchema = z.object({
    amount: z.coerce.number().min(1, "Amount must be greater than 0"),
    method: z.enum(["CASH", "CARD", "UPI", "BANK_TRANSFER"]),
    referenceId: z.string().optional()
})

type PaymentValues = z.infer<typeof paymentSchema>

interface PaymentModalProps {
    invoiceId: string
    balanceDue: number
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}

export function PaymentModal({ invoiceId, balanceDue, open, onOpenChange, onSuccess }: PaymentModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<PaymentValues>({
        resolver: zodResolver(paymentSchema) as any,
        defaultValues: {
            amount: balanceDue,
            method: "UPI",
            referenceId: ""
        }
    })

    const onSubmit = async (data: PaymentValues) => {
        setIsLoading(true)
        try {
            // Mock API trigger
            console.log("Recording payment for invoice", invoiceId, data)
            setTimeout(() => {
                setIsLoading(false)
                onOpenChange(false)
                onSuccess()
            }, 1000)
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Record Payment</DialogTitle>
                    <DialogDescription>
                        Record a payment for this invoice. The current balance due is <CurrencyDisplay amount={balanceDue} className="font-bold text-destructive" />
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Payment Amount (₹)</Label>
                        <Input type="number" max={balanceDue} {...form.register("amount")} />
                        {form.formState.errors.amount && (
                            <p className="text-sm text-destructive">{form.formState.errors.amount.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <Select
                            onValueChange={(val) => form.setValue("method", val as any)}
                            defaultValue={form.getValues("method")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CASH">Cash</SelectItem>
                                <SelectItem value="CARD">Credit/Debit Card</SelectItem>
                                <SelectItem value="UPI">UPI</SelectItem>
                                <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Reference ID (Optional)</Label>
                        <Input placeholder="Transaction ID or Receipt No." {...form.register("referenceId")} />
                    </div>

                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>{isLoading ? "Recording..." : "Record Payment"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
