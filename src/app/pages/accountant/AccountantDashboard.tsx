import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useClient } from '../../contexts/ClientContext';
import { DollarSign, FileText, TrendingUp, ArrowRight } from 'lucide-react';
import { PageHeader } from '../../components/reusable/PageHeader';
import { StatCard } from '../../components/reusable/StatCard';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { AccountantDashboardStats, Client } from '../../types';
import { getAccountantDashboardStats, getClients } from '../../services/mockData';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';

export function AccountantDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { setCurrentClient } = useClient();
    const { t } = useLanguage();
    const [stats, setStats] = useState<AccountantDashboardStats | null>(null);
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            if (user?.accountantId) {
                const [dashboardStats, clientData] = await Promise.all([
                    getAccountantDashboardStats(user.accountantId),
                    getClients(user.accountantId),
                ]);
                setStats(dashboardStats);
                setClients(clientData);
            }
            setIsLoading(false);
        }

        loadData();
    }, [user?.accountantId]);

    if (isLoading || !stats) {
        return <div>Loading...</div>;
    }

    const statCards = [
        {
            title: t.accountantDashboard.stats.totalClients,
            value: stats.totalClients,
            icon: <FileText size={24} />,
            color: 'bg-sky-600',
        },
        {
            title: t.accountantDashboard.stats.pendingDocuments,
            value: stats.pendingDocuments,
            icon: <FileText size={24} />,
            color: 'bg-sky-600',
        },
        {
            title: t.accountantDashboard.stats.thisMonthExpenses,
            value: `${stats.thisMonthExpenses.toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })} MAD`,
            icon: <DollarSign size={24} />,
            color: 'bg-sky-600',
        },
        {
            title: t.accountantDashboard.stats.tvaRecoverable,
            value: `${stats.tvaRecoverable.toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })} MAD`,
            trend: '+15.2%',
            trendUp: true,
            icon: <TrendingUp size={24} />,
            color: 'bg-sky-600',
        },
    ];

    return (
        <div>
            <PageHeader
                title={t.accountantDashboard.title}
                description={t.accountantDashboard.description}
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, idx) => (
                    <StatCard
                        key={idx}
                        title={stat.title}
                        value={stat.value}
                        trend={stat.trend}
                        trendUp={stat.trendUp}
                        icon={stat.icon}
                        color={stat.color}
                    />
                ))}
            </div>

            {/* Clients Grid */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.accountantDashboard.clients.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client, idx) => (
                    <motion.div
                        key={client.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="h-full border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
                            onClick={() => {
                                setCurrentClient(client);
                                navigate(`/accountant/clients/${client.id}/invoices`);
                            }}
                        >
                            <div className="p-6 h-full flex flex-col">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                        {client.companyName}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">{client.activity}</p>
                                </div>

                                <div className="flex-1 space-y-3 my-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">{t.accountantDashboard.clients.labels.ice}:</span>
                                        <span className="text-sm font-mono text-gray-900">{client.ICE}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">{t.accountantDashboard.clients.labels.city}:</span>
                                        <span className="text-sm text-gray-900">{client.city}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentClient(client);
                                        navigate(`/accountant/clients/${client.id}/invoices`);
                                    }}
                                    className="w-full mt-4 gap-2"
                                >
                                    {t.accountantDashboard.clients.button}
                                    <ArrowRight size={16} />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {clients.length === 0 && (
                <Card className="p-8 text-center">
                    <p className="text-gray-600">
                        {t.accountantDashboard.clients.emptyState}
                    </p>
                </Card>
            )}
        </div>
    );
}
