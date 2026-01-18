import { useState } from 'react';

export const Input = ({
    label,
    type = 'text',
    error,
    icon,
    className = '',
    value: controlledValue,
    onChange,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    // Check if input has value (either controlled or uncontrolled)
    const hasValue = controlledValue !== undefined
        ? Boolean(controlledValue)
        : Boolean(props.defaultValue);

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 z-10">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    value={controlledValue}
                    onChange={onChange}
                    className={`
            w-full px-4 py-3.5 
            ${icon ? 'pl-11' : ''}
            bg-gray-100 dark:bg-gray-800 
            border-2 border-transparent
            rounded-xl
            text-gray-900 dark:text-white
            placeholder:text-transparent
            focus:bg-white dark:focus:bg-gray-900
            focus:border-[#007AFF]
            transition-all duration-200
            ${error ? 'border-[#FF3B30] focus:border-[#FF3B30]' : ''}
          `}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={label}
                    {...props}
                />
                {label && (
                    <label
                        className={`
              absolute transition-all duration-200 pointer-events-none
              ${icon ? 'left-11' : 'left-4'}
              ${isFocused || hasValue || controlledValue
                                ? '-top-2 text-xs bg-white dark:bg-gray-900 px-2 text-[#007AFF]'
                                : 'top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400'
                            }
            `}
                    >
                        {label}
                    </label>
                )}
            </div>
            {error && (
                <p className="mt-1.5 text-sm text-[#FF3B30] flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};
