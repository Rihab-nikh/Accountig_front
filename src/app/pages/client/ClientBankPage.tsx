import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PageHeader } from '../../components/reusable/PageHeader';
import { UploadZone } from '../../components/reusable/UploadZone';
import { DataTable, Column } from '../../components/reusable/DataTable';
import { StatusBadge } from '../../components/reusable/StatusBadge';
import { Card } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { BankStatement } from '../../types';
import { getBankStatements } from '../../services/mockData';
import { useLanguage } from '../../contexts/LanguageContext';

export function ClientBankPage() {
    const { clientId } = useParams();
    const [statements, setStatements] = useState<BankStatement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        async function loadStatements() {
            if (clientId) {
                const data = await getBankStatements(clientId);
                setStatements(data);
            }
            setIsLoading(false);
        }

        loadStatements();
    }, [clientId]);

    const handleFilesSelected = async (files: File[]) => {
        // In a real app, this would upload the files to the backend
        console.log('Files selected for upload:', files);
    };

    const columns: Column<BankStatement>[] = [
        {
            id: 'date',
            header: t.accountantBank.columns.date,
            accessor: 'date',
            sortable: true,
        },
        {
            id: 'description',
            header: t.accountantBank.columns.description,
            accessor: 'description',
        },
        {
            id: 'type',
            header: t.accountantBank.columns.type,
            render: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.transactionType === 'credit'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {row.transactionType.charAt(0).toUpperCase() + row.transactionType.slice(1)}
                </span>
            ),
        },
        {
            id: 'debit',
            header: t.accountantBank.columns.debit,
            render: (row) =>
                row.debit ? `${row.debit.toLocaleString()} MAD` : '-',
        },
        {
            id: 'credit',
            header: t.accountantBank.columns.credit,
            render: (row) =>
                row.credit ? `${row.credit.toLocaleString()} MAD` : '-',
        },
        {
            id: 'balance',
            header: t.accountantBank.columns.balance,
            render: (row) =>
                row.balance ? `${row.balance.toLocaleString()} MAD` : '-',
        },
        {
            id: 'status',
            header: t.accountantBank.columns.status,
            render: (row) => <StatusBadge status={row.status} />,
        },
    ];

    return (
        <div>
            <PageHeader
                title={t.accountantBank.title}
                description={t.accountantBank.description}
            />

            <Tabs defaultValue="upload" className="w-full">
                <TabsList>
                    <TabsTrigger value="upload">{t.accountantBank.tabs.upload}</TabsTrigger>
                    <TabsTrigger value="statements">{t.accountantBank.tabs.statements}</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">
                            {t.accountantBank.uploadTitle}
                        </h3>
                        <UploadZone
                            onFilesSelected={handleFilesSelected}
                            acceptedFormats={['.pdf', '.png', '.jpg', '.jpeg']}
                        />
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-900">
                                {t.accountantBank.howItWorks}
                            </p>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="statements" className="mt-6">
                    <DataTable
                        columns={columns}
                        data={statements}
                        isLoading={isLoading}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
