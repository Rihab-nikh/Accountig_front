// @refresh reset
import React, { createContext, useState, useCallback } from 'react';
import { User, AuthContextType, UserRole } from '../types';

// Mock users for demo purposes
const MOCK_USERS = {
    admin: {
        id: 'admin-1',
        name: 'admin Admin',
        email: 'admin@smartcompta.ma',
        role: 'admin' as UserRole,
    },
    accountant: {
        id: 'acct-1',
        name: 'Keltoum Sayad',
        email: 'keltoum@smartcompta.ma',
        role: 'accountant' as UserRole,
        accountantId: 'acct-1',
    },
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        // Default to admin for demo
        return MOCK_USERS.admin as User;
    });
    const [isLoading, setIsLoading] = useState(false);

    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));

            if (email === 'admin@smartcompta.ma' || email === 'admin') {
                setUser(MOCK_USERS.admin as User);
            } else if (email === 'ahmed@smartcompta.ma' || email === 'accountant') {
                setUser(MOCK_USERS.accountant as User);
            } else {
                throw new Error('Invalid credentials');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const signupAsAccountant = useCallback(async (data: any) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            // Create new accountant user
            const newUser: User = {
                id: `acct-${Date.now()}`,
                name: data.name,
                email: data.email,
                role: 'accountant',
                accountantId: `acct-${Date.now()}`,
            };
            setUser(newUser);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const value: AuthContextType = {
        user,
        isLoading,
        login,
        logout,
        signupAsAccountant,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
