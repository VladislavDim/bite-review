import { useContext, useMemo, useState } from "react";
import {
    FaUsers,
    FaListUl,
    FaUtensils,
} from "react-icons/fa";
import { useGetAllRestaurants } from "../api/restaurantApi";
import RestaurantCard from "../components/restaurant-card/RestaurantCard";
import ScrollToTop from "../components/ui/ScrollToTop";
import { UserContext } from "../contexts/UserContext";

export default function Restaurants() {
    const ITEMS_PER_LOAD = 10;
    const { _id: userId } = useContext(UserContext);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("name-asc");

    const { restaurants, loading, error } = useGetAllRestaurants();

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
                result.sort((a, b) => (a.rating || 0) - (b.rating || 0));
                break;
            case "rating-desc":
                result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case "reviews-desc":
                result.sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0));
                break;
        }

        return result;
    }, [restaurants, filter, sort, userId]);

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

            {/* Content */}
            <div className="max-w-6xl mx-auto">
                {loading && <p className="text-center text-gray-500">Loading...</p>}
                {!loading && filteredRestaurants.length === 0 && (
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
                                    rating={restaurant.rating || 0}
                                    images={restaurant.images}
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