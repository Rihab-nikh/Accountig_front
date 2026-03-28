import {
    Client,
    Accountant,
    Invoice,
    Supplier,
    BankStatement,
    Report,
    AdminDashboardStats,
    AccountantDashboardStats,
    ClientDashboardStats,
} from '../types';

// ====== MOCK DATA ======

export const MOCK_ACCOUNTANTS: Accountant[] = [
    {
        id: 'acct-1',
        name: 'Ahmed Ben Slimane',
        email: 'ahmed.slimane@smartcompta.ma',
        phone: '+212 6 12 34 56 78',
        status: 'active',
        clientCount: 3,
        createdAt: '2025-01-15',
        specialization: 'Small Business Accounting',
    },
    {
        id: 'acct-2',
        name: 'Fatima Al-Khatib',
        email: 'fatima.khatib@smartcompta.ma',
        phone: '+212 6 98 76 54 32',
        status: 'active',
        clientCount: 5,
        createdAt: '2024-11-20',
        specialization: 'Corporate Accounting',
    },
    {
        id: 'acct-3',
        name: 'Mohammed El-Arabi',
        email: 'mohammed.elarabi@smartcompta.ma',
        phone: '+212 6 55 44 33 22',
        status: 'active',
        clientCount: 2,
        createdAt: '2025-02-01',
        specialization: 'Non-Profit Accounting',
    },
];

export const MOCK_CLIENTS: Client[] = [
    {
        id: 'client-1',
        companyName: 'Teknovision SARL',
        ICE: '002519191000027',
        IF: '123456789',
        activity: 'IT Services & Consulting',
        city: 'Casablanca',
        contactEmail: 'contact@teknovision.ma',
        phone: '+212 5 22 12 34 56',
        status: 'active',
        assignedAccountantId: 'acct-1',
        createdAt: '2025-01-10',
    },
    {
        id: 'client-2',
        companyName: 'Maroc Import Export Ltd',
        ICE: '001524011000048',
        IF: '987654321',
        activity: 'Import/Export',
        city: 'Rabat',
        contactEmail: 'info@moroc-import.ma',
        phone: '+212 5 37 12 34 56',
        status: 'active',
        assignedAccountantId: 'acct-1',
        createdAt: '2025-01-20',
    },
    {
        id: 'client-3',
        companyName: 'Agro Tech Solutions',
        ICE: '002987654000012',
        IF: '246813579',
        activity: 'Agricultural Technology',
        city: 'Marrakech',
        contactEmail: 'sales@agrotechs.ma',
        phone: '+212 5 24 12 34 56',
        status: 'active',
        assignedAccountantId: 'acct-1',
        createdAt: '2025-02-05',
    },
    {
        id: 'client-4',
        companyName: 'Design Studio Plus',
        ICE: '003111222000045',
        IF: '135792468',
        activity: 'Graphic Design & Branding',
        city: 'Fes',
        contactEmail: 'hello@designstudio.ma',
        phone: '+212 5 35 12 34 56',
        status: 'active',
        assignedAccountantId: 'acct-2',
        createdAt: '2025-01-25',
    },
    {
        id: 'client-5',
        companyName: 'Pharma Distribution SARL',
        ICE: '002555666000089',
        IF: '357159357',
        activity: 'Pharmaceutical Distribution',
        city: 'Casablanca',
        contactEmail: 'admin@pharmadist.ma',
        phone: '+212 5 22 55 66 77',
        status: 'active',
        assignedAccountantId: 'acct-2',
        createdAt: '2025-02-10',
    },
];

export const MOCK_INVOICES: Invoice[] = [
    {
        id: 'inv-1',
        clientId: 'client-1',
        supplierId: 'sup-1',
        supplier: 'Afriquia',
        ICE: '002519191000027',
        date: '2026-03-28',
        totalTTC: '1,250.00',
        totalHT: '1,000.00',
        TVA: '250.00',
        category: 'Fuel',
        status: 'processed',
        notes: 'Fuel purchase for company vehicles',
        createdAt: '2026-03-28',
    },
    {
        id: 'inv-2',
        clientId: 'client-1',
        supplierId: 'sup-2',
        supplier: 'Maroc Telecom',
        ICE: '001524011000048',
        date: '2026-03-27',
        totalTTC: '3,890.00',
        totalHT: '3,100.00',
        TVA: '790.00',
        category: 'Telecom',
        status: 'processed',
        notes: 'Monthly internet and phone services',
        createdAt: '2026-03-27',
    },
    {
        id: 'inv-3',
        clientId: 'client-1',
        supplierId: 'sup-3',
        supplier: 'LYDEC',
        ICE: '002987654000012',
        date: '2026-03-27',
        totalTTC: '2,340.00',
        totalHT: '1,870.00',
        TVA: '470.00',
        category: 'Utilities',
        status: 'pending',
        createdAt: '2026-03-27',
    },
    {
        id: 'inv-4',
        clientId: 'client-2',
        supplierId: 'sup-4',
        supplier: 'Office Depot',
        ICE: '003111222000045',
        date: '2026-03-26',
        totalTTC: '890.50',
        totalHT: '700.00',
        TVA: '190.50',
        category: 'Office Supplies',
        status: 'processed',
        createdAt: '2026-03-26',
    },
    {
        id: 'inv-5',
        clientId: 'client-2',
        supplierId: 'sup-5',
        supplier: 'Atlas Rent',
        ICE: '002555666000089',
        date: '2026-03-26',
        totalTTC: '12,500.00',
        totalHT: '10,000.00',
        TVA: '2,500.00',
        category: 'Rent',
        status: 'processed',
        createdAt: '2026-03-26',
    },
];

export const MOCK_SUPPLIERS: Supplier[] = [
    {
        id: 'sup-1',
        clientId: 'client-1',
        name: 'Afriquia',
        ICE: '002519191000027',
        email: 'contact@afriquia.com',
        phone: '+212 5 22 12 34 56',
        category: 'Fuel',
        city: 'Casablanca',
        status: 'active',
        invoiceCount: 5,
        totalSpent: '6,250.00',
        createdAt: '2025-01-10',
    },
    {
        id: 'sup-2',
        clientId: 'client-1',
        name: 'Maroc Telecom',
        ICE: '001524011000048',
        email: 'business@maroctelecom.ma',
        phone: '+212 5 37 12 34 56',
        category: 'Telecom',
        city: 'Rabat',
        status: 'active',
        invoiceCount: 12,
        totalSpent: '45,680.00',
        createdAt: '2024-12-15',
    },
    {
        id: 'sup-3',
        clientId: 'client-1',
        name: 'LYDEC',
        ICE: '002987654000012',
        email: 'facturation@lydec.ma',
        phone: '+212 5 24 12 34 56',
        category: 'Utilities',
        city: 'Marrakech',
        status: 'active',
        invoiceCount: 3,
        totalSpent: '7,020.00',
        createdAt: '2025-01-20',
    },
    {
        id: 'sup-4',
        clientId: 'client-2',
        name: 'Office Depot',
        ICE: '003111222000045',
        email: 'sales@officedepot.ma',
        phone: '+212 5 35 12 34 56',
        category: 'Office Supplies',
        city: 'Fes',
        status: 'active',
        invoiceCount: 8,
        totalSpent: '12,340.50',
        createdAt: '2025-02-01',
    },
    {
        id: 'sup-5',
        clientId: 'client-2',
        name: 'Atlas Rent',
        ICE: '002555666000089',
        email: 'rentals@atlasrent.ma',
        phone: '+212 5 22 55 66 77',
        category: 'Rent',
        city: 'Casablanca',
        status: 'active',
        invoiceCount: 2,
        totalSpent: '25,000.00',
        createdAt: '2025-01-15',
    },
];

export const MOCK_BANK_STATEMENTS: BankStatement[] = [
    {
        id: 'stmt-1',
        clientId: 'client-1',
        date: '2026-03-28',
        description: 'Invoice payment received from customer',
        transactionType: 'credit',
        credit: 5000,
        balance: 45000,
        reference: 'TRF-2026-03-001',
        status: 'success',
        createdAt: '2026-03-28',
    },
    {
        id: 'stmt-2',
        clientId: 'client-1',
        date: '2026-03-27',
        description: 'Salary payment for employees',
        transactionType: 'debit',
        debit: 8500,
        balance: 40000,
        reference: 'VIR-2026-03-045',
        status: 'success',
        createdAt: '2026-03-27',
    },
    {
        id: 'stmt-3',
        clientId: 'client-1',
        date: '2026-03-26',
        description: 'Office equipment purchase',
        transactionType: 'debit',
        debit: 1200,
        balance: 48500,
        reference: 'CHQ-2026-03-0125',
        status: 'success',
        createdAt: '2026-03-26',
    },
];

export const MOCK_REPORTS: Report[] = [
    {
        id: 'report-1',
        clientId: 'client-1',
        period: 'March 2026',
        type: 'monthly',
        totalInvoices: 12,
        totalExpenses: 35000.50,
        totalTVARecoverable: 5250.75,
        status: 'draft',
        createdAt: '2026-03-28',
        createdBy: 'acct-1',
    },
    {
        id: 'report-2',
        clientId: 'client-1',
        period: 'February 2026',
        type: 'monthly',
        totalInvoices: 10,
        totalExpenses: 32000.00,
        totalTVARecoverable: 4800.00,
        status: 'finalized',
        createdAt: '2026-03-01',
        createdBy: 'acct-1',
    },
];

// ====== MOCK SERVICE FUNCTIONS ======

export async function getAccountants(): Promise<Accountant[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return MOCK_ACCOUNTANTS;
}

export async function getAccountant(id: string): Promise<Accountant | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_ACCOUNTANTS.find((a) => a.id === id) || null;
}

export async function createAccountant(
    data: Omit<Accountant, 'id' | 'createdAt' | 'clientCount'>
): Promise<Accountant> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newAccountant: Accountant = {
        ...data,
        id: `acct-${Date.now()}`,
        clientCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
    };
    MOCK_ACCOUNTANTS.push(newAccountant);
    return newAccountant;
}

export async function updateAccountant(
    id: string,
    data: Partial<Accountant>
): Promise<Accountant | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = MOCK_ACCOUNTANTS.findIndex((a) => a.id === id);
    if (index === -1) return null;
    MOCK_ACCOUNTANTS[index] = { ...MOCK_ACCOUNTANTS[index], ...data };
    return MOCK_ACCOUNTANTS[index];
}

export async function getClients(
    accountantId?: string
): Promise<Client[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (accountantId) {
        return MOCK_CLIENTS.filter((c) => c.assignedAccountantId === accountantId);
    }
    return MOCK_CLIENTS;
}

export async function getClient(id: string): Promise<Client | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_CLIENTS.find((c) => c.id === id) || null;
}

export async function createClient(
    data: Omit<Client, 'id' | 'createdAt'>
): Promise<Client> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newClient: Client = {
        ...data,
        id: `client-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
    };
    MOCK_CLIENTS.push(newClient);
    return newClient;
}

export async function updateClient(
    id: string,
    data: Partial<Client>
): Promise<Client | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = MOCK_CLIENTS.findIndex((c) => c.id === id);
    if (index === -1) return null;
    MOCK_CLIENTS[index] = { ...MOCK_CLIENTS[index], ...data };
    return MOCK_CLIENTS[index];
}

export async function getInvoices(clientId?: string): Promise<Invoice[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (clientId) {
        return MOCK_INVOICES.filter((i) => i.clientId === clientId);
    }
    return MOCK_INVOICES;
}

export async function getSuppliers(clientId?: string): Promise<Supplier[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (clientId) {
        return MOCK_SUPPLIERS.filter((s) => s.clientId === clientId);
    }
    return MOCK_SUPPLIERS;
}

export async function getBankStatements(
    clientId?: string
): Promise<BankStatement[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (clientId) {
        return MOCK_BANK_STATEMENTS.filter((s) => s.clientId === clientId);
    }
    return MOCK_BANK_STATEMENTS;
}

export async function getReports(clientId?: string): Promise<Report[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (clientId) {
        return MOCK_REPORTS.filter((r) => r.clientId === clientId);
    }
    return MOCK_REPORTS;
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
        totalAccountants: MOCK_ACCOUNTANTS.length,
        totalClients: MOCK_CLIENTS.length,
        pendingDocuments: 8,
        totalProcessedInvoices: MOCK_INVOICES.filter(
            (i) => i.status === 'processed'
        ).length,
        monthlyRevenue: 125000,
    };
}

export async function getAccountantDashboardStats(
    accountantId: string
): Promise<AccountantDashboardStats> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const accountantClients = MOCK_CLIENTS.filter(
        (c) => c.assignedAccountantId === accountantId
    );
    const clientIds = accountantClients.map((c) => c.id);
    const relevantInvoices = MOCK_INVOICES.filter((i) =>
        clientIds.includes(i.clientId)
    );

    const thisMonthExpenses = relevantInvoices.reduce(
        (sum, inv) =>
            sum + parseFloat(inv.totalTTC.replace(/,/g, '')),
        0
    );
    const tvaRecoverable = relevantInvoices.reduce(
        (sum, inv) => sum + parseFloat((inv.TVA || '0').replace(/,/g, '')),
        0
    );

    return {
        totalClients: accountantClients.length,
        pendingDocuments: relevantInvoices.filter((i) => i.status === 'pending')
            .length,
        thisMonthExpenses: thisMonthExpenses,
        tvaRecoverable: tvaRecoverable,
    };
}

export async function getClientDashboardStats(
    clientId: string
): Promise<ClientDashboardStats> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const clientInvoices = MOCK_INVOICES.filter((i) => i.clientId === clientId);
    const monthlyExpenses = clientInvoices.reduce(
        (sum, inv) =>
            sum + parseFloat(inv.totalTTC.replace(/,/g, '')),
        0
    );
    const tvaRecoverable = clientInvoices.reduce(
        (sum, inv) => sum + parseFloat((inv.TVA || '0').replace(/,/g, '')),
        0
    );

    return {
        totalInvoices: clientInvoices.length,
        monthlyExpenses: monthlyExpenses,
        tvaRecoverable: tvaRecoverable,
        pendingItems: clientInvoices.filter((i) => i.status === 'pending').length,
    };
}
