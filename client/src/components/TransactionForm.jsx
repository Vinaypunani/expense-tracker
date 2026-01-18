import { useState, useEffect } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { CategoryManager } from './CategoryManager';

export const TransactionForm = ({ isOpen, onClose, transaction = null }) => {
    const { createTransaction, updateTransaction, categories, fetchCategories } = useTransactions();
    const isEditing = !!transaction;

    const [formData, setFormData] = useState({
        type: 'expense',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showCategoryManager, setShowCategoryManager] = useState(false);

    // Fetch categories on mount
    useEffect(() => {
        fetchCategories();
    }, []); // eslint-disable-line

    // Load transaction data if editing
    useEffect(() => {
        if (transaction) {
            setFormData({
                type: transaction.type,
                amount: transaction.amount.toString(),
                category: transaction.category,
                description: transaction.description || '',
                date: new Date(transaction.date).toISOString().split('T')[0]
            });
        }
    }, [transaction]);

    // Filter categories by type
    const filteredCategories = categories.filter(cat => cat.type === formData.type);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Please enter a valid amount';
        }

        if (!formData.category) {
            newErrors.category = 'Please select a category';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }

        // Reset category when type changes
        if (name === 'type') {
            setFormData(prev => ({
                ...prev,
                category: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        const transactionData = {
            type: formData.type,
            amount: parseFloat(formData.amount),
            category: formData.category,
            description: formData.description || undefined,
            date: formData.date
        };

        const result = isEditing
            ? await updateTransaction(transaction._id, transactionData)
            : await createTransaction(transactionData);

        setLoading(false);

        if (result.success) {
            onClose();
            // Reset form
            setFormData({
                type: 'expense',
                amount: '',
                category: '',
                description: '',
                date: new Date().toISOString().split('T')[0]
            });
        } else {
            setErrors({ submit: result.message || 'Failed to save transaction' });
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={isEditing ? 'Edit Transaction' : 'Add Transaction'}
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Type Selector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => handleChange({ target: { name: 'type', value: 'income' } })}
                                className={`px-4 py-3 rounded-xl font-medium transition-all ${formData.type === 'income'
                                    ? 'bg-green-500 text-white shadow-md'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                💰 Income
                            </button>
                            <button
                                type="button"
                                onClick={() => handleChange({ target: { name: 'type', value: 'expense' } })}
                                className={`px-4 py-3 rounded-xl font-medium transition-all ${formData.type === 'expense'
                                    ? 'bg-red-500 text-white shadow-md'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                💸 Expense
                            </button>
                        </div>
                    </div>

                    {/* Amount */}
                    <Input
                        type="number"
                        name="amount"
                        label="Amount (₹)"
                        value={formData.amount}
                        onChange={handleChange}
                        error={errors.amount}
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        icon={
                            <span className="text-gray-500 dark:text-gray-400 font-medium">₹</span>
                        }
                    />

                    {/* Category with Manage Button */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Category
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowCategoryManager(true)}
                                className="text-xs font-medium text-[#007AFF] hover:text-[#0066DD] transition-colors"
                            >
                                ⚙️ Manage
                            </button>
                        </div>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`w-full px-4 py-3.5 bg-gray-100 dark:bg-gray-800 border-2 ${errors.category ? 'border-red-500' : 'border-transparent'
                                } rounded-xl text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-900 focus:border-[#007AFF] transition-all`}
                        >
                            <option value="">Select a category</option>
                            {filteredCategories.map(cat => (
                                <option key={cat._id} value={cat.name}>
                                    {cat.icon} {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                                {errors.category}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Add notes..."
                            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 focus:bg-white dark:focus:bg-gray-900 focus:border-[#007AFF] transition-all resize-none"
                        />
                    </div>

                    {/* Date */}
                    <Input
                        type="date"
                        name="date"
                        label="Date"
                        value={formData.date}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                    />

                    {/* Error Message */}
                    {errors.submit && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                            <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            className="flex-1"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            className="flex-1"
                        >
                            {isEditing ? 'Update' : 'Add'} Transaction
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Category Manager Modal */}
            <CategoryManager
                isOpen={showCategoryManager}
                onClose={() => setShowCategoryManager(false)}
                type={formData.type}
            />
        </>
    );
};
