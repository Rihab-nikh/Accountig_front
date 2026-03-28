import React, { ReactNode, ErrorInfo } from 'react';
import { AlertCircle, Home } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({
            error,
            errorInfo,
        });
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-border">
                        <div className="flex justify-center mb-6">
                            <div className="p-3 bg-error-bg rounded-full">
                                <AlertCircle size={32} className="text-error" />
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-text-primary text-center mb-2">
                            Something Went Wrong
                        </h1>

                        <p className="text-text-secondary text-center mb-6">
                            We encountered an unexpected error. Please try refreshing the page or go back to the dashboard.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mb-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
                                <p className="text-xs font-mono text-gray-700 break-words whitespace-pre-wrap">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <Button
                                onClick={this.handleReset}
                                className="flex-1 bg-accent hover:bg-accent/90 text-white font-semibold"
                            >
                                Try Again
                            </Button>
                            <Button
                                onClick={() => (window.location.href = '/')}
                                variant="outline"
                                className="flex-1 border-border text-text-primary hover:bg-background-secondary"
                            >
                                <Home size={16} className="mr-2" />
                                Dashboard
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
