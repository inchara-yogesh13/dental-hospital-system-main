import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { patientsApi } from "../api/patients.api"
import { toast } from "sonner"

export function usePatients(params?: any) {
    return useQuery({
        queryKey: ["patients", params],
        queryFn: () => patientsApi.getPatients(params)
    })
}

export function usePatient(id: string) {
    return useQuery({
        queryKey: ["patient", id],
        queryFn: () => patientsApi.getPatientById(id),
        enabled: !!id
    })
}

export function useClinicalNotes(patientId: string) {
    return useQuery({
        queryKey: ["clinicalNotes", patientId],
        queryFn: () => patientsApi.getClinicalNotes(patientId),
        enabled: !!patientId
    })
}

export function useCreatePatient() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: patientsApi.createPatient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients"] })
            toast.success("Patient registered successfully")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to register patient")
        }
    })
}

export function useAddClinicalNote() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ patientId, data }: { patientId: string, data: any }) => patientsApi.addClinicalNote(patientId, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["clinicalNotes", variables.patientId] })
            toast.success("Clinical note added")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to add note")
        }
    })
}
