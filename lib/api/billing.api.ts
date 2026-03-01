import apiClient from "./client"

export const billingApi = {
    getInvoices: (params?: any) => apiClient.get("/billing", { params }).then((res: any) => res),
    getInvoiceById: (id: string) => apiClient.get(`/billing/${id}`).then((res: any) => res),
    createInvoice: (data: any) => apiClient.post("/billing", data).then((res: any) => res),
    recordPayment: (id: string, data: any) => apiClient.post(`/billing/${id}/payments`, data).then((res: any) => res),
    getProcedures: () => apiClient.get("/billing/procedures").then((res: any) => res),
}
