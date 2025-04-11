import { useContext, useMemo, useState, useEffect } from "react";
import {
    FaUsers,
    FaListUl,
    FaUtensils,
} from "react-icons/fa";
import { useGetAllRestaurants } from "../api/restaurantApi";
import { useGetAllReviews } from "../api/reviewApi";
import RestaurantCard from "../components/restaurant-card/RestaurantCard";
import ScrollToTop from "../components/ui/ScrollToTop";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router";

export default function Restaurants() {
    const ITEMS_PER_LOAD = 10;
    const { _id: userId } = useContext(UserContext);
    const isGuest = !userId;
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("name-asc");
    const [ratingsMap, setRatingsMap] = useState({});
    const [reviewCounts, setReviewCounts] = useState({});

    const { restaurants, loading, error } = useGetAllRestaurants();
    const { getAll: getAllReviews } = useGetAllReviews();

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const allReviews = await getAllReviews();
                const map = {};
                const counts = {};

                allReviews.forEach((rev) => {
                    if (!map[rev.restaurantId]) {
                        map[rev.restaurantId] = [];
                    }
                    map[rev.restaurantId].push(rev.rating);
                });

                const ratings = {};
                for (const id in map) {
                    const total = map[id].reduce((a, b) => a + b, 0);
                    ratings[id] = total / map[id].length;
                    counts[id] = map[id].length;
                }

                setRatingsMap(ratings);
                setReviewCounts(counts);
            } catch (err) {
                console.error("Failed to fetch all reviews", err);
            }
        };

        fetchRatings();
    }, []);

    const filteredRestaurants = useMemo(() => {
        let result = [...restaurants];

        if (filter === "mine") {
            result = result.filter((r) => r._ownerId === userId);
        } else if (filter === "others") {
            result = result.filter((r) => r._ownerId !== userId);
        }

        switch (sort) {
            case "name-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "rating-asc":
                result.sort((a, b) => (ratingsMap[a._id] || 0) - (ratingsMap[b._id] || 0));
                break;
            case "rating-desc":
                result.sort((a, b) => (ratingsMap[b._id] || 0) - (ratingsMap[a._id] || 0));
                break;
            case "reviews-desc":
                result.sort((a, b) => (reviewCounts[b._id] || 0) - (reviewCounts[a._id] || 0));
                break;
        }

        return result;
    }, [restaurants, filter, sort, userId, ratingsMap, reviewCounts]);

    const visibleRestaurants = filteredRestaurants.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
    };

    return (
        <section className="min-h-screen bg-[#f8f8f8] px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#E9762B]">Restaurants</h2>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                {[{ label: "All", icon: <FaListUl />, value: "all" },
                { label: "My Restaurants", icon: <FaUtensils />, value: "mine" },
                { label: "Others", icon: <FaUsers />, value: "others" }].map(({ label, icon, value }) => (
                    <button
                        key={value}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm shadow-sm transition font-medium
                            ${filter === value
                                ? "bg-gradient-to-r from-[#E9762B] to-[#f79d4d] text-white"
                                : "border border-[#E9762B] text-[#E9762B] hover:bg-gradient-to-r hover:from-[#E9762B] hover:to-[#f79d4d] hover:text-white"}`}
                        onClick={() => setFilter(value)}
                    >
                        {icon} {label}
                    </button>
                ))}

                <select
                    className="border border-[#E9762B] text-[#E9762B] px-4 py-2 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E9762B]"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                    <option value="rating-desc">Rating High to Low</option>
                    <option value="rating-asc">Rating Low to High</option>
                    <option value="reviews-desc">Most Reviews</option>
                </select>
            </div>

            {/* Guest Prompt */}
            {isGuest && filteredRestaurants.length === 0 && !loading && !error && (
                <div className="text-center mt-10 bg-white border border-orange-200 p-6 rounded-lg shadow-md max-w-xl mx-auto">
                    <h3 className="text-xl font-semibold text-[#E9762B] mb-2">Want to leave reviews or add restaurants?</h3>
                    <p className="text-gray-600 mb-4">
                        Sign up to join our community and share your dining experiences!
                    </p>
                    <Link
                        to="/register"
                        className="inline-block px-6 py-2 bg-gradient-to-r from-[#E9762B] to-[#f79d4d] text-white rounded-lg font-medium hover:scale-105 transition"
                    >
                        Create an Account
                    </Link>
                </div>
            )}

            {/* Content */}
            <div className="max-w-6xl mx-auto">
                {loading && <p className="text-center text-gray-500">Loading...</p>}
                {!loading && filteredRestaurants.length === 0 && !isGuest && (
                    <p className="text-center text-gray-500">There are no restaurants yet.</p>
                )}
                {error && !loading && (
                    <p className="text-center text-red-500">Error loading restaurants.</p>
                )}

                {!loading && !error && filteredRestaurants.length > 0 && (
                    <>
                        <div
                            className="grid gap-6 justify-center"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                            }}
                        >
                            {visibleRestaurants.map((restaurant, index) => (
                                <RestaurantCard
                                    key={restaurant._id || index}
                                    _id={restaurant._id}
                                    name={restaurant.name}
                                    address={restaurant.address || restaurant.location}
                                    images={restaurant.images}
                                    features={restaurant.features}
                                    rating={ratingsMap[restaurant._id]}
                                    reviewCount={reviewCounts[restaurant._id] || 0}
                                />
                            ))}
                        </div>

                        {visibleCount < filteredRestaurants.length && (
                            <div
                                className="flex flex-col items-center mt-10 group cursor-pointer"
                                onClick={handleLoadMore}
                            >
                                <span className="mb-1 text-[#E9762B] font-medium text-lg group-hover:scale-105 transition">
                                    Load more
                                </span>
                                <div className="w-12 h-0.5 bg-[#E9762B] group-hover:w-36 transition-all duration-300"></div>
                            </div>
                        )}
                    </>
                )}
            </div>
            <ScrollToTop />
        </section>
    );
}