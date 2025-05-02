import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function RestaurantCard({
    _id,
    name,
    address,
    images = [],
    features,
    rating = 0,
    reviewCount = 0,
}) {
    const [hovered, setHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const currentImage = images[currentImageIndex] || "";
    const isDefaultImage = currentImage.includes("no-image-available");

    useEffect(() => {
        let interval;
        if (hovered && images.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1
                );
            }, 1000);
        } else {
            setCurrentImageIndex(0);
        }

        return () => clearInterval(interval);
    }, [hovered, images]);

    return (
        <Link to={`/restaurants/${_id}/details`}>
            <div
                className="transition-transform duration-300 will-change-transform"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    transform: hovered ? "scale(1.05)" : "scale(1)",
                    zIndex: hovered ? 10 : 1,
                }}
            >
                <div className="rounded-xl overflow-hidden shadow-md transition-all duration-300 bg-white w-full max-w-[420px] mx-auto">
                    <div className={`w-full h-56 flex items-center justify-center ${isDefaultImage ? "bg-[#d57133]" : ""}`}>
                        <img
                            src={currentImage}
                            alt={name}
                            className={`${isDefaultImage ? "w-55 h-auto object-contain" : "w-full h-56 object-cover"}`}
                        />
                    </div>

                    <div className={`transition-all duration-300 px-4 py-3 ${hovered
                        ? "bg-white text-black"
                        : "bg-gradient-to-r from-[#E9762B] to-[#f79d4d] text-white"
                    }`}>
                        <h3 className="text-lg font-bold">{name}</h3>
                        <p className="text-sm font-medium mt-1">
                            ⭐ {typeof rating === "number" && rating > 0 ? rating.toFixed(1) : "0"} / 5
                            <span className="ml-2 text-xs">
                                ({reviewCount} review{reviewCount === 1 ? "" : "s"})
                            </span>
                        </p>

                        {hovered && (
                            <div className="mt-2 text-sm space-y-1">
                                <p><span className="font-semibold">Address:</span> {address}</p>
                                {features?.length > 0 && (
                                    <p><span className="font-semibold">Features:</span> {features.join(" • ")}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
