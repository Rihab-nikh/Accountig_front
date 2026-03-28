import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Download, FileText } from 'lucide-react';
import { PageHeader } from '../../components/reusable/PageHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { StatusBadge } from '../../components/reusable/StatusBadge';
import { Report } from '../../types';
import { getReports } from '../../services/mockData';
import { motion } from 'motion/react';

export function ClientReportsPage() {
    const { clientId } = useParams();
    const [reports, setReports] = useState<Report[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadReports() {
            if (clientId) {
                const data = await getReports(clientId);
                setReports(data);
            }
            setIsLoading(false);
        }

        loadReports();
    }, [clientId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <PageHeader
                title="Reports"
                description="View financial reports for this client"
            />

            {reports.length === 0 ? (
                <Card className="p-12 text-center">
                    <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No reports yet. Reports will appear here once data is processed.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reports.map((report, idx) => (
                        <motion.div
                            key={report.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {report.period}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {report.type.charAt(0).toUpperCase() + report.type.slice(1)} Report
                                        </p>
                                    </div>
                                    <StatusBadge status={report.status} />
                                </div>

                                <div className="space-y-3 my-6 pb-6 border-b border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Total Invoices:</span>
                                        <span className="font-semibold text-gray-900">{report.totalInvoices}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Total Expenses:</span>
                                        <span className="font-semibold text-gray-900">
                                            {report.totalExpenses.toLocaleString('fr-FR', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })} MAD
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">TVA Recoverable:</span>
                                        <span className="font-semibold text-green-600">
                                            +{report.totalTVARecoverable.toLocaleString('fr-FR', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })} MAD
                                        </span>
                                    </div>
                                </div>

                                <Button className="w-full gap-2" variant="outline">
                                    <Download size={16} />
                                    Download Report
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
