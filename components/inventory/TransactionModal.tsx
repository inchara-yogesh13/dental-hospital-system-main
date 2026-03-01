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
import { Textarea } from "@/components/ui/textarea"

const transactionSchema = z.object({
    type: z.enum(["IN", "OUT"]),
    quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
    reason: z.string().min(2, "Please provide a reason or note"),
})

type TransactionValues = z.infer<typeof transactionSchema>

interface TransactionModalProps {
    itemId: string
    itemName: string
    currentStock: number
    unit: string
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}

export function TransactionModal({ itemId, itemName, currentStock, unit, open, onOpenChange, onSuccess }: TransactionModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<TransactionValues>({
        resolver: zodResolver(transactionSchema) as any,
        defaultValues: {
            type: "OUT",
            quantity: 1,
            reason: ""
        }
    })

    // Determine if out of stock error
    const qty = form.watch("quantity")
    const type = form.watch("type")
    const isOutOfStock = type === "OUT" && qty > currentStock

    const onSubmit = async (data: TransactionValues) => {
        if (type === "OUT" && data.quantity > currentStock) {
            form.setError("quantity", { message: `Cannot deduct more than current stock (${currentStock})` })
            return
        }

        setIsLoading(true)
        try {
            // Mock API trigger
            console.log("Recording transaction for item", itemId, data)
            setTimeout(() => {
                setIsLoading(false)
                onOpenChange(false)
                onSuccess()
            }, 800)
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Stock: {itemName}</DialogTitle>
                    <DialogDescription>
                        Record new stock arrival or consumption. Current Stock: <span className="font-bold text-foreground">{currentStock} {unit}</span>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Transaction Type</Label>
                            <Select
                                onValueChange={(val) => form.setValue("type", val as any)}
                                defaultValue={form.getValues("type")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="IN or OUT" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="IN" className="text-green-600 font-medium">Stock IN (Arrival)</SelectItem>
                                    <SelectItem value="OUT" className="text-orange-600 font-medium">Stock OUT (Usage)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Quantity ({unit})</Label>
                            <Input type="number" min={1} {...form.register("quantity")} />
                            {form.formState.errors.quantity && (
                                <p className="text-sm text-destructive">{form.formState.errors.quantity.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Notes / Reason</Label>
                        <Textarea
                            placeholder={type === "IN" ? "Delivery from supplier XYZ..." : "Used in patient XYZ procedure..."}
                            {...form.register("reason")}
                        />
                        {form.formState.errors.reason && (
                            <p className="text-sm text-destructive">{form.formState.errors.reason.message}</p>
                        )}
                    </div>

                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>Cancel</Button>
                        <Button type="submit" disabled={isLoading || isOutOfStock}>
                            {isLoading ? "Saving..." : (type === "IN" ? "Add Stock" : "Deduct Stock")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
