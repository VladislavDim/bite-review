import { useState } from 'react';
import { useNavigate } from 'react-router';
import { requestPasswordReset } from '../api/authApi';
import ForgotImage from '../assets/images/Login.png';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setMessage('Please enter your email.');
            setStatus('error');
            return;
        }

        try {
            setStatus('loading');
            const result = await requestPasswordReset(email);
            setStatus('success');
            setMessage(result.message || 'Reset email sent successfully.');
        } catch (err) {
            setStatus('error');
            setMessage(err.message || 'Failed to send reset email.');
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-[#f8f8f8] px-4">
            <div
                className="flex items-stretch shadow-xl rounded-xl overflow-hidden"
                style={{ boxShadow: '0 12px 30px rgba(233, 118, 43, 0.35)' }}
            >
                <div className="hidden md:block w-[480px] min-h-[580px]">
                    <img
                        src={ForgotImage}
                        alt="Forgot Password Visual"
                        className="h-full w-full object-cover"
                        style={{ objectPosition: 'left 10%' }}
                    />
                </div>

                <div className="w-[360px] bg-white p-10 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-center text-[#E9762B] mb-6">
                        Reset Your Password
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />

                        {message && (
                            <p
                                className={`text-sm font-medium text-center ${
                                    status === 'error' ? 'text-red-600' : 'text-green-600'
                                }`}
                            >
                                {message}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
                        </button>

                        <p className="text-sm text-center text-gray-600 mt-6">
                            Remembered your password?{' '}
                            <span
                                onClick={() => navigate('/login')}
                                className="text-orange-500 hover:underline font-medium cursor-pointer"
                            >
                                Login here
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
