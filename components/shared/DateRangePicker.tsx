"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps {
    className?: string
    from: Date | undefined
    to: Date | undefined
    onSelect: (range: { from: Date | undefined; to?: Date | undefined }) => void
}

export function DateRangePicker({
    className,
    from,
    to,
    onSelect
}: DateRangePickerProps) {

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !from && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {from ? (
                            to ? (
                                <>
                                    {format(from, "LLL dd, y")} -{" "}
                                    {format(to, "LLL dd, y")}
                                </>
                            ) : (
                                format(from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={from}
                        selected={{ from, to }}
                        onSelect={(range) => {
                            if (range) {
                                onSelect({ from: range.from, to: range.to })
                            } else {
                                onSelect({ from: undefined, to: undefined })
                            }
                        }}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
