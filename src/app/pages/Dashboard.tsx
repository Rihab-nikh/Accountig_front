import { Card } from '../components/ui/card';
import { TrendingUp, FileText, DollarSign, Upload, Clock, CheckCircle, Settings, Building2, BarChart3, PieChart } from 'lucide-react';
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
      priority: 'primary',
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
      priority: 'primary',
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
      priority: 'secondary',
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
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t.dashboard.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t.dashboard.subtitle}
          </p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/inbox')}
            className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
          >
            <Upload className="w-4 h-4" />
            {t.dashboard.uploadInvoice}
          </motion.button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl border bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              kpi.priority === 'primary' ? 'md:col-span-1' : ''
            }`}
            onClick={() => navigate(`/${kpi.action}`)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${kpi.color}`}>
                  <kpi.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {kpi.value} {kpi.unit}
                  </p>
                </div>
              </div>
              <div className={`text-sm font-medium ${
                kpi.trendUp ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-sky-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t.dashboard.charts.monthlySpend}
            </h3>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>{t.dashboard.charts.chartPlaceholder}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-sky-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t.dashboard.charts.expenseBreakdown}
            </h3>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <PieChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>{t.dashboard.charts.chartPlaceholder}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-sky-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t.dashboard.recentActivity}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 px-4 font-medium text-gray-600 dark:text-gray-400">
                      {t.dashboard.table.supplier}
                    </th>
                    <th className="text-left py-2 px-4 font-medium text-gray-600 dark:text-gray-400">
                      {t.dashboard.table.amount}
                    </th>
                    <th className="text-left py-2 px-4 font-medium text-gray-600 dark:text-gray-400">
                      {t.dashboard.table.date}
                    </th>
                    <th className="text-left py-2 px-4 font-medium text-gray-600 dark:text-gray-400">
                      {t.dashboard.table.status}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((activity) => (
                    <tr key={activity.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {activity.supplier}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                        {activity.amount} MAD
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {activity.date}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          activity.status === 'processed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {activity.status === 'processed' ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t.dashboard.quickActions}
            </h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/inbox')}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
              >
                <Upload className="w-5 h-5 text-sky-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {t.dashboard.uploadInvoice}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.dashboard.uploadDescription}
                  </p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/reports')}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
              >
                <FileText className="w-5 h-5 text-sky-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {t.dashboard.viewReports}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.dashboard.reportsDescription}
                  </p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/settings')}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
              >
                <Settings className="w-5 h-5 text-sky-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {t.dashboard.settings}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.dashboard.settingsDescription}
                  </p>
                </div>
              </motion.button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

