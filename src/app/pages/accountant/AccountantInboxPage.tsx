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
  Upload,
  Mail,
  Smartphone,
  Eye,
  Edit,
  CloudUpload,
  FileImage,
  File
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHeader } from '../../components/reusable/PageHeader';

interface Invoice {
  id: string;
  supplier: string;
  ice: string;
  date: string;
  amount: number;
  tax: number;
  status: 'in_review' | 'approved' | 'rejected' | 'processing';
  fileType: 'pdf' | 'image' | 'email';
  uploadedAt: string;
  processedAt?: string;
}

export function AccountantInboxPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockInvoices: Invoice[] = [
      {
        id: '1',
        supplier: 'Afriquia',
        ice: '002519191000027',
        date: '2026-03-28',
        amount: 1250.00,
        tax: 200.00,
        status: 'approved',
        fileType: 'pdf',
        uploadedAt: '2026-03-28T10:00:00Z',
        processedAt: '2026-03-28T10:15:00Z'
      },
      {
        id: '2',
        supplier: 'Maroc Telecom',
        ice: '001524011000048',
        date: '2026-03-27',
        amount: 3890.00,
        tax: 622.40,
        status: 'in_review',
        fileType: 'image',
        uploadedAt: '2026-03-27T14:30:00Z'
      },
      {
        id: '3',
        supplier: 'LYDEC',
        ice: '000085468000013',
        date: '2026-03-27',
        amount: 2340.00,
        tax: 374.40,
        status: 'processing',
        fileType: 'email',
        uploadedAt: '2026-03-27T09:15:00Z'
      },
      {
        id: '4',
        supplier: 'Office Depot Maroc',
        ice: '002156847000091',
        date: '2026-03-26',
        amount: 890.50,
        tax: 142.48,
        status: 'approved',
        fileType: 'pdf',
        uploadedAt: '2026-03-26T16:45:00Z',
        processedAt: '2026-03-26T17:00:00Z'
      },
      {
        id: '5',
        supplier: 'Atlas Rent',
        ice: '001678943000062',
        date: '2026-03-26',
        amount: 12500.00,
        tax: 2000.00,
        status: 'rejected',
        fileType: 'image',
        uploadedAt: '2026-03-26T11:20:00Z',
        processedAt: '2026-03-26T11:45:00Z'
      }
    ];
    setInvoices(mockInvoices);
  }, []);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    const matchesSearch = invoice.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.ice.includes(searchQuery) ||
                         invoice.date.includes(searchQuery);
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

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In real app, upload to backend and get processed invoice data
    const newInvoices: Invoice[] = Array.from(files).map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      supplier: 'Processing...',
      ice: '',
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      tax: 0,
      status: 'processing' as const,
      fileType: file.type.includes('pdf') ? 'pdf' : 'image',
      uploadedAt: new Date().toISOString()
    }));

    setInvoices(prev => [...newInvoices, ...prev]);
    setUploading(false);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      in_review: { color: 'bg-blue-100 text-blue-800', label: 'In Review' },
      approved: { color: 'bg-green-100 text-green-800', label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
      processing: { color: 'bg-yellow-100 text-yellow-800', label: 'Processing' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.processing;

    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText size={16} className="text-red-500" />;
      case 'image': return <FileImage size={16} className="text-blue-500" />;
      case 'email': return <Mail size={16} className="text-green-500" />;
      default: return <File size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoice Inbox"
        description="Manage incoming receipts and invoices"
      />

      {/* Upload Section */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <CardContent className="p-8">
          <div
            className={`text-center ${dragActive ? 'bg-blue-50' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <CloudUpload size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload Invoice Documents
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop PDF or image files here, or click to browse
            </p>

            <div className="flex justify-center gap-4 mb-4">
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={uploading}
              >
                <Upload size={16} className="mr-2" />
                Browse Files
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </div>

            <div className="text-sm text-gray-500 space-y-1">
              <p>Accepted formats: PDF, JPG, PNG (max 10MB each)</p>
              <div className="flex justify-center gap-6 mt-2">
                <span className="flex items-center gap-1">
                  <Mail size={14} /> Email forwarding
                </span>
                <span className="flex items-center gap-1">
                  <Smartphone size={14} /> Mobile capture
                </span>
              </div>
            </div>

            {uploading && (
              <div className="mt-4">
                <div className="animate-pulse bg-blue-100 h-2 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full w-1/2 animate-pulse"></div>
                </div>
                <p className="text-sm text-blue-600 mt-2">Processing files...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search by supplier, ICE, or date..."
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
              <option value="processing">Processing</option>
              <option value="in_review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <Button variant="outline">
            <Calendar size={18} className="mr-2" />
            Date Range
          </Button>

          {selectedInvoices.length > 0 && (
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Download size={16} className="mr-2" />
              Export Selected ({selectedInvoices.length})
            </Button>
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Supplier</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tax</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedInvoices.includes(invoice.id)}
                      onCheckedChange={() => toggleInvoice(invoice.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getFileTypeIcon(invoice.fileType)}
                      <span className="text-sm text-gray-600 capitalize">{invoice.fileType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{invoice.supplier}</div>
                      <div className="text-sm text-gray-500">{invoice.ice}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{invoice.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {invoice.amount.toLocaleString('fr-MA', { style: 'currency', currency: 'MAD' })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">
                      {invoice.tax.toLocaleString('fr-MA', { style: 'currency', currency: 'MAD' })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/accountant/invoices/${invoice.id}`)}
                      >
                        <Eye size={14} className="mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/accountant/invoices/${invoice.id}/edit`)}
                        disabled={invoice.status === 'processing'}
                      >
                        <Edit size={14} className="mr-1" />
                        Edit
                      </Button>
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
            <p>No invoices found matching your criteria</p>
          </div>
        )}
      </Card>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Showing {filteredInvoices.length} of {invoices.length} invoices</span>
        <span>{selectedInvoices.length} selected</span>
      </div>
    </div>
  );
}