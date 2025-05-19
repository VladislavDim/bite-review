import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../contexts/UserContext";
import { useGetUserById, useUpdateUserProfile } from "../api/userApi";
import { FaSave, FaArrowLeft, FaUpload } from "react-icons/fa";
import {
    ALLOWED_AVATAR_IMAGE_TYPES,
    MAX_AVATAR_IMAGE_SIZE_BYTES,
    MAX_AVATAR_IMAGE_WIDTH,
    MAX_AVATAR_IMAGE_HEIGHT,
    MIN_AVATAR_IMAGE_WIDTH,
    MIN_AVATAR_IMAGE_HEIGHT
}
    from "../utils/image.validation";

const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

export default function EditProfile() {
    const navigate = useNavigate();
    const { _id: userId } = useUserContext();
    const { getUser } = useGetUserById();
    const { updateUserProfile } = useUpdateUserProfile();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        avatar: null,
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [initialData, setInitialData] = useState({});
    const [errors, setErrors] = useState({});
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser(userId);
                setFormData((prev) => ({
                    ...prev,
                    username: user.username || "",
                    email: user.email || "",
                }));
                setInitialData({
                    username: user.username || "",
                    email: user.email || "",
                });
                setPreviewAvatar(user.avatar ? `${baseUrl}${user.avatar}` : null);
            } catch (err) {
                console.error("Failed to load user:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [getUser, userId]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];

            const validationErrors = {};
            if (!ALLOWED_AVATAR_IMAGE_TYPES.includes(file.type)) {
                validationErrors.avatar = "Unsupported file type.";
            } else if (file.size > MAX_AVATAR_IMAGE_SIZE_BYTES) {
                validationErrors.avatar = "Image exceeds maximum size of 1MB.";
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    if (
                        img.width > MAX_AVATAR_IMAGE_WIDTH ||
                        img.height > MAX_AVATAR_IMAGE_HEIGHT
                    ) {
                        validationErrors.avatar = `Image resolution exceeds ${MAX_AVATAR_IMAGE_WIDTH}x${MAX_AVATAR_IMAGE_HEIGHT}px.`;
                    } else if (
                        img.width < MIN_AVATAR_IMAGE_WIDTH ||
                        img.height < MIN_AVATAR_IMAGE_HEIGHT
                    ) {
                        validationErrors.avatar = `Image resolution is below minimum of ${MIN_AVATAR_IMAGE_WIDTH}x${MIN_AVATAR_IMAGE_HEIGHT}px.`;
                    }

                    if (Object.keys(validationErrors).length > 0) {
                        setErrors((prev) => ({ ...prev, ...validationErrors }));
                        return;
                    }

                    setFormData((prev) => ({ ...prev, [name]: file }));
                    setPreviewAvatar(event.target.result);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!formData.username.trim()) validationErrors.username = "Username is required.";
        if (!formData.email.trim()) validationErrors.email = "Email is required.";

        if (formData.newPassword && !formData.oldPassword) {
            validationErrors.oldPassword = "Current password is required to change it.";
        }

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            validationErrors.confirmPassword = "New passwords do not match.";
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            const formToSend = new FormData();

            if (formData.username !== initialData.username) {
                formToSend.append("username", formData.username);
            }

            if (formData.email !== initialData.email) {
                formToSend.append("email", formData.email);
            }

            if (formData.oldPassword && formData.newPassword && formData.newPassword === formData.confirmPassword) {
                formToSend.append("oldPassword", formData.oldPassword);
                formToSend.append("newPassword", formData.newPassword);
            }

            if (formData.avatar) {
                formToSend.append("avatar", formData.avatar);
            }

            await updateUserProfile(formToSend);
            navigate("/profile");
        } catch (err) {
            console.error("Failed to update profile:", err);
        }
    };

    if (loading) return <p className="text-center py-10 text-gray-500">Loading profile...</p>;

    return (
        <section className="max-w-xl mx-auto px-4 py-10">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#E9762B]">Edit Profile</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#E9762B]"
                >
                    <FaArrowLeft /> Back
                </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6" noValidate>
                <div className="flex items-center gap-4">
                    {previewAvatar ? (
                        <img
                            src={previewAvatar}
                            alt="Avatar Preview"
                            className="w-24 h-24 object-cover rounded-full shadow"
                        />
                    ) : (
                        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-orange-100 text-[#E9762B] text-3xl font-bold">
                            {formData.username[0]?.toUpperCase() || "?"}
                        </div>
                    )}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="avatar" className="text-sm font-medium text-gray-600">Upload Avatar</label>
                        <label
                            htmlFor="avatar"
                            className="cursor-pointer px-2 py-1 text-xs border border-[#E9762B] text-[#E9762B] rounded font-medium hover:bg-gradient-to-r hover:from-[#E9762B] hover:to-[#f79d4d] hover:text-white transition flex items-center gap-1 max-w-[120px]"
                        >

                            <FaUpload className="text-sm" /> Choose File
                        </label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                        />
                        {errors.avatar && <p className="text-sm text-red-500 mt-1">{errors.avatar}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-1 ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-400'}`}
                    />
                    {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-1 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-400'}`}
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-1 ${errors.oldPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-400'}`}
                        placeholder="Required to update password"
                    />
                    {errors.oldPassword && <p className="text-sm text-red-500 mt-1">{errors.oldPassword}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-orange-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full border px-4 py-2 rounded focus:outline-none focus:ring-1 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-400'}`}
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2 bg-white text-[#E9762B] border-2 border-[#E9762B] font-medium rounded-lg hover:bg-gradient-to-r hover:from-[#E9762B] hover:to-[#f79d4d] hover:text-white transition-all"
                >
                    <FaSave /> Save Changes
                </button>
            </form>
        </section>
    );
}