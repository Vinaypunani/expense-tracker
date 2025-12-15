import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FocusedAuthLayout from '../../components/Layouts/FocusedAuthLayout';
import { LuLock, LuEye, LuEyeOff, LuArrowRight } from "react-icons/lu";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add password update logic
        navigate('/login');
    };

    return (
        <FocusedAuthLayout>
            <div className='flex flex-col gap-6'>
                <div className='text-center'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-2'>Set New Password</h3>
                    <p className='text-gray-500 text-sm'>
                        Your new password must be different from previously used passwords.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-900'>New Password</label>
                        <div className='relative group'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <LuLock className='h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors' />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className='w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-gray-900 placeholder:text-gray-400'
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors'
                            >
                                {showPassword ? <LuEyeOff className='h-5 w-5' /> : <LuEye className='h-5 w-5' />}
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-900'>Confirm Password</label>
                        <div className='relative group'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <LuLock className='h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors' />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className='w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-gray-900 placeholder:text-gray-400'
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors'
                            >
                                {showConfirmPassword ? <LuEyeOff className='h-5 w-5' /> : <LuEye className='h-5 w-5' />}
                            </button>
                        </div>
                    </div>

                    <button className='w-full bg-primary text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group cursor-pointer'>
                        Reset Password
                        <LuArrowRight className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
                    </button>
                </form>
            </div>
        </FocusedAuthLayout>
    )
}

export default ResetPassword
