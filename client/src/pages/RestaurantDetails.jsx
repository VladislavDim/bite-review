import { useParams, useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import StarRatingInput from "../components/ui/StarRatingInput";
import StarRatingDisplay from "../components/ui/StarRatingDisplay";
import { useGetRestaurantById } from "../api/restaurantApi";
import { useGetReviewsByRestaurantId, useCreateReview } from "../api/reviewApi";
import { UserContext } from "../contexts/UserContext";

const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

export default function RestaurantDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getById } = useGetRestaurantById();
    const { getAll: getReviews } = useGetReviewsByRestaurantId();
    const { create: createReview } = useCreateReview();
    const { name: userName, _id: userId, accessToken } = useContext(UserContext);

    const [restaurant, setRestaurant] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showLightbox, setShowLightbox] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const [newReview, setNewReview] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState("newest");
    const [reviewError, setReviewError] = useState(null);
    const REVIEWS_PER_PAGE = 5;

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getById(id);
                let fetchedReviews = await getReviews(id);
                fetchedReviews = sortReviews(fetchedReviews, sortOption);
                setRestaurant(data);
                setReviews(fetchedReviews);
            } catch (err) {
                console.error("Failed to fetch restaurant or reviews:", err);
                navigate("/404");
            }
        }

        fetchData();
    }, [id, sortOption]);

    useEffect(() => {
        if (restaurant?.images?.length > 0) {
            restaurant.images.forEach((src) => {
                const img = new Image();
                img.src = `${baseUrl}${src}`;
            });
        }
    }, [restaurant]);

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setImageIndex((prev) =>
                    prev === (restaurant?.images?.length || 1) - 1 ? 0 : prev + 1
                );
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [restaurant, isHovered]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") {
                setShowLightbox(false);
            } else if (e.key === "ArrowRight") {
                setLightboxIndex((i) =>
                    i === restaurant.images.length - 1 ? 0 : i + 1
                );
            } else if (e.key === "ArrowLeft") {
                setLightboxIndex((i) =>
                    i === 0 ? restaurant.images.length - 1 : i - 1
                );
            }
        };

        if (showLightbox) {
            window.addEventListener("keydown", handleKey);
        }
        return () => window.removeEventListener("keydown", handleKey);
    }, [showLightbox, restaurant]);

    const sortReviews = (reviews, option) => {
        switch (option) {
            case "highest":
                return [...reviews].sort((a, b) => b.rating - a.rating);
            case "lowest":
                return [...reviews].sort((a, b) => a.rating - b.rating);
            case "oldest":
                return [...reviews].sort((a, b) => a._createdOn - b._createdOn);
            case "newest":
            default:
                return [...reviews].sort((a, b) => b._createdOn - a._createdOn);
        }
    };

    const averageRating =
        reviews.length > 0
            ? reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length
            : 0;

    const handleReviewSubmit = async () => {
        if (newReview && newRating > 0) {
            setReviewError(null);
            const newEntry = {
                restaurantId: id,
                creatorId: userId,
                creatorName: userName,
                rating: newRating,
                comment: newReview,
            };

            try {
                const created = await createReview(newEntry, accessToken);
                const updated = sortReviews([created, ...reviews], sortOption);
                setReviews(updated);
                setNewReview("");
                setNewRating(0);
                setCurrentPage(1);
            } catch (err) {
                console.error("Failed to submit review:", err);
                setReviewError(err?.message || "Something went wrong.");
            }
        }
    };

    const indexOfLast = currentPage * REVIEWS_PER_PAGE;
    const indexOfFirst = indexOfLast - REVIEWS_PER_PAGE;
    const currentReviews = reviews.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

    if (!restaurant) return <p className="text-center mt-10">Loading...</p>;

    const hasImages = restaurant?.images?.length > 0;
    const imageSrc = hasImages
        ? `${baseUrl}${restaurant.images[imageIndex]}`
        : `${baseUrl}/public/no-image-available.png`;

    const imageClass = hasImages
        ? "object-cover"
        : "object-contain p-6 bg-[#d57133]";

    return (
        <section className="px-6 py-10 max-w-5xl mx-auto">
            {showLightbox && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
                    onClick={() => setShowLightbox(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <img
                            src={`${baseUrl}${restaurant.images[lightboxIndex]}`}
                            alt="Full"
                            className="max-w-4xl max-h-[90vh] rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Close Button – top right */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowLightbox(false);
                        }}
                        className="absolute top-5 right-5 text-white text-3xl font-bold hover:scale-125 transition-transform duration-200"
                        aria-label="Close lightbox"
                    >
                        ×
                    </button>
                    
                    {/* Left Arrow */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIndex(
                                lightboxIndex === 0
                                    ? restaurant.images.length - 1
                                    : lightboxIndex - 1
                            );
                        }}
                        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-5xl font-bold cursor-pointer select-none"
                    >
                        ❮
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIndex(
                                lightboxIndex === restaurant.images.length - 1
                                    ? 0
                                    : lightboxIndex + 1
                            );
                        }}
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-5xl font-bold cursor-pointer select-none"
                    >
                        ❯
                    </button>
                </div>

            )}


            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#E9762B]">{restaurant.name}</h1>
                <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <FaStar className="text-yellow-400" />
                    <span className="font-medium">{averageRating.toFixed(1)} / 5</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <FaMapMarkerAlt />
                    <span>{`${restaurant.location}, ${restaurant.city.name}`}</span>
                </div>
            </div>

            <div className="mb-8">
                <img
                    src={imageSrc}
                    alt="Restaurant visual"
                    className={`rounded-xl w-full h-[400px] shadow-md transition-all duration-300 ${imageClass} ${isHovered ? "scale-105 cursor-zoom-in" : ""
                        }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => {
                        setShowLightbox(true);
                        setLightboxIndex(imageIndex);
                    }}
                />
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-[#E9762B] mb-2">About</h2>
                <p className="text-gray-700 leading-relaxed">{restaurant.description}</p>
                {restaurant.features?.length > 0 && (
                    <p className="mt-3 text-sm text-gray-500">
                        {restaurant.features.join(" • ")}
                    </p>
                )}
            </div>

            <div className="mt-12">
                <h3 className="text-xl font-semibold text-[#E9762B] mb-4">Reviews</h3>

                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 text-sm"
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="highest">Rating: High to Low</option>
                        <option value="lowest">Rating: Low to High</option>
                    </select>
                </div>

                <div className="space-y-4 mb-10">
                    {currentReviews.map((rev, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-center gap-1 mb-2">
                                <StarRatingDisplay rating={rev.rating} size={19} />
                            </div>
                            <p className="text-gray-800">{rev.comment}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                – {rev.creatorName || "Anonymous"},{" "}
                                {new Date(rev._createdOn).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center gap-3 mb-8">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border text-sm rounded text-[#E9762B] border-[#E9762B] hover:bg-[#E9762B] hover:text-white disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border text-sm rounded text-[#E9762B] border-[#E9762B] hover:bg-[#E9762B] hover:text-white disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}

                {reviewError && (
                    <p className="text-red-500 text-sm mb-3 font-medium">{reviewError}</p>
                )}

                <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-1 focus:ring-orange-300"
                    rows={3}
                />

                <StarRatingInput value={newRating} onChange={setNewRating} />

                <div className="flex flex-wrap justify-between items-center mt-8 gap-4">
                    <button
                        onClick={handleReviewSubmit}
                        disabled={!newReview || newRating === 0}
                        className="px-6 py-2 font-medium rounded-lg bg-white text-[#E9762B] border-2 border-[#E9762B]
                            hover:bg-gradient-to-r hover:from-[#E9762B] hover:to-[#f79d4d] hover:text-white
                            disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Submit Review
                    </button>

                    <button
                        onClick={() => navigate("/restaurants")}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg 
                            font-medium hover:bg-gray-100 hover:border-gray-400 cursor-pointer 
                            transition duration-200 shadow-sm hover:shadow-md"
                    >
                        Back to Restaurants
                    </button>
                </div>
            </div>
        </section>
    );
}
