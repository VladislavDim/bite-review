import { useState } from "react";
import { useGetAllRestaurants } from "../api/restaurantApi";
import RestaurantCard from "../components/restaurant-card/RestaurantCard";
import ScrollToTop from "../components/ui/ScrollToTop";

export default function Restaurants() {
    const ITEMS_PER_LOAD = 10;
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

    const { restaurants, loading, error } = useGetAllRestaurants();
    const visibleRestaurants = restaurants.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
    };

    return (
        <section className="min-h-screen bg-[#f8f8f8] px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#E9762B]">Restaurants</h2>

            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {error && <p className="text-center text-red-500">Failed to load restaurants.</p>}

            {!loading && !error && (
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

                    {visibleCount < restaurants.length && (
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
            <ScrollToTop />
        </section>
    );
}
