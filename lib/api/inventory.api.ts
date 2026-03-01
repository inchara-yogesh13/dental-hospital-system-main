import apiClient from "./client"

export const inventoryApi = {
    getStock: (params?: any) => apiClient.get("/inventory/stock", { params }).then((res: any) => res),
    createStockItem: (data: any) => apiClient.post("/inventory/stock", data).then((res: any) => res),
    updateStock: (id: string, data: any) => apiClient.post(`/inventory/stock/${id}/transaction`, data).then((res: any) => res),
    getLabCases: (params?: any) => apiClient.get("/inventory/lab-cases", { params }).then((res: any) => res),
    createLabCase: (data: any) => apiClient.post("/inventory/lab-cases", data).then((res: any) => res),
    updateLabCaseStatus: (id: string, status: string) => apiClient.put(`/inventory/lab-cases/${id}/status`, { status }).then((res: any) => res),
}
