import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import SubmitButton from "../components/ui/SubmitButton";
import { useCreateRestaurant, useUploadImages } from "../api/restaurantApi";
import { useGetCities } from "../api/cityApi";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE_BYTES, MAX_IMAGE_SIZE_MB } from "../utils/image.validation";

export default function AddRestaurant() {
    const [images, setImages] = useState([]);
    const [serverError, setServerError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createRestaurant } = useCreateRestaurant();
    const { uploadImages } = useUploadImages();
    const { cities, loading } = useGetCities();
    const navigate = useNavigate();

    // Handle file input and validate each file
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
                const alreadyExists = images.find(
                    (img) => img.name === file.name && img.size === file.size
                );
                if (!alreadyExists) newValidImages.push(file);
            }
        });

        if (localError) {
            setServerError(localError);
        } else {
            setImages((prev) => [...prev, ...newValidImages]);
            setServerError(null);
        }

        e.target.value = null;
    };

    const removeImage = (indexToRemove) => {
        setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
    };

    // Submit form data and upload images
    const onSubmit = async (data) => {
        setServerError(null);

        if (images.length === 0) {
            setServerError("At least one image is required.");
            return;
        }

        try {
            const created = await createRestaurant(data);
            const restaurantId = created._id;

            await uploadImages(restaurantId, images);

            navigate("/restaurants");
        } catch (err) {
            console.error("Failed to create restaurant or upload images", err);
            setServerError(err.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <section className="max-w-2xl mx-auto mt-10 mb-20 p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
                Create Your Restaurant
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-2 focus:border-orange-400 focus:ring-0 focus:outline-none"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        {...register("location", { required: "Location is required" })}
                        type="text"
                        className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-2 focus:border-orange-400 focus:ring-0 focus:outline-none"
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm">{errors.location.message}</p>
                    )}
                </div>

                {/* City */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <select
                        {...register("city", { required: "City is required" })}
                        className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-2 focus:border-orange-400 focus:ring-0 focus:outline-none"
                        defaultValue=""
                        disabled={loading}
                    >
                        <option value="" disabled>Select a city</option>
                        {cities.map((city) => (
                            <option key={city._id} value={city._id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                    {errors.city && (
                        <p className="text-red-500 text-sm">{errors.city.message}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        {...register("description", {
                            required: "Description is required",
                            minLength: {
                                value: 10,
                                message: "Description must be at least 10 characters",
                            },
                        })}
                        rows="4"
                        className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-2 focus:border-orange-400 focus:ring-0 focus:outline-none"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                </div>

                {/* Features */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-800">
                        {[
                            "24h Open", "Outdoor Seating", "Pet Friendly", "Delivery",
                            "Wheelchair Accessible", "Credit Card Payment", "Vegan Options",
                            "Live Music", "Wi-Fi", "Parking", "Smoking Area", "Family Friendly"
                        ].map((feat) => (
                            <label
                                key={feat}
                                className="flex items-center gap-2 px-2 py-1 border border-transparent rounded hover:border-orange-400 hover:bg-orange-100"
                            >
                                <input
                                    type="checkbox"
                                    value={feat}
                                    {...register("features")}
                                    className="accent-orange-500"
                                />
                                {feat}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Upload Images */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Images
                    </label>
                    <label className="inline-block px-4 py-2 outline outline-2 outline-transparent 
                                      text-white font-medium rounded cursor-pointer transition 
                                      bg-gradient-to-r from-[#E9762B] to-[#f79d4d] 
                                      hover:from-white hover:to-white hover:text-orange-500 hover:outline-orange-400"
                    >
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

                {/* Image Preview */}
                {images.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-4">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className="relative w-24 h-24 rounded overflow-hidden border border-orange-400 bg-gradient-to-r from-orange-300 to-orange-200 group transition-all"
                            >
                                <img
                                    src={URL.createObjectURL(img)}
                                    alt="preview"
                                    className="w-full h-full object-cover transition-opacity group-hover:opacity-60"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded bg-white text-red-500 border border-red-500 text-sm font-bold hover:bg-red-500 hover:text-white group-hover:bg-red-100"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Server Error */}
                {serverError && (
                    <p className="text-red-500 text-sm mt-1">{serverError}</p>
                )}

                {/* Submit Button */}
                <SubmitButton>Create Restaurant</SubmitButton>
            </form>
        </section>
    );
}
