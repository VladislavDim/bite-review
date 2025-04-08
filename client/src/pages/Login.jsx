import { useState } from "react";
import { Link } from "react-router";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import LoginImage from '../assets/images/Login.png';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className="flex items-center justify-center min-h-screen bg-[#f8f8f8] px-4">
            <div className="flex items-stretch shadow-xl rounded-xl overflow-hidden" style={{ boxShadow: '0 12px 30px rgba(233, 118, 43, 0.35)' }}>

                {/* Image Box */}
                <div className="hidden md:block h-[540px] w-[480px]">
                    <img
                        src={LoginImage}
                        alt="Login visual"
                        className="h-full w-full object-cover object-right"
                    />
                </div>

                {/* Login Form Box */}
                <div
                    className="w-[340px] bg-white p-10 min-h-[540px] flex flex-col justify-between"
                >
                    {/* Header - горе */}
                    <h2 className="text-2xl font-bold text-center text-[#E9762B]">Login to BiteReview</h2>

                    {/* Form - средната част */}
                    <form className="flex-1 mt-6 mb-6 flex flex-col justify-center space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                required
                                className="w-full bg-transparent border-b-2 border-[#E9762B] 
                                           text-gray-800 placeholder-gray-400 
                                           focus:outline-none focus:ring-1 focus:ring-orange-200 focus:border-[#E9762B]
                                           transition-all duration-300"
                            />
                        </div>

                        <PasswordInput id="password" label="Password" />
                    </form>

                    {/* Footer - долу */}
                    <div className="mt-6">
                            type="submit"
                            className="w-full bg-white text-[#E9762B] font-semibold py-2 rounded-lg 
                                       border-2 border-[#E9762B] transition-all duration-300
                                       hover:bg-gradient-to-r hover:from-[#E9762B] hover:to-[#f79d4d]
                                       hover:text-white hover:border-white"
                        >
                            Sign In
                        </button>
                        <p className="text-sm text-center text-gray-600 mt-4">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-orange-500 hover:underline font-medium">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}