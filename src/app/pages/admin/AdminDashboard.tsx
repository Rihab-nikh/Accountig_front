import { useEffect, useState } from 'react';
import {
    Users,
    Building2,
    FileText,
    TrendingUp,
} from 'lucide-react';
import { PageHeader } from '../../components/reusable/PageHeader';
import { StatCard } from '../../components/reusable/StatCard';
import { Card } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import {
    AdminDashboardStats,
    Invoice,
    Accountant,
} from '../../types';
import { getAdminDashboardStats, MOCK_ACCOUNTANTS, MOCK_INVOICES } from '../../services/mockData';

export function AdminDashboard() {
    const [stats, setStats] = useState<AdminDashboardStats | null>(null);
    const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const dashboardStats = await getAdminDashboardStats();
            setStats(dashboardStats);

            // Get 5 most recent invoices
            const recent = MOCK_INVOICES.slice(0, 5);
            setRecentInvoices(recent);

            setIsLoading(false);
        }

        loadData();
    }, []);

    if (isLoading || !stats) {
        return <div>Loading...</div>;
    }

    const statCards = [
        {
            title: 'Total Accountants',
            value: stats.totalAccountants,
            icon: <Users size={24} />,
            color: 'bg-sky-600',
        },
        {
            title: 'Total Clients',
            value: stats.totalClients,
            icon: <Building2 size={24} />,
            color: 'bg-sky-600',
        },
        {
            title: 'Pending Documents',
            value: stats.pendingDocuments,
            icon: <FileText size={24} />,
            color: 'bg-sky-600',
        },
        {
            title: 'Processed Invoices (This Month)',
            value: stats.totalProcessedInvoices,
            trend: '+12.5%',
            trendUp: true,
            icon: <TrendingUp size={24} />,
            color: 'bg-sky-600',
        },
    ];

    return (
        <div>
            <PageHeader
                title="Admin Dashboard"
                description="Overview of your accounting platform"
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

            {/* Recent Invoices */}
            <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Invoices
                </h2>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentInvoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell className="font-medium">{invoice.supplier}</TableCell>
                                <TableCell>{invoice.totalTTC} MAD</TableCell>
                                <TableCell>{invoice.category}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${invoice.status === 'processed'
                                            ? 'bg-green-100 text-green-800'
                                            : invoice.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-blue-100 text-blue-800'
                                            }`}
                                    >
                                        {invoice.status.charAt(0).toUpperCase() +
                                            invoice.status.slice(1)}
                                    </span>
                                </TableCell>
                                <TableCell>{invoice.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
