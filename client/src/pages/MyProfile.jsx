import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import StarRatingDisplay from "../components/ui/StarRatingDisplay";

export default function MyProfile() {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john@example.com",
        joinedAt: "2024-10-15",
        reviews: [
            { restaurant: "Sushi King", rating: 5, comment: "Amazing!" },
            { restaurant: "Pizza Bella", rating: 4.2, comment: "Great crust!" },
            { restaurant: "Burgers & Co", rating: 3.5, comment: "Could be better" },
            { restaurant: "Pasta House", rating: 4.8, comment: "Excellent pasta!" },
            { restaurant: "Green Garden", rating: 2.9, comment: "Too salty" },
            { restaurant: "Cafe Delight", rating: 4.1, comment: "Cozy atmosphere" },
            { restaurant: "Vegan Vibes", rating: 4.6, comment: "Tasty and fresh" },
        ],
    });

    const averageRating =
        user.reviews.reduce((sum, r) => sum + r.rating, 0) / user.reviews.length;

    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 6;

    const indexOfLast = currentPage * reviewsPerPage;
    const indexOfFirst = indexOfLast - reviewsPerPage;
    const currentReviews = user.reviews.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(user.reviews.length / reviewsPerPage);

    return (
        <section className="max-w-4xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                {/* Avatar */}
                <div className="w-28 h-28 rounded-full bg-orange-100 flex items-center justify-center text-4xl font-bold text-[#E9762B]">
                    {user.name[0]}
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-[#E9762B]">{user.name}</h1>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-400">Joined: {user.joinedAt}</p>
                </div>

                {/* Edit button */}
                <button className="flex items-center gap-2 border-2 border-[#E9762B] text-[#E9762B] px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-[#E9762B] hover:to-[#f79d4d] hover:text-white transition">
                    <FaUserEdit />
                    Edit Profile
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 text-center">
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Reviews</p>
                    <p className="text-xl font-semibold text-[#E9762B]">{user.reviews.length}</p>
                </div>
                <div className="bg-white border rounded-lg p-4 shadow-sm col-span-2 md:col-span-1">
                    <p className="text-sm text-gray-500">Average Rating</p>
                    <div className="flex items-center justify-center gap-2 mt-1">
                        <StarRatingDisplay rating={averageRating} size={20} />
                        <span className="text-sm text-gray-600">{averageRating.toFixed(1)} / 5</span>
                    </div>
                </div>
            </div>

            {/* Review List */}
            <div>
                <h2 className="text-lg font-semibold text-[#E9762B] mb-4">My Reviews</h2>
                <div className="space-y-4">
                    {currentReviews.map((rev, i) => (
                        <div key={i} className="bg-white border p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-medium text-gray-800">{rev.restaurant}</h3>
                                <StarRatingDisplay rating={rev.rating} size={18} />
                            </div>
                            <p className="text-sm text-gray-700">{rev.comment}</p>
                        </div>
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
