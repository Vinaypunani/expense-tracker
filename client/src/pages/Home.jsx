import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTransactions } from '../context/TransactionContext';
import { useNavigate } from 'react-router-dom';
import { DashboardStats } from '../components/DashboardStats';
import { TransactionForm } from '../components/TransactionForm';
import { RecentTransactions } from '../components/RecentTransactions';
import { TIME_PERIODS, TIME_PERIOD_LABELS, getDateRangeForPeriod } from '../utils/dateUtils';

export const Home = () => {
    const { user, logout } = useAuth();
    const { dashboardStats, fetchDashboardStats } = useTransactions();
    const navigate = useNavigate();
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState(TIME_PERIODS.THIS_MONTH);

    // Fetch dashboard stats when period changes
    useEffect(() => {
        const { startDate, endDate } = getDateRangeForPeriod(selectedPeriod);
        fetchDashboardStats(
            startDate ? startDate.toISOString() : null,
            endDate ? endDate.toISOString() : null
        );
    }, [selectedPeriod]); // eslint-disable-line

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAddTransaction = () => {
        setShowTransactionForm(true);
    };

    const handleCloseForm = () => {
        setShowTransactionForm(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-900">
            {/* Header - Mobile Optimized */}
            <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#007AFF] to-blue-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">Expense Tracker</h1>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">Welcome, {user?.name}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors flex-shrink-0"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content - Mobile First */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-24">
                {/* Time Period Selector */}
                <div className="mb-6">
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white font-medium focus:border-[#007AFF] transition-all shadow-sm"
                    >
                        {Object.entries(TIME_PERIOD_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Dashboard Stats */}
                <DashboardStats />

                {/* Recent Transactions */}
                <RecentTransactions />

                {/* Quick Stats - if we have transactions */}
                {dashboardStats && (dashboardStats.incomeCount > 0 || dashboardStats.expenseCount > 0) && (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-3 sm:p-4 shadow-sm">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Income Count</p>
                            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.incomeCount}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-3 sm:p-4 shadow-sm">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Expense Count</p>
                            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{dashboardStats.expenseCount}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-3 sm:p-4 shadow-sm">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Avg Income</p>
                            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                ₹{dashboardStats.incomeCount > 0 ? (dashboardStats.income / dashboardStats.incomeCount).toFixed(0) : 0}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-3 sm:p-4 shadow-sm">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Avg Expense</p>
                            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                ₹{dashboardStats.expenseCount > 0 ? (dashboardStats.expense / dashboardStats.expenseCount).toFixed(0) : 0}
                            </p>
                        </div>
                    </div>
                )}
            </main>

            {/* Floating Add Button - Touch Optimized */}
            <button
                onClick={handleAddTransaction}
                className="fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-[#007AFF] text-white rounded-full shadow-2xl hover:bg-[#0066DD] transition-all active:scale-95 flex items-center justify-center z-50"
                aria-label="Add transaction"
            >
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
            </button>

            {/* Transaction Form Modal */}
            <TransactionForm
                isOpen={showTransactionForm}
                onClose={handleCloseForm}
            />
        </div>
    );
};
