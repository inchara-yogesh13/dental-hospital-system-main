"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/PageHeader"
import { LabCaseTable } from "@/components/inventory/LabCaseTable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function LabCasesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="space-y-6">
            <PageHeader
                title="Lab Cases Tracking"
                subtitle="Manage end-to-end workflow for external dental lab orders"
            >
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" /> New Lab Order
                </Button>
            </PageHeader>

            <LabCaseTable />

            {/* Placeholder for New Lab Case Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-medium mb-4">New Lab Order</h2>
                        <p className="text-sm text-muted-foreground mb-4">Form implementation pending integration.</p>
                        <div className="flex justify-end mt-6">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
