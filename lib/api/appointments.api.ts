import apiClient from "./client"

export const appointmentsApi = {
    getAppointments: (params?: any) => apiClient.get("/appointments", { params }).then((res: any) => res),
    getAppointmentById: (id: string) => apiClient.get(`/appointments/${id}`).then((res: any) => res),
    createAppointment: (data: any) => apiClient.post("/appointments", data).then((res: any) => res),
    updateAppointment: (id: string, data: any) => apiClient.put(`/appointments/${id}`, data).then((res: any) => res),
    deleteAppointment: (id: string) => apiClient.delete(`/appointments/${id}`).then((res: any) => res),
    getDoctorLeaves: (params?: any) => apiClient.get("/appointments/leaves", { params }).then((res: any) => res),
}
