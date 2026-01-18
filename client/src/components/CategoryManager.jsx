import { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { Modal } from './ui/Modal';
import { EmojiPicker } from './EmojiPicker';

const PRESET_COLORS = [
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1',
    '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#84CC16',
    '#06B6D4', '#A855F7', '#E11D48', '#F43F5E', '#6B7280'
];

export const CategoryManager = ({ isOpen, onClose, type }) => {
    const { categories, createCategory, updateCategory, deleteCategory, fetchCategories } = useTransactions();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        icon: '📌',
        color: '#6B7280'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Filter categories by type
    const filteredCategories = categories.filter(cat => cat.type === type);

    const handleEmojiSelect = (emoji) => {
        setFormData(prev => ({ ...prev, icon: emoji }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            setError('Category name is required');
            return;
        }

        setLoading(true);
        setError('');

        const categoryData = {
            name: formData.name.trim(),
            icon: formData.icon,
            color: formData.color,
            type
        };

        const result = editingCategory
            ? await updateCategory(editingCategory._id, categoryData)
            : await createCategory(categoryData);

        setLoading(false);

        if (result.success) {
            // Reset form
            setFormData({ name: '', icon: '📌', color: '#6B7280' });
            setEditingCategory(null);
            await fetchCategories();
        } else {
            setError(result.message || 'Failed to save category');
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            icon: category.icon,
            color: category.color
        });
    };

    const handleDelete = async (categoryId, categoryName) => {
        if (!window.confirm(`Delete "${categoryName}"? This cannot be undone.`)) return;

        setLoading(true);
        const result = await deleteCategory(categoryId);
        setLoading(false);

        if (!result.success) {
            setError(result.message || 'Failed to delete category');
        } else {
            await fetchCategories();
        }
    };

    const handleCancel = () => {
        setFormData({ name: '', icon: '📌', color: '#6B7280' });
        setEditingCategory(null);
        setError('');
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={`Manage ${type === 'income' ? 'Income' : 'Expense'} Categories`}
            >
                <div className="space-y-4">
                    {/* Add/Edit Form */}
                    <form onSubmit={handleSubmit} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {editingCategory ? 'Edit Category' : 'Add New Category'}
                        </h3>

                        {/* Icon Selector */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Icon
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowEmojiPicker(true)}
                                className="w-16 h-16 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl flex items-center justify-center text-3xl hover:border-[#007AFF] transition-colors"
                            >
                                {formData.icon}
                            </button>
                        </div>

                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="e.g., Groceries"
                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:border-[#007AFF] transition-all"
                                maxLength={50}
                            />
                        </div>

                        {/* Color Selector */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Color
                            </label>
                            <div className="grid grid-cols-8 gap-2">
                                {PRESET_COLORS.map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, color }))}
                                        className={`w-8 h-8 rounded-lg transition-all ${formData.color === color ? 'ring-2 ring-offset-2 ring-[#007AFF] scale-110' : 'hover:scale-105'
                                            }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">
                            {editingCategory && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-4 py-2 bg-[#007AFF] text-white rounded-xl font-medium hover:bg-[#0066DD] disabled:opacity-50 transition-colors"
                            >
                                {loading ? 'Saving...' : (editingCategory ? 'Update' : 'Add')} Category
                            </button>
                        </div>
                    </form>

                    {/* Categories List */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Your Categories ({filteredCategories.length})
                        </h3>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {filteredCategories.map(category => (
                                <div
                                    key={category._id}
                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                                            style={{ backgroundColor: category.color + '20' }}
                                        >
                                            {category.icon}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{category.name}</p>
                                            {category.isDefault && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Default</p>
                                            )}
                                        </div>
                                    </div>

                                    {!category.isDefault && (
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category._id, category.name)}
                                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Emoji Picker */}
            {showEmojiPicker && (
                <EmojiPicker
                    onSelect={handleEmojiSelect}
                    onClose={() => setShowEmojiPicker(false)}
                />
            )}
        </>
    );
};
