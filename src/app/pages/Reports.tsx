import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Download, FileSpreadsheet, FileText, Cloud } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

export function Reports() {
  const { t } = useLanguage();
  
  const monthlySpendingData = [
    { month: 'Jan', spending: 245000 },
    { month: 'Feb', spending: 268000 },
    { month: 'Mar', spending: 287450 },
  ];

  const vatBreakdown = [
    { category: 'Fuel', collected: 8500, recoverable: 8500 },
    { category: 'Telecom', collected: 5670, recoverable: 5670 },
    { category: 'Utilities', collected: 3890, recoverable: 3890 },
    { category: 'Supplies', collected: 2340, recoverable: 2340 },
    { category: 'Rent', collected: 25000, recoverable: 25000 },
    { category: 'IT Equipment', collected: 7890, recoverable: 7890 },
    { category: 'Meals', collected: 450, recoverable: 350 },
    { category: 'Shipping', collected: 750, recoverable: 750 },
  ];

  const totalCollected = vatBreakdown.reduce((sum, item) => sum + item.collected, 0);
  const totalRecoverable = vatBreakdown.reduce((sum, item) => sum + item.recoverable, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-[#0F172A]">{t.reports.title}</h1>
        <p className="text-[#64748B] mt-1">{t.reports.subtitle}</p>
      </div>

      {/* Export Actions */}
      <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">{t.reports.export.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button className="bg-[#10B981] hover:bg-[#059669] text-white h-auto py-4 flex-col gap-2">
            <FileSpreadsheet size={24} />
            <span>{t.reports.export.excel}</span>
          </Button>
          
          <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white h-auto py-4 flex-col gap-2">
            <FileText size={24} />
            <span>{t.reports.export.pdf}</span>
          </Button>
          
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-auto py-4 flex-col gap-2">
            <Cloud size={24} />
            <span>{t.reports.export.sage}</span>
          </Button>
          
          <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white h-auto py-4 flex-col gap-2">
            <Cloud size={24} />
            <span>{t.reports.export.quickbooks}</span>
          </Button>
        </div>
      </Card>

      {/* Monthly Spending Chart */}
      <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[#0F172A]">{t.reports.monthlySpending.title}</h2>
            <p className="text-sm text-[#64748B] mt-1">{t.reports.monthlySpending.subtitle}</p>
          </div>
          <Button variant="outline" size="sm" className="border-gray-200">
            <Download size={16} className="mr-2" />
            {t.reports.monthlySpending.download}
          </Button>
        </div>
        
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlySpendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#64748B"
                style={{ fontSize: '14px' }}
              />
              <YAxis 
                stroke="#64748B"
                style={{ fontSize: '14px' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [`${value.toLocaleString()} MAD`, 'Spending']}
              />
              <Bar 
                dataKey="spending" 
                fill="#10B981" 
                radius={[8, 8, 0, 0]}
                maxBarSize={80}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* VAT Breakdown */}
      <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[#0F172A]">{t.reports.vatBreakdown.title}</h2>
            <p className="text-sm text-[#64748B] mt-1">{t.reports.vatBreakdown.subtitle}</p>
          </div>
          <Button variant="outline" size="sm" className="border-gray-200">
            <Download size={16} className="mr-2" />
            {t.reports.monthlySpending.download}
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#F8FAFC] rounded-lg p-4">
            <p className="text-sm text-[#64748B] mb-1">{t.reports.vatBreakdown.totalCollected}</p>
            <p className="text-2xl font-semibold text-[#0F172A]">{totalCollected.toLocaleString()} MAD</p>
          </div>
          <div className="bg-[#10B981] bg-opacity-10 rounded-lg p-4">
            <p className="text-sm text-[#059669] mb-1">{t.reports.vatBreakdown.totalRecoverable}</p>
            <p className="text-2xl font-semibold text-[#059669]">{totalRecoverable.toLocaleString()} MAD</p>
          </div>
        </div>
        
        {/* VAT Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#0F172A]">{t.reports.vatBreakdown.table.category}</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-[#0F172A]">{t.reports.vatBreakdown.table.collected}</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-[#0F172A]">{t.reports.vatBreakdown.table.recoverable}</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-[#0F172A]">{t.reports.vatBreakdown.table.recoveryRate}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vatBreakdown.map((item) => {
                const recoveryRate = ((item.recoverable / item.collected) * 100).toFixed(0);
                
                return (
                  <tr key={item.category} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-[#0F172A]">{item.category}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-[#64748B]">
                      {item.collected.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-[#10B981]">
                        {item.recoverable.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`
                        px-3 py-1 rounded-full text-sm font-medium
                        ${recoveryRate === '100' 
                          ? 'bg-[#10B981] text-white' 
                          : 'bg-orange-100 text-orange-700'
                        }
                      `}>
                        {recoveryRate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-[#F8FAFC] border-t-2 border-gray-200">
              <tr>
                <td className="px-6 py-4 font-semibold text-[#0F172A]">{t.reports.vatBreakdown.table.total}</td>
                <td className="px-6 py-4 text-right font-semibold text-[#0F172A]">
                  {totalCollected.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right font-semibold text-[#10B981]">
                  {totalRecoverable.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="px-3 py-1 bg-[#10B981] text-white rounded-full text-sm font-medium">
                    {((totalRecoverable / totalCollected) * 100).toFixed(0)}%
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
}