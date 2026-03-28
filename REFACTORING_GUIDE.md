# SmartCompta Multi-Role Refactoring - Architecture Documentation

## Overview

This document describes the refactored SmartCompta frontend architecture, transforming it from a single-tenant accounting UI into a multi-role, multi-client B2B SaaS platform.

## Project Structure

```
src/app/
├── components/
│   ├── Layout.tsx                    # Legacy layout (kept for backward compatibility)
│   ├── layout/
│   │   ├── AdminLayout.tsx           # Role-based layout for admin
│   │   └── AccountantLayout.tsx      # Role-based layout for accountants
│   ├── ui/                           # Shadcn UI components (unchanged)
│   ├── figma/          # Image components
│   │   └── ImageWithFallback.tsx
│   ├── contexts/                     # Global state contexts
│   │   ├── LanguageContext.tsx       # Language support (multilingual)
│   │   ├── AuthContext.tsx           # Auth & user role management
│   │   └── ClientContext.tsx         # Current client selection
│   └── reusable/                     # Shared components
│       ├── StatCard.tsx              # KPI display cards
│       ├── StatusBadge.tsx           # Status labels
│       ├── PageHeader.tsx            # Page titles & actions
│       ├── EmptyState.tsx            # Empty state UI
│       ├── DataTable.tsx             # Sortable, filterable tables
│       ├── UploadZone.tsx            # Drag-and-drop file upload
│       └── index.ts                  # Barrel export
│
├── pages/
│   ├── Dashboard.tsx                 # Legacy dashboard (kept)
│   ├── InvoiceEditor.tsx             # Legacy invoice editor (reused)
│   ├── InvoiceInbox.tsx              # Legacy invoice inbox (kept)
│   ├── SupplierDirectory.tsx         # Legacy suppliers (kept)
│   ├── Reports.tsx                   # Legacy reports (kept)
│   ├── Settings.tsx                  # Legacy settings (kept)
│   │
│   ├── admin/                        # Admin role pages
│   │   ├── AdminDashboard.tsx        # Admin KPIs & overview
│   │   ├── AccountantsPage.tsx       # Manage accountants (CRUD)
│   │   └── ClientsPage.tsx           # Manage clients (CRUD)
│   │
│   ├── accountant/                   # Accountant role pages
│   │   ├── AccountantDashboard.tsx   # Assigned clients overview
│   │   └── ClientsPage.tsx           # List of assigned clients
│   │
│   └── client/                       # Client-scoped pages
│       ├── ClientInvoicesPage.tsx    # Invoices for a client
│       ├── ClientBankPage.tsx        # Bank statement upload
│       └── ClientReportsPage.tsx     # Financial reports
│
├── services/
│   └── mockData.ts                   # Mock data & API layer
│
├── contexts/
│   ├── LanguageContext.tsx           # Moved from components
│   ├── AuthContext.tsx               # Auth state
│   └── ClientContext.tsx             # Client selection state
│
├── hooks/
│   └── ProtectedRoute.tsx            # Role-based route protection
│
├── types/
│   └── index.ts                      # Type definitions
│
├── App.tsx                           # Root app with providers
└── routes.tsx                        # Routing structure
```

## Route Structure

### Admin Routes
```
/admin
├── /                    → AdminDashboard
├── /accountants         → AccountantsPage
└── /clients             → ClientsPage
```

### Accountant Routes
```
/accountant
├── /                       → AccountantDashboard
├── /clients                → AccountantClientsPage
└── /clients/:clientId
    ├── /invoices           → ClientInvoicesPage
    ├── /invoices/:id       → InvoiceEditor (reused)
    ├── /bank               → ClientBankPage
    └── /reports            → ClientReportsPage
```

## Data Model

### Core Types

**User Roles:**
- `admin`: Platform administrator
- `accountant`: Accounting professional managing clients

**Key Entities:**
- `Accountant`: Team member with assigned clients
- `Client`: Business entity assigned to accountants
- `Invoice`: Document associated with a client
- `Supplier`: Vendor associated with a client
- `BankStatement`: Transaction record for a client
- `Report`: Financial summary for a client

All invoices, suppliers, bank statements, and reports are **client-scoped**.

## Features by Role

### Admin Workspace
- **Dashboard**: KPIs (total accountants, clients, pending docs, processed invoices)
- **Accountant Management**: Create, edit, archive, delete accountants
- **Client Management**: Create, edit, archive, assign clients to accountants

### Accountant Workspace
- **Dashboard**: Client cards showing pending docs, monthly expenses, VAT recoverable
- **Clients Page**: Grid view of assigned clients with search & filter
- **Client Workspace**:
  - **Documents**: Invoices for the selected client (search, filter, pagination)
  - **Bank**: Upload bank statements (PDF/image), AI extraction
  - **Reports**: Monthly/quarterly/annual financial reports

## State Management

### Context Providers (in App.tsx)

1. **LanguageProvider**
   - Manages multilingual support (EN, FR, AR)
   - Global language state

2. **AuthProvider**
   - Manages user authentication
   - Stores user role (`admin` | `accountant`)
   - Provides login/logout/signup methods

3. **ClientProvider**
   - Stores currently selected client
   - Maintains list of accessible clients
   - Enables client-scoped navigation

### Usage

```tsx
// In components
const { user, login, logout } = useAuth();
const { currentClient, setCurrentClient, clients } = useClient();
const { language, setLanguage, t } = useLanguage();
```

## Mock Data

All data is mocked in `services/mockData.ts`. Replace with real API calls:

```tsx
// Current: Mock data
const clients = await getClients(accountantId);

// Later: Replace with API
const clients = await api.get(`/accountants/${accountantId}/clients`);
```

**Available mock functions:**
- `getAccountants()` / `getAccountant(id)` / `createAccountant()` / `updateAccountant()`
- `getClients()` / `getClient(id)` / `createClient()` / `updateClient()`
- `getInvoices()` / `getSuppliers()` / `getBankStatements()` / `getReports()`
- `getAdminDashboardStats()`
- `getAccountantDashboardStats(accountantId)`
- `getClientDashboardStats(clientId)`

## Reusable Components

### StatCard
Display KPI metrics with trend indicators.
```tsx
<StatCard
  title="Total Clients"
  value={stats.totalClients}
  icon={<Building2 size={24} />}
  color="bg-blue-500"
/>
```

### StatusBadge
Display status labels with color coding.
```tsx
<StatusBadge status="processed" />  // Green
<StatusBadge status="pending" />    // Yellow
<StatusBadge status="active" />     // Green
```

### PageHeader
Page title with optional action button.
```tsx
<PageHeader
  title="Page Title"
  description="Subtitle"
  action={{
    label: 'Add Item',
    onClick: () => {},
    icon: <Plus size={18} />
  }}
/>
```

### DataTable
Sortable, filterable table with selection.
```tsx
<DataTable
  columns={columns}
  data={data}
  isSelectable={true}
  onRowClick={(row) => {}}
  onSort={(columnId, direction) => {}}
/>
```

### UploadZone
Drag-and-drop file upload with progress.
```tsx
<UploadZone
  onFilesSelected={handleFiles}
  acceptedFormats={['.pdf', '.png', '.jpg']}
/>
```

### EmptyState
Display when no data available.
```tsx
<EmptyState
  icon={<FolderOpen size={48} />}
  title="No items"
  description="Try adding your first item"
  action={{ label: 'Create', onClick: () => {} }}
/>
```

## Navigation

### Admin Sidebar
Fixed navigation with admin-specific menu items.
- Dashboard
- Accountants
- Clients
- Settings

### Accountant Sidebar
Dynamic navigation that changes based on selected client:
- Dashboard
- Clients
- **Client-Specific** (when a client is selected):
  - Documents
  - Bank
  - Reports
  - Settings

**Client Selector**: Dropdown in sidebar to switch between assigned clients.

## Implementation Notes

### Protected Routes
All role-specific routes are wrapped with `<ProtectedRoute requiredRole="role">`.
Redirects to `/login` if not authenticated, or `/` if wrong role.

### Client Scoping
When viewing a client workspace:
1. `useClient()` provides `currentClient`
2. All pages receive `clientId` from route params: `/accounts/:clientId`
3. All data queries filter by `clientId`

### Reusing Existing Components
- `InvoiceEditor`: Reused for both single-tenant legacy and client-scoped views
- `Dashboard`, `InvoiceInbox`, etc.: Available in `/legacy` prefix
- New pages adapted for client context without major changes

## Design Principles

### Visual Consistency
- Dark sidebar (slate-900/blue-900) with accent color (indigo-600)
- Clean data tables with proper spacing
- Card-based layouts for better visual hierarchy
- Subtle motion (Framer Motion) for meaningful transitions

### UX Patterns
- Breadcrumbs for navigation clarity
- Empty states with actionable CTAs
- Search + filter combinations for data discovery
- Modals/drawers for forms
- Status badges for quick visual scanning

### Scalability
- Data fetching through service layer (easily swappable)
- Reusable components for consistency
- Type-safe throughout (TypeScript)
- Modular page structure for easy expansion

## Migration Path

### Phase 1: Current State
✅ Multi-role routing structure
✅ Admin workspace with management pages
✅ Accountant workspace with client selection
✅ Client-scoped invoice, bank, reports pages
✅ Reusable components & data table

### Phase 2: Future Enhancements
- Real API integration (replace mock data)
- File upload to backend
- Bank statement AI extraction service
- Report generation engine
- User authentication & session management
- Permission-based row-level security
- Audit logging

### Phase 3: Advanced Features
- Bulk operations (invoice processing, status changes)
- Advanced reporting & analytics
- Client portal (read-only access)
- Notification system
- Workflow automation
- Custom branding per client

## Testing Strategy

### Components
- Test reusable components (DataTable, StatusBadge, etc.) independently
- Mock routing and contexts for isolated component tests

### Pages
- Test pages with mock data
- Verify role-based access control
- Test search/filter functionality
- Test form submissions

### End-to-End
- Test full user journeys (admin managing accountants → accountant viewing client → opening invoice)
- Test role-based UI differences
- Test client switching behavior

## Troubleshooting

### Issue: User can access wrong role's pages
**Solution**: Ensure `<ProtectedRoute requiredRole="role">` wraps all role-specific paths

### Issue: Client data not filtering correctly
**Solution**: Verify `getClients(accountantId)` and `getInvoices(clientId)` are called with correct IDs

### Issue: Client selector not updating sidebar navigation
**Solution**: Check `AccountantLayout` dependency on `currentClient` in `useEffect`

### Issue: Routes not matching
**Solution**: Verify route params (`:clientId`) match page component `useParams()`

## File Naming Conventions

- Page components: `PascalCase` + `Page` suffix (e.g., `AdminDashboard.tsx`)
- Reusable components: `PascalCase` (e.g., `StatCard.tsx`)
- Utility/hook files: `camelCase` (e.g., `ProtectedRoute.tsx`)
- Context files: `PascalCase` + `Context` suffix (e.g., `AuthContext.tsx`)
- Type files: `index.ts` in types folder

## Key Files to Update for Real API

1. `src/app/services/mockData.ts` → Replace with real API calls
2. `src/app/contexts/AuthContext.tsx` → Integrate real auth service
3. `src/app/pages/client/ClientBankPage.tsx` → Integrate file upload & AI service

Good luck with the refactoring! 🚀
