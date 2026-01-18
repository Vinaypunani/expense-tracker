import { Modal } from './ui/Modal';
import { formatINR } from '../utils/currency';
import { formatDate } from '../utils/dateUtils';

export const TransactionDetails = ({ transaction, category, isOpen, onClose, onEdit, onDelete }) => {
    if (!transaction) return null;

    const isIncome = transaction.type === 'income';

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Transaction Details"
        >
            <div className="space-y-6">
                {/* Category Icon & Amount */}
                <div className="flex flex-col items-center py-4">
                    <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-4"
                        style={{ backgroundColor: category?.color ? category.color + '20' : '#E5E7EB' }}
                    >
                        {category?.icon || '📌'}
                    </div>
                    <p className={`text-3xl font-bold ${isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {isIncome ? '+' : '-'}{formatINR(transaction.amount)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {isIncome ? 'Income' : 'Expense'}
                    </p>
                </div>

                {/* Details */}
                <div className="space-y-4">
                    {/* Category */}
                    <div>
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Category
                        </label>
                        <p className="mt-1 text-base font-medium text-gray-900 dark:text-white">
                            {category?.icon} {transaction.category}
                        </p>
                    </div>

                    {/* Description */}
                    {transaction.description && (
                        <div>
                            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                Description
                            </label>
                            <p className="mt-1 text-base text-gray-900 dark:text-white">
                                {transaction.description}
                            </p>
                        </div>
                    )}

                    {/* Date */}
                    <div>
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Date
                        </label>
                        <p className="mt-1 text-base text-gray-900 dark:text-white">
                            {formatDate(transaction.date)}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => {
                            onEdit(transaction);
                            onClose();
                        }}
                        className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this transaction?')) {
                                onDelete(transaction._id);
                                onClose();
                            }
                        }}
                        className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
};
