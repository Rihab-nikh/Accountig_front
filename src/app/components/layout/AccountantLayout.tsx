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
} from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useClient } from '../../contexts/ClientContext';
import { useEffect, useState } from 'react';
import { getClients } from '../../services/mockData';
import { Client } from '../../types';

export function AccountantLayout() {
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();
    const { user, logout } = useAuth();
    const { currentClient, setCurrentClient, clients, setClients } = useClient();
    const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
    const [isLoadingClients, setIsLoadingClients] = useState(false);

    useEffect(() => {
        if (!user?.accountantId || clients.length > 0) {
            return;
        }

        let isMounted = true;
        setIsLoadingClients(true);

        getClients(user.accountantId)
            .then((data) => {
                if (!isMounted) {
                    return;
                }

                setClients(data);
                if (data.length > 0 && !currentClient) {
                    setCurrentClient(data[0]);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoadingClients(false);
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

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0F172A] text-white flex flex-col fixed h-full overflow-y-auto">
                <div className="p-6 border-b border-[#1E293B]">
                    <h1 className="text-xl font-semibold">{t.appName}</h1>
                    <p className="text-xs text-[#64748B] mt-1">{t.layout.accountant.workspace}</p>
                </div>

                {/* Client Selector */}
                {clients.length > 0 && (
                    <div className="p-4 border-b border-[#1E293B]">
                        <div className="relative">
                            <button
                                onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#1E293B] hover:bg-[#334155] transition-colors text-sm text-left"
                            >
                                <span className="truncate text-[#E2E8F0]">
                                    {currentClient?.companyName || t.layout.accountant.selectClient}
                                </span>
                                <ChevronDown
                                    size={16}
                                    className={`flex-shrink-0 transition-transform ${isClientDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {isClientDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-[#1E293B] border border-[#334155] rounded-lg shadow-lg z-20">
                                    {clients.map((client) => (
                                        <button
                                            key={client.id}
                                            onClick={() => {
                                                setCurrentClient(client);
                                                setIsClientDropdownOpen(false);
                                            }}
                                            className={`w-full px-3 py-2 text-sm text-left hover:bg-[#334155] transition-colors first:rounded-t-lg last:rounded-b-lg ${currentClient?.id === client.id
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-[#E2E8F0]'
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

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm
                  ${active
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-white'
                                    }
                `}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-[#1E293B]">
                    <p className="text-xs text-[#64748B] truncate">
                        {user?.name}
                    </p>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="flex-1 max-w-xl">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                                size={20}
                            />
                            <Input
                                type="text"
                                placeholder={t.header.searchPlaceholder}
                                className="pl-10 bg-[#F8FAFC] border-gray-200"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Language Switcher */}
                        <div className="flex items-center gap-2 bg-[#F8FAFC] rounded-lg p-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setLanguage('en')}
                                className={`h-8 px-3 ${language === 'en'
                                    ? 'bg-white text-[#0F172A] shadow-sm'
                                    : 'text-[#64748B] hover:text-[#0F172A]'
                                    }`}
                            >
                                EN
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setLanguage('fr')}
                                className={`h-8 px-3 ${language === 'fr'
                                    ? 'bg-white text-[#0F172A] shadow-sm'
                                    : 'text-[#64748B] hover:text-[#0F172A]'
                                    }`}
                            >
                                FR
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setLanguage('ar')}
                                className={`h-8 px-3 ${language === 'ar'
                                    ? 'bg-white text-[#0F172A] shadow-sm'
                                    : 'text-[#64748B] hover:text-[#0F172A]'
                                    }`}
                            >
                                AR
                            </Button>
                        </div>

                        {/* Notifications */}
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bell size={20} className="text-[#64748B]" />
                        </button>

                        {/* Logout */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={logout}
                            className="gap-2 text-[#64748B] hover:text-red-600"
                        >
                            <LogOut size={18} />
                            {t.header.logout}
                        </Button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
