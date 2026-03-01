"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface PatientSearchProps {
    onSelect?: (patient: any) => void
    redirectOnSelect?: boolean
}

export function PatientSearch({ onSelect, redirectOnSelect = false }: PatientSearchProps) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<any[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim().length >= 2) {
                setIsSearching(true)
                // Mock API call for now since we haven't generated the hooks yet
                // In real execution, use useQuery with debounced term
                setTimeout(() => {
                    setResults([
                        { _id: "1", patientId: "PT001", fullName: "John Doe", phone: "+919876543210" },
                        { _id: "2", patientId: "PT002", fullName: "Jane Smith", phone: "+919876543211" }
                    ].filter(p => p.fullName.toLowerCase().includes(query.toLowerCase())))
                    setIsSearching(false)
                }, 300)
            } else {
                setResults([])
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [query])

    const handleSelect = (patient: any) => {
        if (redirectOnSelect) {
            router.push(`/patients/${patient._id}`)
        } else if (onSelect) {
            onSelect(patient)
        }
        setQuery("")
        setResults([])
    }

    return (
        <div className="relative w-full max-w-sm">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name or phone..."
                    className="pl-8"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {isSearching && (
                    <div className="absolute right-3 top-3 h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                )}
            </div>

            {results.length > 0 && query.trim().length >= 2 && (
                <div className="absolute top-full mt-1 w-full bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                    {results.map((patient) => (
                        <button
                            key={patient._id}
                            className="w-full text-left px-4 py-2 hover:bg-muted flex flex-col items-start border-b last:border-0"
                            onClick={() => handleSelect(patient)}
                        >
                            <div className="flex justify-between w-full items-center">
                                <span className="font-medium text-sm">{patient.fullName}</span>
                                <span className="text-xs text-muted-foreground bg-muted-foreground/10 px-2 py-0.5 rounded">{patient.patientId}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{patient.phone}</span>
                        </button>
                    ))}
                    <div className="p-2 bg-muted/30">
                        <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => router.push('/patients/new')}>
                            + Register New Patient
                        </Button>
                    </div>
                </div>
            )}

            {results.length === 0 && query.trim().length >= 2 && !isSearching && (
                <div className="absolute top-full mt-1 w-full bg-background border rounded-md shadow-lg z-50 p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-3">No patients found.</p>
                    <Button size="sm" onClick={() => router.push('/patients/new')}>
                        Register New Patient
                    </Button>
                </div>
            )}
        </div>
    )
}
