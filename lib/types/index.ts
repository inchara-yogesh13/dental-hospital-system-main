export interface Tenant {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'DOCTOR' | 'RECEPTIONIST';
  tenantId: string;
}

export interface Patient {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  email?: string;
  dob?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  bloodGroup?: string;
}

export interface Appointment {
  id: string;
  tenantId: string;
  patientId: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'SCHEDULED' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
}

export interface DoctorLeave {
  id: string;
  doctorId: string;
  startDate: string;
  endDate: string;
}

export interface ClinicalNote {
  id: string;
  patientId: string;
  appointmentId?: string;
  doctorId: string;
  visitDate: string;
  chiefComplaint: string;
}

export interface PatientDocument {
  id: string;
  patientId: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
}

export interface Invoice {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  grandTotal: number;
  paid: number;
  pending: number;
  status: 'DRAFT' | 'ISSUED' | 'PARTIAL' | 'PAID' | 'CANCELLED';
}

export interface LineItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  date: string;
  mode: string;
}

export interface Procedure {
  id: string;
  code: string;
  name: string;
  price: number;
}

export interface AdvancePayment {
  id: string;
  patientId: string;
  amount: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  minimumStock: number;
}

export interface StockTransaction {
  id: string;
  itemId: string;
  quantity: number;
  type: 'IN' | 'OUT';
}

export interface LabCase {
  id: string;
  patientId: string;
  labName: string;
  status: 'SENT' | 'RECEIVED' | 'FITTED' | 'REJECTED';
}

export interface DashboardReport {
  todayAppointments: number;
  todayRevenue: number;
  pendingPayments: number;
  lowStockItems: number;
}

export interface RevenueReport {
  date: string;
  billed: number;
  collected: number;
}

export interface AppointmentSummary {
  status: string;
  count: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
