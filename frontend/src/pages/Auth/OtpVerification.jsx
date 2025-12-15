import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FocusedAuthLayout from '../../components/Layouts/FocusedAuthLayout';
import { LuArrowRight } from "react-icons/lu";

const OtpVerification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        // Allow only one digit
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            // Move to previous input on backspace if current is empty
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add verification logic
        navigate('/reset-password'); // Or dashboard
    };

    return (
        <FocusedAuthLayout>
            <div className='flex flex-col gap-6'>
                <div className='text-center'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-2'>Verify OTP</h3>
                    <p className='text-gray-500 text-sm'>
                        We've sent a 6-digit verification code to your email. Please enter it below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-8 mt-4'>
                    <div className='flex justify-center gap-2'>
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={(input) => inputRefs.current[index] = input}
                                value={data}
                                onChange={(e) => handleChange(index, e)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className='w-10 h-12 md:w-12 md:h-14 border border-gray-300 rounded-lg text-center text-xl font-semibold text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-gray-50'
                            />
                        ))}
                    </div>

                    <button className='w-full bg-primary text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group cursor-pointer'>
                        Verify Code
                        <LuArrowRight className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
                    </button>
                </form>

                <div className='text-center text-sm'>
                    <p className='text-gray-500'>
                        Didn't receive the code? {" "}
                        <button className='text-primary font-medium hover:underline cursor-pointer'>
                            Resend
                        </button>
                    </p>
                </div>
            </div>
        </FocusedAuthLayout>
    )
}

export default OtpVerification
