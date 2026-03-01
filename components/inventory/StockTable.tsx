"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ArrowDownCircle, ArrowUpCircle, History, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils/format";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function StockTable() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("ALL");
    const [showLowStock, setShowLowStock] = useState(false);

    // MOCK DATA
    const inventory = [
        { id: 'ITM-001', name: 'Dental Implants (Titanium)', category: 'Implants', unit: 'Pieces', currentStock: 45, minStock: 20, unitCost: 3500 },
        { id: 'ITM-002', name: 'Composite Local Anesthetic', category: 'Consumables', unit: 'Vials', currentStock: 12, minStock: 50, unitCost: 450 },
        { id: 'ITM-003', name: 'Examination Gloves (Medium)', category: 'PPE', unit: 'Boxes', currentStock: 5, minStock: 10, unitCost: 200 },
        { id: 'ITM-004', name: 'Alginate Impression Material', category: 'Materials', unit: 'Packets', currentStock: 28, minStock: 15, unitCost: 300 },
        { id: 'ITM-005', name: 'N95 Masks', category: 'PPE', unit: 'Boxes', currentStock: 80, minStock: 30, unitCost: 500 },
    ];

    const filteredItems = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'ALL' || item.category === category;
        const matchesLowStock = showLowStock ? item.currentStock <= item.minStock : true;
        return matchesSearch && matchesCategory && matchesLowStock;
    });

    const lowStockCount = inventory.filter(i => i.currentStock <= i.minStock).length;
    const totalValue = inventory.reduce((acc, i) => acc + (i.currentStock * i.unitCost), 0);

    return (
        <div className="space-y-4 h-full flex flex-col min-h-0">

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="shadow-sm border-gray-100 dark:border-gray-800">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase">Total Items Tracked</p>
                            <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-gray-100">{inventory.length}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-red-100 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-red-600 dark:text-red-400 uppercase">Low Stock Alerts</p>
                            <p className="text-2xl font-bold mt-1 text-red-700 dark:text-red-500 flex items-center gap-2">
                                {lowStockCount} {lowStockCount > 0 && <AlertTriangle className="w-5 h-5" />}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-100 dark:border-gray-800">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase">Total Inventory Value</p>
                            <p className="text-2xl font-bold mt-1 text-teal-700 dark:text-teal-400">{formatCurrency(totalValue)}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Table Container */}
            <div className="bg-white dark:bg-gray-950 p-4 rounded-xl shadow-sm border dark:border-gray-800 flex-1 flex flex-col min-h-0">

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search item name or code..."
                                className="pl-9 bg-slate-50 dark:bg-gray-900 border-none"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-full sm:w-[180px] bg-slate-50 dark:bg-gray-900 border-none">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Categories</SelectItem>
                                <SelectItem value="Implants">Implants</SelectItem>
                                <SelectItem value="Consumables">Consumables</SelectItem>
                                <SelectItem value="PPE">PPE</SelectItem>
                                <SelectItem value="Materials">Materials</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="flex items-center space-x-2 bg-slate-50 dark:bg-gray-900 px-3 py-2 rounded-md border border-transparent dark:border-gray-800">
                            <Switch id="low-stock" checked={showLowStock} onCheckedChange={setShowLowStock} />
                            <Label htmlFor="low-stock" className="text-sm font-medium cursor-pointer">Low Stock Only</Label>
                        </div>
                    </div>
                    <Button variant="outline" className="shrink-0 hidden lg:flex"><SlidersHorizontal className="w-4 h-4 mr-2" /> More Filters</Button>
                </div>

                {/* Table */}
                <div className="border rounded-md overflow-x-auto dark:border-gray-800 flex-1 relative">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 dark:bg-gray-900 text-xs uppercase font-semibold text-muted-foreground border-b dark:border-gray-800 sticky top-0 z-10">
                            <tr>
                                <th className="px-5 py-3">Item Name</th>
                                <th className="px-5 py-3">Category</th>
                                <th className="px-5 py-3 text-right">Stock</th>
                                <th className="px-5 py-3 text-right hidden lg:table-cell">Unit Cost</th>
                                <th className="px-5 py-3 text-right hidden xl:table-cell">Total Value</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-gray-800">
                            {filteredItems.map((item) => {
                                const isLow = item.currentStock <= item.minStock;
                                return (
                                    <tr key={item.id} className={`hover:bg-slate-50/50 dark:hover:bg-gray-900/50 ${isLow ? 'bg-red-50/30 dark:bg-red-900/5' : ''}`}>
                                        <td className="px-5 py-3.5 whitespace-nowrap">
                                            <div className="font-medium text-teal-700 dark:text-teal-400">{item.name}</div>
                                            <div className="text-xs text-muted-foreground">{item.id} • {item.unit}</div>
                                        </td>
                                        <td className="px-5 py-3.5 whitespace-nowrap">{item.category}</td>
                                        <td className="px-5 py-3.5 whitespace-nowrap text-right">
                                            <div className={`font-bold text-base ${isLow ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>
                                                {item.currentStock}
                                            </div>
                                            <div className="text-xs text-muted-foreground">Min: {item.minStock}</div>
                                        </td>
                                        <td className="px-5 py-3.5 text-right font-medium hidden lg:table-cell">{formatCurrency(item.unitCost)}</td>
                                        <td className="px-5 py-3.5 text-right font-semibold text-emerald-600 hidden xl:table-cell">{formatCurrency(item.currentStock * item.unitCost)}</td>
                                        <td className="px-5 py-3.5 whitespace-nowrap">
                                            {isLow
                                                ? <Badge variant="outline" className="text-red-600 border-red-500 bg-red-50 dark:bg-red-950/30">Low Stock</Badge>
                                                : <Badge variant="outline" className="text-emerald-600 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30">OK</Badge>
                                            }
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50" title="Record Usage">
                                                    <ArrowDownCircle className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" title="Record Purchase (Restock)">
                                                    <ArrowUpCircle className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-teal-600" title="View History">
                                                    <History className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            {filteredItems.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center py-10 text-muted-foreground">
                                        No items match your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
