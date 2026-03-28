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
    LogOut,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useClient } from '../../contexts/ClientContext';
import { useEffect, useState, useMemo } from 'react';
import { getClients } from '../../services/mockData';

export function AccountantLayout() {
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();
    const { user, logout } = useAuth();
    const { currentClient, setCurrentClient, clients, setClients } = useClient();
    const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

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

    // Navigation items depend on whether a client is selected
    const baseNavItems = [
        { path: '/accountant', label: t.nav.dashboard, icon: LayoutDashboard },
        { path: '/accountant/clients', label: t.nav.clients, icon: FolderOpen },
        { path: '/accountant/settings', label: t.nav.settings, icon: Settings },
    ];

    const clientNavItems = currentClient
        ? [
            {
                path: `/accountant/clients/${currentClient.id}/invoices`,
                label: t.nav.documents,
                icon: Inbox,
            },
            {
                path: `/accountant/clients/${currentClient.id}/bank`,
                label: t.nav.bank,
                icon: Building2,
            },
            {
                path: `/accountant/clients/${currentClient.id}/reports`,
                label: t.nav.reports,
                icon: BarChart3,
            },
        ]
        : [];

    const navItems = currentClient ? [...baseNavItems, ...clientNavItems] : baseNavItems;

    const isActive = (path: string) => {
        if (path === '/accountant') {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    // Generate breadcrumbs from current path
    const breadcrumbs = useMemo(() => {
        const pathParts = location.pathname.split('/').filter(Boolean);
        if (pathParts.length <= 1) return [];

        return pathParts.slice(1).map((part, index) => {
            const label = navItems.find(item => item.path.includes(part))?.label || part;
            const href = '/' + pathParts.slice(0, index + 2).join('/');
            return { label, href };
        });
    }, [location.pathname, navItems]);

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className={`bg-background-primary text-text-primary flex flex-col fixed h-full z-40 border-r border-border transition-all duration-300 overflow-y-auto ${sidebarOpen ? 'w-64' : 'w-20'
                }`}>
                <div className={`p-6 border-b border-border flex items-center justify-between ${!sidebarOpen && 'px-4'}`}>
                    {sidebarOpen && (
                        <div>
                            <h1 className="text-lg font-bold text-text-primary">{t.appName}</h1>
                            <p className="text-xs text-text-secondary mt-1">{t.layout.accountant.workspace}</p>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-background-secondary rounded-lg transition-colors text-text-secondary hover:text-text-primary"
                        aria-label="Toggle sidebar"
                    >
                        {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                </div>

                {/* Client Selector */}
                {clients.length > 0 && sidebarOpen && (
                    <div className="p-4 border-b border-border">
                        <div className="relative">
                            <button
                                onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-background-secondary hover:bg-background-secondary/80 transition-colors text-sm text-left"
                            >
                                <span className="truncate text-text-primary font-medium">
                                    {currentClient?.companyName || t.layout.accountant.selectClient}
                                </span>
                                <ChevronDown
                                    size={16}
                                    className={`flex-shrink-0 transition-transform ${isClientDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {isClientDropdownOpen && (
                                <div className="absolute top-full left-4 right-4 mt-1 bg-background-secondary border border-border rounded-lg shadow-lg z-20">
                                    {clients.map((client) => (
                                        <button
                                            key={client.id}
                                            onClick={() => {
                                                setCurrentClient(client);
                                                setIsClientDropdownOpen(false);
                                            }}
                                            className={`w-full px-3 py-2 text-sm text-left hover:bg-background-tertiary transition-colors first:rounded-t-lg last:rounded-b-lg ${currentClient?.id === client.id
                                                ? 'bg-accent text-white'
                                                : 'text-text-primary'
                                                }`}
                                        >
                                            {client.companyName}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                title={sidebarOpen ? undefined : item.label}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium
                                    ${active
                                        ? 'bg-accent text-white'
                                        : 'text-text-secondary hover:bg-background-secondary hover:text-text-primary'
                                    }
                                `}
                            >
                                <Icon size={18} />
                                {sidebarOpen && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {sidebarOpen && (
                    <div className="p-4 border-t border-border">
                        <p className="text-xs text-text-tertiary truncate">
                            {user?.name}
                        </p>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Top Header */}
                <header className="h-16 bg-background-secondary border-b border-border flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
                    <div className="flex-1 max-w-xl">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
                                size={20}
                            />
                            <Input
                                type="text"
                                placeholder={t.header.searchPlaceholder}
                                className="pl-10 bg-background-primary border-border text-text-primary placeholder:text-text-tertiary"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Language Switcher */}
                        <div className="flex items-center gap-2 bg-background-primary rounded-lg p-1 border border-border">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setLanguage('en')}
                                className={`h-8 px-3 ${language === 'en'
                                    ? 'bg-accent text-white'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                EN
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setLanguage('fr')}
                                className={`h-8 px-3 ${language === 'fr'
                                    ? 'bg-accent text-white'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                FR
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setLanguage('ar')}
                                className={`h-8 px-3 ${language === 'ar'
                                    ? 'bg-accent text-white'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                AR
                            </Button>
                        </div>

                        {/* Notifications */}
                        <button className="p-2 hover:bg-background-primary rounded-lg transition-colors text-text-secondary hover:text-text-primary" aria-label="Notifications">
                            <Bell size={20} />
                        </button>

                        {/* Logout */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={logout}
                            className="gap-2 text-text-secondary hover:text-error"
                        >
                            <LogOut size={18} />
                            {t.header.logout}
                        </Button>
                    </div>
                </header>

                {/* Breadcrumbs */}
                {breadcrumbs.length > 0 && (
                    <nav className="h-12 bg-background-primary border-b border-border flex items-center px-8">
                        <ol className="flex items-center gap-2 text-sm">
                            <li>
                                <Link to="/accountant" className="text-text-secondary hover:text-accent transition-colors flex items-center gap-2">
                                    <LayoutDashboard size={16} />
                                    <span>{t.appName}</span>
                                </Link>
                            </li>
                            {breadcrumbs.map((crumb) => (
                                <li key={crumb.href} className="flex items-center gap-2">
                                    <span className="text-text-tertiary">/</span>
                                    <Link
                                        to={crumb.href}
                                        className={`transition-colors ${crumb.href === location.pathname
                                            ? 'text-text-primary font-medium'
                                            : 'text-text-secondary hover:text-accent'
                                            }`}
                                    >
                                        {crumb.label}
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                {/* Page Content */}
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
