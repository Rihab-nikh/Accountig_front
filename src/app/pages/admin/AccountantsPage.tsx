import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Archive } from 'lucide-react';
import { PageHeader } from '../../components/reusable/PageHeader';
import { DataTable, Column } from '../../components/reusable/DataTable';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Accountant, CreateAccountantForm } from '../../types';
import { getAccountants, createAccountant, updateAccountant } from '../../services/mockData';

export function AccountantsPage() {
    const [accountants, setAccountants] = useState<Accountant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<CreateAccountantForm>({
        name: '',
        email: '',
        phone: '',
        specialization: '',
    });

    useEffect(() => {
        loadAccountants();
    }, []);

    const loadAccountants = async () => {
        setIsLoading(true);
        const data = await getAccountants();
        setAccountants(data);
        setIsLoading(false);
    };

    const handleAddAccountant = async () => {
        if (!formData.name || !formData.email) {
            alert('Please fill in required fields');
            return;
        }

        if (editingId) {
            const updated = await updateAccountant(editingId, {
                ...formData,
                status: 'active',
            } as Accountant);
            if (updated) {
                setAccountants(
                    accountants.map((a) => (a.id === editingId ? updated : a))
                );
            }
        } else {
            const newAccountant = await createAccountant({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                specialization: formData.specialization,
                status: 'active',
            });
            setAccountants([...accountants, newAccountant]);
        }

        setFormData({ name: '', email: '', phone: '', specialization: '' });
        setEditingId(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (accountant: Accountant) => {
        setFormData({
            name: accountant.name,
            email: accountant.email,
            phone: accountant.phone,
            specialization: accountant.specialization,
        });
        setEditingId(accountant.id);
        setIsDialogOpen(true);
    };

    const handleArchive = async (id: string) => {
        const updated = await updateAccountant(id, { status: 'archived' });
        if (updated) {
            setAccountants(accountants.map((a) => (a.id === id ? updated : a)));
        }
    };

    const filteredAccountants = accountants.filter(
        (a) =>
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns: Column<Accountant>[] = [
        {
            id: 'name',
            header: 'Name',
            accessor: 'name',
            sortable: true,
        },
        {
            id: 'email',
            header: 'Email',
            accessor: 'email',
        },
        {
            id: 'phone',
            header: 'Phone',
            accessor: 'phone',
        },
        {
            id: 'clientCount',
            header: 'Clients',
            accessor: 'clientCount',
        },
        {
            id: 'specialization',
            header: 'Specialization',
            accessor: 'specialization',
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
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(row)}
                    >
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
                title="Accountants Management"
                description="Manage your team of accountants"
                action={{
                    label: 'Add Accountant',
                    onClick: () => {
                        setFormData({ name: '', email: '', phone: '', specialization: '' });
                        setEditingId(null);
                        setIsDialogOpen(true);
                    },
                    icon: <Plus size={18} />,
                }}
            />

            {/* Search */}
            <div className="mb-6">
                <Input
                    placeholder="Search accountants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            {/* Table */}
            <DataTable
                columns={columns}
                data={filteredAccountants}
                isLoading={isLoading}
            />

            {/* Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingId ? 'Edit Accountant' : 'Add New Accountant'}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label>Name *</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                placeholder="Full name"
                            />
                        </div>

                        <div>
                            <Label>Email *</Label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                placeholder="email@example.com"
                            />
                        </div>

                        <div>
                            <Label>Phone</Label>
                            <Input
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                placeholder="+212 6 12 34 56 78"
                            />
                        </div>

                        <div>
                            <Label>Specialization</Label>
                            <Input
                                value={formData.specialization}
                                onChange={(e) =>
                                    setFormData({ ...formData, specialization: e.target.value })
                                }
                                placeholder="e.g. Small Business Accounting"
                            />
                        </div>

                        <div className="flex gap-2 justify-end pt-4">
                            <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleAddAccountant}>
                                {editingId ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
