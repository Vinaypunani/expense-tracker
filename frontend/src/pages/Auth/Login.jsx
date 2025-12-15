import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../components/Layouts/AuthLayout';
import { LuMail, LuLock, LuEye, LuEyeOff, LuArrowRight } from "react-icons/lu";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    return (
        <AuthLayout>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-3xl font-bold text-gray-900 tracking-tight'>Welcome Back</h3>
                    <p className='text-gray-500'>Please enter your details to sign in to your account.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }} className='flex flex-col gap-5'>
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
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center'>
                            <label className='text-sm font-medium text-gray-900'>Password</label>
                            <Link to="/forgot-password" className='text-sm font-medium text-primary hover:text-primary/80 transition-colors'>Forgot password?</Link>
                        </div>
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

                    <button className='w-full bg-primary text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group cursor-pointer'>
                        Sign In
                        <LuArrowRight className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
                    </button>
                </form>

                <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-200'></div>
                    </div>
                    <div className='relative flex justify-center text-sm'>
                        <span className='px-2 bg-white text-gray-500'>Or continue with</span>
                    </div>
                </div>

                <button className='w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3 cursor-pointer'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className='w-5 h-5' />
                    Sign in with Google
                </button>

                <p className='text-center text-sm text-gray-600'>
                    Don't have an account? <Link to="/signup" className='font-semibold text-primary hover:underline'>Sign Up</Link>
                </p>
            </div>
        </AuthLayout>
    )
}

export default Login

