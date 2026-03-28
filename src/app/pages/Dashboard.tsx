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
      color: 'bg-blue-500',
      action: 'reports',
    },
    {
      title: t.dashboard.kpis.pendingInvoices,
      value: '23',
      unit: t.dashboard.kpis.invoices,
      trend: `-8 ${t.dashboard.kpis.fromLastWeek}`,
      trendUp: false,
      icon: FileText,
      color: 'bg-orange-500',
      action: 'inbox',
    },
    {
      title: t.dashboard.kpis.vatRecovery,
      value: '57,490',
      unit: 'MAD',
      trend: '+15.2%',
      trendUp: true,
      icon: TrendingUp,
      color: 'bg-[#10B981]',
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
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-[#0F172A]">{t.dashboard.title}</h1>
        <p className="text-[#64748B] mt-1">{t.dashboard.subtitle}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              className="text-left hover:ring-2 hover:ring-accent rounded-xl transition-all"
            >
              <Card
                className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-accent transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[#64748B] mb-2">{kpi.title}</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-semibold text-[#0F172A]">{kpi.value}</h3>
                      <span className="text-sm text-[#64748B]">{kpi.unit}</span>
                    </div>
                    <p className={`text-sm mt-2 ${kpi.trendUp ? 'text-[#10B981]' : 'text-[#64748B]'}`}>
                      {kpi.trend}
                    </p>
                  </div>
                  <div className={`${kpi.color} p-3 rounded-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
              </Card>
            </button>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-[#0F172A] mb-4">{t.dashboard.quickActions || 'Quick Actions'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/accountant/inbox')}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all text-left"
          >
            <FileText size={24} className="text-blue-500 mb-2" />
            <h3 className="font-medium text-[#0F172A]">{t.dashboard.quickActionReview || 'Review Invoices'}</h3>
            <p className="text-sm text-[#64748B] mt-1">{t.dashboard.quickActionReviewDesc || 'Check pending invoices'}</p>
          </button>

          <button
            onClick={() => navigate('/accountant/reports')}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-green-300 transition-all text-left"
          >
            <TrendingUp size={24} className="text-green-500 mb-2" />
            <h3 className="font-medium text-[#0F172A]">{t.dashboard.quickActionReports || 'View Reports'}</h3>
            <p className="text-sm text-[#64748B] mt-1">{t.dashboard.quickActionReportsDesc || 'Generate financial reports'}</p>
          </button>

          <button
            onClick={() => navigate('/accountant/settings')}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all text-left"
          >
            <Settings size={24} className="text-purple-500 mb-2" />
            <h3 className="font-medium text-[#0F172A]">{t.dashboard.quickActionSettings || 'Settings'}</h3>
            <p className="text-sm text-[#64748B] mt-1">{t.dashboard.quickActionSettingsDesc || 'Manage your account'}</p>
          </button>

          <button
            onClick={() => navigate('/accountant/clients')}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-orange-300 transition-all text-left"
          >
            <Building2 size={24} className="text-orange-500 mb-2" />
            <h3 className="font-medium text-[#0F172A]">{t.dashboard.quickActionClients || 'Manage Clients'}</h3>
            <p className="text-sm text-[#64748B] mt-1">{t.dashboard.quickActionClientsDesc || 'View your clients'}</p>
          </button>
        </div>
      </div>

      {/* AI Magic Upload Zone */}
      <Card className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-[#0F172A] mb-6">{t.dashboard.upload.title}</h2>

        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          animate={{
            borderColor: isDragging ? '#10B981' : isProcessing ? '#3B82F6' : '#E5E7EB',
            backgroundColor: isDragging ? '#F0FDF4' : isProcessing ? '#EFF6FF' : '#F8FAFC',
          }}
          className={`
            border-2 border-dashed rounded-xl p-12 
            flex flex-col items-center justify-center
            transition-all cursor-pointer hover:border-[#10B981] hover:bg-[#F0FDF4]
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
                className="w-16 h-16 border-4 border-[#3B82F6] border-t-transparent rounded-full"
              />
              <p className="mt-4 text-lg font-medium text-[#0F172A]">{t.dashboard.upload.processing}</p>
              <p className="text-sm text-[#64748B] mt-2">{t.dashboard.upload.extracting}</p>
            </motion.div>
          ) : (
            <>
              <div className="w-16 h-16 bg-[#10B981] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Upload size={32} className="text-[#10B981]" />
              </div>
              <h3 className="text-lg font-medium text-[#0F172A] mb-2">
                {t.dashboard.upload.dragDrop}
              </h3>
              <p className="text-[#64748B] text-center max-w-md">
                {t.dashboard.upload.description}
              </p>
              <button className="mt-6 px-6 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors">
                {t.dashboard.upload.browse}
              </button>
            </>
          )}
        </motion.div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-[#0F172A] mb-6">{t.dashboard.recentActivity.title}</h2>

        <div className="space-y-4">
          {recentActivity.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg hover:bg-[#F1F5F9] transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                {item.status === 'processed' ? (
                  <CheckCircle size={20} className="text-[#10B981]" />
                ) : (
                  <Clock size={20} className="text-orange-500" />
                )}

                <div>
                  <p className="font-medium text-[#0F172A]">{item.supplier}</p>
                  <p className="text-sm text-[#64748B]">{item.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-[#64748B]">
                  {item.category}
                </span>
                <div className="text-right">
                  <p className="font-semibold text-[#0F172A]">{item.amount} MAD</p>
                  <p className={`text-xs ${item.status === 'processed' ? 'text-[#10B981]' : 'text-orange-500'}`}>
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