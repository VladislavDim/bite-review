import { useContext, useEffect, useState } from "react";
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import StarRatingDisplay from "../components/ui/StarRatingDisplay";
import { useNavigate, Link } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useGetAllReviews } from "../api/reviewApi";
import { useGetAllRestaurants } from "../api/restaurantApi";

export default function MyProfile() {
    const navigate = useNavigate();
    const { _id: userId, name, email, _createdOn } = useContext(UserContext);
    const { getAll: getAllReviews } = useGetAllReviews();
    const { restaurants } = useGetAllRestaurants();

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const allReviews = await getAllReviews();
                const myReviews = allReviews
                    .filter((r) => r.creatorId === userId)
                    .map((review) => {
                        const restaurant = restaurants.find(r => r._id === review.restaurantId);
                        return {
                            ...review,
                            restaurantName: restaurant?.name || "Restaurant",
                            restaurantId: restaurant?._id
                        };
                    });
                setReviews(myReviews);
            } catch (err) {
                console.error("Failed to load user reviews:", err);
            }
        };

        fetchUserReviews();
    }, [userId, restaurants]);

    const averageRating =
        reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 6;

    const indexOfLast = currentPage * reviewsPerPage;
    const indexOfFirst = indexOfLast - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    return (
        <section className="max-w-4xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                {/* Avatar */}
                <div className="w-28 h-28 rounded-full bg-orange-100 flex items-center justify-center text-4xl font-bold text-[#E9762B]">
                    {name[0]}
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-[#E9762B]">{name}</h1>
                    <p className="text-sm text-gray-600">{email}</p>
                    <p className="text-sm text-gray-400">Joined: {new Date(_createdOn).toLocaleDateString()}</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                    <button className="flex items-center gap-2 border-2 border-[#E9762B] text-[#E9762B] px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#E9762B] hover:to-[#f79d4d] hover:text-white transition">
                        <FaUserEdit />
                        Edit Profile
                    </button>

                    <button
                        onClick={() => navigate("/logout")}
                        className="flex items-center gap-2 border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-400 hover:text-white transition"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 text-center">
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Reviews</p>
                    <p className="text-xl font-semibold text-[#E9762B]">{reviews.length}</p>
                </div>
                <div className="bg-white border rounded-lg p-4 shadow-sm col-span-2 md:col-span-1">
                    <p className="text-sm text-gray-500">Average Rating</p>
                    <div className="flex items-center justify-center gap-2 mt-1">
                        <StarRatingDisplay rating={averageRating} size={20} />
                        <span className="text-sm text-gray-600">
                            {averageRating.toFixed(1)} / 5
                        </span>
                    </div>
                </div>
            </div>

            {/* Review List */}
            <div>
                <h2 className="text-lg font-semibold text-[#E9762B] mb-4">My Reviews</h2>
                <div className="space-y-4">
                    {currentReviews.map((rev, i) => (
                        <Link to={`/restaurants/${rev.restaurantId}/details`} key={i} className="block bg-white border p-4 rounded-lg shadow-sm hover:shadow-md transition">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-medium text-gray-800">{rev.restaurantName}</h3>
                                <StarRatingDisplay rating={rev.rating} size={18} />
                            </div>
                            <p className="text-sm text-gray-700">{rev.comment}</p>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-1 border rounded text-sm text-[#E9762B] border-[#E9762B] 
                                       hover:bg-[#E9762B] hover:text-white transition disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-1 border rounded text-sm text-[#E9762B] border-[#E9762B] 
                                       hover:bg-[#E9762B] hover:text-white transition disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
