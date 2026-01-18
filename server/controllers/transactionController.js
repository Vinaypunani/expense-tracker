import Transaction from '../models/Transaction.js';
import Category from '../models/Category.js';

// Create a new transaction
export const createTransaction = async (req, res) => {
    try {
        const { type, amount, category, description, date } = req.body;

        // Validation
        if (!type || !amount || !category) {
            return res.status(400).json({
                success: false,
                message: 'Type, amount, and category are required'
            });
        }

        if (!['income', 'expense'].includes(type)) {
            return res.status(400).json({
                success: false,
                message: 'Type must be either income or expense'
            });
        }

        // Validate category exists in database for this user and type
        const categoryDoc = await Category.findOne({
            user: req.user._id,
            name: category,
            type: type
        });

        if (!categoryDoc) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category for the specified type'
            });
        }

        const transaction = await Transaction.create({
            user: req.user._id,
            type,
            amount: parseFloat(amount),
            category,
            description,
            date: date || Date.now()
        });

        res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        console.error('Create transaction error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create transaction'
        });
    }
};

// Get all transactions with filters
export const getTransactions = async (req, res) => {
    try {
        const { type, category, startDate, endDate, limit = 50, skip = 0 } = req.query;

        const query = { user: req.user._id };

        if (type) query.type = type;
        if (category) query.category = category;
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const transactions = await Transaction.find(query)
            .sort({ date: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        const total = await Transaction.countDocuments(query);

        res.status(200).json({
            success: true,
            data: transactions,
            total,
            hasMore: total > (parseInt(skip) + transactions.length)
        });
    } catch (error) {
        console.error('Get transactions error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch transactions'
        });
    }
};

// Get single transaction by ID
export const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        res.status(200).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        console.error('Get transaction error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch transaction'
        });
    }
};

// Update transaction
export const updateTransaction = async (req, res) => {
    try {
        const { type, amount, category, description, date } = req.body;

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        // Validate category if type is being changed
        if (type && category) {
            const categoryDoc = await Category.findOne({
                user: req.user._id,
                name: category,
                type: type
            });

            if (!categoryDoc) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid category for the specified type'
                });
            }
        }

        if (type) transaction.type = type;
        if (amount) transaction.amount = parseFloat(amount);
        if (category) transaction.category = category;
        if (description !== undefined) transaction.description = description;
        if (date) transaction.date = date;

        await transaction.save();

        res.status(200).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        console.error('Update transaction error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update transaction'
        });
    }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Transaction deleted successfully'
        });
    } catch (error) {
        console.error('Delete transaction error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete transaction'
        });
    }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Default to current month if no dates provided
        const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const end = endDate ? new Date(endDate) : new Date();

        const stats = await Transaction.aggregate([
            {
                $match: {
                    user: req.user._id,
                    date: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: '$type',
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            }
        ]);

        const income = stats.find(s => s._id === 'income') || { total: 0, count: 0 };
        const expense = stats.find(s => s._id === 'expense') || { total: 0, count: 0 };
        const balance = income.total - expense.total;

        // Get recent transactions
        const recentTransactions = await Transaction.find({
            user: req.user._id,
            date: { $gte: start, $lte: end }
        })
            .sort({ date: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            data: {
                income: income.total,
                incomeCount: income.count,
                expense: expense.total,
                expenseCount: expense.count,
                balance,
                recentTransactions,
                period: { start, end }
            }
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard statistics'
        });
    }
};

// Get category-wise statistics
export const getCategoryStats = async (req, res) => {
    try {
        const { type = 'expense', startDate, endDate } = req.query;

        const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const end = endDate ? new Date(endDate) : new Date();

        const stats = await Transaction.aggregate([
            {
                $match: {
                    user: req.user._id,
                    type,
                    date: { $gte: start, $lte: end }
                }
            },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { total: -1 }
            }
        ]);

        const totalAmount = stats.reduce((sum, stat) => sum + stat.total, 0);

        const categoryStats = stats.map(stat => ({
            category: stat._id,
            amount: stat.total,
            count: stat.count,
            percentage: totalAmount > 0 ? ((stat.total / totalAmount) * 100).toFixed(2) : 0
        }));

        res.status(200).json({
            success: true,
            data: {
                categories: categoryStats,
                total: totalAmount,
                period: { start, end }
            }
        });
    } catch (error) {
        console.error('Get category stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch category statistics'
        });
    }
};
