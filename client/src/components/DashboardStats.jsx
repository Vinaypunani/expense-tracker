import { useTransactions } from '../context/TransactionContext';
import { formatINR } from '../utils/currency';
import { Card } from './ui/Card';

export const DashboardStats = () => {
    const { dashboardStats, loading } = useTransactions();

    if (loading && !dashboardStats) {
        return (
            <div className="grid grid-cols-1 gap-4 mb-6">
                {[1, 2, 3].map(i => (
                    <Card key={i} className="p-5 animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3" />
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                    </Card>
                ))}
            </div>
        );
    }

    const stats = dashboardStats || { income: 0, expense: 0, balance: 0 };

    return (
        <div className="grid grid-cols-1 gap-4 mb-6">
            {/* Income Card */}
            <Card className="p-5 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-l-4 border-green-500">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 bg-green-500 dark:bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                Total Income
                            </p>
                        </div>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                            {formatINR(stats.income)}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Expense Card */}
            <Card className="p-5 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-l-4 border-red-500">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 bg-red-500 dark:bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                Total Expenses
                            </p>
                        </div>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">
                            {formatINR(stats.expense)}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Balance Card */}
            <Card className={`p-5 bg-gradient-to-br ${stats.balance >= 0 ? 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-blue-500' : 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-l-4 border-orange-500'}`}>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className={`w-8 h-8 ${stats.balance >= 0 ? 'bg-blue-500 dark:bg-blue-600' : 'bg-orange-500 dark:bg-orange-600'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                Net Balance
                            </p>
                        </div>
                        <p className={`text-2xl font-bold ${stats.balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'} mt-2`}>
                            {formatINR(stats.balance)}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};
