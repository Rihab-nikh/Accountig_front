import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { 
  Filter, 
  Download, 
  FileText, 
  Calendar,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';

interface Invoice {
  id: number;
  preview: string;
  supplier: string;
  ice: string;
  date: string;
  totalTTC: string;
  category: string;
  status: 'processed' | 'pending' | 'review';
}

export function InvoiceInbox() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const invoices: Invoice[] = [
    { 
      id: 1, 
      preview: '📄', 
      supplier: 'Afriquia', 
      ice: '002519191000027', 
      date: '2026-03-28', 
      totalTTC: '1,250.00', 
      category: 'Fuel', 
      status: 'processed' 
    },
    { 
      id: 2, 
      preview: '📄', 
      supplier: 'Maroc Telecom', 
      ice: '001524011000048', 
      date: '2026-03-27', 
      totalTTC: '3,890.00', 
      category: 'Telecom', 
      status: 'processed' 
    },
    { 
      id: 3, 
      preview: '📄', 
      supplier: 'LYDEC', 
      ice: '000085468000013', 
      date: '2026-03-27', 
      totalTTC: '2,340.00', 
      category: 'Utilities', 
      status: 'pending' 
    },
    { 
      id: 4, 
      preview: '📄', 
      supplier: 'Office Depot Maroc', 
      ice: '002156847000091', 
      date: '2026-03-26', 
      totalTTC: '890.50', 
      category: 'Supplies', 
      status: 'processed' 
    },
    { 
      id: 5, 
      preview: '📄', 
      supplier: 'Atlas Rent', 
      ice: '001678943000062', 
      date: '2026-03-26', 
      totalTTC: '12,500.00', 
      category: 'Rent', 
      status: 'review' 
    },
    { 
      id: 6, 
      preview: '📄', 
      supplier: 'SAMIR Restaurant', 
      ice: '001234567000083', 
      date: '2026-03-25', 
      totalTTC: '450.00', 
      category: 'Meals', 
      status: 'processed' 
    },
    { 
      id: 7, 
      preview: '📄', 
      supplier: 'HP Morocco', 
      ice: '002987654000047', 
      date: '2026-03-24', 
      totalTTC: '8,900.00', 
      category: 'IT Equipment', 
      status: 'pending' 
    },
    { 
      id: 8, 
      preview: '📄', 
      supplier: 'La Poste Maroc', 
      ice: '000123456000029', 
      date: '2026-03-24', 
      totalTTC: '340.00', 
      category: 'Shipping', 
      status: 'processed' 
    },
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    const matchesSearch = invoice.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.ice.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const toggleInvoice = (id: number) => {
    setSelectedInvoices(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(filteredInvoices.map(inv => inv.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-[#10B981] text-white';
      case 'pending': return 'bg-orange-500 text-white';
      case 'review': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'processed': return t.invoiceInbox.filters.processed;
      case 'pending': return t.invoiceInbox.filters.pending;
      case 'review': return t.invoiceInbox.filters.review;
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#0F172A]">{t.invoiceInbox.title}</h1>
          <p className="text-[#64748B] mt-1">{t.invoiceInbox.subtitle}</p>
        </div>
        
        {selectedInvoices.length > 0 && (
          <Button className="bg-[#10B981] hover:bg-[#059669] text-white">
            <Download size={16} className="mr-2" />
            {t.invoiceInbox.exportSelected} ({selectedInvoices.length})
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
              <Input
                type="text"
                placeholder={t.invoiceInbox.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#F8FAFC]"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-[#64748B]" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            >
              <option value="all">{t.invoiceInbox.filters.allStatus}</option>
              <option value="processed">{t.invoiceInbox.filters.processed}</option>
              <option value="pending">{t.invoiceInbox.filters.pending}</option>
              <option value="review">{t.invoiceInbox.filters.review}</option>
            </select>
          </div>
          
          <Button variant="outline" className="border-gray-200">
            <Calendar size={18} className="mr-2" />
            {t.invoiceInbox.filters.dateRange}
          </Button>
        </div>
      </Card>

      {/* Invoice Table */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <Checkbox
                    checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">{t.invoiceInbox.table.preview}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">{t.invoiceInbox.table.supplier}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">{t.invoiceInbox.table.ice}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">{t.invoiceInbox.table.date}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">{t.invoiceInbox.table.totalTTC}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">{t.invoiceInbox.table.category}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">{t.invoiceInbox.table.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr 
                  key={invoice.id} 
                  className="hover:bg-[#F8FAFC] cursor-pointer transition-colors"
                  onClick={() => navigate(`/invoices/${invoice.id}`)}
                >
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedInvoices.includes(invoice.id)}
                      onCheckedChange={() => toggleInvoice(invoice.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-10 h-10 bg-[#F8FAFC] rounded-lg flex items-center justify-center border border-gray-200">
                      <FileText size={20} className="text-[#64748B]" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#0F172A]">{invoice.supplier}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-[#64748B]">{invoice.ice}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#64748B]">{invoice.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[#0F172A]">{invoice.totalTTC}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="border-gray-200">
                      {invoice.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusColor(invoice.status)}>
                      {getStatusLabel(invoice.status)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredInvoices.length === 0 && (
          <div className="py-12 text-center text-[#64748B]">
            {t.invoiceInbox.noInvoices}
          </div>
        )}
      </Card>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-[#64748B]">
        <span>{t.invoiceInbox.showing} {filteredInvoices.length} {t.invoiceInbox.of} {invoices.length} {t.invoiceInbox.invoices}</span>
        <span>{selectedInvoices.length} {t.invoiceInbox.selected}</span>
      </div>
    </div>
  );
}