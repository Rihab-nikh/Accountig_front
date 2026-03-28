import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { PageHeader } from '../components/reusable/PageHeader';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unable to login';
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
                        {isLoading ? 'Signing in…' : 'Sign in'}
                    </Button>
                </form>
                <p className="mt-4 text-sm text-gray-500">
                    Admin: <strong>admin@smartcompta.ma</strong> / accountant: <strong>accountant</strong>
                </p>
            </Card>
        </div>
    );
}
