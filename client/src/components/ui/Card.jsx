export const Card = ({
    children,
    className = '',
    glass = false,
    ...props
}) => {
    const baseStyles = 'rounded-2xl transition-all duration-200';

    const glassStyles = glass
        ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50'
        : 'bg-white dark:bg-gray-900 shadow-md hover:shadow-lg';

    return (
        <div
            className={`${baseStyles} ${glassStyles} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
