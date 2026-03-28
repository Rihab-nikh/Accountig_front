import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useClient } from '../../contexts/ClientContext';
import { Building2, FileText, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';
import { AccountantDashboardStats, Client } from '../../types';
import { getAccountantDashboardStats, getClients } from '../../services/mockData';
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

    return (
        <main className="min-h-[calc(100vh-128px)] bg-slate-50 px-6 py-8">
            <div className="mx-auto max-w-7xl">
                {/* Page header */}
                <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-medium text-blue-600">Vue d'ensemble</p>
                        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                            Tableau de bord comptable
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Suivez vos clients, documents et indicateurs financiers en un coup d'œil.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Exporter
                        </button>

                        <button
                            type="button"
                            className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Ajouter un client
                        </button>
                    </div>
                </section>

                {/* KPI cards */}
                <section className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Clients actifs</p>
                                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{stats.totalClients}</p>
                                <p className="mt-2 text-xs font-medium text-slate-500">
                                    Portefeuille actuellement suivi
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                                <Building2 size={22} />
                            </div>
                        </div>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Documents en attente</p>
                                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{stats.pendingDocuments}</p>
                                <p className="mt-2 text-xs font-medium text-amber-600">
                                    Action requise cette semaine
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm">
                                <FileText size={22} />
                            </div>
                        </div>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Charges du mois</p>
                                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                                    {stats.thisMonthExpenses.toLocaleString('fr-FR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })} MAD
                                </p>
                                <p className="mt-2 text-xs font-medium text-slate-500">
                                    Total des dépenses enregistrées
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500 text-white shadow-sm">
                                <DollarSign size={22} />
                            </div>
                        </div>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-slate-500">TVA récupérable</p>
                                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                                    {stats.tvaRecoverable.toLocaleString('fr-FR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })} MAD
                                </p>
                                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                    <TrendingUp size={14} />
                                    +15,2 %
                                </div>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
                                <TrendingUp size={22} />
                            </div>
                        </div>
                    </article>
                </section>

                {/* Clients section */}
                <section>
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                Vos clients
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Accédez rapidement à l'espace de travail de chaque entreprise.
                            </p>
                        </div>

                        <a
                            href="/accountant/clients"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                        >
                            Voir tous les clients
                            <ArrowRight size={16} />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {clients.slice(0, 3).map((client) => (
                            <article
                                key={client.id}
                                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                                onClick={() => {
                                    setCurrentClient(client);
                                    navigate(`/accountant/clients/${client.id}/invoices`);
                                }}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-blue-600">
                                            {client.companyName}
                                        </h3>
                                        <p className="mt-1 text-sm text-slate-500">
                                            {client.activity}
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                        {client.city}
                                    </span>
                                </div>

                                <dl className="mt-5 space-y-3">
                                    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                                        <dt className="text-sm text-slate-500">ICE</dt>
                                        <dd className="font-mono text-sm text-slate-900">{client.ICE}</dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="text-sm text-slate-500">Secteur</dt>
                                        <dd className="text-sm font-medium text-slate-900">{client.activity}</dd>
                                    </div>
                                </dl>

                                <button
                                    type="button"
                                    className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentClient(client);
                                        navigate(`/accountant/clients/${client.id}/invoices`);
                                    }}
                                >
                                    Ouvrir l'espace client
                                    <ArrowRight size={16} />
                                </button>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
