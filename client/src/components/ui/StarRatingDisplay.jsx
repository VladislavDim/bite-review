import { FaStar } from "react-icons/fa";

export default function StarRatingDisplay({
    rating,
    max = 5,
    size = 20
}) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: max }).map((_, index) => {
                const fillPercent = Math.min(Math.max(rating - index, 0), 1) * 100;

                return (
                    <div key={index} className="relative" style={{ width: size, height: size }}>
                        <div
                            className="absolute inset-0 text-gray-300 select-none"
                            style={{ fontSize: size }}
                        >
                            <FaStar />
                        </div>

                        <div
                            className="absolute inset-0 overflow-hidden text-yellow-400 select-none"
                            style={{ width: `${fillPercent}%`, fontSize: size }}
                        >
                            <FaStar />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
