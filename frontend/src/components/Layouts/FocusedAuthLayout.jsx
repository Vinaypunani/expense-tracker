import React from 'react'

const FocusedAuthLayout = ({ children }) => {
    return (
        <div className='w-screen h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden'>
            {/* Background Decoration */}
            <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-0'>
                <div className='absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]'></div>
                <div className='absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px]'></div>
            </div>

            {/* Content Card */}
            <div className='relative z-10 w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 animate-fade-in mx-4'>
                <div className='flex flex-col items-center mb-8'>
                    <h2 className='text-2xl font-bold text-gray-900 tracking-tight cursor-pointer'>
                        Expense<span className='text-primary'>Tracker</span>.
                    </h2>
                </div>
                {children}
            </div>
        </div>
    )
}

export default FocusedAuthLayout
