import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useClient } from '../../contexts/ClientContext';
import {
    Search,
    MapPin,
    Mail,
    Phone,
    ArrowRight,
    FolderOpen,
} from 'lucide-react';
import { PageHeader } from '../../components/reusable/PageHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { EmptyState } from '../../components/reusable/EmptyState';
import { Client } from '../../types';
import { getClients } from '../../services/mockData';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

export function AccountantClientsPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { setCurrentClient } = useClient();
    const { t } = useLanguage();
    const [clients, setClients] = useState<Client[]>([]);
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadClients() {
            if (user?.accountantId) {
                const data = await getClients(user.accountantId);
                setClients(data);
                setFilteredClients(data);
            }
            setIsLoading(false);
        }

        loadClients();
    }, [user?.accountantId]);

    useEffect(() => {
        const filtered = clients.filter(
            (c) =>
                c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.ICE.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.activity.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredClients(filtered);
    }, [searchQuery, clients]);

    if (isLoading) {
        return <div>{t.common.loading}</div>;
    }

    if (clients.length === 0) {
        return (
            <div>
                <PageHeader
                    title={t.accountantClients.title}
                    description={t.accountantClients.description}
                />
                <EmptyState
                    icon={<FolderOpen size={48} />}
                    title={t.accountantClients.emptyState.title}
                    description={t.accountantClients.emptyState.description}
                />
            </div>
        );
    }

    return (
        <div>
            <PageHeader
                title={t.accountantClients.title}
                description={
                    clients.length === 1
                        ? t.accountantClients.assignedSingle
                        : t.accountantClients.assignedPlural.replace('{count}', clients.length.toString())
                }
            />

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <Input
                        placeholder={t.accountantClients.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClients.map((client, idx) => (
                    <motion.div
                        key={client.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <Card className="h-full border border-gray-200 hover:shadow-lg hover:border-indigo-200 transition-all group cursor-pointer"
                            onClick={() => {
                                setCurrentClient(client);
                                navigate(`/accountant/clients/${client.id}/invoices`);
                            }}
                        >
                            <div className="p-6 h-full flex flex-col">
                                {/* Header */}
                                <div className="mb-4 pb-4 border-b border-gray-100">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                {client.companyName}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {client.activity}
                                            </p>
                                        </div>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                            {t.accountantClients.activeBadge}
                                        </span>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="flex-1 space-y-3 my-4 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                            {client.ICE}
                                        </span>
                                        <span className="text-gray-500">ICE</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MapPin size={16} />
                                        {client.city}
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Mail size={16} />
                                        <span className="truncate text-xs">{client.contactEmail}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Phone size={16} />
                                        {client.phone}
                                    </div>
                                </div>

                                {/* Action */}
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentClient(client);
                                        navigate(`/accountant/clients/${client.id}/invoices`);
                                    }}
                                    className="w-full mt-4 gap-2 group/btn"
                                >
                                    {t.common.actions.openWorkspace}
                                    <ArrowRight
                                        size={16}
                                        className="group-hover/btn:translate-x-1 transition-transform"
                                    />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {filteredClients.length === 0 && (
                <Card className="p-8 text-center">
                    <p className="text-gray-600">
                        {t.accountantClients.searchEmptyState}
                    </p>
                </Card>
            )}
        </div>
    );
}
