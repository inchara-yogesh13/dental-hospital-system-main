import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { inventoryApi } from "../api/inventory.api"
import { toast } from "sonner"

export function useStock(params?: any) {
    return useQuery({
        queryKey: ["stock", params],
        queryFn: () => inventoryApi.getStock(params)
    })
}

export function useLabCases(params?: any) {
    return useQuery({
        queryKey: ["labCases", params],
        queryFn: () => inventoryApi.getLabCases(params)
    })
}

export function useCreateStockItem() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: inventoryApi.createStockItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stock"] })
            toast.success("Stock item created")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create stock item")
        }
    })
}

export function useUpdateStock() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) => inventoryApi.updateStock(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stock"] })
            toast.success("Stock updated")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update stock")
        }
    })
}

export function useCreateLabCase() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: inventoryApi.createLabCase,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["labCases"] })
            toast.success("Lab case created")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create lab case")
        }
    })
}

export function useUpdateLabCaseStatus() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) => inventoryApi.updateLabCaseStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["labCases"] })
            toast.success("Lab case status updated")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update lab case status")
        }
    })
}
