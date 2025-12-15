import React from 'react'
import Card1 from '../../assets/auth_side_bg.png'

const AuthLayout = ({ children }) => {
    return (
        <div className='flex w-screen h-screen overflow-hidden bg-white'>
            {/* Left Side - Form */}
            <div className='w-full md:w-[50%] lg:w-[45%] flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 relative z-10 animate-fade-in'>
                <div className='absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-2'>
                    <h2 className='text-2xl font-bold text-gray-900 tracking-tight cursor-pointer hover:opacity-80 transition-opacity'>
                        Expense<span className='text-primary'>Tracker</span>.
                    </h2>
                </div>

                <div className='w-full'>
                    {children}
                </div>
            </div>

            {/* Right Side - Image */}
            <div className='hidden md:block md:w-[50%] lg:w-[55%] h-full relative overflow-hidden bg-gray-50'>
                <img
                    src={Card1}
                    alt="Dashboard Preview"
                    className='w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105'
                />

                <div className='absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent mix-blend-multiply'></div>

                <div className='absolute bottom-12 left-12 right-12 text-white p-8 backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-2xl transform transition-all hover:-translate-y-1 hover:shadow-primary/20'>
                    <h3 className='text-2xl font-bold mb-3'>Master Your Finances</h3>
                    <p className='text-gray-200 text-sm leading-relaxed opacity-90'>
                        "The most intuitive way to track your expenses and plan your financial future. Join thousands of users achieving financial freedom today."
                    </p>
                    <div className='mt-4 flex items-center gap-3'>
                        <div className='flex -space-x-2'>
                            <div className='w-8 h-8 rounded-full bg-yellow-400 border-2 border-white'></div>
                            <div className='w-8 h-8 rounded-full bg-purple-400 border-2 border-white'></div>
                            <div className='w-8 h-8 rounded-full bg-green-400 border-2 border-white'></div>
                        </div>
                        <span className='text-xs font-medium text-gray-300'>Trusted by 10k+ users</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout