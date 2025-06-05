import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import ResetImage from "../assets/images/Register.png";
import PasswordInput from "../components/ui/PasswordInput";
import SubmitButton from "../components/ui/SubmitButton";
import { resetPassword } from "../api/authApi";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!password || !confirmPassword) {
            return setError("Please fill in both fields.");
        }

        if (password !== confirmPassword) {
            return setError("Passwords do not match.");
        }

        try {
            setIsPending(true);
            await resetPassword(token, password);

            setSuccess("Password successfully reset!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err?.response?.data?.message || "Reset failed.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-[#f8f8f8] px-4">
            <div
                className="flex items-stretch shadow-xl rounded-xl overflow-hidden"
                style={{ boxShadow: '0 12px 30px rgba(233, 118, 43, 0.35)' }}
            >
                <div className="hidden md:block w-[480px] min-h-[540px]">
                    <img
                        src={ResetImage}
                        alt="Reset Password Visual"
                        className="h-full w-full object-cover object-right"
                    />
                </div>

                <div className="w-[340px] bg-white p-10 min-h-[540px] flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-center text-[#E9762B] mb-6">
                        Reset Your Password
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <PasswordInput
                            id="newPassword"
                            name="newPassword"
                            label="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <PasswordInput
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        {success && <p className="text-green-600 text-sm text-center">{success}</p>}

                        <SubmitButton disabled={isPending}>
                            {isPending ? "Resetting..." : "Reset Password"}
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </section>
    );
}
