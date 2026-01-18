import { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { formatINR } from '../utils/currency';
import { formatDate } from '../utils/dateUtils';
import { Link } from 'react-router-dom';
import { TransactionDetails } from './TransactionDetails';
import { TransactionForm } from './TransactionForm';

export const RecentTransactions = () => {
    const { dashboardStats, categories, deleteTransaction, fetchDashboardStats } = useTransactions();
    const recentTransactions = dashboardStats?.recentTransactions || [];

    const [viewingTransaction, setViewingTransaction] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleViewDetails = (transaction) => {
        setViewingTransaction(transaction);
        setShowDetailsModal(true);
    };

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setShowEditForm(true);
    };

    const handleDelete = async (id) => {
        const result = await deleteTransaction(id);
        if (result.success) {
            // Refresh dashboard stats
            await fetchDashboardStats();
        }
    };

    if (recentTransactions.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Transactions</h2>
                <div className="text-center py-8 sm:py-12">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-3 sm:mb-4">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1 text-sm sm:text-base">No transactions yet</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                        Start by adding your first expense or income
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Recent Transactions</h2>
                    <Link
                        to="/transactions"
                        className="text-sm font-medium text-[#007AFF] hover:text-[#0066DD] transition-colors"
                    >
                        View All →
                    </Link>
                </div>

                <div className="space-y-3">
                    {recentTransactions.map((transaction) => {
                        // Find category from database
                        const category = categories.find(cat =>
                            cat.name === transaction.category && cat.type === transaction.type
                        );
                        const isIncome = transaction.type === 'income';

                        return (
                            <div
                                key={transaction._id}
                                onClick={() => handleViewDetails(transaction)}
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-750 transition-all cursor-pointer hover:scale-[1.02]"
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    {/* Category Icon */}
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                                        style={{ backgroundColor: category?.color ? category.color + '20' : '#E5E7EB' }}
                                    >
                                        {category?.icon || '📌'}
                                    </div>

                                    {/* Transaction Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white truncate">
                                            {transaction.category}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {formatDate(transaction.date)}
                                        </p>
                                    </div>
                                </div>

                                {/* Amount */}
                                <div className="text-right flex-shrink-0 ml-3">
                                    <p className={`font-bold ${isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {isIncome ? '+' : '-'}{formatINR(transaction.amount)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Transaction Details Modal */}
            <TransactionDetails
                transaction={viewingTransaction}
                category={viewingTransaction ? categories.find(cat =>
                    cat.name === viewingTransaction.category && cat.type === viewingTransaction.type
                ) : null}
                isOpen={showDetailsModal}
                onClose={() => {
                    setShowDetailsModal(false);
                    setViewingTransaction(null);
                }}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Edit Transaction Modal */}
            <TransactionForm
                isOpen={showEditForm}
                onClose={() => {
                    setShowEditForm(false);
                    setEditingTransaction(null);
                    // Refresh dashboard after edit
                    fetchDashboardStats();
                }}
                transaction={editingTransaction}
            />
        </>
    );
};
