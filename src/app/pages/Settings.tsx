import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { User, Building2, Bell, Lock, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface CompanyFormData {
  companyName: string;
  companyICE: string;
  address: string;
  city: string;
}

interface NotificationSettings {
  emailInvoices: boolean;
  emailReports: boolean;
  emailReminders: boolean;
  pushNotifications: boolean;
}

export function Settings() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [savedProfile, setSavedProfile] = useState(false);
  const [savedCompany, setSavedCompany] = useState(false);
  const [errorProfile, setErrorProfile] = useState<string | null>(null);
  const [errorCompany, setErrorCompany] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailInvoices: true,
    emailReports: true,
    emailReminders: false,
    pushNotifications: true,
  });

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
    watch: watchProfile,
  } = useForm<ProfileFormData>({
    mode: 'onChange',
    defaultValues: {
      firstName: 'John',
      lastName: 'Accountant',
      email: 'john@company.ma',
      phone: '+212 6XX-XXXXXX',
    },
  });

  const {
    register: registerCompany,
    handleSubmit: handleSubmitCompany,
    formState: { errors: errorsCompany },
  } = useForm<CompanyFormData>({
    mode: 'onChange',
    defaultValues: {
      companyName: 'My Company S.A.R.L',
      companyICE: '001234567890123',
      address: '123 Boulevard Mohammed V',
      city: 'Casablanca',
    },
  });

  const onSubmitProfile = async (data: ProfileFormData) => {
    try {
      setErrorProfile(null);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSavedProfile(true);
      setTimeout(() => setSavedProfile(false), 3000);
    } catch (error) {
      setErrorProfile('Failed to save profile settings');
    }
  };

  const onSubmitCompany = async (data: CompanyFormData) => {
    try {
      setErrorCompany(null);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSavedCompany(true);
      setTimeout(() => setSavedCompany(false), 3000);
    } catch (error) {
      setErrorCompany('Failed to save company settings');
    }
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">{t.settings.title}</h1>
        <p className="text-text-secondary mt-2">{t.settings.subtitle}</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-background-secondary border border-border rounded-lg p-1">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-accent data-[state=active]:text-white data-[state=inactive]:text-text-secondary rounded-md transition-colors"
          >
            <User size={16} className="mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="company"
            className="data-[state=active]:bg-accent data-[state=active]:text-white data-[state=inactive]:text-text-secondary rounded-md transition-colors"
          >
            <Building2 size={16} className="mr-2" />
            Company
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-accent data-[state=active]:text-white data-[state=inactive]:text-text-secondary rounded-md transition-colors"
          >
            <Bell size={16} className="mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="p-8 bg-background-primary border border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-accent/10 rounded-lg">
                <User size={20} className="text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">Personal Information</h2>
                <p className="text-sm text-text-secondary mt-1">Update your profile details</p>
              </div>
            </div>

            <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
              {errorProfile && (
                <div className="p-4 bg-error-bg border border-error-border rounded-lg flex gap-3">
                  <AlertCircle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-error">{errorProfile}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-text-primary font-semibold">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    {...registerProfile('firstName', {
                      required: 'First name is required',
                      minLength: { value: 2, message: 'First name must be at least 2 characters' },
                    })}
                    className={`bg-background-secondary border-border text-text-primary placeholder:text-text-tertiary ${errorsProfile.firstName ? 'border-error' : ''
                      }`}
                  />
                  {errorsProfile.firstName && (
                    <p className="text-sm text-error font-medium">{errorsProfile.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-text-primary font-semibold">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    {...registerProfile('lastName', {
                      required: 'Last name is required',
                      minLength: { value: 2, message: 'Last name must be at least 2 characters' },
                    })}
                    className={`bg-background-secondary border-border text-text-primary placeholder:text-text-tertiary ${errorsProfile.lastName ? 'border-error' : ''
                      }`}
                  />
                  {errorsProfile.lastName && (
                    <p className="text-sm text-error font-medium">{errorsProfile.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-text-primary font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...registerProfile('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  className={`bg-background-secondary border-border text-text-primary placeholder:text-text-tertiary ${errorsProfile.email ? 'border-error' : ''
                    }`}
                />
                {errorsProfile.email && (
                  <p className="text-sm text-error font-medium">{errorsProfile.email.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-text-primary font-semibold">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  {...registerProfile('phone', {
                    required: 'Phone number is required',
                    minLength: { value: 10, message: 'Please enter a valid phone number' },
                  })}
                  className={`bg-background-secondary border-border text-text-primary placeholder:text-text-tertiary ${errorsProfile.phone ? 'border-error' : ''
                    }`}
                />
                {errorsProfile.phone && (
                  <p className="text-sm text-error font-medium">{errorsProfile.phone.message}</p>
                )}
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Profile
                </Button>
                {savedProfile && (
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">Profile saved successfully!</span>
                  </div>
                )}
              </div>
            </form>
          </Card>
        </TabsContent>

        {/* Company Tab */}
        <TabsContent value="company" className="space-y-6">
          <Card className="p-8 bg-background-primary border border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Building2 size={20} className="text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">Company Information</h2>
                <p className="text-sm text-text-secondary mt-1">Manage your company details</p>
              </div>
            </div>

            <form onSubmit={handleSubmitCompany(onSubmitCompany)} className="space-y-6">
              {errorCompany && (
                <div className="p-4 bg-error-bg border border-error-border rounded-lg flex gap-3">
                  <AlertCircle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-error">{errorCompany}</p>
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="companyName" className="text-text-primary font-semibold">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  {...registerCompany('companyName', {
                    required: 'Company name is required',
                    minLength: { value: 3, message: 'Company name must be at least 3 characters' },
                  })}
                  className={`bg-background-secondary border-border text-text-primary placeholder:text-text-tertiary ${errorsCompany.companyName ? 'border-error' : ''
                    }`}
                />
                {errorsCompany.companyName && (
                  <p className="text-sm text-error font-medium">{errorsCompany.companyName.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="companyICE" className="text-text-primary font-semibold">
                  ICE Number
                </Label>
                <Input
                  id="companyICE"
                  {...registerCompany('companyICE', {
                    required: 'ICE number is required',
                    pattern: {
                      value: /^\d{15}$/,
                      message: 'ICE number must be 15 digits',
                    },
                  })}
                  className={`bg-background-secondary border-border text-text-primary placeholder:text-text-tertiary font-mono ${errorsCompany.companyICE ? 'border-error' : ''
                    }`}
                />
                {errorsCompany.companyICE && (
                  <p className="text-sm text-error font-medium">{errorsCompany.companyICE.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="address" className="text-text-primary font-semibold">
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    {...registerCompany('address', {
                      required: 'Address is required',
                      minLength: { value: 5, message: 'Address must be at least 5 characters' },
                    })}
                    className={`bg-background-secondary border-border text-text-primary placeholder:text-text-tertiary ${errorsCompany.address ? 'border-error' : ''
                      }`}
                  />
                  {errorsCompany.address && (
                    <p className="text-sm text-error font-medium">{errorsCompany.address.message}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="city" className="text-text-primary font-semibold">
                    City
                  </Label>
                  <Input
                    id="city"
                    {...registerCompany('city', {
                      required: 'City is required',
                      minLength: { value: 2, message: 'City must be at least 2 characters' },
                    })}
                    className={`bg-background-secondary border-border text-text-primary placeholder:text-text-tertiary ${errorsCompany.city ? 'border-error' : ''
                      }`}
                  />
                  {errorsCompany.city && (
                    <p className="text-sm text-error font-medium">{errorsCompany.city.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Company Info
                </Button>
                {savedCompany && (
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">Company info saved successfully!</span>
                  </div>
                )}
              </div>
            </form>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-8 bg-background-primary border border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Bell size={20} className="text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">Notification Preferences</h2>
                <p className="text-sm text-text-secondary mt-1">Control how you receive updates</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Email Notifications */}
              <div className="p-4 bg-background-secondary border border-border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-primary">Invoice Notifications</p>
                  <p className="text-sm text-text-secondary mt-1">
                    Receive email when invoices are submitted or processed
                  </p>
                </div>
                <Switch
                  checked={notifications.emailInvoices}
                  onCheckedChange={() => handleNotificationChange('emailInvoices')}
                />
              </div>

              <div className="p-4 bg-background-secondary border border-border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-primary">Report Notifications</p>
                  <p className="text-sm text-text-secondary mt-1">
                    Get email notifications for monthly reports and summaries
                  </p>
                </div>
                <Switch
                  checked={notifications.emailReports}
                  onCheckedChange={() => handleNotificationChange('emailReports')}
                />
              </div>

              <div className="p-4 bg-background-secondary border border-border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-primary">Reminder Notifications</p>
                  <p className="text-sm text-text-secondary mt-1">
                    Receive reminders for pending actions and deadlines
                  </p>
                </div>
                <Switch
                  checked={notifications.emailReminders}
                  onCheckedChange={() => handleNotificationChange('emailReminders')}
                />
              </div>

              <div className="p-4 bg-background-secondary border border-border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text-primary">Push Notifications</p>
                  <p className="text-sm text-text-secondary mt-1">
                    Allow push notifications in your browser
                  </p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={() => handleNotificationChange('pushNotifications')}
                />
              </div>

              <Button
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold mt-6"
                onClick={() => {
                  // Simulate saving
                }}
              >
                <Save size={16} />
                <span className="ml-2">Save Preferences</span>
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}