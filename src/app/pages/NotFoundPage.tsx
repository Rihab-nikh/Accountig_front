import { useNavigate } from 'react-router';
import { AlertCircle, Home, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-background-primary to-background-secondary flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-accent/10 rounded-full inline-block">
                        <AlertCircle size={48} className="text-accent" />
                    </div>
                </div>

                {/* Content */}
                <h1 className="text-4xl font-bold text-text-primary mb-2">404</h1>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>

                <p className="text-text-secondary mb-8 leading-relaxed">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>

                {/* Buttons */}
                <div className="flex gap-3 flex-col sm:flex-row justify-center">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="border-border text-text-primary hover:bg-background-secondary flex items-center justify-center gap-2"
                    >
                        <ChevronLeft size={18} />
                        Go Back
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
                    If you believe this is an error, please contact support at{' '}
                    <a href="mailto:support@smartcompta.ma" className="text-accent hover:underline">
                        support@smartcompta.ma
                    </a>
                </p>
            </div>
        </div>
    );
}
