import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/axios';

const TransactionContext = createContext();

export const useTransactions = () => {
    const context = useContext(TransactionContext);
    if (!context) {
        throw new Error('useTransactions must be used within TransactionProvider');
    }
    return context;
};

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [dashboardStats, setDashboardStats] = useState(null);
    const [categoryStats, setCategoryStats] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data.data || []);
            return { success: true, data: response.data.data };
        } catch (err) {
            setError(err.message);
            return { success: false, message: err.message };
        }
    };

    // Fetch all transactions with filters
    const fetchTransactions = async (filters = {}) => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            if (filters.type) params.append('type', filters.type);
            if (filters.category) params.append('category', filters.category);
            if (filters.startDate) params.append('startDate', filters.startDate);
            if (filters.endDate) params.append('endDate', filters.endDate);
            if (filters.limit) params.append('limit', filters.limit);
            if (filters.skip) params.append('skip', filters.skip);

            const { data } = await api.get(`/transactions?${params.toString()}`);

            if (data.success) {
                setTransactions(data.data);
                return { success: true, data: data.data, total: data.total, hasMore: data.hasMore };
            }
        } catch (err) {
            const message = err.message || 'Failed to fetch transactions';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    // Fetch dashboard statistics
    const fetchDashboardStats = async (startDate, endDate) => {
        try {
            const params = new URLSearchParams();
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);

            const { data } = await api.get(`/transactions/dashboard?${params.toString()}`);

            if (data.success) {
                setDashboardStats(data.data);
                return { success: true, data: data.data };
            }
        } catch (err) {
            const message = err.message || 'Failed to fetch dashboard stats';
            setError(message);
            return { success: false, message };
        }
    };

    // Fetch category statistics
    const fetchCategoryStats = async (type = 'expense', startDate, endDate) => {
        try {
            const params = new URLSearchParams();
            params.append('type', type);
            if (startDate) params.append('startDate', startDate);
            if (endDate) params.append('endDate', endDate);

            const { data } = await api.get(`/transactions/category-stats?${params.toString()}`);

            if (data.success) {
                setCategoryStats(data.data);
                return { success: true, data: data.data };
            }
        } catch (err) {
            const message = err.message || 'Failed to fetch category stats';
            setError(message);
            return { success: false, message };
        }
    };

    // Create a new transaction
    const createTransaction = async (transactionData) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await api.post('/transactions', transactionData);

            if (data.success) {
                // Refresh data after creation
                await Promise.all([
                    fetchTransactions(),
                    fetchDashboardStats()
                ]);
                return { success: true, data: data.data };
            }
        } catch (err) {
            const message = err.message || 'Failed to create transaction';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    // Update a transaction
    const updateTransaction = async (id, updates) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await api.put(`/transactions/${id}`, updates);

            if (data.success) {
                // Refresh data after update
                await Promise.all([
                    fetchTransactions(),
                    fetchDashboardStats()
                ]);
                return { success: true, data: data.data };
            }
        } catch (err) {
            const message = err.message || 'Failed to update transaction';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    // Delete a transaction
    const deleteTransaction = async (id) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await api.delete(`/transactions/${id}`);

            if (data.success) {
                // Refresh data after deletion
                await Promise.all([
                    fetchTransactions(),
                    fetchDashboardStats()
                ]);
                return { success: true };
            }
        } catch (err) {
            const message = err.message || 'Failed to delete transaction';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    // Create a new category
    const createCategory = async (categoryData) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await api.post('/categories', categoryData);

            if (data.success) {
                await fetchCategories(); // Refresh categories
                return { success: true, data: data.data };
            }
        } catch (err) {
            const message = err.message || 'Failed to create category';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    // Update a category
    const updateCategory = async (id, updates) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await api.put(`/categories/${id}`, updates);

            if (data.success) {
                await fetchCategories(); // Refresh categories
                return { success: true, data: data.data };
            }
        } catch (err) {
            const message = err.message || 'Failed to update category';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    // Delete a category
    const deleteCategory = async (id) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await api.delete(`/categories/${id}`);

            if (data.success) {
                await fetchCategories(); // Refresh categories
                return { success: true };
            }
        } catch (err) {
            const message = err.message || 'Failed to delete category';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    const value = {
        transactions,
        dashboardStats,
        categoryStats,
        categories,
        loading,
        error,
        fetchTransactions,
        fetchDashboardStats,
        fetchCategoryStats,
        fetchCategories,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        createCategory,
        updateCategory,
        deleteCategory
    };

    return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};
