export default function SubmitButton({
    children,
    onClick,
    disabled = false,
    type = "submit",
    className = ""
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full bg-white text-[#E9762B] font-semibold py-2 rounded-lg 
                        border-2 border-[#E9762B] transition-all duration-300
                        hover:bg-gradient-to-r hover:from-[#E9762B] hover:to-[#f79d4d]
                        hover:text-white hover:border-white
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${className}`}
        >
            {children}
        </button>
    );
}