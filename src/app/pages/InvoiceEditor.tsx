import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { ArrowLeft, AlertCircle, Check } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';

export function InvoiceEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    supplier: 'Afriquia',
    ice: '002519191000027',
    date: '2026-03-28',
    ht: '1041.67',
    tva: '208.33',
    ttc: '1250.00',
    category: 'Fuel',
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      navigate('/invoices');
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/invoices')}
          className="border-gray-200"
        >
          <ArrowLeft size={16} className="mr-2" />
          {t.invoiceEditor.backToInbox}
        </Button>
        <div>
          <h1 className="text-3xl font-semibold text-[#0F172A]">{t.invoiceEditor.title}</h1>
          <p className="text-[#64748B] mt-1">{t.invoiceEditor.invoice} #{id}</p>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: PDF Preview */}
        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-4">{t.invoiceEditor.preview.title}</h2>
          
          <div className="bg-[#F8FAFC] rounded-lg p-8 border border-gray-200 min-h-[600px]">
            {/* Mock Invoice PDF */}
            <div className="bg-white rounded shadow-sm p-8">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-xl font-bold text-[#0F172A]">AFRIQUIA</h3>
                <p className="text-sm text-[#64748B]">Station Service - Casablanca</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-[#64748B]">{t.invoiceEditor.preview.date}</p>
                    <p className="font-semibold text-[#0F172A] bg-[#10B981] bg-opacity-10 px-2 py-1 rounded">28/03/2026</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#64748B]">{t.invoiceEditor.preview.invoiceNumber}</p>
                    <p className="font-semibold text-[#0F172A]">INV-2026-0328</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-[#64748B] mb-2">{t.invoiceEditor.preview.ice}</p>
                  <p className="font-mono text-sm font-semibold text-[#0F172A] bg-[#10B981] bg-opacity-10 px-2 py-1 rounded inline-block">
                    002519191000027
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <h4 className="font-semibold text-[#0F172A]">{t.invoiceEditor.preview.items}</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#64748B]">Gasoil - 50L</span>
                      <span className="text-[#0F172A]">1,041.67 MAD</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">{t.invoiceEditor.preview.ht}</span>
                    <span className="text-[#0F172A] bg-[#10B981] bg-opacity-10 px-2 py-1 rounded">1,041.67 MAD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">{t.invoiceEditor.preview.tva}</span>
                    <span className="text-[#0F172A] bg-[#10B981] bg-opacity-10 px-2 py-1 rounded">208.33 MAD</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
                    <span className="text-[#0F172A]">{t.invoiceEditor.preview.ttc}</span>
                    <span className="text-[#0F172A] text-lg bg-[#10B981] bg-opacity-10 px-3 py-1 rounded">1,250.00 MAD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-[#64748B] mt-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-[#10B981] rounded-full"></span>
            {t.invoiceEditor.preview.aiDetected}
          </p>
        </Card>

        {/* Right: Editable Form */}
        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-4">{t.invoiceEditor.form.title}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="supplier" className="text-gray-900 font-semibold text-sm">
                {t.invoiceEditor.form.supplier}
              </Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) => handleChange('supplier', e.target.value)}
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500"
                placeholder="Enter supplier name"
                aria-describedby="supplier-help"
              />
              <p id="supplier-help" className="text-xs text-gray-600 mt-1">
                Full legal name of the supplier or vendor
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="ice" className="text-gray-900 font-semibold text-sm">
                {t.invoiceEditor.form.ice}
              </Label>
              <Input
                id="ice"
                value={formData.ice}
                onChange={(e) => handleChange('ice', e.target.value)}
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 font-mono"
                placeholder="123456789012345"
                aria-describedby="ice-help"
              />
              <p id="ice-help" className="text-xs text-gray-600 mt-1">
                15-digit ICE (Identifiant Commun de l'Entreprise) number
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">{t.invoiceEditor.form.date}</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="bg-[#F8FAFC]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ht">{t.invoiceEditor.form.ht}</Label>
                <div className="relative">
                  <Input
                    id="ht"
                    value={formData.ht}
                    onChange={(e) => handleChange('ht', e.target.value)}
                    className="bg-[#F8FAFC] pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                    MAD
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tva">{t.invoiceEditor.form.tva}</Label>
                <div className="relative">
                  <Input
                    id="tva"
                    value={formData.tva}
                    onChange={(e) => handleChange('tva', e.target.value)}
                    className="bg-[#F8FAFC] pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                    MAD
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ttc">{t.invoiceEditor.form.ttc}</Label>
                <div className="relative">
                  <Input
                    id="ttc"
                    value={formData.ttc}
                    onChange={(e) => handleChange('ttc', e.target.value)}
                    className="bg-[#F8FAFC] pr-12 font-semibold"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                    MAD
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">{t.invoiceEditor.form.category}</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              >
                <option value="Fuel">Fuel</option>
                <option value="Telecom">Telecom</option>
                <option value="Utilities">Utilities</option>
                <option value="Supplies">Supplies</option>
                <option value="Rent">Rent</option>
                <option value="Meals">Meals</option>
                <option value="IT Equipment">IT Equipment</option>
                <option value="Shipping">Shipping</option>
              </select>
            </div>

            {/* Success Message */}
            {saved && (
              <div className="flex items-center gap-2 p-4 bg-[#10B981] bg-opacity-10 text-[#10B981] rounded-lg">
                <Check size={20} />
                <span>{t.invoiceEditor.form.saved}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                type="submit"
                className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white"
              >
                <Check size={18} className="mr-2" />
                {t.invoiceEditor.form.confirmSave}
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50"
              >
                <AlertCircle size={18} className="mr-2" />
                {t.invoiceEditor.form.flagError}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}