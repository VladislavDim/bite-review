import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRatingInput({
    value,
    onChange,
    max = 5,
    size = 27
}) {
    const [hoverValue, setHoverValue] = useState(null);
    const getDisplayValue = () => hoverValue ?? value;

    return (
        <div className="flex items-center gap-2">
            <div className="flex">
                {Array.from({ length: max }).map((_, index) => {
                    const fillPercent = Math.min(Math.max(getDisplayValue() - index, 0), 1) * 100;

                    return (
                        <div
                            key={index}
                            className="relative"
                            style={{ width: size, height: size }}
                            onMouseMove={(e) => {
                                const { left, width } = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - left;
                                const percent = Math.min(Math.max(x / width, 0), 1);
                                const precise = +(index + percent).toFixed(1);
                                setHoverValue(precise);
                            }}
                            onMouseLeave={() => setHoverValue(null)}
                            onClick={() => {
                                if (hoverValue !== null) {
                                    onChange(hoverValue);
                                }
                            }}
                        >
                            {/* Празна звезда */}
                            <div className="absolute inset-0 text-gray-300">
                                <FaStar size={size} />
                            </div>

                            {/* Запълнена част */}
                            <div
                                className="absolute inset-0 overflow-hidden text-yellow-400 pointer-events-none"
                                style={{ width: `${fillPercent}%` }}
                            >
                                <FaStar size={size} />
                            </div>
                        </div>
                    );
                })}
            </div>

            <span
                className="text-sm text-gray-600 font-medium w-16 text-left"
                style={{ fontSize: size * 0.6 }}
            >
                {getDisplayValue().toFixed(1)} / {max}
            </span>
        </div>
    );
}
