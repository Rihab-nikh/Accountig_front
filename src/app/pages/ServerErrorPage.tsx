import { useNavigate } from 'react-router';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

interface ServerErrorPageProps {
    statusCode?: number;
    message?: string;
    error?: Error;
}

export function ServerErrorPage({
    statusCode = 500,
    message = 'Something went wrong on our end',
    error,
}: ServerErrorPageProps) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-background-primary to-background-secondary flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-error-bg rounded-full inline-block">
                        <AlertTriangle size={48} className="text-error" />
                    </div>
                </div>

                {/* Content */}
                <h1 className="text-4xl font-bold text-error mb-2">{statusCode}</h1>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">Server Error</h2>

                <p className="text-text-secondary mb-8 leading-relaxed">
                    {message}
                </p>

                {process.env.NODE_ENV === 'development' && error && (
                    <div className="mb-6 p-3 bg-gray-100 border border-gray-300 rounded-lg text-left">
                        <p className="text-xs font-mono text-gray-700 break-words overflow-hidden">
                            {error.toString()}
                        </p>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 flex-col sm:flex-row justify-center">
                    <Button
                        onClick={() => location.reload()}
                        variant="outline"
                        className="border-border text-text-primary hover:bg-background-secondary"
                    >
                        Try Again
                    </Button>
                    <Button
                        onClick={() => navigate('/')}
                        className="bg-accent hover:bg-accent/90 text-white flex items-center justify-center gap-2"
                    >
                        <Home size={18} />
                        Home
                    </Button>
                </div>

                {/* Footer help text */}
                <p className="text-xs text-text-tertiary mt-8">
                    Our team has been notified. For immediate help, contact{' '}
                    <a href="mailto:support@smartcompta.ma" className="text-accent hover:underline">
                        support@smartcompta.ma
                    </a>
                </p>
            </div>
        </div>
    );
}
