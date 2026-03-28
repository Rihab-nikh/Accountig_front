import { Link, Outlet, useLocation } from 'react-router';
import {
    LayoutDashboard,
    Users,
    Building2,
    Settings,
    Search,
    Bell,
    LogOut,
} from 'lucide-react';
import { Input } from '../ui/input';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';

export function AdminLayout() {
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();
    const { logout } = useAuth();

    const navItems = [
        { path: '/admin', label: t.nav.dashboard, icon: LayoutDashboard },
        { path: '/admin/accountants', label: t.nav.accountants, icon: Users },
        { path: '/admin/clients', label: t.nav.clients, icon: Building2 },
        { path: '/admin/settings', label: t.nav.settings, icon: Settings },
    ];

    const isActive = (path: string) => {
        if (path === '/admin') {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0F172A] text-white flex flex-col fixed h-full">
                <div className="p-6 border-b border-[#1E293B]">
                    <h1 className="text-xl font-semibold">{t.appName}</h1>
                    <p className="text-xs text-[#64748B] mt-1">{t.layout.admin.subtitle}</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${active
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-white'
                                    }
                `}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-[#1E293B]">
                    <div className="text-xs text-[#64748B]">{t.common.copyright}</div>
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
