import { useEffect, useState,  useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useGetRestaurantById, useUpdateRestaurant } from "../api/restaurantApi";

export default function EditRestaurant() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getById } = useGetRestaurantById();
    const { updateRestaurant } = useUpdateRestaurant();

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        description: "",
        images: [""],
        features: [],
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const hasFetchedData = useRef(false);

    useEffect(() => {
        if (hasFetchedData.current) return;
        hasFetchedData.current = true;

        async function fetchData() {
            try {
                const data = await getById(id);
                setFormData({
                    name: data.name || "",
                    address: data.address || "",
                    description: data.description || "",
                    images: data.images.length > 0 ? data.images : [""],
                    features: data.features || [],
                });
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch restaurant:", err);
                navigate("/404");
            }
        }

        fetchData();
    }, [getById, id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = (feature) => {
        setFormData((prev) => {
            const exists = prev.features.includes(feature);
            const updated = exists
                ? prev.features.filter((f) => f !== feature)
                : [...prev.features, feature];
            return { ...prev, features: updated };
        });
    };

    const handleImageChange = (index, value) => {
        const updated = [...formData.images];
        updated[index] = value;
        setFormData((prev) => ({ ...prev, images: updated }));
    };

    const addImageField = () => {
        setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));
    };

    const removeImageField = (index) => {
        const updated = [...formData.images];
        updated.splice(index, 1);
        setFormData((prev) => ({ ...prev, images: updated.length ? updated : [""] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.address.trim()) newErrors.address = "Address is required.";
        if (!formData.description.trim() || formData.description.length < 20)
            newErrors.description = "Description must be at least 20 characters.";
        if (!formData.images.some((url) => url.trim().startsWith("http")))
            newErrors.images = "At least one valid image URL is required.";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            await updateRestaurant(id, formData);
            navigate(`/restaurants/${id}/details`);
        } catch (err) {
            console.error("Failed to update restaurant", err);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <section className="max-w-2xl mx-auto mt-10 mb-20 p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Edit Restaurant</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs</label>
                    {formData.images.map((value, index) => (
                        <div key={index} className="flex gap-2 items-center mb-2">
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className={`block w-full border ${errors.images && index === 0 ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                            />
                            <button
                                type="button"
                                onClick={() => removeImageField(index)}
                                className="text-sm text-red-500 hover:underline"
                            >Remove</button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addImageField}
                        className="text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded"
                    >+ Add another image</button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-800">
                        {["24h Open", "Outdoor Seating", "Pet Friendly", "Delivery", "Wheelchair Accessible", "Credit Card Payment", "Vegan Options", "Live Music", "Wi-Fi", "Parking", "Smoking Area", "Family Friendly"].map((feat) => (
                            <label key={feat}>
                                <input
                                    type="checkbox"
                                    name="features"
                                    value={feat}
                                    checked={formData.features.includes(feat)}
                                    onChange={() => handleCheckbox(feat)}
                                    className="mr-2"
                                />
                                {feat}
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 font-semibold bg-white text-orange-500 border border-orange-400 rounded-lg hover:bg-gradient-to-r hover:from-[#E9762B] hover:to-[#f79d4d] hover:text-white transition"
                >
                    Save Changes
                </button>
            </form>
        </section>
    );
}
