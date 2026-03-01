"use client"

import { Badge } from "@/components/ui/badge"

const statusConfig: Record<string, { label: string; className: string }> = {
    DRAFT: { label: "Draft", className: "bg-slate-100 text-slate-800 hover:bg-slate-100 border-slate-200" },
    ISSUED: { label: "Issued", className: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200" },
    PARTIAL: { label: "Partial", className: "bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200" },
    PAID: { label: "Paid", className: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200" },
    CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200" }
}

export function InvoiceStatusBadge({ status }: { status: string }) {
    const config = statusConfig[status] || { label: status, className: "bg-gray-100 text-gray-800" }

    return (
        <Badge variant="outline" className={`font-medium ${config.className}`}>
            {config.label}
        </Badge>
    )
}
