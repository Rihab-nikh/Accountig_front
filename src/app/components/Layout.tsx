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
  Languages,
  ChevronRight
} from 'lucide-react';
import { Input } from './ui/input';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

export function Layout() {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { path: '/', label: t.nav.dashboard, icon: LayoutDashboard, group: 'main' },
    { path: '/invoices', label: t.nav.invoiceInbox, icon: Inbox, group: 'documents' },
    { path: '/suppliers', label: t.nav.suppliers, icon: Users, group: 'documents' },
    { path: '/reports', label: t.nav.reports, icon: FileText, group: 'reports' },
    { path: '/settings', label: t.nav.settings, icon: Settings, group: 'settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Generate breadcrumb
  const getBreadcrumb = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: t.nav.dashboard, path: '/' }];
    
    if (pathSegments.length > 0) {
      const currentItem = navItems.find(item => item.path === `/${pathSegments[0]}`);
      if (currentItem) {
        breadcrumbs.push({ label: currentItem.label, path: currentItem.path });
      }
    }
    
    return breadcrumbs;
  };

  return (
    <div className="min-h-screen flex" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sky-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Sidebar */}
      <aside className="w-72 bg-[#0F172A] text-white flex flex-col fixed h-full left-0 rtl:left-auto rtl:right-0">
        <div className="p-6 border-b border-[#1E293B]">
          <h1 className="text-xl font-semibold">{t.appName}</h1>
          <p className="text-xs text-[#64748B] mt-1">{t.appTagline}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${active
                    ? 'bg-sky-600 text-white shadow-lg border-l-4 border-sky-400'
                    : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-white hover:translate-x-1'
                  }
                `}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={20} aria-hidden="true" />
                <span className="font-medium">{item.label}</span>
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
      <div className="flex-1 ml-72 rtl:ml-0 rtl:mr-72">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={20} aria-hidden="true" />
              <Input
                type="text"
                placeholder={t.header.searchPlaceholder}
                className="pl-10 bg-[#F8FAFC] border-gray-200 placeholder-gray-500"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-0 bg-transparent">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage('en')}
                aria-label="Switch to English"
                aria-pressed={language === 'en'}
                className={`h-8 px-3 rounded-none border-b-2 transition-colors ${language === 'en'
                    ? 'text-[#0F172A] border-b-sky-600'
                    : 'text-[#64748B] border-b-transparent hover:text-[#0F172A]'
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
                className={`h-8 px-3 rounded-none border-b-2 transition-colors ${language === 'fr'
                    ? 'text-[#0F172A] border-b-sky-600'
                    : 'text-[#64748B] border-b-transparent hover:text-[#0F172A]'
                  }`}
              >
                FR
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage('ar')}
                aria-label="Switch to Arabic"
                aria-pressed={language === 'ar'}
                className={`h-8 px-3 rounded-none border-b-2 transition-colors ${language === 'ar'
                    ? 'text-[#0F172A] border-b-sky-600'
                    : 'text-[#64748B] border-b-transparent hover:text-[#0F172A]'
                  }`}
              >
                AR
              </Button>
            </div>

            <button 
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              aria-label="View notifications"
              title="Notifications"
            >
              <Bell size={20} className="text-[#64748B]" aria-hidden="true" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#10B981] rounded-full" aria-hidden="true"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center">
                <User size={20} className="text-white" aria-hidden="true" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-[#0F172A]">Sayad Keltoum</div>
                <div className="text-xs text-[#64748B]">{t.header.admin}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="px-8 py-4 bg-gray-50 border-b border-gray-200">
          <ol className="flex items-center space-x-2 text-sm">
            {getBreadcrumb().map((crumb, index) => (
              <li key={crumb.path} className="flex items-center">
                {index > 0 && <ChevronRight size={16} className="text-gray-400 mx-2" aria-hidden="true" />}
                {index === getBreadcrumb().length - 1 ? (
                  <span className="text-gray-900 font-medium" aria-current="page">{crumb.label}</span>
                ) : (
                  <Link to={crumb.path} className="text-gray-600 hover:text-gray-900 transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Page Content */}
        <main id="main-content" className="p-8" role="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}