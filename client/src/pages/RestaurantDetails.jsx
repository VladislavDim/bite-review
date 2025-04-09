import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import StarRatingInput from "../components/ui/StarRatingInput";
import StarRatingDisplay from "../components/ui/StarRatingDisplay";

const mockData = {
    _id: "abc123",
    name: "Pizza Palace",
    rating: 4.5,
    address: "123 Main St, Sofia",
    images: [
        "https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg",
        "https://zavedenia.com/zimages/varna/big/1957/1957DcCEUwHHscolWCGoPhkV8fptzzOhZiTCvvh.jpg",
        "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
        "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg"
    ],
    description: "One of the best places in town for artisan pizza with fresh ingredients and cozy atmosphere.",
    extraInfo: "Open daily from 11:00 to 23:00 • Vegan options • Outdoor seating",
    reviews: [
        {
            user: "John",
            rating: 4.5,
            comment: "Amazing pizza and great service!",
        },
        {
            user: "Maria",
            rating: 3.2,
            comment: "Tasty but a bit expensive.",
        },
    ],
};

export default function RestaurantDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);

    // Review state
    const [newReview, setNewReview] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        setRestaurant(mockData);
        setReviews(mockData.reviews);

        const interval = setInterval(() => {
            setImageIndex((prev) =>
                prev === mockData.images.length - 1 ? 0 : prev + 1
            );
        }, 2000);

        return () => clearInterval(interval);
    }, [id]);

    const handleReviewSubmit = () => {
        if (newReview && newRating > 0) {
            const newEntry = {
                user: "Anonymous",
                rating: newRating,
                comment: newReview,
            };
            setReviews(prev => [newEntry, ...prev]);
            setNewReview("");
            setNewRating(0);
        }
    };

    if (!restaurant) return <p className="text-center mt-10">Loading...</p>;

    return (
        <section className="px-6 py-10 max-w-5xl mx-auto">
            {/* Title & Rating */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#E9762B]">{restaurant.name}</h1>
                <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <FaStar className="text-yellow-400" />
                    <span className="font-medium">{restaurant.rating} / 5</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <FaMapMarkerAlt />
                    <span>{restaurant.address}</span>
                </div>
            </div>

            {/* Image Carousel */}
            <div className="mb-8">
                <img
                    src={restaurant.images[imageIndex]}
                    alt="Restaurant visual"
                    className="rounded-xl w-full h-[400px] object-cover shadow-md transition-all duration-300"
                />
            </div>

            {/* Description */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-[#E9762B] mb-2">About</h2>
                <p className="text-gray-700 leading-relaxed">{restaurant.description}</p>
                <p className="mt-3 text-sm text-gray-500">{restaurant.extraInfo}</p>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
                <h3 className="text-xl font-semibold text-[#E9762B] mb-4">Reviews</h3>

                <div className="space-y-4 mb-6">
                    {reviews.map((rev, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-center gap-1 mb-2">
                                <StarRatingDisplay rating={rev.rating} size={19} />
                            </div>
                            <p className="text-gray-800">{rev.comment}</p>
                            <p className="text-xs text-gray-400 mt-1">– {rev.user}, 03 Apr 2025</p>
                        </div>

                    ))}
                </div>

                {/* Add new review */}
                <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-1 focus:ring-orange-300"
                    rows={3}
                />

                {/* Star Rating input */}
                <StarRatingInput value={newRating} onChange={setNewRating} />

                <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
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
