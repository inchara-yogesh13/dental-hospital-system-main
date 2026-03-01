"use client"

import { DataTable } from "@/components/shared/DataTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/lib/utils/format"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface PendingPayment {
    _id: string
    invoiceNumber: string
    patientName: string
    date: string
    dueDate: string
    balanceDue: number
    status: string
}

interface PendingPaymentsTableProps {
    data: PendingPayment[]
    isLoading?: boolean
}

export function PendingPaymentsTable({ data, isLoading }: PendingPaymentsTableProps) {

    const columns = [
        {
            header: "Invoice",
            accessorKey: "invoiceNumber" as keyof PendingPayment,
            cell: (item: PendingPayment) => (
                <span className="font-medium text-primary">{item.invoiceNumber}</span>
            )
        },
        {
            header: "Patient",
            accessorKey: "patientName" as keyof PendingPayment,
        },
        {
            header: "Due Date",
            accessorKey: "dueDate" as keyof PendingPayment,
            cell: (item: PendingPayment) => {
                const isOverdue = new Date(item.dueDate) < new Date()
                return (
                    <span className={isOverdue ? "text-destructive font-medium" : ""}>
                        {formatDate(item.dueDate)}
                    </span>
                )
            }
        },
        {
            header: "Balance",
            accessorKey: "balanceDue" as keyof PendingPayment,
            cell: (item: PendingPayment) => (
                <span className="font-medium text-destructive">{formatCurrency(item.balanceDue)}</span>
            )
        },
        {
            header: "Status",
            accessorKey: "status" as keyof PendingPayment,
            cell: (item: PendingPayment) => {
                const isOverdue = new Date(item.dueDate) < new Date()
                return (
                    <Badge variant={isOverdue ? "destructive" : "secondary"}>
                        {isOverdue ? "Overdue" : item.status}
                    </Badge>
                )
            }
        },
        {
            header: "Action",
            cell: (item: PendingPayment) => (
                <Button variant="ghost" size="sm" asChild>
                    <Link href={`/billing/${item._id}`}>
                        View <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Link>
                </Button>
            )
        }
    ]

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Pending Payments</h3>
                <Button variant="outline" size="sm" asChild>
                    <Link href="/billing?status=PARTIAL,ISSUED">View All</Link>
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={data}
                isLoading={isLoading}
                emptyMessage="No pending payments found."
            />
        </div>
    )
}
