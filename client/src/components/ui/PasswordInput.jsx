import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordInput({
    id,
    placeholder = "••••••••",
    label
}) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    id={id}
                    placeholder={placeholder}
                    required
                    className="w-full bg-transparent border-b-2 border-[#E9762B] text-gray-800 
                               placeholder-gray-400 pr-10 focus:outline-none 
                               focus:ring-1 focus:ring-orange-200 focus:border-[#E9762B] 
                               transition-all duration-300"
                />
                <span
                    onClick={() => setShowPassword(prev => !prev)}
                    
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 
                               text-gray-500 hover:text-[#E9762B] 
                               cursor-pointer transition-transform duration-200 hover:scale-125"
                >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                </span>
            </div>
        </div>
    );
}