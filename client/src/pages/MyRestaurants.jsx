import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useDeleteRestaurant, useGetAllRestaurants } from "../api/restaurantApi";

const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

export default function MyRestaurants() {
    const navigate = useNavigate();
    const { _id: userId } = useContext(UserContext);
    const { restaurants, loading, error } = useGetAllRestaurants();
    const { deleteRestaurant } = useDeleteRestaurant();

    const [restaurantList, setRestaurantList] = useState([]);
    const [confirmingId, setConfirmingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [showDeletedMessageId, setShowDeletedMessageId] = useState(null);

    useEffect(() => {
        if (restaurants?.length) {
            setRestaurantList(restaurants);
        }
    }, [restaurants]);

    const ownedRestaurants = restaurantList.filter(r => r.owner._id === userId);

    const handleDelete = async (id) => {
        setConfirmingId(null);
        setShowDeletedMessageId(id);

        setTimeout(() => {
            setDeletingId(id);
        }, 2000);

        setTimeout(async () => {
            try {
                await deleteRestaurant(id);
                setRestaurantList((prev) => prev.filter((r) => r._id !== id));
            } catch (err) {
                console.error("Failed to delete restaurant:", err);
            } finally {
                setDeletingId(null);
                setShowDeletedMessageId(null);
            }
        }, 3000);
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
                        <div
                            key={r._id}
                            className={`relative bg-white rounded-lg shadow p-4 transition-all duration-700 ${deletingId === r._id ? "bg-red-100 blur-sm scale-95 opacity-50" : ""
                                }`}
                        >

                            {showDeletedMessageId === r._id && (
                                <div className="absolute inset-0 flex items-center justify-center text-red-600 font-semibold text-lg bg-white/70 backdrop-blur-sm z-10">
                                    Deleted successfully
                                </div>
                            )}


                            {confirmingId === r._id && (
                                <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center text-center rounded-lg">
                                    <p className="text-lg font-semibold text-red-600 mb-4">Are you sure you want to delete this restaurant?</p>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleDelete(r._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => setConfirmingId(null)}
                                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            <img
                                src={
                                    r.images.length > 0
                                        ? `${baseUrl}${r.images?.[0]}`
                                        : `${baseUrl}/public/no-image-available.png`
                                }
                                alt={r.name}
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />
                            <h2 className="text-lg font-semibold text-[#E9762B] mb-1">{r.name}</h2>
                            <p className="text-sm text-gray-500 mb-3 min-h-[3rem]">{r.address || r.location}</p>
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
                                    onClick={() => setConfirmingId(r._id)}
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
