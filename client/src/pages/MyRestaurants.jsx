import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useDeleteRestaurant, useGetAllRestaurants } from "../api/restaurantApi";

export default function MyRestaurants() {
    const navigate = useNavigate();
    const { _id: userId } = useContext(UserContext);
    const { restaurants, loading, error } = useGetAllRestaurants();
    const { deleteRestaurant } = useDeleteRestaurant();
    const [restaurantList, setRestaurantList] = useState([]);

    useEffect(() => {
        if (restaurants?.length) {
            setRestaurantList(restaurants);
        }
    }, [restaurants]);

    const ownedRestaurants = restaurantList.filter(r => r._ownerId === userId);

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this restaurant?");
        if (!confirm) return;

        try {
            await deleteRestaurant(id);
            setRestaurantList((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            console.error("Failed to delete restaurant:", err);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading your restaurants...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Failed to load restaurants.</p>;


    return (
        <section className="max-w-5xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#E9762B]">My Restaurants</h1>
                <button
                    onClick={() => navigate("/add-restaurant")}
                    className="bg-white text-orange-500 font-semibold px-4 py-2 rounded-lg border border-orange-400 transition-all hover:bg-gradient-to-r hover:from-[#E9762B] hover:to-[#f79d4d] hover:text-white"
                >
                    + Add Restaurant
                </button>
            </div>

            {ownedRestaurants.length === 0 ? (
                <p className="text-gray-600">You haven't added any restaurants yet.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {ownedRestaurants.map((r) => (
                        <div key={r._id} className="bg-white rounded-lg shadow p-4">
                            <img src={r.images?.[0]} alt={r.name} className="w-full h-40 object-cover rounded-md mb-3" />
                            <h2 className="text-lg font-semibold text-[#E9762B] mb-1">{r.name}</h2>
                            <p className="text-sm text-gray-500 mb-3">{r.address || r.location}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/restaurants/${r._id}/details`)}
                                    className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => navigate(`/restaurants/${r._id}/edit`)}
                                    className="text-sm px-3 py-1 rounded bg-white border border-orange-400 text-orange-500 font-medium hover:bg-gradient-to-r hover:from-[#E9762B] hover:to-[#f79d4d] hover:text-white transition-all"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(r._id)}
                                    className="text-sm px-3 py-1 rounded bg-[#f87171] text-white hover:bg-[#ef4444] transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}