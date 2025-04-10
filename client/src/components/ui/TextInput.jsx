export default function TextInput({
    id,
    name = id,
    label,
    type = "text",
    placeholder = "",
    required = true,
}) {
    return (
        <div>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                required={required}
                className="w-full bg-transparent border-b-2 border-[#E9762B] text-gray-800 
                           placeholder-gray-400 focus:outline-none focus:ring-1 
                           focus:ring-orange-200 focus:border-[#E9762B] transition-all duration-300"
            />
        </div>
    );
}