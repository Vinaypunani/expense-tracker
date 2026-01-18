// Format number to Indian Rupees currency
export const formatINR = (amount) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
        return '₹0.00';
    }

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};

// Format number with Indian numbering system (without currency symbol)
export const formatIndianNumber = (num) => {
    if (num === null || num === undefined || isNaN(num)) {
        return '0';
    }

    return new Intl.NumberFormat('en-IN').format(num);
};

// Parse INR formatted string to number
export const parseINR = (str) => {
    if (!str) return 0;

    // Remove currency symbol, commas, and spaces
    const cleaned = str.replace(/[₹,\s]/g, '');
    const parsed = parseFloat(cleaned);

    return isNaN(parsed) ? 0 : parsed;
};

// Format amount for display in compact form (e.g., 1.2L, 2.5Cr)
export const formatCompactINR = (amount) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
        return '₹0';
    }

    const absAmount = Math.abs(amount);

    if (absAmount >= 10000000) { // 1 Crore
        return `₹${(amount / 10000000).toFixed(2)}Cr`;
    } else if (absAmount >= 100000) { // 1 Lakh
        return `₹${(amount / 100000).toFixed(2)}L`;
    } else if (absAmount >= 1000) {
        return `₹${(amount / 1000).toFixed(1)}K`;
    } else {
        return formatINR(amount);
    }
};
