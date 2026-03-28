import { useEffect, useState } from 'react';
import { Plus, Edit2, Archive } from 'lucide-react';
import { PageHeader } from '../../components/reusable/PageHeader';
import { DataTable, Column } from '../../components/reusable/DataTable';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Client, CreateClientForm, Accountant } from '../../types';
import { getClients, createClient, updateClient, getAccountants } from '../../services/mockData';

export function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [accountants, setAccountants] = useState<Accountant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAccountantFilter, setSelectedAccountantFilter] = useState<string>('all');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<CreateClientForm>({
        companyName: '',
        ICE: '',
        IF: '',
        activity: '',
        city: '',
        contactEmail: '',
        phone: '',
        assignedAccountantId: '',
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        const [clientData, accountantData] = await Promise.all([
            getClients(),
            getAccountants(),
        ]);
        setClients(clientData);
        setAccountants(accountantData);
        if (accountantData.length > 0) {
            setFormData((prev) => ({
                ...prev,
                assignedAccountantId: accountantData[0].id,
            }));
        }
        setIsLoading(false);
    };

    const handleAddClient = async () => {
        if (!formData.companyName || !formData.ICE || !formData.assignedAccountantId) {
            alert('Please fill in required fields');
            return;
        }

        if (editingId) {
            const updated = await updateClient(editingId, {
                ...formData,
                status: 'active',
            } as Client);
            if (updated) {
                setClients(clients.map((c) => (c.id === editingId ? updated : c)));
            }
        } else {
            const newClient = await createClient({
                ...formData,
                status: 'active',
            });
            setClients([...clients, newClient]);
        }

        setFormData({
            companyName: '',
            ICE: '',
            IF: '',
            activity: '',
            city: '',
            contactEmail: '',
            phone: '',
            assignedAccountantId: accountants[0]?.id || '',
        });
        setEditingId(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (client: Client) => {
        setFormData({
            companyName: client.companyName,
            ICE: client.ICE,
            IF: client.IF,
            activity: client.activity,
            city: client.city,
            contactEmail: client.contactEmail,
            phone: client.phone,
            assignedAccountantId: client.assignedAccountantId,
        });
        setEditingId(client.id);
        setIsDialogOpen(true);
    };

    const handleArchive = async (id: string) => {
        const updated = await updateClient(id, { status: 'archived' });
        if (updated) {
            setClients(clients.map((c) => (c.id === id ? updated : c)));
        }
    };

    const filteredClients = clients.filter((c) => {
        const matchesSearch =
            c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.ICE.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAccountant =
            selectedAccountantFilter === 'all' ||
            c.assignedAccountantId === selectedAccountantFilter;
        return matchesSearch && matchesAccountant;
    });

    const columns: Column<Client>[] = [
        {
            id: 'companyName',
            header: 'Company',
            accessor: 'companyName',
            sortable: true,
        },
        {
            id: 'ICE',
            header: 'ICE',
            accessor: 'ICE',
        },
        {
            id: 'activity',
            header: 'Activity',
            accessor: 'activity',
        },
        {
            id: 'city',
            header: 'City',
            accessor: 'city',
        },
        {
            id: 'accountant',
            header: 'Assigned to',
            render: (row) => {
                const accountant = accountants.find(
                    (a) => a.id === row.assignedAccountantId
                );
                return accountant?.name || '-';
            },
        },
        {
            id: 'status',
            header: 'Status',
            render: (row) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </span>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            render: (row) => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(row)}>
                        <Edit2 size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleArchive(row.id)}
                    >
                        <Archive size={16} />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <PageHeader
                title="Clients Management"
                description="Manage all client accounts"
                action={{
                    label: 'Add Client',
                    onClick: () => {
                        setFormData({
                            companyName: '',
                            ICE: '',
                            IF: '',
                            activity: '',
                            city: '',
                            contactEmail: '',
                            phone: '',
                            assignedAccountantId: accountants[0]?.id || '',
                        });
                        setEditingId(null);
                        setIsDialogOpen(true);
                    },
                    icon: <Plus size={18} />,
                }}
            />

            {/* Filters */}
            <div className="mb-6 flex gap-4">
                <Input
                    placeholder="Search by company name or ICE..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                />
                <Select value={selectedAccountantFilter} onValueChange={setSelectedAccountantFilter}>
                    <SelectTrigger className="w-64">
                        <SelectValue placeholder="Filter by accountant" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Accountants</SelectItem>
                        {accountants.map((accountant) => (
                            <SelectItem key={accountant.id} value={accountant.id}>
                                {accountant.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <DataTable
                columns={columns}
                data={filteredClients}
                isLoading={isLoading}
            />

            {/* Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {editingId ? 'Edit Client' : 'Add New Client'}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Label>Company Name *</Label>
                            <Input
                                value={formData.companyName}
                                onChange={(e) =>
                                    setFormData({ ...formData, companyName: e.target.value })
                                }
                                placeholder="Company name"
                            />
                        </div>

                        <div>
                            <Label>ICE (Tax ID) *</Label>
                            <Input
                                value={formData.ICE}
                                onChange={(e) =>
                                    setFormData({ ...formData, ICE: e.target.value })
                                }
                                placeholder="002519191000027"
                            />
                        </div>

                        <div>
                            <Label>IF (ID for Moroccans)</Label>
                            <Input
                                value={formData.IF}
                                onChange={(e) => setFormData({ ...formData, IF: e.target.value })}
                                placeholder="123456789"
                            />
                        </div>

                        <div>
                            <Label>Activity</Label>
                            <Input
                                value={formData.activity}
                                onChange={(e) =>
                                    setFormData({ ...formData, activity: e.target.value })
                                }
                                placeholder="e.g. IT Services"
                            />
                        </div>

                        <div>
                            <Label>City</Label>
                            <Input
                                value={formData.city}
                                onChange={(e) =>
                                    setFormData({ ...formData, city: e.target.value })
                                }
                                placeholder="e.g. Casablanca"
                            />
                        </div>

                        <div>
                            <Label>Contact Email</Label>
                            <Input
                                type="email"
                                value={formData.contactEmail}
                                onChange={(e) =>
                                    setFormData({ ...formData, contactEmail: e.target.value })
                                }
                                placeholder="contact@company.ma"
                            />
                        </div>

                        <div>
                            <Label>Phone</Label>
                            <Input
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                placeholder="+212 5 22 12 34 56"
                            />
                        </div>

                        <div>
                            <Label>Assign to Accountant *</Label>
                            <Select value={formData.assignedAccountantId} onValueChange={(value) =>
                                setFormData({ ...formData, assignedAccountantId: value })
                            }>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select accountant" />
                                </SelectTrigger>
                                <SelectContent>
                                    {accountants.map((accountant) => (
                                        <SelectItem key={accountant.id} value={accountant.id}>
                                            {accountant.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="col-span-2 flex gap-2 justify-end pt-4">
                            <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleAddClient}>
                                {editingId ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
