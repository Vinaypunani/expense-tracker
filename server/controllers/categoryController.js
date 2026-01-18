import Category from '../models/Category.js';

// Default categories to seed for new users
const DEFAULT_CATEGORIES = [
    // Expense categories
    { name: 'Food & Dining', icon: '🍔', color: '#EF4444', type: 'expense', isDefault: true },
    { name: 'Transportation', icon: '🚗', color: '#F59E0B', type: 'expense', isDefault: true },
    { name: 'Shopping', icon: '🛍️', color: '#EC4899', type: 'expense', isDefault: true },
    { name: 'Entertainment', icon: '🎬', color: '#8B5CF6', type: 'expense', isDefault: true },
    { name: 'Bills & Utilities', icon: '💡', color: '#3B82F6', type: 'expense', isDefault: true },
    { name: 'Healthcare', icon: '🏥', color: '#10B981', type: 'expense', isDefault: true },
    { name: 'Education', icon: '📚', color: '#6366F1', type: 'expense', isDefault: true },
    { name: 'Travel', icon: '✈️', color: '#14B8A6', type: 'expense', isDefault: true },
    { name: 'Other', icon: '📌', color: '#6B7280', type: 'expense', isDefault: true },

    // Income categories
    { name: 'Salary', icon: '💰', color: '#10B981', type: 'income', isDefault: true },
    { name: 'Business', icon: '💼', color: '#3B82F6', type: 'income', isDefault: true },
    { name: 'Investments', icon: '📈', color: '#8B5CF6', type: 'income', isDefault: true },
    { name: 'Freelance', icon: '💻', color: '#06B6D4', type: 'income', isDefault: true },
    { name: 'Gifts', icon: '🎁', color: '#EC4899', type: 'income', isDefault: true },
    { name: 'Other', icon: '💵', color: '#6B7280', type: 'income', isDefault: true }
];

// Get all categories for a user
export const getCategories = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check if user has any categories
        const existingCategories = await Category.find({ user: userId });

        // If no categories, seed default ones
        if (existingCategories.length === 0) {
            const defaultCategories = DEFAULT_CATEGORIES.map(cat => ({
                ...cat,
                user: userId
            }));
            await Category.insertMany(defaultCategories);

            // Fetch newly created categories
            const categories = await Category.find({ user: userId }).sort({ type: 1, name: 1 });
            return res.status(200).json({
                success: true,
                data: categories
            });
        }

        // Return existing categories
        const categories = await Category.find({ user: userId }).sort({ type: 1, name: 1 });
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching categories',
            error: error.message
        });
    }
};

// Create a new custom category
export const createCategory = async (req, res) => {
    try {
        const { name, icon, color, type } = req.body;
        const userId = req.user._id;

        // Validate required fields
        if (!name || !icon || !color || !type) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, icon, color, and type'
            });
        }

        // Check for duplicate category name (case insensitive)
        const existingCategory = await Category.findOne({
            user: userId,
            name: { $regex: new RegExp(`^${name}$`, 'i') },
            type
        });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: `Category "${name}" already exists for ${type}`
            });
        }

        // Create new category
        const category = await Category.create({
            user: userId,
            name,
            icon,
            color,
            type,
            isDefault: false
        });

        res.status(201).json({
            success: true,
            data: category,
            message: 'Category created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating category',
            error: error.message
        });
    }
};

// Update a category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, icon, color } = req.body;
        const userId = req.user._id;

        // Find category
        const category = await Category.findOne({ _id: id, user: userId });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Don't allow editing default categories
        if (category.isDefault) {
            return res.status(403).json({
                success: false,
                message: 'Cannot edit default categories'
            });
        }

        // Check for duplicate name if name is being changed
        if (name && name !== category.name) {
            const existingCategory = await Category.findOne({
                user: userId,
                name: { $regex: new RegExp(`^${name}$`, 'i') },
                type: category.type,
                _id: { $ne: id }
            });

            if (existingCategory) {
                return res.status(400).json({
                    success: false,
                    message: `Category "${name}" already exists`
                });
            }
        }

        // Update category
        if (name) category.name = name;
        if (icon) category.icon = icon;
        if (color) category.color = color;

        await category.save();

        res.status(200).json({
            success: true,
            data: category,
            message: 'Category updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating category',
            error: error.message
        });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        // Find category
        const category = await Category.findOne({ _id: id, user: userId });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Don't allow deleting default categories
        if (category.isDefault) {
            return res.status(403).json({
                success: false,
                message: 'Cannot delete default categories'
            });
        }

        // Check if category is used in any transactions
        const Transaction = (await import('../models/Transaction.js')).default;
        const transactionCount = await Transaction.countDocuments({
            user: userId,
            category: category.name
        });

        if (transactionCount > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete category. It is used in ${transactionCount} transaction(s)`
            });
        }

        // Delete category
        await category.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting category',
            error: error.message
        });
    }
};
