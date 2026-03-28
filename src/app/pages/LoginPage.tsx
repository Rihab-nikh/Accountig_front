import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const validateForm = (): boolean => {
        setEmailError(null);
        setPasswordError(null);
        let isValid = true;

        if (!email.trim()) {
            setEmailError('Email or username is required');
            isValid = false;
        } else if (email.includes('@') && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unable to login. Please check your credentials.';
            setError(message);
        }
    };

    return (
        <div className="min-h-screen bg-background-secondary flex flex-col items-center justify-center px-4 py-8 md:py-12">
            <div className="w-full max-w-md">
                {/* Logo/Branding Area */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-text-primary mb-2">SmartCompta</h1>
                    <p className="text-text-secondary">AI-Powered Accounting for Modern Businesses</p>
                </div>

                {/* Login Card */}
                <Card className="border border-border p-8 shadow-lg">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-text-primary mb-2">Welcome back</h2>
                        <p className="text-text-secondary text-sm">Sign in to your account to continue</p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-error-bg border border-error-border rounded-lg flex gap-3">
                            <AlertCircle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-error">Sign in failed</p>
                                <p className="text-sm text-error mt-1">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Login Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-text-primary">
                                Email or Username
                            </label>
                            <Input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError(null);
                                }}
                                onBlur={() => {
                                    if (email && email.includes('@') && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                                        setEmailError('Please enter a valid email address');
                                    }
                                }}
                                placeholder="admin@smartcompta.ma"
                                aria-invalid={!!emailError}
                                aria-describedby={emailError ? 'email-error' : undefined}
                                className="h-10 px-4"
                            />
                            {emailError && (
                                <p id="email-error" className="text-sm text-error font-medium">{emailError}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-semibold text-text-primary">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setPasswordError(null);
                                    }}
                                    placeholder="Enter your password"
                                    aria-invalid={!!passwordError}
                                    aria-describedby={passwordError ? 'password-error' : undefined}
                                    className="h-10 px-4 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {passwordError && (
                                <p id="password-error" className="text-sm text-error font-medium">{passwordError}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="remember"
                                    checked={rememberMe}
                                    onCheckedChange={setRememberMe}
                                />
                                <label htmlFor="remember" className="text-sm text-text-secondary font-medium cursor-pointer">
                                    Remember me
                                </label>
                            </div>
                            <a
                                href="#forgot-password"
                                className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Sign In Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-10 bg-accent hover:bg-accent/90 text-white font-semibold text-sm"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Signing in...
                                </span>
                            ) : (
                                'Sign in'
                            )}
                        </Button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-xs font-semibold text-text-tertiary mb-3">Demo Credentials</p>
                        <div className="space-y-2 text-xs">
                            <div>
                                <p className="text-text-secondary font-medium mb-1">Admin Account:</p>
                                <div className="bg-background-secondary p-2 rounded text-text-primary font-mono text-xs">
                                    <p>Email: <span className="font-semibold">admin@smartcompta.ma</span></p>
                                    <p>Password: <span className="font-semibold">any value</span></p>
                                </div>
                            </div>
                            <div>
                                <p className="text-text-secondary font-medium mb-1">Accountant Account:</p>
                                <div className="bg-background-secondary p-2 rounded text-text-primary font-mono text-xs">
                                    <p>Email: <span className="font-semibold">accountant</span></p>
                                    <p>Password: <span className="font-semibold">any value</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Footer */}
                <p className="text-center text-text-secondary text-xs mt-6">
                    © 2024 SmartCompta AI. All rights reserved.
                </p>
            </div>
        </div>
    );
}
