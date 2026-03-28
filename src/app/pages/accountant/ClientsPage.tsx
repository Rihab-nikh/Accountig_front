import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useClient } from '../../contexts/ClientContext';
import { Search, MapPin, Mail, Phone, ArrowRight, Grid3x3, List, Table2 } from 'lucide-react';
import { Client } from '../../types';
import { getClients } from '../../services/mockData';
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
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
    const [filterActivity, setFilterActivity] = useState('');
    const [filterCity, setFilterCity] = useState('');

    // Get unique activities and cities for filter dropdown
    const uniqueActivities = Array.from(new Set(clients.map(c => c.activity)));
    const uniqueCities = Array.from(new Set(clients.map(c => c.city)));

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
                (c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.ICE.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.activity.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (filterActivity === '' || c.activity === filterActivity) &&
                (filterCity === '' || c.city === filterCity)
        );
        setFilteredClients(filtered);
    }, [searchQuery, clients, filterActivity, filterCity]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="min-h-[calc(100vh-128px)] bg-slate-50 px-6 py-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-medium text-blue-600">Gestion clients</p>
                        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                            Clients
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            3 clients assignés à votre portefeuille.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Ajouter un client
                    </button>
                </section>

                {/* Filters */}
                <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* Search */}
                        <div className="relative w-full lg:max-w-md">
                            <label htmlFor="client-search" className="sr-only">Rechercher un client</label>
                            <Search
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                size={18}
                            />

                            <input
                                id="client-search"
                                type="text"
                                placeholder="Rechercher par société, ICE ou secteur..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        {/* View switch */}
                        <div
                            className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1"
                            role="group"
                            aria-label="Changer la vue"
                        >
                            <button
                                type="button"
                                aria-label="Vue grille"
                                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-white hover:text-slate-900'}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid3x3 size={17} />
                            </button>

                            <button
                                type="button"
                                aria-label="Vue liste"
                                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-white hover:text-slate-900'}`}
                                onClick={() => setViewMode('list')}
                            >
                                <List size={17} />
                            </button>

                            <button
                                type="button"
                                aria-label="Vue tableau"
                                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition ${viewMode === 'table' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-white hover:text-slate-900'}`}
                                onClick={() => setViewMode('table')}
                            >
                                <Table2 size={17} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-fit">
                        <select
                            value={filterActivity}
                            onChange={(e) => setFilterActivity(e.target.value)}
                            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        >
                            <option value="">Toutes les activités</option>
                            <option value="Services IT & Conseil">Services IT & Conseil</option>
                            <option value="Import / Export">Import / Export</option>
                            <option value="Technologie agricole">Technologie agricole</option>
                        </select>

                        <select
                            value={filterCity}
                            onChange={(e) => setFilterCity(e.target.value)}
                            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        >
                            <option value="">Toutes les villes</option>
                            <option value="Casablanca">Casablanca</option>
                            <option value="Rabat">Rabat</option>
                            <option value="Marrakech">Marrakech</option>
                        </select>
                    </div>
                </section>

                {/* Client cards */}
                <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredClients.slice(0, 3).map((client) => (
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
                                    <h3 className="text-xl font-semibold text-slate-900 transition group-hover:text-blue-600">
                                        {client.companyName}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">{client.activity}</p>
                                </div>

                                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                    Actif
                                </span>
                            </div>

                            <div className="mt-5 space-y-3">
                                <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                                    <span className="text-sm text-slate-500">ICE</span>
                                    <span className="font-mono text-sm text-slate-900">{client.ICE}</span>
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <MapPin className="shrink-0 text-slate-400" size={17} />
                                    {client.city}
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Mail className="shrink-0 text-slate-400" size={17} />
                                    <span className="truncate">{client.contactEmail}</span>
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Phone className="shrink-0 text-slate-400" size={17} />
                                    {client.phone}
                                </div>
                            </div>

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
                                <ArrowRight size={17} />
                            </button>
                        </article>
                    ))}
                </section>
            </div>
        </main>
    );
}
