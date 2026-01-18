// Predefined categories for expenses and incomes

export const EXPENSE_CATEGORIES = [
    {
        name: 'Food & Dining',
        icon: '🍽️',
        color: '#FF6B6B',
        subcategories: ['Restaurants', 'Groceries', 'Takeout', 'Snacks', 'Coffee']
    },
    {
        name: 'Transportation',
        icon: '🚗',
        color: '#4ECDC4',
        subcategories: ['Fuel', 'Public Transport', 'Taxi/Uber', 'Parking', 'Vehicle Maintenance']
    },
    {
        name: 'Shopping',
        icon: '🛍️',
        color: '#95E1D3',
        subcategories: ['Clothing', 'Electronics', 'Home & Garden', 'Personal Care', 'Gifts']
    },
    {
        name: 'Bills & Utilities',
        icon: '📄',
        color: '#F38181',
        subcategories: ['Electricity', 'Water', 'Internet', 'Phone', 'Gas', 'Rent']
    },
    {
        name: 'Healthcare',
        icon: '⚕️',
        color: '#AA96DA',
        subcategories: ['Doctor', 'Pharmacy', 'Insurance', 'Lab Tests', 'Hospital']
    },
    {
        name: 'Entertainment',
        icon: '🎬',
        color: '#FCBAD3',
        subcategories: ['Movies', 'Games', 'Music', 'Sports', 'Hobbies']
    },
    {
        name: 'Education',
        icon: '📚',
        color: '#FFA07A',
        subcategories: ['Courses', 'Books', 'Tuition', 'Supplies', 'Training']
    },
    {
        name: 'Travel',
        icon: '✈️',
        color: '#87CEEB',
        subcategories: ['Flights', 'Hotels', 'Vacation', 'Transport', 'Activities']
    },
    {
        name: 'Others',
        icon: '📌',
        color: '#D3D3D3',
        subcategories: ['Miscellaneous']
    }
];

export const INCOME_CATEGORIES = [
    {
        name: 'Salary',
        icon: '💼',
        color: '#34C759',
        subcategories: ['Monthly Salary', 'Bonus', 'Overtime', 'Commission']
    },
    {
        name: 'Freelance',
        icon: '💻',
        color: '#5AC8FA',
        subcategories: ['Projects', 'Consulting', 'Contract Work']
    },
    {
        name: 'Investments',
        icon: '📈',
        color: '#FF9500',
        subcategories: ['Dividends', 'Interest', 'Capital Gains', 'Rental Income']
    },
    {
        name: 'Business',
        icon: '🏢',
        color: '#AF52DE',
        subcategories: ['Sales', 'Services', 'Products']
    },
    {
        name: 'Gifts',
        icon: '🎁',
        color: '#FF2D55',
        subcategories: ['Family', 'Friends', 'Bonus']
    },
    {
        name: 'Others',
        icon: '💰',
        color: '#8E8E93',
        subcategories: ['Miscellaneous', 'Refunds', 'Cashback']
    }
];

// Helper function to get all category names by type
export const getCategoryNames = (type) => {
    const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
    return categories.map(cat => cat.name);
};

// Helper function to get category by name
export const getCategoryByName = (name, type) => {
    const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
    return categories.find(cat => cat.name === name);
};

// Validate if category exists
export const isValidCategory = (category, type) => {
    const categoryNames = getCategoryNames(type);
    return categoryNames.includes(category);
};

// Get all categories
export const getAllCategories = () => ({
    expense: EXPENSE_CATEGORIES,
    income: INCOME_CATEGORIES
});
