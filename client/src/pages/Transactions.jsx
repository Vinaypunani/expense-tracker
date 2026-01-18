import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTransactions } from '../context/TransactionContext';
import { formatINR } from '../utils/currency';
import { formatDate } from '../utils/dateUtils';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionDetails } from '../components/TransactionDetails';

export const Transactions = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { fetchTransactions, deleteTransaction, categories, fetchCategories } = useTransactions();

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all'); // all, income, expense
    const [categoryFilter, setCategoryFilter] = useState('');

    // Modals
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [viewingTransaction, setViewingTransaction] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const ITEMS_PER_PAGE = 20;
    const observerTarget = useRef(null);

    // Fetch categories on mount
    useEffect(() => {
        fetchCategories();
    }, []); // eslint-disable-line

    // Load more transactions
    const loadMoreTransactions = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const skip = transactions.length;

        const filters = {
            limit: ITEMS_PER_PAGE,
            skip,
            ...(typeFilter !== 'all' && { type: typeFilter }),
            ...(categoryFilter && { category: categoryFilter })
        };

        const result = await fetchTransactions(filters);

        if (result.success) {
            setTransactions(prev => [...prev, ...result.data]);
            setHasMore(result.data.length === ITEMS_PER_PAGE);
        }

        setLoading(false);
    };

    // Reset and load transactions when filters change
    useEffect(() => {
        const loadInitialTransactions = async () => {
            setLoading(true);
            setTransactions([]);
            setHasMore(true);

            const filters = {
                limit: ITEMS_PER_PAGE,
                skip: 0,
                ...(typeFilter !== 'all' && { type: typeFilter }),
                ...(categoryFilter && { category: categoryFilter })
            };

            const result = await fetchTransactions(filters);

            if (result.success) {
                setTransactions(result.data);
                setHasMore(result.data.length === ITEMS_PER_PAGE);
            }

            setLoading(false);
        };

        loadInitialTransactions();
    }, [typeFilter, categoryFilter]); // eslint-disable-line

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMoreTransactions();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, loading, transactions.length]); // eslint-disable-line

    // Search filter (client-side)
    const filteredTransactions = transactions.filter(transaction => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            transaction.category.toLowerCase().includes(query) ||
            transaction.description?.toLowerCase().includes(query)
        );
    });

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setShowEditForm(true);
    };

    const handleViewDetails = (transaction) => {
        setViewingTransaction(transaction);
        setShowDetailsModal(true);
    };

    const handleDelete = async (id) => {
        const result = await deleteTransaction(id);
        if (result.success) {
            setTransactions(prev => prev.filter(t => t._id !== id));
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Filter categories for the dropdown
    const incomeCategories = categories.filter(cat => cat.type === 'income');
    const expenseCategories = categories.filter(cat => cat.type === 'expense');

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/')}
                                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">All Transactions</h1>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-24">
                {/* Search and Filters */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                    {/* Search Bar */}
                    <div className="mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:bg-white dark:focus:bg-gray-900 focus:border-[#007AFF] transition-all"
                            />
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Type Filter */}
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-xl text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:border-[#007AFF] transition-all"
                        >
                            <option value="all">All Types</option>
                            <option value="income">💰 Income Only</option>
                            <option value="expense">💸 Expense Only</option>
                        </select>

                        {/* Category Filter */}
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-xl text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:border-[#007AFF] transition-all"
                        >
                            <option value="">All Categories</option>
                            {typeFilter === 'all' && <optgroup label="Income">
                                {incomeCategories.map(cat => (
                                    <option key={cat._id} value={cat.name}>{cat.icon} {cat.name}</option>
                                ))}
                            </optgroup>}
                            {typeFilter === 'all' && <optgroup label="Expenses">
                                {expenseCategories.map(cat => (
                                    <option key={cat._id} value={cat.name}>{cat.icon} {cat.name}</option>
                                ))}
                            </optgroup>}
                            {typeFilter === 'income' && incomeCategories.map(cat => (
                                <option key={cat._id} value={cat.name}>{cat.icon} {cat.name}</option>
                            ))}
                            {typeFilter === 'expense' && expenseCategories.map(cat => (
                                <option key={cat._id} value={cat.name}>{cat.icon} {cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="space-y-3">
                    {filteredTransactions.map((transaction) => {
                        // Find category from database
                        const category = categories.find(cat =>
                            cat.name === transaction.category && cat.type === transaction.type
                        );
                        const isIncome = transaction.type === 'income';

                        return (
                            <div
                                key={transaction._id}
                                onClick={() => handleViewDetails(transaction)}
                                className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Category Icon */}
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                                        style={{ backgroundColor: category?.color ? category.color + '20' : '#E5E7EB' }}
                                    >
                                        {category?.icon || '📌'}
                                    </div>

                                    {/* Transaction Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-1">
                                            <h3 className="font-bold text-gray-900 dark:text-white truncate">
                                                {transaction.category}
                                            </h3>
                                            <p className={`font-bold text-lg flex-shrink-0 ${isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                {isIncome ? '+' : '-'}{formatINR(transaction.amount)}
                                            </p>
                                        </div>

                                        {transaction.description && (
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                                                {transaction.description}
                                            </p>
                                        )}

                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {formatDate(transaction.date)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* No results */}
                    {filteredTransactions.length === 0 && !loading && (
                        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl">
                            <p className="text-gray-600 dark:text-gray-400 mb-2">No transactions found</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                {searchQuery || typeFilter !== 'all' || categoryFilter
                                    ? 'Try adjusting your filters'
                                    : 'Start by adding your first transaction'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Observer Target for Infinite Scroll */}
                <div ref={observerTarget} className="h-4" />

                {/* Loading Indicator */}
                {loading && (
                    <div className="flex justify-center py-8">
                        <div className="w-8 h-8 border-4 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {/* End of List Message */}
                {!hasMore && transactions.length > 0 && !loading && (
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">You've reached the end</p>
                    </div>
                )}
            </main>

            {/* Edit Transaction Modal */}
            <TransactionForm
                isOpen={showEditForm}
                onClose={() => {
                    setShowEditForm(false);
                    setEditingTransaction(null);
                }}
                transaction={editingTransaction}
            />

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
        </div>
    );
};
