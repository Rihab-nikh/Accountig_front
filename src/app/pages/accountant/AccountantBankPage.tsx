import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Progress } from '../../components/ui/progress';
import {
  Banknote,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Download,
  Upload,
  Link,
  Unlink,
  Eye,
  EyeOff,
  Settings,
  Activity,
  DollarSign,
  Calendar,
  Search
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageHeader } from '../../components/reusable/PageHeader';

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
  const { t } = useLanguage();
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
        name: 'Main Business Account',
        bankName: 'Attijariwafa Bank',
        accountNumber: '****1234',
        balance: 125000.50,
        currency: 'MAD',
        status: 'connected',
        lastSync: '2026-03-28T10:00:00Z',
        connectionType: 'api'
      },
      {
        id: '2',
        name: 'Payroll Account',
        bankName: 'BMCE Bank',
        accountNumber: '****5678',
        balance: 45000.00,
        currency: 'MAD',
        status: 'connected',
        lastSync: '2026-03-27T15:30:00Z',
        connectionType: 'api'
      },
      {
        id: '3',
        name: 'USD Account',
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
        description: 'Client Payment - TechCorp SARL',
        amount: 1250.00,
        type: 'credit',
        category: 'Income',
        reconciled: true,
        reference: 'INV-001'
      },
      {
        id: '2',
        date: '2026-03-27T14:30:00Z',
        description: 'Office Supplies - Office Depot',
        amount: -890.50,
        type: 'debit',
        category: 'Expenses',
        reconciled: true,
        reference: 'EXP-001'
      },
      {
        id: '3',
        date: '2026-03-27T11:00:00Z',
        description: 'Salary Payment - March',
        amount: -15000.00,
        type: 'debit',
        category: 'Payroll',
        reconciled: false
      },
      {
        id: '4',
        date: '2026-03-26T16:45:00Z',
        description: 'Utility Bill - LYDEC',
        amount: -2340.00,
        type: 'debit',
        category: 'Utilities',
        reconciled: false
      },
      {
        id: '5',
        date: '2026-03-26T10:15:00Z',
        description: 'Service Revenue - BuildMaster LLC',
        amount: 3890.00,
        type: 'credit',
        category: 'Income',
        reconciled: true,
        reference: 'INV-002'
      }
    ];

    const mockSummary: ReconciliationSummary = {
      totalTransactions: 45,
      reconciledCount: 32,
      unreconciledCount: 13,
      balance: 125000.50,
      lastReconciliation: '2026-03-28T08:00:00Z'
    };

    setAccounts(mockAccounts);
    setTransactions(mockTransactions);
    setReconciliationSummary(mockSummary);
    setSelectedAccount('1');
  }, []);

  const selectedAccountData = accounts.find(acc => acc.id === selectedAccount);
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
      connected: { color: 'bg-green-100 text-green-800', label: 'Connected', icon: CheckCircle },
      disconnected: { color: 'bg-red-100 text-red-800', label: 'Disconnected', icon: Unlink },
      syncing: { color: 'bg-yellow-100 text-yellow-800', label: 'Syncing', icon: RefreshCw }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.disconnected;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} border-0`}>
        <Icon size={12} className="mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getConnectionTypeBadge = (type: string) => {
    const typeConfig = {
      api: { color: 'bg-blue-100 text-blue-800', label: 'API' },
      csv: { color: 'bg-purple-100 text-purple-800', label: 'CSV Upload' },
      manual: { color: 'bg-gray-100 text-gray-800', label: 'Manual' }
    };

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.manual;

    return (
      <Badge className={`${config.color} border-0 text-xs`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bank Reconciliation"
        description="Connect bank accounts and reconcile transactions"
      />

      {/* Bank Accounts Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <Card
            key={account.id}
            className={`cursor-pointer transition-all ${
              selectedAccount === account.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedAccount(account.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{account.name}</CardTitle>
                {getStatusBadge(account.status)}
              </div>
              <CardDescription>{account.bankName}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account</span>
                  <span className="font-mono text-sm">{account.accountNumber}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Balance</span>
                  <div className="flex items-center gap-2">
                    {showBalances ? (
                      <span className="font-semibold text-lg">
                        {account.balance.toLocaleString('fr-MA', {
                          style: 'currency',
                          currency: account.currency
                        })}
                      </span>
                    ) : (
                      <span className="font-semibold text-lg">••••••</span>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowBalances(!showBalances);
                      }}
                    >
                      {showBalances ? <EyeOff size={14} /> : <Eye size={14} />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Connection</span>
                  {getConnectionTypeBadge(account.connectionType)}
                </div>

                {account.lastSync && (
                  <div className="text-xs text-gray-500">
                    Last sync: {new Date(account.lastSync).toLocaleString()}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  {account.status === 'disconnected' && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConnectBank(account.id);
                      }}
                      className="flex-1"
                    >
                      <Link size={14} className="mr-1" />
                      Connect
                    </Button>
                  )}
                  {account.status === 'connected' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSyncAccount(account.id);
                      }}
                      className="flex-1"
                    >
                      <RefreshCw size={14} className="mr-1" />
                      Sync
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Settings size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Account Card */}
        <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
          <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
            <Banknote size={48} className="text-gray-400 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Add Bank Account</h3>
            <p className="text-sm text-gray-600 mb-4">
              Connect a new bank account for automatic reconciliation
            </p>
            <Button>
              <Link size={16} className="mr-2" />
              Connect Bank
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Reconciliation Summary */}
      {reconciliationSummary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={20} />
              Reconciliation Summary
            </CardTitle>
            <CardDescription>
              Overview of transaction reconciliation status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {reconciliationSummary.totalTransactions}
                </div>
                <div className="text-sm text-gray-600">Total Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {reconciliationSummary.reconciledCount}
                </div>
                <div className="text-sm text-gray-600">Reconciled</div>
                <Progress
                  value={(reconciliationSummary.reconciledCount / reconciliationSummary.totalTransactions) * 100}
                  className="mt-2"
                />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {reconciliationSummary.unreconciledCount}
                </div>
                <div className="text-sm text-gray-600">Unreconciled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {reconciliationSummary.balance.toLocaleString('fr-MA', {
                    style: 'currency',
                    currency: 'MAD'
                  })}
                </div>
                <div className="text-sm text-gray-600">Account Balance</div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Last reconciliation: {new Date(reconciliationSummary.lastReconciliation).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transaction Filters */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="credit">Credits</option>
            <option value="debit">Debits</option>
          </select>

          <select
            value={filterReconciled}
            onChange={(e) => setFilterReconciled(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="reconciled">Reconciled</option>
            <option value="unreconciled">Unreconciled</option>
          </select>

          <Button variant="outline">
            <Calendar size={18} className="mr-2" />
            Date Range
          </Button>

          <Button variant="outline">
            <Download size={18} className="mr-2" />
            Export
          </Button>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{transaction.description}</div>
                      {transaction.reference && (
                        <div className="text-sm text-gray-500">{transaction.reference}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {transaction.category && (
                      <Badge variant="outline" className="text-xs">
                        {transaction.category}
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`font-semibold flex items-center gap-1 ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                      {transaction.amount.toLocaleString('fr-MA', {
                        style: 'currency',
                        currency: 'MAD'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={`border-0 ${
                        transaction.reconciled
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {transaction.reconciled ? (
                        <>
                          <CheckCircle size={12} className="mr-1" />
                          Reconciled
                        </>
                      ) : (
                        <>
                          <AlertTriangle size={12} className="mr-1" />
                          Unreconciled
                        </>
                      )}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {!transaction.reconciled && (
                        <Button size="sm" variant="outline">
                          <CheckCircle size={14} className="mr-1" />
                          Reconcile
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye size={14} className="mr-1" />
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <Banknote size={48} className="mx-auto text-gray-300 mb-4" />
            <p>No transactions found matching your criteria</p>
          </div>
        )}
      </Card>

      {/* Data Health Alert */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Data Health Check:</strong> 3 transactions need attention. Review unreconciled items and ensure all bank feeds are connected for accurate reconciliation.
        </AlertDescription>
      </Alert>
    </div>
  );
}