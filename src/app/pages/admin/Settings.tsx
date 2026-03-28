import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Switch } from '../../components/ui/switch';
import { Shield, Building2, Bell, Lock, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface AdminSettingsFormData {
    companyName: string;
    adminEmail: string;
    adminPhone: string;
}

interface AdminSecuritySettings {
    twoFactorEnabled: boolean;
    ipWhitelistEnabled: boolean;
    sessionTimeoutMinutes: number;
}

export function AdminSettings() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('company');
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [securitySettings, setSecuritySettings] = useState<AdminSecuritySettings>({
        twoFactorEnabled: true,
        ipWhitelistEnabled: false,
        sessionTimeoutMinutes: 30,
    });

    const { register, handleSubmit, formState: { errors } } = useForm<AdminSettingsFormData>({
        mode: 'onChange',
        defaultValues: {
            companyName: 'SmartCompta',
            adminEmail: 'admin@smartcompta.ma',
            adminPhone: '+212 6XX-XXXXXX',
        },
    });

    const onSubmit = async (data: AdminSettingsFormData) => {
        try {
            setError(null);
            await new Promise((resolve) => setTimeout(resolve, 500));
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            setError('Failed to save settings');
        }
    };

    const handleSecurityChange = (key: keyof AdminSecuritySettings) => {
        setSecuritySettings((prev) => ({
            ...prev,
            [key]: key === 'sessionTimeoutMinutes'
                ? prev[key]
                : !prev[key],
        }));
    };

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-text-primary">Admin Settings</h1>
                <p className="text-text-secondary mt-2">Manage system-wide configuration and security</p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-background-secondary border border-border rounded-lg p-1">
                    <TabsTrigger
                        value="company"
                        className="data-[state=active]:bg-accent data-[state=active]:text-white data-[state=inactive]:text-text-secondary rounded-md transition-colors"
                    >
                        <Building2 size={16} className="mr-2" />
                        Company
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="data-[state=active]:bg-accent data-[state=active]:text-white data-[state=inactive]:text-text-secondary rounded-md transition-colors"
                    >
                        <Shield size={16} className="mr-2" />
                        Security
                    </TabsTrigger>
                    <TabsTrigger
                        value="notifications"
                        className="data-[state=active]:bg-accent data-[state=active]:text-white data-[state=inactive]:text-text-secondary rounded-md transition-colors"
                    >
                        <Bell size={16} className="mr-2" />
                        Notifications
                    </TabsTrigger>
                </TabsList>

                {/* Company Tab */}
                <TabsContent value="company" className="space-y-6">
                    <Card className="p-8 bg-background-primary border border-border">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-accent/10 rounded-lg">
                                <Building2 size={20} className="text-accent" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-text-primary">Organization Settings</h2>
                                <p className="text-sm text-text-secondary mt-1">Configure your organization information</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-error-bg border border-error-border rounded-lg flex gap-3">
                                    <AlertCircle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-error">{error}</p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="companyName" className="text-text-primary font-semibold">
                                    Organization Name
                                </Label>
                                <Input
                                    id="companyName"
                                    {...register('companyName', {
                                        required: 'Organization name is required',
                                        minLength: { value: 3, message: 'Name must be at least 3 characters' },
                                    })}
                                    className={`bg-background-secondary border-border text-text-primary ${errors.companyName ? 'border-error' : ''}`}
                                />
                                {errors.companyName && (
                                    <p className="text-sm text-error font-medium">{errors.companyName.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="adminEmail" className="text-text-primary font-semibold">
                                        Admin Email
                                    </Label>
                                    <Input
                                        id="adminEmail"
                                        type="email"
                                        {...register('adminEmail', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Please enter a valid email',
                                            },
                                        })}
                                        className={`bg-background-secondary border-border text-text-primary ${errors.adminEmail ? 'border-error' : ''}`}
                                    />
                                    {errors.adminEmail && (
                                        <p className="text-sm text-error font-medium">{errors.adminEmail.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="adminPhone" className="text-text-primary font-semibold">
                                        Admin Phone
                                    </Label>
                                    <Input
                                        id="adminPhone"
                                        {...register('adminPhone', {
                                            minLength: { value: 10, message: 'Please enter a valid phone number' },
                                        })}
                                        className={`bg-background-secondary border-border text-text-primary ${errors.adminPhone ? 'border-error' : ''}`}
                                    />
                                    {errors.adminPhone && (
                                        <p className="text-sm text-error font-medium">{errors.adminPhone.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-4">
                                <Button
                                    type="submit"
                                    className="bg-accent hover:bg-accent/90 text-white font-semibold flex items-center gap-2"
                                >
                                    <Save size={16} />
                                    Save Settings
                                </Button>
                                {saved && (
                                    <div className="flex items-center gap-2 text-success">
                                        <CheckCircle size={16} />
                                        <span className="text-sm font-medium">Settings saved successfully!</span>
                                    </div>
                                )}
                            </div>
                        </form>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6">
                    <Card className="p-8 bg-background-primary border border-border">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-accent/10 rounded-lg">
                                <Shield size={20} className="text-accent" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-text-primary">Security Settings</h2>
                                <p className="text-sm text-text-secondary mt-1">Configure system-wide security options</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Two Factor Authentication */}
                            <div className="p-4 bg-background-secondary border border-border rounded-lg flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-text-primary">Two-Factor Authentication</p>
                                    <p className="text-sm text-text-secondary mt-1">
                                        Require 2FA for all admin accounts
                                    </p>
                                </div>
                                <Switch
                                    checked={securitySettings.twoFactorEnabled}
                                    onCheckedChange={() => handleSecurityChange('twoFactorEnabled')}
                                />
                            </div>

                            {/* IP Whitelist */}
                            <div className="p-4 bg-background-secondary border border-border rounded-lg flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-text-primary">IP Whitelist</p>
                                    <p className="text-sm text-text-secondary mt-1">
                                        Restrict access to specific IP addresses
                                    </p>
                                </div>
                                <Switch
                                    checked={securitySettings.ipWhitelistEnabled}
                                    onCheckedChange={() => handleSecurityChange('ipWhitelistEnabled')}
                                />
                            </div>

                            {/* Session Timeout */}
                            <div className="p-4 bg-background-secondary border border-border rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="font-semibold text-text-primary">Session Timeout</p>
                                        <p className="text-sm text-text-secondary mt-1">
                                            Auto-logout inactive sessions after N minutes
                                        </p>
                                    </div>
                                </div>
                                <Input
                                    type="number"
                                    min="5"
                                    max="480"
                                    value={securitySettings.sessionTimeoutMinutes}
                                    onChange={(e) => {
                                        setSecuritySettings((prev) => ({
                                            ...prev,
                                            sessionTimeoutMinutes: parseInt(e.target.value) || 30,
                                        }));
                                    }}
                                    className="bg-background-primary border-border text-text-primary w-24"
                                />
                                <p className="text-xs text-text-tertiary mt-2">
                                    {securitySettings.sessionTimeoutMinutes} minutes
                                </p>
                            </div>

                            <div className="pt-4 border-t border-border">
                                <Button className="bg-accent hover:bg-accent/90 text-white font-semibold">
                                    <Save size={16} className="mr-2" />
                                    Save Security Settings
                                </Button>
                            </div>
                        </div>
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
                                <p className="text-sm text-text-secondary mt-1">Configure system alerts and notifications</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-background-secondary border border-border rounded-lg flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-text-primary">System Alerts</p>
                                    <p className="text-sm text-text-secondary mt-1">
                                        Notify admins of critical system events
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="p-4 bg-background-secondary border border-border rounded-lg flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-text-primary">Failed Login Attempts</p>
                                    <p className="text-sm text-text-secondary mt-1">
                                        Alert on multiple failed login attempts
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="p-4 bg-background-secondary border border-border rounded-lg flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-text-primary">User Access Reports</p>
                                    <p className="text-sm text-text-secondary mt-1">
                                        Daily summary of user access and activities
                                    </p>
                                </div>
                                <Switch />
                            </div>

                            <Button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold mt-6">
                                <Save size={16} className="mr-2" />
                                Save Notification Preferences
                            </Button>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
