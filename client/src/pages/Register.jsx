import { Link, useNavigate } from "react-router";
import { useState } from "react";
import RegisterImage from "../assets/images/Register.png";
import PasswordInput from "../components/ui/PasswordInput";
import TextInput from "../components/ui/TextInput";
import SubmitButton from "../components/ui/SubmitButton";
import { useActionState } from "react";
import { useRegister } from "../api/authApi";
import { useUserContext } from "../contexts/UserContext";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useUserContext();

    const registerHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);



        const authData = await register(values.name, values.email, values.password);

        userLoginHandler(authData);

        navigate('/');
    };

    const [formState, registerAction, isPending] = useActionState(registerHandler, {
        name: '',
        email: '',
        password: '',
        "confirm-password": ''
    });

    return (
        <section className="flex items-center justify-center min-h-screen bg-[#f8f8f8] px-4">
            <div className="flex items-stretch shadow-xl rounded-xl overflow-hidden" style={{ boxShadow: '0 12px 30px rgba(233, 118, 43, 0.35)' }}>

                {/* Image Box */}
                <div className="hidden md:block h-[580px] w-[480px]">
                    <img
                        src={RegisterImage}
                        alt="Register visual"
                        className="h-full w-full object-cover"
                        style={{ objectPosition: 'left 10%' }}
                    />
                </div>

                {/* Register Form */}
                <div className="w-[360px] bg-white p-10 min-h-[580px] flex flex-col justify-between">
                    <h2 className="text-2xl font-bold text-center text-[#E9762B]">Create your BiteReview account</h2>

                    <form action={registerAction} className="flex-1 mt-6 mb-6 flex flex-col justify-center space-y-6">
                        {/* Name */}
                        <TextInput id="name" type="text" label="Name" placeholder="John Doe" />

                        {/* Email */}
                         <TextInput id="email" type="email" label="Email" placeholder="you@example.com" />

                        {/* Password */}
                        <PasswordInput id="password" label="Password" />

                        {/* Confirm Password */}
                        <PasswordInput id="confirmPassword" label="Confirm Password" />

                        {/* Submit Button */}
                        <SubmitButton disabled={isPending}>
                            {isPending ? "Registering..." : "Register"}
                        </SubmitButton>
                    </form>

                    {/* Footer */}
                    <div className="mt-6">
                        <p className="text-sm text-center text-gray-600 mt-4">
                            Already have an account?{' '}
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
