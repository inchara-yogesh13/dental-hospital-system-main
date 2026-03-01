"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ChevronDown, ChevronUp, FileText, Clock, FilePlus2 } from "lucide-react";
import { useState } from "react";
import { formatDateTime } from "@/lib/utils/format";
import { useAuthStore } from "@/lib/stores/auth.store";

export function PatientClinicalNotes({ patientId }: { patientId: string }) {
    const { user } = useAuthStore();
    const isReceptionist = user?.role === 'RECEPTIONIST';

    const [expandedNote, setExpandedNote] = useState<string | null>(null);

    // MOCK DATA for Notes
    const notes = [
        {
            id: "note_1",
            date: new Date().toISOString(),
            doctor: "Dr. Priya Sharma",
            chiefComplaint: "Pain in lower right jaw",
            clinicalFindings: "Deep caries in 46, sensitive to percussion.",
            diagnosis: "Irreversible pulpitis 46",
            treatmentDone: "Access cavity preparation, extirpation of pulp, canals filed and medicated.",
            treatmentPlan: "Complete RCT 46 next visit. Followed by crown.",
            prescriptions: [
                { drug: "Augmentin 625mg", frequency: "1-0-1", duration: "5 days", instructions: "After meals" },
                { drug: "Ketorol DT", frequency: "SOS", duration: "3 days", instructions: "For pain" }
            ],
            followUp: 7
        },
        {
            id: "note_2",
            date: new Date(Date.now() - 86400000 * 30).toISOString(),
            doctor: "Dr. Rajan Kumar",
            chiefComplaint: "Routine checkup",
            clinicalFindings: "Calculus present in lower anteriors. Mild gingivitis.",
            diagnosis: "Gingivitis",
            treatmentDone: "Full mouth scaling and polishing.",
            treatmentPlan: "Maintain oral hygiene.",
            prescriptions: [],
            followUp: 180
        }
    ];

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Clinical Notes</h3>
                    <p className="text-sm text-muted-foreground mt-1">Detailed medical records and prescriptions.</p>
                </div>
                {!isReceptionist && (
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                        <Plus className="mr-2 h-4 w-4" /> Add New Note
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                {notes.length === 0 ? (
                    <div className="text-center p-8 border border-dashed rounded-xl bg-slate-50 dark:bg-gray-900">
                        <p className="text-muted-foreground">No clinical notes recorded yet.</p>
                    </div>
                ) : (
                    notes.map((note) => (
                        <Card key={note.id} className="shadow-sm overflow-hidden transition-all duration-200">
                            {/* Header / Preview (Clickable to expand) */}
                            <div
                                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-900/50"
                                onClick={() => setExpandedNote(expandedNote === note.id ? null : note.id)}
                            >
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-teal-700 dark:text-teal-400">
                                            {formatDateTime(note.date).split(',')[0]}
                                        </span>
                                        <Badge variant="outline" className="font-normal text-muted-foreground">
                                            {note.doctor}
                                        </Badge>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                        <span className="font-medium truncate max-w-lg" title={note.chiefComplaint}>
                                            {note.chiefComplaint}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end shrink-0 gap-4">
                                    {note.prescriptions.length > 0 && (
                                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400">
                                            <FilePlus2 className="w-3 h-3 mr-1" /> Rx Added
                                        </Badge>
                                    )}
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        {expandedNote === note.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                    </Button>
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {expandedNote === note.id && (
                                <CardContent className="border-t bg-slate-50 dark:bg-gray-900 p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Chief Complaint</span>
                                            <p className="text-sm font-medium">{note.chiefComplaint}</p>
                                        </div>
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Diagnosis</span>
                                            <p className="text-sm font-medium">{note.diagnosis}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Clinical Findings</span>
                                        <div className="text-sm p-3 bg-white dark:bg-gray-950 border rounded-md">{note.clinicalFindings || 'None recorded.'}</div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Treatment Done</span>
                                        <div className="text-sm p-3 bg-white dark:bg-gray-950 border rounded-md">{note.treatmentDone}</div>
                                    </div>

                                    {note.treatmentPlan && (
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Treatment Plan (Next Steps)</span>
                                            <div className="text-sm p-3 bg-white dark:bg-gray-950 border rounded-md">{note.treatmentPlan}</div>
                                        </div>
                                    )}

                                    {note.prescriptions.length > 0 && (
                                        <div className="space-y-2">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2"><FilePlus2 className="w-3 h-3" /> E-Prescriptions</span>
                                            <div className="bg-white dark:bg-gray-950 border rounded-md overflow-hidden">
                                                <table className="w-full text-sm text-left">
                                                    <thead className="bg-slate-100 dark:bg-gray-900 text-xs uppercase font-semibold text-muted-foreground">
                                                        <tr>
                                                            <th className="px-4 py-2">Drug</th>
                                                            <th className="px-4 py-2">Freq</th>
                                                            <th className="px-4 py-2">Duration</th>
                                                            <th className="px-4 py-2">Instructions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y dark:divide-gray-800">
                                                        {note.prescriptions.map((px, i) => (
                                                            <tr key={i}>
                                                                <td className="px-4 py-2 font-medium">{px.drug}</td>
                                                                <td className="px-4 py-2">{px.frequency}</td>
                                                                <td className="px-4 py-2">{px.duration}</td>
                                                                <td className="px-4 py-2">{px.instructions}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <div className="bg-slate-50 dark:bg-gray-900 border-t p-3 text-center">
                                                    <Button variant="outline" size="sm" className="w-full max-w-[200px]">Print Prescription</Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {note.followUp && (
                                        <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md border border-amber-200 dark:border-amber-900/50">
                                            <Clock className="w-4 h-4" />
                                            <span className="font-medium">Follow-up requested in {note.followUp} days.</span>
                                        </div>
                                    )}
                                </CardContent>
                            )}
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
