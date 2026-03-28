import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import {
    Building2,
    CreditCard,
    FileText,
    CheckCircle,
    XCircle,
    AlertCircle,
    ExternalLink,
    RefreshCw,
    Upload,
    Download
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHeader } from '../../components/reusable/PageHeader';

interface Integration {
    id: string;
    provider: string;
    type: string;
    name: string;
    description: string;
    status: 'connected' | 'disconnected' | 'error' | 'connecting';
    lastSync?: string;
}

export function IntegrationsPage() {
    const { t } = useLanguage();
    const [integrations, setIntegrations] = useState<Integration[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchIntegrations();
    }, []);

    const fetchIntegrations = async () => {
        try {
            const response = await fetch('/api/v1/integrations');
            if (response.ok) {
                const data = await response.json();
                setIntegrations(data);
            } else {
                setError('Failed to load integrations');
            }
        } catch (err) {
            setError('Network error while loading integrations');
        } finally {
            setLoading(false);
        }
    };

    const handleConnect = async (integrationId: string) => {
        setSyncing(integrationId);
        setError(null);

        try {
            const response = await fetch(`/api/v1/integrations/${integrationId}/connect`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ redirect_uri: window.location.origin + '/integrations' })
            });

            if (response.ok) {
                const data = await response.json();
                // Redirect to OAuth provider
                window.location.href = data.auth_url;
            } else {
                setError('Failed to initiate connection');
            }
        } catch (err) {
            setError('Network error during connection');
        } finally {
            setSyncing(null);
        }
    };

    const handleDisconnect = async (integrationId: string) => {
        // In a real implementation, this would call the disconnect API
        setIntegrations(prev =>
            prev.map(integration =>
                integration.id === integrationId
                    ? { ...integration, status: 'disconnected', lastSync: undefined }
                    : integration
            )
        );
    };

    const handleSync = async (integrationId: string) => {
        setSyncing(integrationId);
        setError(null);

        try {
            const response = await fetch(`/api/v1/integrations/${integrationId}/sync`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sync_type: 'transactions' })
            });

            if (response.ok) {
                const job = await response.json();
                // Update last sync time
                setIntegrations(prev =>
                    prev.map(integration =>
                        integration.id === integrationId
                            ? { ...integration, lastSync: new Date().toISOString() }
                            : integration
                    )
                );
            } else {
                setError('Sync failed');
            }
        } catch (err) {
            setError('Network error during sync');
        } finally {
            setSyncing(null);
        }
    };

    const handleFileUpload = async (integrationId: string, file: File) => {
        setSyncing(integrationId);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/v1/integrations/bank-import', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const transactions = await response.json();
                // Handle imported transactions
                console.log('Imported transactions:', transactions);
                setIntegrations(prev =>
                    prev.map(integration =>
                        integration.id === integrationId
                            ? { ...integration, lastSync: new Date().toISOString() }
                            : integration
                    )
                );
            } else {
                setError('File import failed');
            }
        } catch (err) {
            setError('Network error during file import');
        } finally {
            setSyncing(null);
        }
    };

    const getStatusBadge = (status: Integration['status']) => {
        switch (status) {
            case 'connected':
                return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle size={12} className="mr-1" />Connected</Badge>;
            case 'connecting':
                return <Badge variant="secondary"><RefreshCw size={12} className="mr-1 animate-spin" />Connecting</Badge>;
            case 'error':
                return <Badge variant="destructive"><XCircle size={12} className="mr-1" />Error</Badge>;
            default:
                return <Badge variant="secondary"><AlertCircle size={12} className="mr-1" />Disconnected</Badge>;
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'accounting_software':
                return Building2;
            case 'tax_system':
                return FileText;
            case 'bank_feed':
                return CreditCard;
            default:
                return Building2;
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <PageHeader
                    title="Integrations"
                    description="Connect your accounting software and import bank data"
                />
                <div className="flex justify-center">
                    <RefreshCw className="animate-spin h-8 w-8" />
                </div>
            </div>
        );
    }

    const accountingIntegrations = integrations.filter(i => i.type === 'accounting_software');
    const taxIntegrations = integrations.filter(i => i.type === 'tax_system');
    const bankingIntegrations = integrations.filter(i => i.type === 'bank_feed');

    return (
        <div className="space-y-6">
            <PageHeader
                title="Integrations"
                description="Connect your accounting software and import bank data"
            />

            {/* Accounting Software Integrations */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-900">Accounting Software</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {accountingIntegrations.map((integration) => {
                        const Icon = getIcon(integration.type);
                        return (
                            <Card key={integration.id} className="relative">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Icon size={24} className="text-blue-600" />
                                            <CardTitle className="text-base">{integration.name}</CardTitle>
                                        </div>
                                        {getStatusBadge(integration.status)}
                                    </div>
                                    <CardDescription>{integration.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {integration.lastSync && (
                                        <p className="text-xs text-slate-500">
                                            Last sync: {new Date(integration.lastSync).toLocaleString()}
                                        </p>
                                    )}

                                    <div className="flex gap-2">
                                        {integration.status === 'connected' ? (
                                            <>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleSync(integration.id)}
                                                    disabled={syncing === integration.id}
                                                >
                                                    {syncing === integration.id ? (
                                                        <RefreshCw size={14} className="mr-2 animate-spin" />
                                                    ) : (
                                                        <RefreshCw size={14} className="mr-2" />
                                                    )}
                                                    Sync
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDisconnect(integration.id)}
                                                >
                                                    Disconnect
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                size="sm"
                                                onClick={() => handleConnect(integration.id)}
                                                disabled={syncing === integration.id}
                                            >
                                                {syncing === integration.id ? (
                                                    <RefreshCw size={14} className="mr-2 animate-spin" />
                                                ) : (
                                                    <ExternalLink size={14} className="mr-2" />
                                                )}
                                                Connect
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Tax System Integrations */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-900">Tax Systems</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {taxIntegrations.map((integration) => {
                        const Icon = getIcon(integration.type);
                        return (
                            <Card key={integration.id} className="relative">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Icon size={24} className="text-green-600" />
                                            <CardTitle className="text-base">{integration.name}</CardTitle>
                                        </div>
                                        {getStatusBadge(integration.status)}
                                    </div>
                                    <CardDescription>{integration.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {integration.lastSync && (
                                        <p className="text-xs text-slate-500">
                                            Last sync: {new Date(integration.lastSync).toLocaleString()}
                                        </p>
                                    )}

                                    <div className="flex gap-2">
                                        {integration.status === 'connected' ? (
                                            <>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleSync(integration.id)}
                                                    disabled={syncing === integration.id}
                                                >
                                                    {syncing === integration.id ? (
                                                        <RefreshCw size={14} className="mr-2 animate-spin" />
                                                    ) : (
                                                        <RefreshCw size={14} className="mr-2" />
                                                    )}
                                                    Sync
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDisconnect(integration.id)}
                                                >
                                                    Disconnect
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                size="sm"
                                                onClick={() => handleConnect(integration.id)}
                                                disabled={syncing === integration.id}
                                            >
                                                {syncing === integration.id ? (
                                                    <RefreshCw size={14} className="mr-2 animate-spin" />
                                                ) : (
                                                    <ExternalLink size={14} className="mr-2" />
                                                )}
                                                Connect
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Banking Integrations */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-900">Banking & Data Import</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {bankingIntegrations.map((integration) => {
                        const Icon = getIcon(integration.type);
                        return (
                            <Card key={integration.id} className="relative">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Icon size={24} className="text-purple-600" />
                                            <CardTitle className="text-base">{integration.name}</CardTitle>
                                        </div>
                                        {getStatusBadge(integration.status)}
                                    </div>
                                    <CardDescription>{integration.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {integration.lastSync && (
                                        <p className="text-xs text-slate-500">
                                            Last import: {new Date(integration.lastSync).toLocaleString()}
                                        </p>
                                    )}

                                    <div className="flex gap-2 flex-wrap">
                                        {integration.status === 'connected' ? (
                                            <>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleSync(integration.id)}
                                                    disabled={syncing === integration.id}
                                                >
                                                    {syncing === integration.id ? (
                                                        <Download size={14} className="mr-2 animate-spin" />
                                                    ) : (
                                                        <Download size={14} className="mr-2" />
                                                    )}
                                                    Import
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDisconnect(integration.id)}
                                                >
                                                    Disconnect
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleConnect(integration.id)}
                                                    disabled={syncing === integration.id}
                                                >
                                                    {syncing === integration.id ? (
                                                        <RefreshCw size={14} className="mr-2 animate-spin" />
                                                    ) : (
                                                        <ExternalLink size={14} className="mr-2" />
                                                    )}
                                                    Connect
                                                </Button>
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        accept=".csv,.ofx,.qfx"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                handleFileUpload(integration.id, file);
                                                            }
                                                        }}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                        disabled={syncing === integration.id}
                                                    />
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        disabled={syncing === integration.id}
                                                    >
                                                        {syncing === integration.id ? (
                                                            <Upload size={14} className="mr-2 animate-spin" />
                                                        ) : (
                                                            <Upload size={14} className="mr-2" />
                                                        )}
                                                        Upload File
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Info/Error Alert */}
            {error ? (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : (
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Integrations require proper API credentials and permissions. Contact your administrator to configure OAuth applications for each service.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}