export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className = '',
    type = 'button',
    ...props
}) => {
    const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

    const variants = {
        primary: 'bg-[#007AFF] text-white shadow-md hover:shadow-lg active:shadow-sm hover:bg-[#0066DD]',
        secondary: 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700',
        outline: 'border-2 border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF] hover:text-white',
        danger: 'bg-[#FF3B30] text-white shadow-md hover:shadow-lg active:shadow-sm hover:bg-[#E6342A]',
        ghost: 'text-[#007AFF] hover:bg-gray-100 dark:hover:bg-gray-800'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm h-9',
        md: 'px-6 py-3 text-base h-11',
        lg: 'px-8 py-4 text-lg h-14'
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    );
};
