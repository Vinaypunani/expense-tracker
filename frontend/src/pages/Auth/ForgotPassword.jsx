import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FocusedAuthLayout from '../../components/Layouts/FocusedAuthLayout';
import { LuMail, LuArrowRight } from "react-icons/lu";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to send OTP or reset link
        navigate('/otp-verify');
    };

    return (
        <FocusedAuthLayout>
            <div className='flex flex-col gap-6'>
                <div className='text-center'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-2'>Forgot Password?</h3>
                    <p className='text-gray-500 text-sm'>
                        Enter your email address to verify your identity and help us secure your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-900'>Email Address</label>
                        <div className='relative group'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <LuMail className='h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors' />
                            </div>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-gray-900 placeholder:text-gray-400'
                                required
                            />
                        </div>
                    </div>

                    <button className='w-full bg-primary text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group cursor-pointer'>
                        Send OTP
                        <LuArrowRight className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
                    </button>
                </form>

                <div className='text-center'>
                    <Link to="/login" className='text-sm font-medium text-gray-600 hover:text-primary transition-colors flex items-center justify-center gap-2'>
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </FocusedAuthLayout>
    )
}

export default ForgotPassword
