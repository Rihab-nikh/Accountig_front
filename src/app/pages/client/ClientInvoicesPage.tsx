import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Plus, Download } from 'lucide-react';
import { PageHeader } from '../../components/reusable/PageHeader';
import { DataTable, Column } from '../../components/reusable/DataTable';
import { StatusBadge } from '../../components/reusable/StatusBadge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Invoice } from '../../types';
import { getInvoices } from '../../services/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

export function ClientInvoicesPage() {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    useEffect(() => {
        async function loadInvoices() {
            if (clientId) {
                const data = await getInvoices(clientId);
                setInvoices(data);
                setFilteredInvoices(data);
            }
            setIsLoading(false);
        }

        loadInvoices();
    }, [clientId]);

    useEffect(() => {
        let filtered = invoices;

        if (searchQuery) {
            filtered = filtered.filter(
                (inv) =>
                    inv.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    inv.ICE.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterStatus !== 'all') {
            filtered = filtered.filter((inv) => inv.status === filterStatus);
        }

        setFilteredInvoices(filtered);
    }, [searchQuery, filterStatus, invoices]);

    const columns: Column<Invoice>[] = [
        {
            id: 'supplier',
            header: t.accountantInvoices.columns.supplier,
            accessor: 'supplier',
            sortable: true,
        },
        {
            id: 'ICE',
            header: t.accountantInvoices.columns.ICE,
            accessor: 'ICE',
        },
        {
            id: 'category',
            header: t.accountantInvoices.columns.category,
            accessor: 'category',
        },
        {
            id: 'totalTTC',
            header: t.accountantInvoices.columns.amount,
            accessor: 'totalTTC',
        },
        {
            id: 'date',
            header: t.accountantInvoices.columns.date,
            accessor: 'date',
            sortable: true,
        },
        {
            id: 'status',
            header: t.accountantInvoices.columns.status,
            render: (row) => <StatusBadge status={row.status} />,
        },
        {
            id: 'actions',
            header: t.accountantInvoices.columns.actions,
            render: (row) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/accountant/clients/${clientId}/invoices/${row.id}`)}
                >
                    {t.common.actions.view}
                </Button>
            ),
        },
    ];

    return (
        <div>
            <PageHeader
                title={t.accountantInvoices.title}
                description={t.accountantInvoices.description}
                action={{
                    label: t.accountantInvoices.actionLabel,
                    onClick: () => { },
                    icon: <Plus size={18} />,
                }}
            />

            {/* Filters */}
            <div className="mb-6 flex gap-4 flex-wrap">
                <Input
                    placeholder={t.accountantInvoices.filters.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder={t.accountantInvoices.filters.statusPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">{t.common.statuses.all}</SelectItem>
                        <SelectItem value="processed">{t.common.statuses.processed}</SelectItem>
                        <SelectItem value="pending">{t.common.statuses.pending}</SelectItem>
                        <SelectItem value="review">{t.common.statuses.review}</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                    <Download size={16} />
                    {t.common.actions.export}
                </Button>
            </div>

            {/* Table */}
            <DataTable
                columns={columns}
                data={filteredInvoices}
                isLoading={isLoading}
                onRowClick={(row) => navigate(`/accountant/clients/${clientId}/invoices/${row.id}`)}
            />
        </div>
    );
}
