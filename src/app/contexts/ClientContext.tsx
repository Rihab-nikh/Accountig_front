import React, { createContext, useState } from 'react';
import { Client, ClientContextType } from '../types';

export const ClientContext = createContext<ClientContextType | null>(null);

export function ClientProvider({ children }: { children: React.ReactNode }) {
    const [currentClient, setCurrentClient] = useState<Client | null>(null);
    const [clients, setClients] = useState<Client[]>([]);

    const value: ClientContextType = {
        currentClient,
        setCurrentClient,
        clients,
        setClients,
    };

    return (
        <ClientContext.Provider value={value}>
            {children}
        </ClientContext.Provider>
    );
}

export function useClient() {
    const context = React.useContext(ClientContext);
    if (!context) {
        throw new Error('useClient must be used within ClientProvider');
    }
    return context;
}
