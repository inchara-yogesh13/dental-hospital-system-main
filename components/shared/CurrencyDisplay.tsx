import { formatCurrency } from "@/lib/utils/format";

interface CurrencyDisplayProps {
    amount: number;
    className?: string;
    hideSymbol?: boolean;
}

export function CurrencyDisplay({ amount, className = "", hideSymbol = false }: CurrencyDisplayProps) {
    const formatted = formatCurrency(amount);
    const display = hideSymbol ? formatted.replace('₹', '').trim() : formatted;

    return (
        <span className={className}>
            {display}
        </span>
    );
}
