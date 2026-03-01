import apiClient from "./client"

export const patientsApi = {
    getPatients: (params?: any) => apiClient.get("/patients", { params }).then((res: any) => res),
    getPatientById: (id: string) => apiClient.get(`/patients/${id}`).then((res: any) => res),
    createPatient: (data: any) => apiClient.post("/patients", data).then((res: any) => res),
    updatePatient: (id: string, data: any) => apiClient.put(`/patients/${id}`, data).then((res: any) => res),
    addClinicalNote: (patientId: string, data: any) => apiClient.post(`/patients/${patientId}/notes`, data).then((res: any) => res),
    getClinicalNotes: (patientId: string) => apiClient.get(`/patients/${patientId}/notes`).then((res: any) => res),
}
