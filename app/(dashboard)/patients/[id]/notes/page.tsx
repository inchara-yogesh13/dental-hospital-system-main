"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { PageHeader } from "@/components/shared/PageHeader"
import { ClinicalNoteCard } from "@/components/patients/ClinicalNoteCard"
import { ClinicalNoteForm } from "@/components/patients/ClinicalNoteForm"
import { Button } from "@/components/ui/button"
import { Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PatientNotesPage() {
    const params = useParams()
    const patientId = params.id as string
    const [isAdding, setIsAdding] = useState(false)

    // Mock data
    const notes = [
        {
            _id: "N1",
            visitDate: new Date().toISOString(),
            doctorName: "Smith",
            chiefComplaint: "Pain in lower right molar.",
            clinicalFindings: "Deep caries in tooth 46 with pulpal involvement. Percussion positive.",
            diagnosis: "Irreversible Pulpitis tooth 46.",
            treatmentPlan: "Root Canal Treatment recommended and started. Access opened, canals negotiated.",
            prescriptions: [{ medicine: "Amoxicillin" }],
            followUpInDays: 3,
            isDraft: false
        }
    ]

    const handleSubmit = (data: any) => {
        console.log("Submitting note", data)
        setIsAdding(false)
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" size="icon" asChild>
                    <Link href={`/patients/${patientId}`}>
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <PageHeader
                    title="Clinical Notes"
                    subtitle={`Viewing complete history for Patient ${patientId.substring(0, 8)}`}
                />
                <div className="ml-auto">
                    {!isAdding && (
                        <Button onClick={() => setIsAdding(true)}>
                            <Plus className="h-4 w-4 mr-2" /> Add Note
                        </Button>
                    )}
                </div>
            </div>

            {isAdding ? (
                <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">New Clinical Note</h3>
                    <ClinicalNoteForm onSubmit={handleSubmit} />
                    <div className="mt-4 pt-4 border-t flex justify-end">
                        <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel Adding</Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {notes.length === 0 ? (
                        <div className="text-center py-12 border border-dashed rounded-lg bg-muted/20">
                            <p className="text-muted-foreground">No clinical notes recorded yet.</p>
                            <Button variant="link" onClick={() => setIsAdding(true)}>Add their first note</Button>
                        </div>
                    ) : (
                        notes.map(note => (
                            <ClinicalNoteCard key={note._id} note={note} />
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
