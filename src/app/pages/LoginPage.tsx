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
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <PageHeader
                    title="Sign in"
                    description="Use the sample credentials below to continue as admin or accountant."
                />
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <label className="block text-sm font-semibold text-gray-700" htmlFor="email">
                        Email or username
                    </label>
                    <Input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="admin@smartcompta.ma"
                    />
                    <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter any value"
                    />
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? 'Signing in�' : 'Sign in'}
                    </Button>
                </form>
                <p className="mt-4 text-sm text-gray-500">
                    Admin: <strong>admin@smartcompta.ma</strong> / accountant: <strong>accountant</strong>
                </p>
            </Card>
        </div>
    );
}
