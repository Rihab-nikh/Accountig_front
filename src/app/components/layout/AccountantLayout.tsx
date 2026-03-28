import { Link, Outlet, useLocation } from 'react-router';
import {
    LayoutDashboard,
    Inbox,
    FolderOpen,
    Building2,
    BarChart3,
    Settings,
    Search,
    Bell,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Menu,
    X,
    Plug,
} from 'lucide-react';
import { Input } from '../ui/input';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useClient } from '../../contexts/ClientContext';
import { useEffect, useState } from 'react';
import { useIsMobile } from '../ui/use-mobile';
import { UserMenu } from '../UserMenu';
import { getClients } from '../../services/mockData';

export function AccountantLayout() {
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();
    const { user, logout } = useAuth();
    const { currentClient, setCurrentClient, clients, setClients } = useClient();
    const isMobile = useIsMobile();
    const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

    // Auto-collapse sidebar on mobile, auto-expand on desktop
    useEffect(() => {
        setSidebarOpen(!isMobile);
    }, [isMobile]);

    // Load clients for the accountant
    useEffect(() => {
        if (!user?.accountantId || clients.length > 0) {
            return;
        }

        let isMounted = true;

        getClients(user.accountantId)
            .then((data) => {
                if (!isMounted) {
                    return;
                }

                setClients(data);
                if (data.length > 0 && !currentClient) {
                    setCurrentClient(data[0]);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [clients.length, currentClient, setClients, setCurrentClient, user?.accountantId]);

    // Navigation items
    const navItems = [
        { path: '/accountant', label: t.nav.dashboard, icon: LayoutDashboard },
        { path: '/accountant/inbox', label: t.nav.invoiceInbox, icon: Inbox },
        { path: '/accountant/outbox', label: t.nav.outbox, icon: FolderOpen },
        { path: '/accountant/clients', label: t.nav.clients, icon: Building2 },
        { path: '/accountant/integrations', label: t.nav.integrations, icon: Plug },
        { path: '/accountant/bank', label: t.nav.bank, icon: BarChart3 },
        { path: '/accountant/settings', label: t.nav.settings, icon: Settings },
    ];

    const isActive = (path: string) => {
        if (path === '/accountant') {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    // Check if current page should show search bar
    // Hide search bar on settings and other admin pages
    const pagesWithoutSearch = ['/settings', '/admin', '/login'];
    const showSearchBar = !pagesWithoutSearch.some(path => location.pathname.includes(path));

    return (
        <div className="min-h-screen flex">
            {/* Mobile sidebar overlay backdrop */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white shadow-sm transition-all duration-200 ${!sidebarOpen && (isMobile ? '-translate-x-full' : 'w-20')}`}
                aria-label="Sidebar principale"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-6">
                    {sidebarOpen ? (
                        <div className="min-w-0">
                            <h1 className="truncate text-lg font-bold tracking-tight text-slate-900">
                                SmartCompta AI
                            </h1>
                            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                                {t.layout.accountant.workspace}
                            </p>
                        </div>
                    ) : (
                        <div className="flex-1" />
                    )}

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label="Réduire la barre latérale"
                        type="button"
                    >
                        <ChevronLeft size={20} />
                    </button>
                </div>

                {/* Navigation */}
                {sidebarOpen && (
                    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                                        active
                                            ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                                    aria-current={active ? 'page' : undefined}
                                >
                                    <Icon
                                        size={18}
                                        className={`shrink-0 transition ${
                                            active
                                                ? 'text-blue-700'
                                                : 'text-slate-500 group-hover:text-slate-900'
                                        }`}
                                    />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                )}
            </aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-200 ${!isMobile && (sidebarOpen ? 'ml-64' : 'ml-20')}`}>
                {/* Top Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-white/80">
                    {/* Search */}
                    <div className="flex flex-1 items-center gap-4">
                        {isMobile && (
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition hover:text-slate-900 text-slate-600"
                                aria-label="Toggle sidebar"
                            >
                                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        )}
                        <div className="w-full max-w-xl">
                            <label htmlFor="global-search" className="sr-only">Rechercher</label>
                            <div className="relative">
                                <Search
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={18}
                                />
                                <input
                                    id="global-search"
                                    type="text"
                                    placeholder="Rechercher une facture, un fournisseur, un client..."
                                    aria-label="Rechercher"
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="ml-6 flex items-center gap-3">
                        {/* Language switcher */}
                        <div
                            className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1"
                            role="group"
                            aria-label="Choix de langue"
                        >
                            <button
                                type="button"
                                onClick={() => setLanguage('en')}
                                className={`inline-flex h-9 min-w-[42px] items-center justify-center rounded-lg px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                    language === 'en' ? 'bg-blue-600' : 'bg-transparent text-slate-600 hover:bg-white hover:text-slate-900'
                                }`}
                                aria-pressed={language === 'en'}
                            >
                                EN
                            </button>

                            <button
                                type="button"
                                onClick={() => setLanguage('fr')}
                                className={`inline-flex h-9 min-w-[42px] items-center justify-center rounded-lg px-3 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                    language === 'fr' ? 'bg-blue-600 text-white font-semibold' : ''
                                }`}
                                aria-pressed={language === 'fr'}
                            >
                                FR
                            </button>

                            <button
                                type="button"
                                onClick={() => setLanguage('ar')}
                                className={`inline-flex h-9 min-w-[42px] items-center justify-center rounded-lg px-3 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                    language === 'ar' ? 'bg-blue-600 text-white font-semibold' : ''
                                }`}
                                aria-pressed={language === 'ar'}
                            >
                                AR
                            </button>
                        </div>

                        {/* Notifications */}
                        <button
                            type="button"
                            aria-label="Notifications"
                            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
                            <Bell size={19} />
                        </button>

                        {/* User menu */}
                        <div className="relative">
                            <button
                                type="button"
                                aria-label="Menu utilisateur"
                                aria-expanded="false"
                                className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white shadow-sm">
                                    {user?.name.charAt(0).toUpperCase()}
                                </div>

                                <div className="hidden text-left sm:block">
                                    <p className="text-sm font-semibold leading-tight text-slate-900">
                                        {user?.name}
                                    </p>
                                    <p className="text-xs text-slate-500 capitalize">
                                        {user?.role}
                                    </p>
                                </div>

                                <ChevronDown size={16} className="text-slate-400" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8 bg-color-bg-subtle min-h-[calc(100vh-128px)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
