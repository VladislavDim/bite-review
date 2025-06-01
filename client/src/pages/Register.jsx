import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import RegisterImage from "../assets/images/Register.png";
import PasswordInput from "../components/ui/PasswordInput";
import TextInput from "../components/ui/TextInput";
import SubmitButton from "../components/ui/SubmitButton";
import { useRegister } from "../api/authApi";
import { UserContext } from "../contexts/UserContext";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useContext(UserContext);

    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
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

        if (!formState.username.trim()) validationErrors.username = "Username is required.";
        if (!formState.email.trim()) validationErrors.email = "Email is required.";
        if (!formState.password.trim()) validationErrors.password = "Password is required.";
        if (formState.password !== formState.confirmPassword) validationErrors.confirmPassword = "Passwords do not match.";

        setErrors(validationErrors);
        setServerError("");

        if (Object.keys(validationErrors).length > 0) return;

        try {
            setIsPending(true);
            const authData = await register(formState.username, formState.email, formState.password);
            userLoginHandler(authData);
            navigate("/verify-email");
        } catch (err) {
            console.error("Register failed:", err);
            setServerError(err.message || "Registration failed. Try again.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-[#f8f8f8] px-4">
            <div className="flex items-stretch shadow-xl rounded-xl overflow-hidden" style={{ boxShadow: '0 12px 30px rgba(233, 118, 43, 0.35)' }}>
                {/* Image Box */}
                <div className="hidden md:block w-[480px] min-h-[580px]">
                    <img
                        src={RegisterImage}
                        alt="Register visual"
                        className="h-full w-full object-cover"
                        style={{ objectPosition: 'left 10%' }}
                    />
                </div>

                {/* Register Form */}
                <div className="w-[360px] bg-white p-10 flex flex-col justify-between">
                    <h2 className="text-2xl font-bold text-center text-[#E9762B]">Create your BiteReview account</h2>

                    <form onSubmit={handleSubmit} className="flex-1 mt-6 mb-6 flex flex-col justify-center space-y-6" noValidate>
                        <TextInput
                            id="username"
                            name="username"
                            type="text"
                            label="Username"
                            placeholder="John Doe"
                            value={formState.username}
                            onChange={handleChange}
                            error={errors.username}
                        />

                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
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

                        <PasswordInput
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            value={formState.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                        />

                        {serverError && (
                            <p className="text-sm text-red-500 font-medium text-center -mt-4">{serverError}</p>
                        )}

                        <SubmitButton disabled={isPending}>
                            {isPending ? "Registering..." : "Register"}
                        </SubmitButton>
                    </form>

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