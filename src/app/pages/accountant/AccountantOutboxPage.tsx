import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import {
  Filter,
  Download,
  FileText,
  Calendar,
  Search,
  Send,
  CheckCircle,
  Clock,
  ExternalLink,
  FileDown,
  Upload,
  Building2
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHeader } from '../../components/reusable/PageHeader';

interface ProcessedInvoice {
  id: string;
  client: string;
  supplier: string;
  amount: number;
  approvalStatus: 'approved' | 'pending_sync' | 'synced' | 'sent';
  approvalDate: string;
  syncDate?: string;
  exportFormat?: 'pdf' | 'csv' | 'accounting';
  integration?: string;
}

interface ExportJob {
  id: string;
  type: 'pending' | 'processing' | 'completed' | 'failed';
  count: number;
  createdAt: string;
  completedAt?: string;
  format: string;
  destination?: string;
}

export function AccountantOutboxPage() {
  const { t } = useLanguage();
  const [invoices, setInvoices] = useState<ProcessedInvoice[]>([]);
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([]);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bulkAction, setBulkAction] = useState<'sync' | 'export' | null>(null);

  // Mock data
  useEffect(() => {
    const mockInvoices: ProcessedInvoice[] = [
      {
        id: '1',
        client: 'TechCorp SARL',
        supplier: 'Afriquia',
        amount: 1250.00,
        approvalStatus: 'synced',
        approvalDate: '2026-03-28T10:15:00Z',
        syncDate: '2026-03-28T10:30:00Z',
        exportFormat: 'accounting',
        integration: 'Xero'
      },
      {
        id: '2',
        client: 'BuildMaster LLC',
        supplier: 'Maroc Telecom',
        amount: 3890.00,
        approvalStatus: 'approved',
        approvalDate: '2026-03-27T15:00:00Z'
      },
      {
        id: '3',
        client: 'GreenEnergy Co',
        supplier: 'LYDEC',
        amount: 2340.00,
        approvalStatus: 'pending_sync',
        approvalDate: '2026-03-27T12:00:00Z'
      },
      {
        id: '4',
        client: 'OfficePlus',
        supplier: 'Office Depot Maroc',
        amount: 890.50,
        approvalStatus: 'sent',
        approvalDate: '2026-03-26T17:00:00Z',
        syncDate: '2026-03-26T17:15:00Z',
        exportFormat: 'pdf'
      }
    ];

    const mockJobs: ExportJob[] = [
      {
        id: 'job-1',
        type: 'completed',
        count: 5,
        createdAt: '2026-03-28T09:00:00Z',
        completedAt: '2026-03-28T09:05:00Z',
        format: 'CSV',
        destination: 'Client Portal'
      },
      {
        id: 'job-2',
        type: 'processing',
        count: 12,
        createdAt: '2026-03-27T14:00:00Z',
        format: 'Xero Integration'
      },
      {
        id: 'job-3',
        type: 'pending',
        count: 3,
        createdAt: '2026-03-27T16:00:00Z',
        format: 'PDF Export'
      }
    ];

    setInvoices(mockInvoices);
    setExportJobs(mockJobs);
  }, []);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = filterStatus === 'all' || invoice.approvalStatus === filterStatus;
    const matchesSearch = invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const toggleInvoice = (id: string) => {
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

  const handleBulkSync = async () => {
    setBulkAction('sync');
    // Simulate bulk sync
    await new Promise(resolve => setTimeout(resolve, 2000));

    setInvoices(prev =>
      prev.map(inv =>
        selectedInvoices.includes(inv.id)
          ? { ...inv, approvalStatus: 'synced' as const, syncDate: new Date().toISOString() }
          : inv
      )
    );

    setSelectedInvoices([]);
    setBulkAction(null);
  };

  const handleBulkExport = async (format: 'pdf' | 'csv') => {
    setBulkAction('export');
    // Simulate bulk export
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newJob: ExportJob = {
      id: `job-${Date.now()}`,
      type: 'completed',
      count: selectedInvoices.length,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      format: format.toUpperCase(),
      destination: 'Download'
    };

    setExportJobs(prev => [newJob, ...prev]);
    setSelectedInvoices([]);
    setBulkAction(null);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { color: 'bg-green-100 text-green-800', label: 'Approved', icon: CheckCircle },
      pending_sync: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending Sync', icon: Clock },
      synced: { color: 'bg-blue-100 text-blue-800', label: 'Synced', icon: ExternalLink },
      sent: { color: 'bg-purple-100 text-purple-800', label: 'Sent', icon: Send }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.approved;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} border-0`}>
        <Icon size={12} className="mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getJobStatusBadge = (type: string) => {
    const statusConfig = {
      pending: { color: 'bg-gray-100 text-gray-800', label: 'Pending' },
      processing: { color: 'bg-yellow-100 text-yellow-800', label: 'Processing' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
      failed: { color: 'bg-red-100 text-red-800', label: 'Failed' }
    };

    const config = statusConfig[type as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Processed Documents"
        description="Approved invoices ready for export and sync"
      />

      {/* Export Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload size={20} />
            Export Queue
          </CardTitle>
          <CardDescription>
            Documents awaiting export and recently exported files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exportJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileDown size={20} className="text-gray-500" />
                  <div>
                    <div className="font-medium">{job.format} Export</div>
                    <div className="text-sm text-gray-600">
                      {job.count} documents • {new Date(job.createdAt).toLocaleString()}
                      {job.destination && ` • ${job.destination}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getJobStatusBadge(job.type)}
                  {job.type === 'completed' && (
                    <Button size="sm" variant="outline">
                      <Download size={14} className="mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Bulk Actions */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search by client or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending_sync">Pending Sync</option>
              <option value="synced">Synced</option>
              <option value="sent">Sent</option>
            </select>
          </div>

          <Button variant="outline">
            <Calendar size={18} className="mr-2" />
            Date Range
          </Button>

          {selectedInvoices.length > 0 && (
            <div className="flex gap-2">
              <Button
                onClick={handleBulkSync}
                disabled={bulkAction === 'sync'}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send size={16} className="mr-2" />
                Sync Selected ({selectedInvoices.length})
              </Button>
              <Button
                variant="outline"
                onClick={() => handleBulkExport('pdf')}
                disabled={bulkAction === 'export'}
              >
                <FileDown size={16} className="mr-2" />
                Export PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => handleBulkExport('csv')}
                disabled={bulkAction === 'export'}
              >
                <Download size={16} className="mr-2" />
                Export CSV
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Invoice Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <Checkbox
                    checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Supplier</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Approval Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedInvoices.includes(invoice.id)}
                      onCheckedChange={() => toggleInvoice(invoice.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-gray-500" />
                      <span className="font-medium text-gray-900">{invoice.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{invoice.supplier}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {invoice.amount.toLocaleString('fr-MA', { style: 'currency', currency: 'MAD' })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(invoice.approvalStatus)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">
                      {new Date(invoice.approvalDate).toLocaleDateString()}
                    </span>
                    {invoice.syncDate && (
                      <div className="text-sm text-gray-500">
                        Synced: {new Date(invoice.syncDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {invoice.approvalStatus === 'approved' && (
                        <Button size="sm" variant="outline">
                          <Send size={14} className="mr-1" />
                          Sync
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <FileDown size={14} className="mr-1" />
                        Export
                      </Button>
                      {invoice.integration && (
                        <Badge variant="outline" className="text-xs">
                          {invoice.integration}
                        </Badge>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p>No processed invoices found matching your criteria</p>
          </div>
        )}
      </Card>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Showing {filteredInvoices.length} of {invoices.length} processed invoices</span>
        <span>{selectedInvoices.length} selected</span>
      </div>

      {/* Integration Info */}
      <Alert>
        <ExternalLink className="h-4 w-4" />
        <AlertDescription>
          Connect your accounting software in the Integrations section to enable automatic syncing.
          Supports 30+ accounting systems including Xero, QuickBooks, Sage, and 500+ banks.
        </AlertDescription>
      </Alert>
    </div>
  );
}