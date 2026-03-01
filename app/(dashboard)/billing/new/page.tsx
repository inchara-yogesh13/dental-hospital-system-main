"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Plus, Trash2, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils/format";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function NewInvoicePage() {
    const [items, setItems] = useState([
        { id: '1', description: 'Consultation', qty: 1, unitPrice: 500, discountPercent: 0, taxPercent: 0 },
    ]);
    const [date, setDate] = useState<Date>(new Date());

    const addItem = () => {
        setItems([...items, { id: Date.now().toString(), description: '', qty: 1, unitPrice: 0, discountPercent: 0, taxPercent: 0 }]);
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const updateItem = (id: string, field: string, value: any) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    // Calculations
    const subtotal = items.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
    const totalDiscount = items.reduce((acc, item) => acc + (item.qty * item.unitPrice * (item.discountPercent / 100)), 0);
    const totalTax = items.reduce((acc, item) => {
        const discountedPrice = item.unitPrice - (item.unitPrice * (item.discountPercent / 100));
        return acc + (item.qty * discountedPrice * (item.taxPercent / 100));
    }, 0);
    const grandTotal = subtotal - totalDiscount + totalTax;

    return (
        <PageWrapper
            title="Create Invoice"
            subtitle="Draft a new invoice for treatment or consultation."
            headerContent={
                <div className="flex items-center gap-4 mb-4">
                    <Button variant="ghost" size="icon" asChild className="shrink-0 -ml-2">
                        <Link href="/billing"><ChevronLeft className="w-5 h-5" /></Link>
                    </Button>
                </div>
            }
        >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start pb-8">

                {/* Left Column - Form */}
                <div className="xl:col-span-2 space-y-6">
                    <Card className="shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">Invoice Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Patient <span className="text-red-500">*</span></Label>
                                    <Input placeholder="Search patient..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Doctor <span className="text-red-500">*</span></Label>
                                    <Select defaultValue="dr_priya">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select doctor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="dr_priya">Dr. Priya Sharma</SelectItem>
                                            <SelectItem value="dr_rajan">Dr. Rajan Kumar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Linked Appointment (Optional)</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select recent appointment" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="app_1">Today, 09:00 AM - Consultation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Invoice Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="pb-4 flex flex-row items-center justify-between">
                            <CardTitle className="text-lg">Line Items</CardTitle>
                            <Button size="sm" variant="outline" onClick={addItem} className="text-teal-600 border-teal-200 hover:bg-teal-50">
                                <Plus className="w-4 h-4 mr-1" /> Add Item
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Desktop Table Header */}
                                <div className="hidden md:grid grid-cols-12 gap-3 mb-2 text-xs font-medium text-muted-foreground uppercase px-2">
                                    <div className="col-span-5">Description</div>
                                    <div className="col-span-2">Price (₹)</div>
                                    <div className="col-span-1">Qty</div>
                                    <div className="col-span-1">Disc %</div>
                                    <div className="col-span-1">Tax %</div>
                                    <div className="col-span-2 text-right pr-6">Total</div>
                                </div>

                                {/* Line Items */}
                                <div className="space-y-3">
                                    {items.map((item) => (
                                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start md:items-center bg-slate-50 dark:bg-gray-900/50 p-3 md:p-2 rounded-lg border dark:border-gray-800 transition-all hover:border-slate-300 dark:hover:border-gray-700">

                                            <div className="md:col-span-5 space-y-1 md:space-y-0">
                                                <Label className="md:hidden text-xs text-muted-foreground">Description</Label>
                                                <Input
                                                    placeholder="Treatment or item name"
                                                    value={item.description}
                                                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                                    className="bg-white dark:bg-gray-950"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 col-span-1 md:col-span-5 gap-3">
                                                <div className="space-y-1 md:space-y-0 md:col-span-2">
                                                    <Label className="md:hidden text-xs text-muted-foreground">Unit Price</Label>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        value={item.unitPrice || ''}
                                                        onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                                                        className="bg-white dark:bg-gray-950"
                                                    />
                                                </div>
                                                <div className="space-y-1 md:space-y-0">
                                                    <Label className="md:hidden text-xs text-muted-foreground">Qty</Label>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        value={item.qty}
                                                        onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 1)}
                                                        className="bg-white dark:bg-gray-950"
                                                    />
                                                </div>
                                                <div className="space-y-1 md:space-y-0 hidden md:block">
                                                    <Input
                                                        type="number"
                                                        min="0" max="100"
                                                        value={item.discountPercent || ''}
                                                        onChange={(e) => updateItem(item.id, 'discountPercent', parseFloat(e.target.value) || 0)}
                                                        className="bg-white dark:bg-gray-950"
                                                    />
                                                </div>
                                            </div>

                                            <div className="md:col-span-1 hidden md:block">
                                                <Input
                                                    type="number"
                                                    min="0" max="100"
                                                    value={item.taxPercent || ''}
                                                    onChange={(e) => updateItem(item.id, 'taxPercent', parseFloat(e.target.value) || 0)}
                                                    className="bg-white dark:bg-gray-950"
                                                />
                                            </div>

                                            <div className="md:col-span-1 flex items-center justify-between md:justify-end gap-2 pr-1">
                                                <div className="md:hidden flex gap-2 w-full">
                                                    <div className="flex-1">
                                                        <Label className="text-xs text-muted-foreground">Disc %</Label>
                                                        <Input type="number" value={item.discountPercent || ''} onChange={(e) => updateItem(item.id, 'discountPercent', parseFloat(e.target.value) || 0)} className="bg-white dark:bg-gray-950 h-8 mt-1" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <Label className="text-xs text-muted-foreground">Tax %</Label>
                                                        <Input type="number" value={item.taxPercent || ''} onChange={(e) => updateItem(item.id, 'taxPercent', parseFloat(e.target.value) || 0)} className="bg-white dark:bg-gray-950 h-8 mt-1" />
                                                    </div>
                                                </div>

                                                <div className="font-medium shrink-0 pt-6 md:pt-0">
                                                    {formatCurrency((item.unitPrice * item.qty) - (item.unitPrice * item.qty * (item.discountPercent / 100)))}
                                                </div>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 shrink-0 md:ml-2 pt-6 md:pt-0 pb-6 md:pb-0"
                                                    onClick={() => removeItem(item.id)}
                                                    disabled={items.length === 1}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6">
                                <Label className="text-muted-foreground mb-2 block">Notes / Terms</Label>
                                <Textarea placeholder="Thank you for your visit..." className="resize-none" rows={3} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Summary Sticky Card */}
                <div className="xl:col-span-1">
                    <Card className="shadow-lg border-teal-100 dark:border-teal-900 sticky top-6">
                        <CardHeader className="bg-slate-50 dark:bg-gray-900/50 border-b pb-4">
                            <CardTitle className="text-lg">Invoice Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-foreground">{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-rose-600 dark:text-rose-400">
                                    <span>Discount</span>
                                    <span>- {formatCurrency(totalDiscount)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Tax (GST)</span>
                                    <span>+ {formatCurrency(totalTax)}</span>
                                </div>

                                <div className="pt-4 mt-2 border-t">
                                    <div className="flex justify-between items-end">
                                        <span className="font-semibold text-base">Grand Total</span>
                                        <span className="text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-400">{formatCurrency(grandTotal)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 space-y-3">
                                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" size="lg">Issue Invoice</Button>
                                <Button className="w-full" variant="outline" size="lg">Save as Draft</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </PageWrapper>
    );
}
