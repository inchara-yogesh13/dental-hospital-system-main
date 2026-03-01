"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Trash2, Edit } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

export function ProcedureCatalog() {
    const categories = [
        { name: 'Consultation', items: [{ id: 'C1', name: 'Initial Consultation', price: 500 }, { id: 'C2', name: 'Follow-up', price: 300 }] },
        { name: 'Diagnostic', items: [{ id: 'D1', name: 'X-Ray (IOPA)', price: 300 }, { id: 'D2', name: 'OPG', price: 800 }] },
        { name: 'Restorative', items: [{ id: 'R1', name: 'Composite Filling', price: 1200 }, { id: 'R2', name: 'Root Canal (Anterior)', price: 3500 }] },
        { name: 'Preventive', items: [{ id: 'P1', name: 'Scaling & Polishing', price: 1500 }] },
    ];

    return (
        <div className="space-y-6 pt-4 max-w-5xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-semibold">Procedures & Prices</h3>
                    <p className="text-sm text-muted-foreground mt-1">Catalog used for billing and treatment plans.</p>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Procedure
                </Button>
            </div>

            <div className="max-w-md relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search procedures..." className="pl-9" />
            </div>

            <div className="space-y-8">
                {categories.map((cat, i) => (
                    <div key={i}>
                        <h4 className="font-semibold text-gray-900 border-b pb-2 mb-4">{cat.name}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {cat.items.map(item => (
                                <Card key={item.id} className="shadow-sm border-transparent hover:border-slate-200 transition-colors">
                                    <CardContent className="p-4 flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">Code: {item.id}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-semibold text-teal-700">{formatCurrency(item.price)}</span>
                                            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-teal-600">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
