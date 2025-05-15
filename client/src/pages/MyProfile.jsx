import { useEffect, useState } from "react";
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router";
import { useUserContext } from "../contexts/UserContext";
import { useGetUserById } from "../api/userApi";
import { useGetAllReviews } from "../api/reviewApi";
import { useGetAllRestaurants } from "../api/restaurantApi";
import StarRatingDisplay from "../components/ui/StarRatingDisplay";

export default function MyProfile() {
    const navigate = useNavigate();
    const { _id: userId } = useUserContext();
    const { getUser } = useGetUserById();
    const { getAll: getAllReviews } = useGetAllReviews();
    const { restaurants } = useGetAllRestaurants();

    const [profile, setProfile] = useState(null);
    const [reviewsReceived, setReviewsReceived] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const reviewsPerPage = 6;

    useEffect(() => {
        if (!userId) return;

        const fetchProfileAndReviews = async () => {
            try {
                const fetchedProfile = await getUser(userId);
                setProfile(fetchedProfile);

                const allReviews = await getAllReviews();
                const myRestaurants = restaurants.filter(r => r.owner?._id === userId);

                if (!myRestaurants.length) {
                    setReviewsReceived([]);
                    return;
                }

                const myRestaurantIds = myRestaurants.map(r => r._id);

                const received = allReviews
                    .filter(r => myRestaurantIds.includes(r.restaurant?._id));

                setReviewsReceived(received);
            } catch (error) {
                console.error('Failed to fetch profile or reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileAndReviews();
    }, [userId, restaurants, getAllReviews, getUser]);

    if (loading) {
        return <p className="text-center text-gray-500 py-10">Loading profile...</p>;
    }

    if (!profile) {
        return <p className="text-center text-red-500 py-10">Profile could not be loaded.</p>;
    }

    const indexOfLast = currentPage * reviewsPerPage;
    const indexOfFirst = indexOfLast - reviewsPerPage;
    const currentReviews = reviewsReceived.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(reviewsReceived.length / reviewsPerPage);

    const averageRating = reviewsReceived.length
        ? reviewsReceived.reduce((sum, r) => sum + r.rating, 0) / reviewsReceived.length
        : 0;

    return (
        <section className="max-w-4xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                {/* Avatar */}
                <div className="w-28 h-28 rounded-full bg-orange-100 flex items-center justify-center text-4xl font-bold text-[#E9762B]">
                    {profile.username?.[0] || "?"}
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-[#E9762B]">{profile.username}</h1>
                    <p className="text-sm text-gray-600">{profile.email}</p>
                    <p className="text-sm text-gray-400">
                        Joined: {new Date(profile.createdAt).toLocaleDateString()}
                    </p>
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
                    <p className="text-xl font-semibold text-[#E9762B]">{reviewsReceived.length}</p>
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
                <h2 className="text-lg font-semibold text-[#E9762B] mb-4">Reviews Received</h2>
                <div className="space-y-4">
                    {currentReviews.map((rev, i) => (
                        <Link
                            to={`/restaurants/${rev.restaurant._id}/details`}
                            key={i}
                            className="block bg-white border p-4 rounded-lg shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-medium text-gray-800">
                                    {rev.restaurant?.name || "Unknown Restaurant"}
                                </h3>
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
                            className="px-4 py-1 border rounded text-sm text-[#E9762B] border-[#E9762B] hover:bg-[#E9762B] hover:text-white transition disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-1 border rounded text-sm text-[#E9762B] border-[#E9762B] hover:bg-[#E9762B] hover:text-white transition disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
