// @refresh reset
import { createBrowserRouter, Navigate } from 'react-router';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/layout/AdminLayout';
import { AccountantLayout } from './components/layout/AccountantLayout';
import { ProtectedRoute } from './hooks/ProtectedRoute';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AccountantsPage } from './pages/admin/AccountantsPage';
import { ClientsPage as AdminClientsPage } from './pages/admin/ClientsPage';

// Accountant Pages
import { AccountantDashboard } from './pages/accountant/AccountantDashboard';
import { AccountantClientsPage } from './pages/accountant/ClientsPage';

// Client Pages
import { ClientInvoicesPage } from './pages/client/ClientInvoicesPage';
import { ClientBankPage } from './pages/client/ClientBankPage';
import { ClientReportsPage } from './pages/client/ClientReportsPage';
import { useAuth } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';

// Existing Pages (kept for reference - will be adapted)
import { Dashboard } from './pages/Dashboard';
import { InvoiceInbox } from './pages/InvoiceInbox';
import { InvoiceEditor } from './pages/InvoiceEditor';
import { SupplierDirectory } from './pages/SupplierDirectory';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

function HomeRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/accountant" replace />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRedirect />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },

  // ==== ADMIN ROUTES ====
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'accountants', Component: AccountantsPage },
      { path: 'clients', Component: AdminClientsPage },
    ],
  },

  // ==== ACCOUNTANT ROUTES ====
  {
    path: '/accountant',
    element: (
      <ProtectedRoute requiredRole="accountant">
        <AccountantLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: AccountantDashboard },
      { path: 'clients', Component: AccountantClientsPage },
      {
        path: 'clients/:clientId',
        children: [
          { path: 'invoices', Component: ClientInvoicesPage },
          { path: 'invoices/:invoiceId', element: <InvoiceEditor /> },
          { path: 'bank', Component: ClientBankPage },
          { path: 'reports', Component: ClientReportsPage },
        ],
      },
    ],
  },

  // ==== LEGACY ROUTES (kept for backward compatibility) ====
  {
    path: '/legacy',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'invoices', Component: InvoiceInbox },
      { path: 'invoices/:id', Component: InvoiceEditor },
      { path: 'suppliers', Component: SupplierDirectory },
      { path: 'reports', Component: Reports },
      { path: 'settings', Component: Settings },
    ],
  },
]);
