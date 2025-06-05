import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import LoginImage from '../assets/images/Login.png';
import PasswordInput from "../components/ui/PasswordInput";
import TextInput from "../components/ui/TextInput";
import SubmitButton from "../components/ui/SubmitButton";
import { useLogin } from "../api/authApi";
import { UserContext, useUserContext } from "../contexts/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();

    const { email } = useUserContext();
    const [formState, setFormState] = useState({ email: email || "", password: "" });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [isPending, setIsPending] = useState(false);


    const handleChange = (e) => {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!formState.email.trim()) validationErrors.email = "Email is required.";
        if (!formState.password.trim()) validationErrors.password = "Password is required.";

        setErrors(validationErrors);
        setServerError("");

        if (Object.keys(validationErrors).length > 0) return;

        try {
            setIsPending(true);
            const authData = await login(formState.email, formState.password);
            userLoginHandler(authData);
            navigate("/restaurants");
        } catch (err) {
            console.error("Login failed:", err);
            setServerError(err.message || "Login failed");
        } finally {
            setIsPending(false);
        }
    };

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
                <div className="w-[340px] bg-white p-10 min-h-[540px] flex flex-col justify-between">
                    <h2 className="text-2xl font-bold text-center text-[#E9762B]">Login to BiteReview</h2>

                    <form onSubmit={handleSubmit} className="flex-1 mt-6 mb-6 flex flex-col justify-center space-y-6" noValidate>
                        <TextInput
                            id="email"
                            type="email"
                            label="Email"
                            name="email"
                            placeholder="you@example.com"
                            value={formState.email}
                            onChange={handleChange}
                            error={errors.email}
                        />

                        <PasswordInput
                            id="password"
                            name="password"
                            label="Password"
                            value={formState.password}
                            onChange={handleChange}
                            error={errors.password}
                        />

                        <div className="text-right">
                            <Link to="/forgot-password" className="text-sm text-orange-500 hover:underline font-medium">
                                Forgot your password?
                            </Link>
                        </div>

                        {serverError && (
                            <p className="text-red-500 text-sm text-center -mt-2">{serverError}</p>
                        )}

                        <SubmitButton disabled={isPending}>
                            {isPending ? "Signing In..." : "Sign In"}
                        </SubmitButton>
                    </form>

                    <div className="mt-6">
                        <p className="text-sm text-center text-gray-600 mt-4">
                            Don't have an account?{" "}
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
