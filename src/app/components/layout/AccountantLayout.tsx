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
    Menu,
    X,
} from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useClient } from '../../contexts/ClientContext';
import { useEffect, useState, useMemo } from 'react';
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
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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

    // Check if current page should show search bar
    // Hide search bar on settings and other admin pages
    const pagesWithoutSearch = ['/settings', '/admin', '/login'];
    const showSearchBar = !pagesWithoutSearch.some(path => location.pathname.includes(path));

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
            {/* Mobile sidebar overlay backdrop */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside className={`bg-white text-text-primary flex flex-col fixed h-full z-40 border-r border-color-border-secondary transition-all duration-200 overflow-y-auto ${sidebarOpen ? (isMobile ? 'w-64' : 'w-64') : (isMobile ? '-translate-x-full' : 'w-20')
                }`}>
                <div className={`px-6 py-8 border-b border-color-border-secondary flex items-center justify-between ${!sidebarOpen && 'px-4'}`}>
                    {sidebarOpen && (
                        <div>
                            <h1 className="text-lg font-bold text-text-primary leading-tight">{t.appName}</h1>
                            <p className="text-xs text-text-tertiary mt-2">{t.layout.accountant.workspace}</p>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-150 text-text-tertiary hover:text-text-primary"
                        aria-label="Toggle sidebar"
                    >
                        {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                </div>

                {/* Client Selector */}
                {clients.length > 0 && sidebarOpen && (
                    <div className="px-4 py-6 border-b border-color-border-secondary">
                        <div className="relative">
                            <button
                                onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-md bg-color-bg-secondary hover:bg-gray-100 transition-colors duration-150 text-sm text-left font-medium"
                            >
                                <span className="truncate text-text-primary">
                                    {currentClient?.companyName || t.layout.accountant.selectClient}
                                </span>
                                <ChevronDown
                                    size={16}
                                    className={`flex-shrink-0 transition-transform duration-150 text-text-tertiary ${isClientDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {isClientDropdownOpen && (
                                <div className="absolute top-full left-4 right-4 mt-2 bg-white border border-color-border-secondary rounded-md shadow-md z-20">
                                    {clients.map((client) => (
                                        <button
                                            key={client.id}
                                            onClick={() => {
                                                setCurrentClient(client);
                                                setIsClientDropdownOpen(false);
                                            }}
                                            className={`w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors duration-150 first:rounded-t-md last:rounded-b-md ${currentClient?.id === client.id
                                                ? 'bg-color-success-light text-color-success font-medium'
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

                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                title={sidebarOpen ? undefined : item.label}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-150 text-sm font-medium
                                    ${active
                                        ? 'bg-color-primary-light text-color-primary'
                                        : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
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
                    <div className="px-4 py-6 border-t border-color-border-secondary relative">
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-150 text-left"
                        >
                            <div className="w-9 h-9 rounded-full bg-color-primary flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                {user?.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-text-primary truncate">{user?.name}</p>
                                <p className="text-xs text-text-tertiary truncate capitalize">{user?.role}</p>
                            </div>
                        </button>

                        {/* User Menu Dropdown */}
                        {isUserMenuOpen && (
                            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-color-border-secondary rounded-md shadow-md z-20">
                                <button
                                    onClick={() => {
                                        setIsUserMenuOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-gray-50 transition-colors duration-150 text-sm first:rounded-t-md"
                                >
                                    <Settings size={16} />
                                    <span>Settings</span>
                                </button>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsUserMenuOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-color-error hover:bg-color-error-bg transition-colors duration-150 text-sm last:rounded-b-md"
                                >
                                    <LogOut size={16} />
                                    <span>Log Out</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-200 ${!isMobile && (sidebarOpen ? 'ml-64' : 'ml-20')}`}>
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-color-border-secondary flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                        {isMobile && (
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 hover:bg-gray-50 rounded-md transition-colors duration-150 text-text-secondary hover:text-text-primary"
                                aria-label="Toggle sidebar"
                            >
                                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        )}
                        {showSearchBar ? (
                            <div className="flex-1 max-w-xl">
                                <div className="relative">
                                    <Search
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
                                        size={20}
                                    />
                                    <Input
                                        type="text"
                                        placeholder={t.header.searchPlaceholder}
                                        className="pl-10 bg-white border-color-border-secondary text-text-primary placeholder:text-text-tertiary"
                                        aria-label="Search"
                                    />
                                </div>
                            </div>
                        ) : (
                            <h2 className="text-lg font-semibold text-text-primary">
                                {navItems.find(item => isActive(item.path))?.label}
                            </h2>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Language Switcher */}
                        <div className="flex items-center gap-1 bg-white rounded-md p-1 border border-color-border-secondary">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setLanguage('en')}
                                className={`h-8 px-3 text-sm ${language === 'en'
                                    ? 'bg-color-primary text-white'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                EN
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setLanguage('fr')}
                                className={`h-8 px-3 text-sm ${language === 'fr'
                                    ? 'bg-color-primary text-white'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                FR
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setLanguage('ar')}
                                className={`h-8 px-3 text-sm ${language === 'ar'
                                    ? 'bg-color-primary text-white'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                AR
                            </Button>
                        </div>

                        {/* Notifications */}
                        <button className="p-2 hover:bg-gray-50 rounded-md transition-colors duration-150 text-text-secondary hover:text-text-primary" aria-label="Notifications">
                            <Bell size={20} />
                        </button>

                        {/* User Menu */}
                        <UserMenu />
                    </div>
                </header>

                {/* Breadcrumbs */}
                {breadcrumbs.length > 0 && (
                    <nav className="h-14 bg-white border-b border-color-border-secondary flex items-center px-8">
                        <ol className="flex items-center gap-3 text-sm">
                            <li>
                                <Link to="/accountant" className="text-text-secondary hover:text-color-primary transition-colors duration-150 flex items-center gap-2 font-medium">
                                    <LayoutDashboard size={16} />
                                    <span>{t.appName}</span>
                                </Link>
                            </li>
                            {breadcrumbs.map((crumb) => (
                                <li key={crumb.href} className="flex items-center gap-3">
                                    <span className="text-text-quaternary">/</span>
                                    <Link
                                        to={crumb.href}
                                        className={`transition-colors duration-150 ${crumb.href === location.pathname
                                            ? 'text-text-primary font-medium'
                                            : 'text-text-secondary hover:text-color-primary'
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
                <main className="p-8 bg-color-bg-subtle min-h-[calc(100vh-128px)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
