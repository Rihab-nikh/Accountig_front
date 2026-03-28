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
import { AdminSettings } from './pages/admin/Settings';

// Accountant Pages
import { AccountantDashboard } from './pages/accountant/AccountantDashboard';
import { AccountantClientsPage } from './pages/accountant/ClientsPage';
import { AccountantInboxPage } from './pages/accountant/AccountantInboxPage';
import { AccountantOutboxPage } from './pages/accountant/AccountantOutboxPage';
import { AccountantBankPage } from './pages/accountant/AccountantBankPage';
import { IntegrationsPage } from './pages/accountant/IntegrationsPage';
import { OAuthCallbackPage } from './pages/accountant/OAuthCallbackPage';

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
import { NotFoundPage } from './pages/NotFoundPage';
import { ServerErrorPage } from './pages/ServerErrorPage';

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
      { path: 'settings', Component: AdminSettings },
    ],
  },

  // ==== OAUTH CALLBACK ====
  {
    path: '/integrations/oauth/callback',
    Component: OAuthCallbackPage,
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
      { path: 'inbox', Component: AccountantInboxPage },
      { path: 'outbox', Component: AccountantOutboxPage },
      { path: 'bank', Component: AccountantBankPage },
      { path: 'integrations', Component: IntegrationsPage },
      { path: 'settings', Component: Settings },
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

  // ==== ERROR ROUTES ====
  {
    path: '/error',
    element: <ServerErrorPage />,
  },

  // ==== CATCH-ALL 404 ====
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
