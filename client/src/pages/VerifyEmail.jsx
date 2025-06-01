import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { verifyEmail, resendVerificationCode } from '../api/authApi';
import RegisterImage from "../assets/images/Register.png";
import { VITE_VERIFICATION_EXPIRY_MINUTES } from '../utils/verification.constants';
import { FaClock } from 'react-icons/fa';
import { useUserContext } from '../contexts/UserContext';

export default function VerifyEmail() {
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const [codeInput, setCodeInput] = useState('');
    const [cooldown, setCooldown] = useState(0);
    const [buttonLabel, setButtonLabel] = useState('Resend Verification Code');
    const intervalRef = useRef(null);
    const navigate = useNavigate();

    const { email } = useUserContext();

    useEffect(() => {
        if (!email) {
            navigate('/register'); // Redirect if user reloads and email is lost
        }
    }, [email, navigate]);

    useEffect(() => {
        if (cooldown > 0) {
            setButtonLabel(`Resend in ${formatTime(cooldown)}`);
        } else {
            setButtonLabel('Resend Verification Code');
        }
    }, [cooldown]);

    useEffect(() => {
        if (cooldown > 0 && !intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setCooldown(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [cooldown]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

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
            setMessage(err.message || 'Verification failed.');
            setStatus('error');
        }
    };

    const handleResend = async () => {
        if (!email) {
            setMessage('Missing email for resending verification.');
            setStatus('error');
            return;
        }

        try {
            setStatus('loading');
            const result = await resendVerificationCode(email);
            const retry = result.retryAfter || VITE_VERIFICATION_EXPIRY_MINUTES * 60;
            setCooldown(retry);
            setMessage(result.message || 'Verification code resent!');
            setStatus('idle');
        } catch (err) {
            const retry = err?.response?.data?.retryAfter;
            const errorMsg = err?.response?.data?.message || err.message;

            if (retry) {
                setCooldown(retry);
            }

            setMessage(errorMsg);
            setStatus('error');
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
                        src={RegisterImage}
                        alt="Verify Email Visual"
                        className="h-full w-full object-cover"
                        style={{ objectPosition: 'left 10%' }}
                    />
                </div>

                <div className="w-[360px] bg-white p-10 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-center text-[#E9762B] mb-6">
                        Verify your BiteReview account
                    </h2>

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
                            onClick={handleVerify}
                            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Verifying...' : 'Verify Email'}
                        </button>

                        <button
                            onClick={handleResend}
                            className={`w-full mt-2 font-semibold py-2 rounded-lg border transition flex items-center justify-center gap-2 ${
                                cooldown > 0
                                    ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                                    : 'bg-gray-100 text-orange-500 border-orange-500 hover:bg-orange-50'
                            }`}
                            disabled={cooldown > 0 || status === 'loading'}
                        >
                            {cooldown > 0 && <FaClock />}
                            {buttonLabel}
                        </button>

                        <p className="text-sm text-center text-gray-600 mt-6">
                            Already verified?{' '}
                            <Link
                                to="/login"
                                className="text-orange-500 hover:underline font-medium"
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
