import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import {
    useGetRestaurantById,
    useUpdateRestaurant,
    useUploadImages,
    useUpdateImages,
} from "../api/restaurantApi";
import {
    ALLOWED_IMAGE_TYPES,
    MAX_IMAGE_SIZE_BYTES,
    MAX_IMAGE_SIZE_MB,
} from "../utils/image.validation";

const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

export default function EditRestaurant() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { getById } = useGetRestaurantById();
    const { updateRestaurant } = useUpdateRestaurant();
    const { uploadImages } = useUploadImages();
    const { updateImages } = useUpdateImages();

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        description: "",
        features: [],
    });

    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]); // Each { file, previewUrl }
    const [serverError, setServerError] = useState(null);
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
                    location: data.location || "",
                    description: data.description || "",
                    features: data.features || [],
                });
                setExistingImages(data.images || []);
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
            const updated = prev.features.includes(feature)
                ? prev.features.filter((f) => f !== feature)
                : [...prev.features, feature];
            return { ...prev, features: updated };
        });
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const newValidImages = [];
        let localError = "";

        selectedFiles.forEach((file) => {
            if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
                localError = "Only image files are allowed (.jpg, .jpeg, .png, .webp)";
            } else if (file.size > MAX_IMAGE_SIZE_BYTES) {
                localError = `Each file must be smaller than ${MAX_IMAGE_SIZE_MB}MB`;
            } else {
                const alreadyExists = newImages.find(
                    (imgObj) => imgObj.file.name === file.name && imgObj.file.size === file.size
                );
                if (!alreadyExists) {
                    newValidImages.push({
                        file,
                        previewUrl: URL.createObjectURL(file),
                    });
                }
            }
        });

        if (localError) {
            setServerError(localError);
        } else {
            setNewImages((prev) => [...prev, ...newValidImages]);
            setServerError(null);
        }

        e.target.value = null;
    };

    const removeExistingImage = (indexToRemove) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== indexToRemove));
    };

    const removeNewImage = (indexToRemove) => {
        // Clean up blob URL
        URL.revokeObjectURL(newImages[indexToRemove].previewUrl);
        setNewImages((prev) => prev.filter((_, i) => i !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError(null);

        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.location.trim()) newErrors.location = "Location is required.";
        if (!formData.description.trim() || formData.description.length < 20)
            newErrors.description = "Description must be at least 20 characters.";
        if (existingImages.length === 0 && newImages.length === 0)
            newErrors.images = "At least one image is required.";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            await updateRestaurant(id, formData);
            await updateImages(id, existingImages);

            if (newImages.length > 0) {
                const filesOnly = newImages.map((imgObj) => imgObj.file);
                await uploadImages(id, filesOnly);
            }

            navigate(`/restaurants/${id}/details`);
        } catch (err) {
            console.error("Failed to update restaurant", err);
            setServerError(err.message || "Something went wrong. Please try again.");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <section className="max-w-2xl mx-auto mt-10 mb-20 p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Edit Restaurant</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg p-2`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.location ? "border-red-500" : "border-gray-300"} rounded-lg p-2`}
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-lg p-2`}
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Upload images */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
                    <label className="inline-block px-4 py-2 outline outline-2 outline-transparent text-white font-medium rounded cursor-pointer transition bg-gradient-to-r from-[#E9762B] to-[#f79d4d] hover:from-white hover:to-white hover:text-orange-500 hover:outline-orange-400">
                        Select Images
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* Image previews */}
                <div className="flex flex-wrap gap-4 mt-4">
                    {existingImages.map((img, index) => (
                        <div key={index} className="relative w-24 h-24 rounded overflow-hidden border border-orange-400 bg-gradient-to-r from-orange-300 to-orange-200 group">
                            <img src={img} alt="existing" className="w-full h-full object-cover transition-opacity group-hover:opacity-60" />
                            <button
                                type="button"
                                onClick={() => removeExistingImage(index)}
                                className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded bg-white text-red-500 border border-red-500 text-sm font-bold hover:bg-red-500 hover:text-white group-hover:bg-red-100"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    {newImages.map((imgObj, index) => (
                        <div key={index} className="relative w-24 h-24 rounded overflow-hidden border border-orange-400 bg-gradient-to-r from-orange-300 to-orange-200 group">
                            <img src={imgObj.previewUrl} alt="new" className="w-full h-full object-cover transition-opacity group-hover:opacity-60" />
                            <button
                                type="button"
                                onClick={() => removeNewImage(index)}
                                className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded bg-white text-red-500 border border-red-500 text-sm font-bold hover:bg-red-500 hover:text-white group-hover:bg-red-100"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                {serverError && <p className="text-red-500 text-sm mt-1">{serverError}</p>}

                {/* Features */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-800">
                        {[
                            "24h Open", "Outdoor Seating", "Pet Friendly", "Delivery",
                            "Wheelchair Accessible", "Credit Card Payment", "Vegan Options", "Live Music",
                            "Wi-Fi", "Parking", "Smoking Area", "Family Friendly"
                        ].map((feat) => (
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
