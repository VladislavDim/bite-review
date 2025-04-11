import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useGetReviewsByRestaurantId } from "../../api/reviewApi";

export default function RestaurantCard({ _id, name, address, images = [], features }) {
    const [hovered, setHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getAll } = useGetReviewsByRestaurantId();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await getAll(_id);
                setReviews(res);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [_id]);

    const avgRating = reviews.length
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    useEffect(() => {
        let interval;
        if (hovered && images.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex(prev =>
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
                    <img
                        src={images[currentImageIndex]}
                        alt={name}
                        className="w-full h-56 object-cover"
                    />

                    <div className={`transition-all duration-300 px-4 py-3 ${hovered ? "bg-white text-black" : "bg-gradient-to-r from-[#E9762B] to-[#f79d4d] text-white"}`}>
                        <h3 className="text-lg font-bold">{name}</h3>
                        <p className="text-sm font-medium mt-1">
                            ⭐ {loading ? "..." : avgRating.toFixed(1)} / 5
                        </p>

                        {hovered && (
                            <div className="mt-2 text-sm space-y-1">
                                <p><span className="font-semibold">Address:</span> {address}</p>
                                {features?.length > 0 && (
                                    <p>
                                        <span className="font-semibold">Features:</span>{" "}
                                        {features.join(" • ")}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
