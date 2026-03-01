import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { billingApi } from "../api/billing.api"
import { toast } from "sonner"

export function useInvoices(params?: any) {
    return useQuery({
        queryKey: ["invoices", params],
        queryFn: () => billingApi.getInvoices(params)
    })
}

export function useInvoice(id: string) {
    return useQuery({
        queryKey: ["invoice", id],
        queryFn: () => billingApi.getInvoiceById(id),
        enabled: !!id
    })
}

export function useProcedures() {
    return useQuery({
        queryKey: ["procedures"],
        queryFn: billingApi.getProcedures
    })
}

export function useCreateInvoice() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: billingApi.createInvoice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invoices"] })
            toast.success("Invoice created successfully")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create invoice")
        }
    })
}

export function useRecordPayment() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => billingApi.recordPayment(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["invoice", variables.id] })
            queryClient.invalidateQueries({ queryKey: ["invoices"] })
            toast.success("Payment recorded successfully")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to record payment")
        }
    })
}
