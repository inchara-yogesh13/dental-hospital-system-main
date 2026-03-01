"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileIcon, UploadCloud, Download, Trash2, FileText, Image as ImageIcon } from "lucide-react";
import { formatDateTime } from "@/lib/utils/format";

export function PatientDocuments({ patientId }: { patientId: string }) {
    // MOCK DATA
    const documents = [
        { id: 'doc_1', name: 'OPG X-Ray', type: 'IMAGE', size: '2.4 MB', date: new Date().toISOString(), uploader: 'Dr. Priya Sharma' },
        { id: 'doc_2', name: 'Blood Report', type: 'PDF', size: '1.1 MB', date: new Date(Date.now() - 86400000 * 5).toISOString(), uploader: 'Reception' },
        { id: 'doc_3', name: 'Consent Form', type: 'PDF', size: '450 KB', date: new Date(Date.now() - 86400000 * 30).toISOString(), uploader: 'Patient Portal' },
    ];

    const getDocIcon = (type: string) => {
        if (type === 'IMAGE') return <ImageIcon className="w-8 h-8 text-blue-500" />;
        if (type === 'PDF') return <FileText className="w-8 h-8 text-rose-500" />;
        return <FileIcon className="w-8 h-8 text-slate-500" />;
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Documents & Files</h3>
                    <p className="text-sm text-muted-foreground mt-1">Manage X-rays, lab reports, and consent forms.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <Button variant="outline" className="flex-1 sm:flex-none">
                        <FilterIcon className="w-4 h-4 mr-2" /> Filter
                    </Button>
                    <Button className="flex-1 sm:flex-none bg-teal-600 hover:bg-teal-700 text-white">
                        <UploadCloud className="mr-2 h-4 w-4" /> Upload File
                    </Button>
                </div>
            </div>

            {/* Upload Zone */}
            <div className="border-2 border-dashed border-slate-200 dark:border-gray-800 rounded-xl p-8 text-center hover:bg-slate-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-3">
                <div className="bg-teal-50 dark:bg-teal-900/30 p-4 rounded-full text-teal-600 dark:text-teal-400">
                    <UploadCloud className="w-8 h-8" />
                </div>
                <div>
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG, PDF or DICOM (max. 10MB)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map(doc => (
                    <Card key={doc.id} className="shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                        <CardContent className="p-0">
                            <div className="p-5 flex items-start gap-4">
                                <div className="shrink-0 bg-slate-50 dark:bg-gray-900 p-3 rounded-lg border dark:border-gray-800">
                                    {getDocIcon(doc.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold truncate" title={doc.name}>{doc.name}</h4>
                                    <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                                        <p>{doc.size} • {doc.type}</p>
                                        <p>{formatDateTime(doc.date).split(',')[0]} by {doc.uploader}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t bg-slate-50 dark:bg-gray-900 py-2 px-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="sm" className="h-8 text-teal-700 hover:bg-teal-100 dark:text-teal-400 dark:hover:bg-teal-900/50">
                                    <Download className="w-4 h-4 mr-1.5" /> Download
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:bg-red-100 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/40">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function FilterIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
    );
}
