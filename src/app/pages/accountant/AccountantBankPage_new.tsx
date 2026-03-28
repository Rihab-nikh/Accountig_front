import { useState, useEffect } from 'react';
import {
  Banknote,
  CheckCircle,
  Clock,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  Search,
  Calendar,
  Download,
  AlertTriangle
} from 'lucide-react';

interface BankAccount {
  id: string;
  name: string;
  bankName: string;
  accountNumber: string;
  balance: number;
  currency: string;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync?: string;
  connectionType: 'api' | 'csv' | 'manual';
}

interface BankTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category?: string;
  reconciled: boolean;
  reference?: string;
}

interface ReconciliationSummary {
  totalTransactions: number;
  reconciledCount: number;
  unreconciledCount: number;
  balance: number;
  lastReconciliation: string;
}

export function AccountantBankPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<BankTransaction[]>([]);
  const [reconciliationSummary, setReconciliationSummary] = useState<ReconciliationSummary | null>(null);
  const [showBalances, setShowBalances] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>('all');
  const [filterReconciled, setFilterReconciled] = useState<'all' | 'reconciled' | 'unreconciled'>('all');

  // Mock data
  useEffect(() => {
    const mockAccounts: BankAccount[] = [
      {
        id: '1',
        name: 'Compte principal',
        bankName: 'Attijariwafa Bank',
        accountNumber: '****1234',
        balance: 125000.50,
        currency: 'MAD',
        status: 'connected',
        lastSync: '2026-03-28T11:00:00Z',
        connectionType: 'api'
      },
      {
        id: '2',
        name: 'Compte paie',
        bankName: 'BMCE Bank',
        accountNumber: '****5678',
        balance: 45000.00,
        currency: 'MAD',
        status: 'connected',
        lastSync: '2026-03-27T16:30:00Z',
        connectionType: 'api'
      },
      {
        id: '3',
        name: 'Compte USD',
        bankName: 'Société Générale',
        accountNumber: '****9012',
        balance: 25000.00,
        currency: 'USD',
        status: 'syncing',
        connectionType: 'csv'
      }
    ];

    const mockTransactions: BankTransaction[] = [
      {
        id: '1',
        date: '2026-03-28T09:00:00Z',
        description: 'Paiement client - TechCorp SARL',
        amount: 1250.00,
        type: 'credit',
        category: 'Revenu',
        reconciled: true,
        reference: 'INV-001'
      },
      {
        id: '2',
        date: '2026-03-27T14:30:00Z',
        description: 'Fournitures de bureau - Office Depot',
        amount: -890.50,
        type: 'debit',
        category: 'Charge',
        reconciled: true,
        reference: 'EXP-001'
      },
      {
        id: '3',
        date: '2026-03-27T11:00:00Z',
        description: 'Paiement des salaires - Mars',
        amount: -15000.00,
        type: 'debit',
        category: 'Paie',
        reconciled: false
      },
      {
        id: '4',
        date: '2026-03-26T16:45:00Z',
        description: 'Facture eau/électricité - LYDEC',
        amount: -2340.00,
        type: 'debit',
        category: 'Charges fixes',
        reconciled: false
      },
      {
        id: '5',
        date: '2026-03-26T10:15:00Z',
        description: 'Revenu de service - BuildMaster LLC',
        amount: 3890.00,
        type: 'credit',
        category: 'Revenu',
        reconciled: true,
        reference: 'INV-002'
      }
    ];

    const mockSummary: ReconciliationSummary = {
      totalTransactions: 45,
      reconciledCount: 32,
      unreconciledCount: 13,
      balance: 125000.50,
      lastReconciliation: '2026-03-28T09:00:00Z'
    };

    setAccounts(mockAccounts);
    setTransactions(mockTransactions);
    setReconciliationSummary(mockSummary);
    setSelectedAccount('1');
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (transaction.reference && transaction.reference.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesReconciled = filterReconciled === 'all' ||
                             (filterReconciled === 'reconciled' && transaction.reconciled) ||
                             (filterReconciled === 'unreconciled' && !transaction.reconciled);
    return matchesSearch && matchesType && matchesReconciled;
  });

  const handleConnectBank = (accountId: string) => {
    setAccounts(prev =>
      prev.map(acc =>
        acc.id === accountId
          ? { ...acc, status: 'syncing' as const }
          : acc
      )
    );

    // Simulate connection
    setTimeout(() => {
      setAccounts(prev =>
        prev.map(acc =>
          acc.id === accountId
            ? { ...acc, status: 'connected' as const, lastSync: new Date().toISOString() }
            : acc
        )
      );
    }, 3000);
  };

  const handleSyncAccount = (accountId: string) => {
    setAccounts(prev =>
      prev.map(acc =>
        acc.id === accountId
          ? { ...acc, status: 'syncing' as const }
          : acc
      )
    );

    // Simulate sync
    setTimeout(() => {
      setAccounts(prev =>
        prev.map(acc =>
          acc.id === accountId
            ? { ...acc, status: 'connected' as const, lastSync: new Date().toISOString() }
            : acc
        )
      );
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      connected: { color: 'bg-emerald-50 text-emerald-700', label: 'Connecté', icon: CheckCircle },
      disconnected: { color: 'bg-red-50 text-red-700', label: 'Déconnecté', icon: null },
      syncing: { color: 'bg-amber-50 text-amber-700', label: 'Synchronisation', icon: Clock }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.disconnected;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${config.color}`}>
        {Icon && <Icon size={12} />}
        {config.label}
      </span>
    );
  };

  const getConnectionTypeBadge = (type: string) => {
    const typeConfig = {
      api: { color: 'bg-blue-50 text-blue-700', label: 'API' },
      csv: { color: 'bg-violet-50 text-violet-700', label: 'Import CSV' },
      manual: { color: 'bg-gray-50 text-gray-700', label: 'Manuel' }
    };

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.manual;

    return (
      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatCurrency = (amount: number, currency: string = 'MAD') => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: currency === 'USD' ? 'USD' : 'MAD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <main className="min-h-[calc(100vh-128px)] bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Page header */}
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">Banque & rapprochement</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Rapprochement bancaire
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Connectez vos comptes bancaires et suivez le rapprochement des transactions.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Ajouter un compte bancaire
          </button>
        </section>

        {/* Bank accounts */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {accounts.map((account) => (
            <article
              key={account.id}
              className={`rounded-2xl border p-6 shadow-sm transition hover:shadow-md ${
                selectedAccount === account.id
                  ? 'border-blue-200 bg-white ring-1 ring-blue-100'
                  : 'border-slate-200 bg-white'
              }`}
              onClick={() => setSelectedAccount(account.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {account.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">{account.bankName}</p>
                </div>

                {getStatusBadge(account.status)}
              </div>

              <dl className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-slate-500">Compte</dt>
                  <dd className="font-mono text-sm text-slate-900">{account.accountNumber}</dd>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <dt className="text-sm text-slate-500">Solde</dt>
                  <dd className="flex items-center gap-2 text-right">
                    <span className="text-lg font-bold text-slate-900">
                      {showBalances ? formatCurrency(account.balance, account.currency) : '••••••••'}
                    </span>
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowBalances(!showBalances);
                      }}
                      aria-label="Masquer le solde"
                    >
                      {showBalances ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-sm text-slate-500">Connexion</dt>
                  <dd>
                    {getConnectionTypeBadge(account.connectionType)}
                  </dd>
                </div>
              </dl>

              <p className="mt-4 text-xs text-slate-500">
                Dernière synchronisation : {account.lastSync ? formatDate(account.lastSync) + ' à ' + new Date(account.lastSync).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : 'Jamais'}
              </p>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSyncAccount(account.id);
                  }}
                >
                  <RefreshCw size={14} />
                  Synchroniser
                </button>

                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
                  aria-label="Paramètres du compte"
                >
                  <Settings size={14} />
                </button>
              </div>
            </article>
          ))}

          {/* Add Account Card */}
          <article className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white p-6 text-center transition hover:border-blue-400 hover:bg-slate-50">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <Banknote size={28} />
            </div>

            <h3 className="text-base font-semibold text-slate-900">
              Ajouter un compte bancaire
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Connectez un nouveau compte pour automatiser le rapprochement.
            </p>

            <button
              type="button"
              className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Connecter une banque
            </button>
          </article>
        </section>

        {/* Summary */}
        {reconciliationSummary && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Résumé du rapprochement
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Vue d'ensemble des transactions bancaires et de leur statut.
                </p>
              </div>

              <p className="text-sm text-slate-500">
                Dernier rapprochement : {formatDate(reconciliationSummary.lastReconciliation)} à {new Date(reconciliationSummary.lastReconciliation).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-5 text-center">
                <div className="text-2xl font-bold text-slate-900">{reconciliationSummary.totalTransactions}</div>
                <div className="mt-1 text-sm text-slate-500">Transactions totales</div>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-5 text-center">
                <div className="text-2xl font-bold text-emerald-700">{reconciliationSummary.reconciledCount}</div>
                <div className="mt-1 text-sm text-emerald-700">Rapprochées</div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-emerald-100">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${(reconciliationSummary.reconciledCount / reconciliationSummary.totalTransactions) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50 p-5 text-center">
                <div className="text-2xl font-bold text-amber-700">{reconciliationSummary.unreconciledCount}</div>
                <div className="mt-1 text-sm text-amber-700">À traiter</div>
              </div>

              <div className="rounded-2xl bg-blue-50 p-5 text-center">
                <div className="text-2xl font-bold text-blue-700">{formatCurrency(reconciliationSummary.balance)}</div>
                <div className="mt-1 text-sm text-blue-700">Solde du compte sélectionné</div>
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-md">
              <label htmlFor="transaction-search" className="sr-only">Rechercher une transaction</label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                id="transaction-search"
                type="text"
                placeholder="Rechercher une transaction..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="all">Tous les types</option>
                <option value="credit">Crédits</option>
                <option value="debit">Débits</option>
              </select>

              <select
                value={filterReconciled}
                onChange={(e) => setFilterReconciled(e.target.value as any)}
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="all">Tous les statuts</option>
                <option value="reconciled">Rapprochées</option>
                <option value="unreconciled">Non rapprochées</option>
              </select>

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <Calendar size={16} />
                Période
              </button>

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <Download size={16} />
                Exporter
              </button>
            </div>
          </div>
        </section>

        {/* Transactions table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Catégorie</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Montant</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Statut</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-700">{formatDate(transaction.date)}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{transaction.description}</div>
                      {transaction.reference && (
                        <div className="text-sm text-slate-500">{transaction.reference}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {transaction.category && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          {transaction.category}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${transaction.type === 'credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {transaction.type === 'credit' ? '+' : ''}{formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        transaction.reconciled
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {transaction.reconciled ? 'Rapprochée' : 'Non rapprochée'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {!transaction.reconciled && (
                          <button
                            type="button"
                            className="inline-flex h-9 items-center justify-center rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Rapprocher
                          </button>
                        )}
                        <button
                          type="button"
                          className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                          Voir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Alert */}
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="mt-0.5 shrink-0" />
            <p>
              <strong>Vérification des données :</strong> {reconciliationSummary?.unreconciledCount || 0} transactions nécessitent une attention.
              Vérifiez les opérations non rapprochées et assurez-vous que tous les flux bancaires sont bien connectés.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}