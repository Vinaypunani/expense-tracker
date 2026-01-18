// Time period utility functions

export const TIME_PERIODS = {
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    LAST_7_DAYS: 'last_7_days',
    LAST_15_DAYS: 'last_15_days',
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
    ALL_TIME: 'all_time'
};

export const TIME_PERIOD_LABELS = {
    [TIME_PERIODS.TODAY]: 'Today',
    [TIME_PERIODS.YESTERDAY]: 'Yesterday',
    [TIME_PERIODS.LAST_7_DAYS]: 'Last 7 Days',
    [TIME_PERIODS.LAST_15_DAYS]: 'Last 15 Days',
    [TIME_PERIODS.THIS_MONTH]: 'This Month',
    [TIME_PERIODS.LAST_MONTH]: 'Last Month',
    [TIME_PERIODS.ALL_TIME]: 'All Time'
};

// Get date range for a time period
export const getDateRangeForPeriod = (period) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (period) {
        case TIME_PERIODS.TODAY:
            return {
                startDate: today,
                endDate: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
            };

        case TIME_PERIODS.YESTERDAY:
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return {
                startDate: yesterday,
                endDate: new Date(yesterday.getTime() + 24 * 60 * 60 * 1000 - 1)
            };

        case TIME_PERIODS.LAST_7_DAYS:
            const sevenDaysAgo = new Date(today);
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return {
                startDate: sevenDaysAgo,
                endDate: now
            };

        case TIME_PERIODS.LAST_15_DAYS:
            const fifteenDaysAgo = new Date(today);
            fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
            return {
                startDate: fifteenDaysAgo,
                endDate: now
            };

        case TIME_PERIODS.THIS_MONTH:
            return {
                startDate: new Date(now.getFullYear(), now.getMonth(), 1),
                endDate: now
            };

        case TIME_PERIODS.LAST_MONTH:
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
            return {
                startDate: lastMonth,
                endDate: lastMonthEnd
            };

        case TIME_PERIODS.ALL_TIME:
        default:
            return {
                startDate: null,
                endDate: null
            };
    }
};

// Format date for display
export const formatDate = (date) => {
    if (!date) return '';

    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if today
    if (d.toDateString() === today.toDateString()) {
        return 'Today';
    }

    // Check if yesterday
    if (d.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }

    // Format as date
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return d.toLocaleDateString('en-US', options);
};

// Format time
export const formatTime = (date) => {
    if (!date) return '';

    const d = new Date(date);
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return d.toLocaleTimeString('en-US', options);
};

// Format date and time together
export const formatDateTime = (date) => {
    return `${formatDate(date)} at ${formatTime(date)}`;
};
