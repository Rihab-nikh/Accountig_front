import { Card } from '../components/ui/card';
import { TrendingUp, FileText, DollarSign, Upload, Clock, CheckCircle, Settings, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';

export function Dashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const kpis = [
    {
      title: t.dashboard.kpis.monthlySpend,
      value: '287,450',
      unit: 'MAD',
      trend: '+12.5%',
      trendUp: true,
      icon: DollarSign,
      color: 'bg-sky-600',
      action: 'reports',
    },
    {
      title: t.dashboard.kpis.pendingInvoices,
      value: '23',
      unit: t.dashboard.kpis.invoices,
      trend: `-8 ${t.dashboard.kpis.fromLastWeek}`,
      trendUp: false,
      icon: FileText,
      color: 'bg-sky-600',
      action: 'inbox',
    },
    {
      title: t.dashboard.kpis.vatRecovery,
      value: '57,490',
      unit: 'MAD',
      trend: '+15.2%',
      trendUp: true,
      icon: TrendingUp,
      color: 'bg-sky-600',
      action: 'reports',
    },
  ];

  const recentActivity = [
    { id: 1, supplier: 'Afriquia', amount: '1,250.00', date: '2026-03-28', status: 'processed', category: 'Fuel' },
    { id: 2, supplier: 'Maroc Telecom', amount: '3,890.00', date: '2026-03-27', status: 'processed', category: 'Telecom' },
    { id: 3, supplier: 'LYDEC', amount: '2,340.00', date: '2026-03-27', status: 'pending', category: 'Utilities' },
    { id: 4, supplier: 'Office Depot', amount: '890.50', date: '2026-03-26', status: 'processed', category: 'Supplies' },
    { id: 5, supplier: 'Atlas Rent', amount: '12,500.00', date: '2026-03-26', status: 'processed', category: 'Rent' },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="pt-2">
        <h1 className="text-5xl font-bold text-text-primary leading-tight">{t.dashboard.title}</h1>
        <p className="text-lg text-text-secondary mt-4">{t.dashboard.subtitle}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const handleKpiClick = () => {
            if (kpi.action === 'inbox') {
              navigate('/accountant/inbox');
            } else if (kpi.action === 'reports') {
              navigate('/accountant/reports');
            }
          };

          return (
            <button
              key={index}
              onClick={handleKpiClick}
              className="text-left hover:shadow-lg rounded-lg transition-all duration-200 focus-ring group"
            >
              <Card
                className="p-8 bg-white border border-color-border-secondary rounded-lg shadow-sm hover:shadow-lg hover:border-color-border-primary transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-text-tertiary font-medium mb-3 uppercase tracking-wide">{kpi.title}</p>
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-4xl font-bold text-text-primary">{kpi.value}</h3>
                      <span className="text-base text-text-secondary font-medium">{kpi.unit}</span>
                    </div>
                    <p className={`text-sm font-medium mt-4 ${kpi.trendUp ? 'text-color-success' : 'text-text-secondary'}`}>
                      {kpi.trend}
                    </p>
                  </div>
                  <div className={`${kpi.color} p-4 rounded-lg group-hover:shadow-md transition-shadow duration-200`}>
                    <Icon size={28} className="text-white" />
                  </div>
                </div>
              </Card>
            </button>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-8">{t.dashboard.quickActions || 'Quick Actions'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => navigate('/accountant/inbox')}
            className="p-6 bg-white border border-color-border-secondary rounded-lg hover:shadow-md hover:border-color-border-primary transition-all duration-200 text-left focus-ring group"
          >
            <div className="p-3 bg-color-primary-light rounded-md mb-4 group-hover:bg-color-primary transition-colors duration-200 w-fit">
              <FileText size={24} className="text-color-primary" />
            </div>
            <h3 className="font-semibold text-lg text-text-primary">{t.dashboard.quickActionReview || 'Review Invoices'}</h3>
            <p className="text-base text-text-secondary mt-2">{t.dashboard.quickActionReviewDesc || 'Check pending invoices'}</p>
          </button>

          <button
            onClick={() => navigate('/accountant/reports')}
            className="p-6 bg-white border border-color-border-secondary rounded-lg hover:shadow-md hover:border-color-border-primary transition-all duration-200 text-left focus-ring group"
          >
            <div className="p-3 bg-color-success-light rounded-md mb-4 group-hover:bg-color-success transition-colors duration-200 w-fit">
              <TrendingUp size={24} className="text-color-success" />
            </div>
            <h3 className="font-semibold text-lg text-text-primary">{t.dashboard.quickActionReports || 'View Reports'}</h3>
            <p className="text-base text-text-secondary mt-2">{t.dashboard.quickActionReportsDesc || 'Generate financial reports'}</p>
          </button>

          <button
            onClick={() => navigate('/accountant/settings')}
            className="p-6 bg-white border border-color-border-secondary rounded-lg hover:shadow-md hover:border-color-border-primary transition-all duration-200 text-left focus-ring group"
          >
            <div className="p-3 bg-color-secondary-light rounded-md mb-4 group-hover:bg-color-secondary transition-colors duration-200 w-fit">
              <Settings size={24} className="text-color-secondary" />
            </div>
            <h3 className="font-semibold text-lg text-text-primary">{t.dashboard.quickActionSettings || 'Settings'}</h3>
            <p className="text-base text-text-secondary mt-2">{t.dashboard.quickActionSettingsDesc || 'Manage your account'}</p>
          </button>

          <button
            onClick={() => navigate('/accountant/clients')}
            className="p-6 bg-white border border-color-border-secondary rounded-lg hover:shadow-md hover:border-color-border-primary transition-all duration-200 text-left focus-ring group"
          >
            <div className="p-3 bg-color-warning-light rounded-md mb-4 group-hover:bg-color-warning transition-colors duration-200 w-fit">
              <Building2 size={24} className="text-color-warning" />
            </div>
            <h3 className="font-semibold text-lg text-text-primary">{t.dashboard.quickActionClients || 'Manage Clients'}</h3>
            <p className="text-base text-text-secondary mt-2">{t.dashboard.quickActionClientsDesc || 'View your clients'}</p>
          </button>
        </div>
      </div>

      {/* AI Magic Upload Zone */}
      <Card className="p-10 bg-white border border-color-border-secondary rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-text-primary mb-8">{t.dashboard.upload.title}</h2>

        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          animate={{
            borderColor: isDragging ? 'var(--color-success)' : isProcessing ? 'var(--color-primary)' : 'var(--color-border-secondary)',
            backgroundColor: isDragging ? 'var(--color-success-bg)' : isProcessing ? 'var(--color-primary-light)' : 'var(--color-bg-subtle)',
          }}
          className={`
            border-2 border-dashed rounded-lg p-16
            flex flex-col items-center justify-center
            transition-all cursor-pointer hover:border-color-success hover:bg-color-success-bg
          `}
        >
          {isProcessing ? (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-color-primary border-t-transparent rounded-full"
              />
              <p className="mt-6 text-lg font-semibold text-text-primary">{t.dashboard.upload.processing}</p>
              <p className="text-base text-text-secondary mt-3">{t.dashboard.upload.extracting}</p>
            </motion.div>
          ) : (
            <>
              <div className="w-20 h-20 bg-color-success-bg rounded-lg flex items-center justify-center mb-6">
                <Upload size={40} className="text-color-success" />
              </div>
              <h3 className="text-2xl font-semibold text-text-primary mb-3">
                {t.dashboard.upload.dragDrop}
              </h3>
              <p className="text-text-secondary text-center max-w-md text-base leading-relaxed mb-8">
                {t.dashboard.upload.description}
              </p>
              <button className="px-8 py-3 bg-color-success text-white rounded-md hover:opacity-90 transition-opacity duration-200 font-medium">
                {t.dashboard.upload.browse}
              </button>
            </>
          )}
        </motion.div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-8 bg-white border border-color-border-secondary rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-text-primary mb-8">{t.dashboard.recentActivity.title}</h2>

        <div className="space-y-3">
          {recentActivity.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-5 bg-white hover:bg-color-bg-subtle rounded-lg transition-colors duration-150 border border-color-border-subtle"
            >
              <div className="flex items-center gap-4 flex-1">
                {item.status === 'processed' ? (
                  <CheckCircle size={22} className="text-color-success flex-shrink-0" />
                ) : (
                  <Clock size={22} className="text-color-warning flex-shrink-0" />
                )}

                <div>
                  <p className="font-medium text-text-primary">{item.supplier}</p>
                  <p className="text-sm text-text-tertiary">{item.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <span className="px-4 py-2 bg-color-bg-secondary border border-color-border-secondary rounded-md text-sm font-medium text-text-secondary">
                  {item.category}
                </span>
                <div className="text-right">
                  <p className="font-semibold text-text-primary">{item.amount} MAD</p>
                  <p className={`text-xs font-medium ${item.status === 'processed' ? 'text-color-success' : 'text-color-warning'}`}>
                    {item.status === 'processed' ? t.dashboard.recentActivity.processed : t.dashboard.recentActivity.pending}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}