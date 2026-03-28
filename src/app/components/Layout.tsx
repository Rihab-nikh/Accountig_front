import { Link, Outlet, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Inbox,
  Users,
  FileText,
  Settings,
  Search,
  Bell,
  User,
  Languages
} from 'lucide-react';
import { Input } from './ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

export function Layout() {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { path: '/', label: t.nav.dashboard, icon: LayoutDashboard },
    { path: '/invoices', label: t.nav.invoiceInbox, icon: Inbox },
    { path: '/suppliers', label: t.nav.suppliers, icon: Users },
    { path: '/reports', label: t.nav.reports, icon: FileText },
    { path: '/settings', label: t.nav.settings, icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
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
          <p className="text-xs text-[#64748B] mt-1">{t.appTagline}</p>
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
                    ? 'bg-sky-600 text-white'
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
          <div className="text-xs text-[#64748B]">
            {t.common.copyright}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={20} />
              <Input
                type="text"
                placeholder={t.header.searchPlaceholder}
                className="pl-10 bg-[#F8FAFC] border-gray-200 placeholder-gray-500"
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
                aria-label="Switch to English"
                aria-pressed={language === 'en'}
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
                aria-label="Switch to French"
                aria-pressed={language === 'fr'}
                className={`h-8 px-3 ${language === 'fr'
                    ? 'bg-white text-[#0F172A] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
              >
                FR
              </Button>
            </div>

            <button 
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="View notifications"
              title="Notifications"
            >
              <Bell size={20} className="text-[#64748B]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#10B981] rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-[#0F172A]">Sayad Keltoum</div>
                <div className="text-xs text-[#64748B]">{t.header.admin}</div>
              </div>
            </div>
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