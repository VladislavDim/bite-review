import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Link } from 'react-router';
import { verifyEmail, resendVerificationCode } from '../api/authApi';
import RegisterImage from "../assets/images/Register.png";
import { VITE_VERIFICATION_EXPIRY_MINUTES } from '../utils/verification.constants';

export default function VerifyEmail() {
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const [codeInput, setCodeInput] = useState('');
    const [cooldown, setCooldown] = useState(0);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const code = searchParams.get('code');
        if (code) {
            setCodeInput(code);
        }
    }, [searchParams]);

    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown(prev => {
                    if (prev <= 1) clearInterval(timer);
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleVerify = async () => {
        if (!codeInput.trim()) {
            setMessage('Please enter your verification code.');
            setStatus('error');
            return;
        }
        try {
            setStatus('loading');
            const result = await verifyEmail(codeInput);
            setMessage(result.message);
            setStatus('success');
            setTimeout(() => navigate('/login'), 4000);
        } catch (err) {
            setMessage(err.message);
            setStatus('error');
        }
    };

    const handleResend = async () => {
        const email = searchParams.get('email');
        if (!email) {
            setMessage('Missing email for resending verification.');
            setStatus('error');
            return;
        }
        try {
            setStatus('loading');
            const result = await resendVerificationCode(email);
            setMessage(result.message || 'Verification code resent!');
            setCooldown(result.retryAfter || VITE_VERIFICATION_EXPIRY_MINUTES * 60);
            setStatus('idle');
        } catch (err) {
            setStatus('error');
            const retryAfter = err?.response?.data?.retryAfter;
            if (retryAfter) {
                setCooldown(retryAfter);
                setMessage(`Please wait ${Math.ceil(retryAfter / 60)} minutes before resending.`);
            } else {
                setMessage(err.message);
            }
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-[#f8f8f8] px-4">
            <div className="flex items-stretch shadow-xl rounded-xl overflow-hidden" style={{ boxShadow: '0 12px 30px rgba(233, 118, 43, 0.35)' }}>
                {/* Image Side */}
                <div className="hidden md:block w-[480px] min-h-[580px]">
                    <img
                        src={RegisterImage}
                        alt="Verify Email Visual"
                        className="h-full w-full object-cover"
                        style={{ objectPosition: 'left 10%' }}
                    />
                </div>

                {/* Form Side */}
                <div className="w-[360px] bg-white p-10 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-center text-[#E9762B] mb-6">Verify your BiteReview account</h2>

                    <div className="space-y-4">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                            Verification Code
                        </label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={codeInput}
                            onChange={(e) => setCodeInput(e.target.value)}
                            placeholder="Enter your code here"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />

                        {status === 'error' && (
                            <p className="text-sm text-red-600 font-medium text-center">{message}</p>
                        )}
                        {status === 'success' && (
                            <p className="text-sm text-green-600 font-medium text-center">{message}</p>
                        )}

                        <button
                            onClick={handleVerify}
                            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Verifying...' : 'Verify Email'}
                        </button>

                        <button
                            onClick={handleResend}
                            className="w-full mt-2 bg-gray-100 text-orange-500 font-semibold py-2 rounded-lg border border-orange-500 hover:bg-orange-50 transition disabled:opacity-50"
                            disabled={cooldown > 0 || status === 'loading'}
                        >
                            {cooldown > 0 ? `Resend available in ${cooldown}s` : 'Resend Verification Code'}
                        </button>

                        <p className="text-sm text-center text-gray-600 mt-6">
                            Already verified?{' '}
                            <Link to="/login" className="text-orange-500 hover:underline font-medium">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
