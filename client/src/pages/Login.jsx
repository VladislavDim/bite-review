import { Link } from "react-router";
import LoginImage from '../assets/images/Login.png';
import PasswordInput from "../components/ui/PasswordInput";
import TextInput from "../components/ui/TextInput";
import SubmitButton from "../components/ui/SubmitButton";

export default function Login() {

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
                    {/* Header */}
                    <h2 className="text-2xl font-bold text-center text-[#E9762B]">Login to BiteReview</h2>

                    {/* Form */}
                    <form className="flex-1 mt-6 mb-6 flex flex-col justify-center space-y-6">
                        <TextInput id="email" type="email" label="Email" placeholder="you@example.com" />
                        <PasswordInput id="password" label="Password" />
                    </form>

                    {/* Footer */}
                    <div className="mt-6">

                        <SubmitButton>Sign In</SubmitButton>
                        
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