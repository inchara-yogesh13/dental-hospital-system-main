"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDateTime } from "@/lib/utils/format"

interface ClinicalNoteCardProps {
    note: any
}

export function ClinicalNoteCard({ note }: ClinicalNoteCardProps) {
    return (
        <Card className="mb-4">
            <CardHeader className="py-4 border-b bg-muted/20">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-base flex items-center gap-2">
                            Note from {formatDateTime(note.visitDate)}
                            {note.isDraft && <Badge variant="outline" className="text-orange-500 border-orange-500">Draft</Badge>}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Dr. {note.doctorName || 'Doctor'}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="py-4 space-y-4 text-sm">
                <div>
                    <h4 className="font-semibold text-foreground mb-1">Chief Complaint</h4>
                    <p className="text-muted-foreground">{note.chiefComplaint || "N/A"}</p>
                </div>

                {note.clinicalFindings && (
                    <div>
                        <h4 className="font-semibold text-foreground mb-1">Clinical Findings</h4>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{note.clinicalFindings}</p>
                    </div>
                )}

                {note.diagnosis && (
                    <div>
                        <h4 className="font-semibold text-foreground mb-1">Diagnosis</h4>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{note.diagnosis}</p>
                    </div>
                )}

                {note.treatmentPlan && (
                    <div className="bg-primary/5 p-3 rounded-md border border-primary/10">
                        <h4 className="font-semibold text-primary mb-1">Treatment Plan</h4>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{note.treatmentPlan}</p>
                    </div>
                )}
            </CardContent>
            {(note.prescriptions?.length > 0 || note.followUpInDays) && (
                <CardFooter className="py-3 border-t bg-muted/10 flex justify-between items-center text-sm">
                    {note.prescriptions?.length > 0 && (
                        <span className="font-medium">{note.prescriptions.length} Prescriptions attached</span>
                    )}
                    {note.followUpInDays && (
                        <span className="text-muted-foreground">🔄 Follow up in {note.followUpInDays} days</span>
                    )}
                </CardFooter>
            )}
        </Card>
    )
}
