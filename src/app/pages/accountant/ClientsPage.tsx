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
    Grid3x3,
    List,
    Table2,
    X,
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

            {/* Search, Filters and View Toggle */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="relative max-w-md flex-1">
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

                    {/* View Toggle */}
                    <div className="flex items-center gap-2 bg-background-primary rounded-lg p-1 border border-border">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded transition-colors ${
                                viewMode === 'grid'
                                    ? 'bg-accent text-white'
                                    : 'text-text-secondary hover:text-text-primary'
                            }`}
                            aria-label="Grid view"
                            title="Grid view"
                        >
                            <Grid3x3 size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded transition-colors ${
                                viewMode === 'list'
                                    ? 'bg-accent text-white'
                                    : 'text-text-secondary hover:text-text-primary'
                            }`}
                            aria-label="List view"
                            title="List view"
                        >
                            <List size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded transition-colors ${
                                viewMode === 'table'
                                    ? 'bg-accent text-white'
                                    : 'text-text-secondary hover:text-text-primary'
                            }`}
                            aria-label="Table view"
                            title="Table view"
                        >
                            <Table2 size={18} />
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 sm:flex-none">
                        <select
                            value={filterActivity}
                            onChange={(e) => setFilterActivity(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm"
                        >
                            <option value="">All Activities</option>
                            {uniqueActivities.map((activity) => (
                                <option key={activity} value={activity}>
                                    {activity}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="flex-1 sm:flex-none">
                        <select
                            value={filterCity}
                            onChange={(e) => setFilterCity(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary text-sm"
                        >
                            <option value="">All Cities</option>
                            {uniqueCities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    {(filterActivity || filterCity) && (
                        <button
                            onClick={() => {
                                setFilterActivity('');
                                setFilterCity('');
                            }}
                            className="px-3 py-2 text-sm border border-border rounded-lg hover:bg-background-secondary transition-colors flex items-center gap-2"
                        >
                            <X size={16} />
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>

            {/* Clients Grid View */}
            {viewMode === 'grid' && (
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
            )}

            {/* Clients List View */}
            {viewMode === 'list' && (
                <div className="space-y-3">
                    {filteredClients.map((client, idx) => (
                        <motion.div
                            key={client.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <button
                                onClick={() => {
                                    setCurrentClient(client);
                                    navigate(`/accountant/clients/${client.id}/invoices`);
                                }}
                                className="w-full"
                            >
                                <Card className="border border-gray-200 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer">
                                    <div className="p-4 flex items-center justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start gap-4 flex-col sm:flex-row sm:items-center">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors text-left">
                                                        {client.companyName}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mt-1 text-left">
                                                        {client.activity}
                                                    </p>
                                                </div>
                                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full whitespace-nowrap">
                                                    {t.accountantClients.activeBadge}
                                                </span>
                                            </div>

                                            {/* Details Grid */}
                                            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                                                <div className="text-left">
                                                    <p className="text-gray-500 text-xs">ICE</p>
                                                    <p className="font-mono text-xs bg-gray-100 px-2 py-1 rounded inline-block mt-1">
                                                        {client.ICE}
                                                    </p>
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-gray-500 text-xs flex items-center gap-1">
                                                        <MapPin size={14} />
                                                        City
                                                    </p>
                                                    <p className="text-gray-700 mt-1">{client.city}</p>
                                                </div>
                                                <div className="text-left hidden sm:block">
                                                    <p className="text-gray-500 text-xs flex items-center gap-1">
                                                        <Mail size={14} />
                                                        Email
                                                    </p>
                                                    <p className="text-gray-700 text-xs truncate mt-1">{client.contactEmail}</p>
                                                </div>
                                                <div className="text-left hidden sm:block">
                                                    <p className="text-gray-500 text-xs flex items-center gap-1">
                                                        <Phone size={14} />
                                                        Phone
                                                    </p>
                                                    <p className="text-gray-700 mt-1">{client.phone}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="flex-shrink-0">
                                            <ArrowRight
                                                size={20}
                                                className="text-gray-400 group-hover:text-indigo-600 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Clients Table View */}
            {viewMode === 'table' && (
                <div className="overflow-x-auto">
                    <Card className="border border-gray-200">
                        <table className="w-full text-sm">
                            <thead className="bg-background-primary border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left font-semibold text-[#0F172A]">Company</th>
                                    <th className="px-6 py-3 text-left font-semibold text-[#0F172A]">Activity</th>
                                    <th className="px-6 py-3 text-left font-semibold text-[#0F172A]">City</th>
                                    <th className="px-6 py-3 text-left font-semibold text-[#0F172A]">ICE</th>
                                    <th className="px-6 py-3 text-left font-semibold text-[#0F172A]">Email</th>
                                    <th className="px-6 py-3 text-left font-semibold text-[#0F172A]">Phone</th>
                                    <th className="px-6 py-3 text-left font-semibold text-[#0F172A]">Status</th>
                                    <th className="px-6 py-3 text-center font-semibold text-[#0F172A]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClients.map((client, idx) => (
                                    <tr
                                        key={client.id}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-[#0F172A]">{client.companyName}</p>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{client.activity}</td>
                                        <td className="px-6 py-4 text-gray-600">{client.city}</td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                                {client.ICE}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 truncate text-xs">{client.contactEmail}</td>
                                        <td className="px-6 py-4 text-gray-600">{client.phone}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => {
                                                    setCurrentClient(client);
                                                    navigate(`/accountant/clients/${client.id}/invoices`);
                                                }}
                                                className="text-accent hover:text-accent-dark transition-colors"
                                            >
                                                <ArrowRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            )}

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
