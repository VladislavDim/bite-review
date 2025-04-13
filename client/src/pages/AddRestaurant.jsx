import { useState } from "react";
import SubmitButton from "../components/ui/SubmitButton";
import { useCreateRestaurant } from "../api/restaurantApi";
import { useNavigate } from "react-router";
import { useActionState } from "react";

export default function AddRestaurant() {
    const [featuresVisible, setFeaturesVisible] = useState(true);
    const [imageFields, setImageFields] = useState([""]);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);
    const { createRestaurant } = useCreateRestaurant();
    const navigate = useNavigate();

    const toggleFeatures = () => setFeaturesVisible((prev) => !prev);

    const handleImageChange = (index, value) => {
        const updatedFields = [...imageFields];
        updatedFields[index] = value;
        setImageFields(updatedFields);
    };

    const addImageField = () => setImageFields([...imageFields, ""]);

    const createHandler = async (_, formData) => {
        setServerError(null); 
        const values = Object.fromEntries(formData);
        const validImageUrls = imageFields.filter((url) => url.trim().startsWith("http"));

        const newErrors = {};
        if (!values.name?.trim()) newErrors.name = "Name is required.";
        if (!values.location?.trim()) newErrors.location = "Location is required.";
        if (!values.description || values.description.trim().length < 20)
            newErrors.description = "Description must be at least 20 characters.";
        if (validImageUrls.length === 0)
            newErrors.images = "At least one valid image URL is required.";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return { ...values, errors: newErrors };

        const features = formData.getAll("features");
        const restaurantData = {
            name: values.name,
            address: values.location,
            description: values.description,
            images: validImageUrls,
            features,
        };

        try {
            await createRestaurant(restaurantData);
            navigate("/restaurants");
        } catch (err) {

            console.error("Failed to create restaurant", err);

            err?.code === 403
                ? setServerError("Your session has expired. Please log in again.")
                : setServerError("An unexpected error occurred.");

            return { ...values };

        }
    };

    const [formState, submitAction, isPending] = useActionState(createHandler, {
        name: "",
        location: "",
        description: "",
    });

    return (
        <section className="max-w-2xl mx-auto mt-10 mb-20 p-6 bg-white rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Create Your Restaurant</h1>

            <form action={submitAction} className="space-y-6" noValidate>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        name="name"
                        type="text"
                        defaultValue={formState.name}
                        className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        name="location"
                        type="text"
                        defaultValue={formState.location}
                        className={`mt-1 block w-full border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        defaultValue={formState.description}
                        className={`mt-1 block w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                    <button
                        type="button"
                        onClick={toggleFeatures}
                        className="text-sm text-orange-600 font-semibold hover:underline mb-2"
                    >
                        {featuresVisible ? "Hide Features" : "Show Features"}
                    </button>

                    {featuresVisible && (
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-800">
                            {["24h Open", "Outdoor Seating", "Pet Friendly", "Delivery", "Wheelchair Accessible", "Credit Card Payment", "Vegan Options", "Live Music", "Wi-Fi", "Parking", "Smoking Area", "Family Friendly"].map((feat) => (
                                <label key={feat}>
                                    <input type="checkbox" name="features" value={feat} className="mr-2" />
                                    {feat}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs</label>
                    {imageFields.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            value={value}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className={`mb-2 block w-full border ${errors.images && index === 0 ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
                        />
                    ))}
                    {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                    <button
                        type="button"
                        onClick={addImageField}
                        className="text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded"
                    >
                        + Add another image
                    </button>
                </div>

                {serverError && (
                    <p className="text-red-600 text-sm font-medium text-center">
                        {serverError}
                    </p>
                )}

                <SubmitButton disabled={isPending}>
                    {isPending ? "Creating..." : "Create Restaurant"}
                </SubmitButton>
            </form>
        </section>
    );
}