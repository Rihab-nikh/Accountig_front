// Role types
export type UserRole = 'admin' | 'accountant';

export type AccountStatus = 'active' | 'archived';
export type ClientStatus = 'active' | 'archived';
export type InvoiceStatus = 'processed' | 'pending' | 'review';
export type DocumentStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

// User & Auth
export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    accountantId?: string; // When role is 'accountant', this is their accountant ID
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signupAsAccountant: (data: any) => Promise<void>;
}

// Accountant Management (for Admin)
export interface Accountant {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: AccountStatus;
    clientCount: number;
    createdAt: string;
    specialization?: string;
}

// Client Management
export interface Client {
    id: string;
    companyName: string;
    ICE: string;
    IF: string;
    activity: string;
    city: string;
    contactEmail: string;
    phone: string;
    status: ClientStatus;
    assignedAccountantId: string;
    createdAt: string;
    logoUrl?: string;
}

// Client Context
export interface ClientContextType {
    currentClient: Client | null;
    setCurrentClient: (client: Client | null) => void;
    clients: Client[];
    setClients: (clients: Client[]) => void;
}

// Invoice
export interface Invoice {
    id: string;
    clientId: string;
    supplierId: string;
    supplier: string;
    ICE: string;
    date: string;
    totalTTC: string;
    totalHT?: string;
    TVA?: string;
    category: string;
    status: InvoiceStatus;
    fileUrl?: string;
    notes?: string;
    createdAt: string;
}

// Supplier
export interface Supplier {
    id: string;
    clientId: string;
    name: string;
    ICE: string;
    IF?: string;
    email: string;
    phone: string;
    category: string;
    city: string;
    status: 'active' | 'inactive';
    invoiceCount: number;
    totalSpent: string;
    createdAt: string;
}

// Bank Statement
export interface BankStatement {
    id: string;
    clientId: string;
    date: string;
    description: string;
    transactionType: 'debit' | 'credit';
    debit?: number;
    credit?: number;
    balance?: number;
    reference?: string;
    status: DocumentStatus;
    extractedFrom?: string;
    createdAt: string;
}

// Report
export interface Report {
    id: string;
    clientId: string;
    period: string;
    type: 'monthly' | 'quarterly' | 'annual';
    totalInvoices: number;
    totalExpenses: number;
    totalTVARecoverable: number;
    status: 'draft' | 'finalized';
    createdAt: string;
    createdBy: string;
}

// Dashboard Stats
export interface AdminDashboardStats {
    totalAccountants: number;
    totalClients: number;
    pendingDocuments: number;
    totalProcessedInvoices: number;
    monthlyRevenue: number;
}

export interface AccountantDashboardStats {
    totalClients: number;
    pendingDocuments: number;
    thisMonthExpenses: number;
    tvaRecoverable: number;
}

export interface ClientDashboardStats {
    totalInvoices: number;
    monthlyExpenses: number;
    tvaRecoverable: number;
    pendingItems: number;
}

// Form data types
export interface CreateAccountantForm {
    name: string;
    email: string;
    phone: string;
    specialization?: string;
}

export interface CreateClientForm {
    companyName: string;
    ICE: string;
    IF: string;
    activity: string;
    city: string;
    contactEmail: string;
    phone: string;
    assignedAccountantId: string;
}

export interface UploadProgress {
    fileName: string;
    progress: number;
    status: DocumentStatus;
    error?: string;
}
