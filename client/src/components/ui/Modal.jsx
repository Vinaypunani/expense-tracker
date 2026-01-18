export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className="fixed inset-0 z-50 overflow-y-auto"
                style={{ pointerEvents: 'none' }}
            >
                <div
                    className="flex min-h-full items-center justify-center p-4"
                    style={{ pointerEvents: 'none' }}
                >
                    <div
                        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
                        style={{
                            pointerEvents: 'auto',
                            width: '100%',
                            maxWidth: '32rem', // 512px
                            minWidth: '320px',
                            position: 'relative'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {title}
                            </h2>
                            <button
                                onClick={onClose}
                                type="button"
                                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                style={{ flexShrink: 0 }}
                            >
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div
                            className="px-6 py-5 overflow-y-auto"
                            style={{ maxHeight: 'calc(100vh - 8rem)' }}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
