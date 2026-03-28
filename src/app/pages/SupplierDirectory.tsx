import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Building2, Phone, Mail, MapPin, Search, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Supplier {
  id: number;
  name: string;
  logo: string;
  ice: string;
  totalSpentYTD: string;
  defaultCategory: string;
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
  };
}

export function SupplierDirectory() {
  const { t } = useLanguage();
  
  const suppliers: Supplier[] = [
    {
      id: 1,
      name: 'Afriquia',
      logo: '⛽',
      ice: '002519191000027',
      totalSpentYTD: '45,890',
      defaultCategory: 'Fuel',
      contact: {
        phone: '+212 5XX-XXXXXX',
        email: 'contact@afriquia.ma',
        address: 'Casablanca, Morocco',
      },
    },
    {
      id: 2,
      name: 'Maroc Telecom',
      logo: '📱',
      ice: '001524011000048',
      totalSpentYTD: '28,450',
      defaultCategory: 'Telecom',
      contact: {
        phone: '+212 5XX-XXXXXX',
        email: 'business@iam.ma',
        address: 'Rabat, Morocco',
      },
    },
    {
      id: 3,
      name: 'LYDEC',
      logo: '⚡',
      ice: '000085468000013',
      totalSpentYTD: '18,900',
      defaultCategory: 'Utilities',
      contact: {
        email: 'contact@lydec.ma',
        address: 'Casablanca, Morocco',
      },
    },
    {
      id: 4,
      name: 'Office Depot Maroc',
      logo: '📎',
      ice: '002156847000091',
      totalSpentYTD: '12,340',
      defaultCategory: 'Supplies',
      contact: {
        phone: '+212 5XX-XXXXXX',
        email: 'business@officedepot.ma',
      },
    },
    {
      id: 5,
      name: 'Atlas Rent',
      logo: '🏢',
      ice: '001678943000062',
      totalSpentYTD: '150,000',
      defaultCategory: 'Rent',
      contact: {
        phone: '+212 5XX-XXXXXX',
        address: 'Casablanca, Morocco',
      },
    },
    {
      id: 6,
      name: 'HP Morocco',
      logo: '💻',
      ice: '002987654000047',
      totalSpentYTD: '34,500',
      defaultCategory: 'IT Equipment',
      contact: {
        email: 'morocco@hp.com',
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#0F172A]">{t.suppliers.title}</h1>
          <p className="text-[#64748B] mt-1">{t.suppliers.subtitle}</p>
        </div>
        
        <Button className="bg-[#10B981] hover:bg-[#059669] text-white">
          <Plus size={18} className="mr-2" />
          {t.suppliers.addSupplier}
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
          <Input
            type="text"
            placeholder={t.suppliers.searchPlaceholder}
            className="pl-10 bg-[#F8FAFC]"
          />
        </div>
      </Card>

      {/* Supplier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Card 
            key={supplier.id}
            className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-[#10B981] cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center text-3xl shadow-sm">
                {supplier.logo}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#0F172A] truncate">{supplier.name}</h3>
                <p className="font-mono text-xs text-[#64748B] mt-1">{supplier.ice}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-[#F8FAFC] rounded-lg p-4 mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-[#0F172A]">{supplier.totalSpentYTD}</span>
                <span className="text-sm text-[#64748B]">MAD</span>
              </div>
              <p className="text-xs text-[#64748B] mt-1">{t.suppliers.totalSpentYTD}</p>
            </div>

            {/* Category */}
            <div className="mb-4">
              <p className="text-xs text-[#64748B] mb-2">{t.suppliers.defaultCategory}</p>
              <Badge className="bg-[#10B981] text-white">
                {supplier.defaultCategory}
              </Badge>
            </div>

            {/* Contact Info */}
            {supplier.contact && (
              <div className="space-y-2 pt-4 border-t border-gray-200">
                {supplier.contact.phone && (
                  <div className="flex items-center gap-2 text-sm text-[#64748B]">
                    <Phone size={14} />
                    <span>{supplier.contact.phone}</span>
                  </div>
                )}
                {supplier.contact.email && (
                  <div className="flex items-center gap-2 text-sm text-[#64748B]">
                    <Mail size={14} />
                    <span className="truncate">{supplier.contact.email}</span>
                  </div>
                )}
                {supplier.contact.address && (
                  <div className="flex items-center gap-2 text-sm text-[#64748B]">
                    <MapPin size={14} />
                    <span>{supplier.contact.address}</span>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="p-6 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-[#94A3B8] text-sm mb-1">{t.suppliers.summary.totalSuppliers}</p>
            <p className="text-3xl font-semibold">{suppliers.length}</p>
          </div>
          <div>
            <p className="text-[#94A3B8] text-sm mb-1">{t.suppliers.summary.totalSpend}</p>
            <p className="text-3xl font-semibold">
              {suppliers.reduce((sum, s) => sum + parseFloat(s.totalSpentYTD.replace(',', '')), 0).toLocaleString()} MAD
            </p>
          </div>
          <div>
            <p className="text-[#94A3B8] text-sm mb-1">{t.suppliers.summary.activeCategories}</p>
            <p className="text-3xl font-semibold">
              {new Set(suppliers.map(s => s.defaultCategory)).size}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}