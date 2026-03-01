"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ReactNode } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface Column<T> {
    header: string
    accessorKey?: keyof T
    cell?: (item: T) => ReactNode
}

interface DataTableProps<T> {
    columns: Column<T>[]
    data: T[]
    isLoading?: boolean
    emptyMessage?: string
}

export function DataTable<T extends { id?: string | number; _id?: string }>({
    columns,
    data,
    isLoading,
    emptyMessage = "No results found"
}: DataTableProps<T>) {

    if (isLoading) {
        return (
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col, i) => (
                                <TableHead key={i}>{col.header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                {columns.map((_, j) => (
                                    <TableCell key={j}><Skeleton className="h-4 w-[100px]" /></TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col, i) => (
                            <TableHead key={i}>{col.header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, rowIndex) => {
                            const rowKey = String(item.id || item._id || rowIndex)
                            return (
                                <TableRow key={rowKey}>
                                    {columns.map((col, colIndex) => (
                                        <TableCell key={colIndex}>
                                            {col.cell ? col.cell(item) : col.accessorKey ? String(item[col.accessorKey]) : null}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
