import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Button } from '../../components/ui/button';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

export function OAuthCallbackPage() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        handleOAuthCallback();
    }, []);

    const handleOAuthCallback = async () => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');
        const provider = state?.split('_')[0]; // Extract provider from state

        if (error) {
            setStatus('error');
            setMessage(`OAuth error: ${error}`);
            return;
        }

        if (!code || !provider) {
            setStatus('error');
            setMessage('Missing authorization code or provider information');
            return;
        }

        try {
            const response = await fetch('/api/v1/integrations/oauth/callback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    provider,
                    code,
                    state,
                    redirect_uri: window.location.origin + '/integrations'
                })
            });

            if (response.ok) {
                const data = await response.json();
                setStatus('success');
                setMessage(`Successfully connected to ${provider}!`);
                // Redirect back to integrations page after a delay
                setTimeout(() => {
                    navigate('/accountant/integrations');
                }, 2000);
            } else {
                const errorData = await response.json();
                setStatus('error');
                setMessage(errorData.detail || 'Failed to complete OAuth flow');
            }
        } catch (err) {
            setStatus('error');
            setMessage('Network error during OAuth callback');
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'loading':
                return <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />;
            case 'success':
                return <CheckCircle className="h-8 w-8 text-green-600" />;
            case 'error':
                return <XCircle className="h-8 w-8 text-red-600" />;
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'loading':
                return 'blue';
            case 'success':
                return 'green';
            case 'error':
                return 'red';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        {getStatusIcon()}
                    </div>
                    <CardTitle className={`text-${getStatusColor()}-600`}>
                        {status === 'loading' && 'Connecting...'}
                        {status === 'success' && 'Connection Successful'}
                        {status === 'error' && 'Connection Failed'}
                    </CardTitle>
                    <CardDescription>
                        {status === 'loading' && 'Please wait while we complete the connection.'}
                        {status === 'success' && 'Your integration has been set up successfully.'}
                        {status === 'error' && 'There was an error setting up the integration.'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-sm text-slate-600">{message}</p>

                    {status === 'error' && (
                        <Button
                            onClick={() => navigate('/accountant/integrations')}
                            variant="outline"
                        >
                            Back to Integrations
                        </Button>
                    )}

                    {status === 'success' && (
                        <p className="text-xs text-slate-500">
                            Redirecting to integrations page...
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}