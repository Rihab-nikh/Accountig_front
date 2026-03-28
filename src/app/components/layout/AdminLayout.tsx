import { Link, Outlet, useLocation } from 'react-router';
import {
    LayoutDashboard,
    Users,
    Building2,
    Settings,
    Search,
    Bell,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Input } from '../ui/input';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { useState, useMemo } from 'react';
import { UserMenu } from '../UserMenu';

export function AdminLayout() {
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();
    const { logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);

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

    // Check if current page should show search bar
    const showSearchBar = !location.pathname.endsWith('/settings');

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
            <aside className={`bg-white text-text-primary flex flex-col fixed h-full z-40 border-r border-color-border-secondary transition-all duration-200 ${sidebarOpen ? 'w-64' : 'w-20'
                }`}>
                <div className={`px-6 py-8 border-b border-color-border-secondary flex items-center justify-between ${!sidebarOpen && 'px-4'}`}>
                    {sidebarOpen && (
                        <div>
                            <h1 className="text-lg font-bold text-text-primary leading-tight">{t.appName}</h1>
                            <p className="text-xs text-text-tertiary mt-2">{t.layout.admin.subtitle}</p>
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
                                <Icon size={20} />
                                {sidebarOpen && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className={`px-4 py-6 border-t border-color-border-secondary text-xs text-text-tertiary ${!sidebarOpen && 'text-center'}`}>
                    {sidebarOpen ? t.common.copyright : '©'}
                </div>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-200 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-color-border-secondary flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
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
                                <Link to="/admin" className="text-text-secondary hover:text-color-primary transition-colors duration-150 flex items-center gap-2 font-medium">
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
