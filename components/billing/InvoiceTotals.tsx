import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay"

interface InvoiceTotalsProps {
    subtotal: number
    discount: number
    discountType: "PERCENTAGE" | "FIXED"
    taxAmount: number
    total: number
    amountPaid: number
}

export function InvoiceTotals({ subtotal, discount, discountType, taxAmount, total, amountPaid }: InvoiceTotalsProps) {
    const balance = total - amountPaid

    return (
        <div className="space-y-3 w-64 ml-auto">
            <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <CurrencyDisplay amount={subtotal} />
            </div>

            {discount > 0 && (
                <div className="flex justify-between text-muted-foreground">
                    <span>Discount {discountType === "PERCENTAGE" ? `(${discount}%)` : ""}</span>
                    <span className="text-destructive">
                        -<CurrencyDisplay amount={discountType === "PERCENTAGE" ? (subtotal * discount / 100) : discount} />
                    </span>
                </div>
            )}

            {taxAmount > 0 && (
                <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <CurrencyDisplay amount={taxAmount} />
                </div>
            )}

            <div className="flex justify-between font-semibold border-t pt-2 text-lg">
                <span>Total</span>
                <CurrencyDisplay amount={total} />
            </div>

            {amountPaid > 0 && (
                <div className="flex justify-between text-green-600 font-medium pt-2">
                    <span>Paid</span>
                    <CurrencyDisplay amount={amountPaid} />
                </div>
            )}

            <div className="flex justify-between font-bold text-destructive text-lg border-t pt-2">
                <span>Balance Due</span>
                <CurrencyDisplay amount={balance > 0 ? balance : 0} />
            </div>
        </div>
    )
}
