import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { User, Building2, Bell, Lock, Save } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Settings() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-[#0F172A]">{t.settings.title}</h1>
        <p className="text-[#64748B] mt-1">{t.settings.subtitle}</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <User size={20} className="text-[#10B981]" />
          <h2 className="text-lg font-semibold text-[#0F172A]">{t.settings.profile.title}</h2>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t.settings.profile.firstName}</Label>
              <Input id="firstName" defaultValue="John" className="bg-[#F8FAFC]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t.settings.profile.lastName}</Label>
              <Input id="lastName" defaultValue="Accountant" className="bg-[#F8FAFC]" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">{t.settings.profile.email}</Label>
            <Input id="email" type="email" defaultValue="john@company.ma" className="bg-[#F8FAFC]" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">{t.settings.profile.phone}</Label>
            <Input id="phone" defaultValue="+212 6XX-XXXXXX" className="bg-[#F8FAFC]" />
          </div>
        </div>
      </Card>

      {/* Company Settings */}
      <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Building2 size={20} className="text-[#10B981]" />
          <h2 className="text-lg font-semibold text-[#0F172A]">{t.settings.company.title}</h2>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">{t.settings.company.name}</Label>
            <Input id="companyName" defaultValue="My Company S.A.R.L" className="bg-[#F8FAFC]" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyICE">{t.settings.company.ice}</Label>
            <Input id="companyICE" defaultValue="001234567890123" className="bg-[#F8FAFC] font-mono" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">{t.settings.company.address}</Label>
            <Input id="address" defaultValue="123 Boulevard Mohammed V, Casablanca" className="bg-[#F8FAFC]" />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Bell size={20} className="text-[#10B981]" />
          <h2 className="text-lg font-semibold text-[#0F172A]">{t.settings.notifications.title}</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[#0F172A]">{t.settings.notifications.email.title}</p>
              <p className="text-sm text-[#64748B]">{t.settings.notifications.email.description}</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#10B981]" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[#0F172A]">{t.settings.notifications.processing.title}</p>
              <p className="text-sm text-[#64748B]">{t.settings.notifications.processing.description}</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#10B981]" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[#0F172A]">{t.settings.notifications.weekly.title}</p>
              <p className="text-sm text-[#64748B]">{t.settings.notifications.weekly.description}</p>
            </div>
            <input type="checkbox" className="w-5 h-5 accent-[#10B981]" />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Lock size={20} className="text-[#10B981]" />
          <h2 className="text-lg font-semibold text-[#0F172A]">{t.settings.security.title}</h2>
        </div>
        
        <div className="space-y-4">
          <Button variant="outline" className="border-gray-200">
            {t.settings.security.changePassword}
          </Button>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="font-medium text-[#0F172A]">{t.settings.security.twoFactor.title}</p>
              <p className="text-sm text-[#64748B]">{t.settings.security.twoFactor.description}</p>
            </div>
            <Button className="bg-[#10B981] hover:bg-[#059669] text-white">
              {t.settings.security.twoFactor.enable}
            </Button>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-[#10B981] hover:bg-[#059669] text-white px-8">
          <Save size={18} className="mr-2" />
          {t.settings.saveChanges}
        </Button>
      </div>
    </div>
  );
}