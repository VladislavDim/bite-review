import { useContext, useMemo, useState, useRef } from "react";
import { Link } from "react-router";
import { FaUsers, FaListUl, FaUtensils } from "react-icons/fa";

import { useGetAllRestaurants } from "../api/restaurantApi";
import { UserContext } from "../contexts/UserContext";

import RestaurantCard from "../components/restaurant-card/RestaurantCard";
import ScrollToTop from "../components/ui/ScrollToTop";

import noImage from "../assets/images/no-image-available.png";

export default function Restaurants() {
    const ITEMS_PER_LOAD = 10;

    const { _id: userId } = useContext(UserContext);
    const isGuest = !userId;

    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("name-asc");

    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredImageIndex, setHoveredImageIndex] = useState(0);

    const intervalRef = useRef(null);

    const { restaurants, loading, error } = useGetAllRestaurants();

    // Filter and sort restaurants
    const filteredRestaurants = useMemo(() => {
        let result = [...restaurants];

        if (filter === "mine") {
            result = result.filter((r) => r.owner._id === userId);
        } else if (filter === "others") {
            result = result.filter((r) => r.owner._id !== userId);
        }

        switch (sort) {
            case "name-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "rating-asc":
                result.sort((a, b) => (a.averageRating || 0) - (b.averageRating || 0));
                break;
            case "rating-desc":
                result.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
                break;
            case "reviews-desc":
                result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
                break;
        }

        return result;
    }, [restaurants, filter, sort, userId]);

    const visibleRestaurants = filteredRestaurants.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
    };

    const handleMouseEnter = (restaurant) => {
        setHoveredCard(restaurant._id);
        setHoveredImageIndex(0);

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setHoveredImageIndex((prev) => prev + 1);
        }, 1000);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
        setHoveredImageIndex(0);
        clearInterval(intervalRef.current);
    };

    return (
        <section className="min-h-screen bg-[#f8f8f8] px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#E9762B]">Restaurants</h2>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                {[
                    { label: "All", icon: <FaListUl />, value: "all" },
                    { label: "My Restaurants", icon: <FaUtensils />, value: "mine" },
                    { label: "Others", icon: <FaUsers />, value: "others" },
                ].map(({ label, icon, value }) => (
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

            {/* Guest prompt */}
            {isGuest && filteredRestaurants.length === 0 && !loading && !error && (
                <div className="text-center mt-10 bg-white border border-orange-200 p-6 rounded-lg shadow-md max-w-xl mx-auto">
                    <h3 className="text-xl font-semibold text-[#E9762B] mb-2">
                        Want to leave reviews or add restaurants?
                    </h3>
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

            {/* Restaurant list */}
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
                            {visibleRestaurants.map((restaurant, index) => {
                                const images = restaurant.images || [];
                                const displayImage = images.length > 0
                                    ? images[hoveredCard === restaurant._id ? hoveredImageIndex % images.length : 0]
                                    : noImage;

                                return (
                                    <div
                                        key={restaurant._id || index}
                                        onMouseEnter={() => handleMouseEnter(restaurant)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <RestaurantCard
                                            _id={restaurant._id}
                                            name={restaurant.name}
                                            address={restaurant.address || restaurant.location}
                                            images={[displayImage]}
                                            features={restaurant.features}
                                            rating={restaurant.averageRating}
                                            reviewCount={restaurant.reviewCount}
                                        />
                                    </div>
                                );
                            })}
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
