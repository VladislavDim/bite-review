import { useContext, useEffect, useState } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";
import useAuth from "../hooks/useAuth";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/api/restaurants`;

export const useCreateRestaurant = () => {
    const { request } = useAuth();

    const createRestaurant = async (restaurantData) => {
        return request.post(`${baseUrl}`, restaurantData);
    };

    return {
        createRestaurant,
    };
};

export const useUploadImages = () => {
    const { request } = useAuth();

    const uploadImages = async (restaurantId, images) => {
        const formData = new FormData();

        images.forEach((file) => {
            formData.append("images", file);
        });

        return request.patch(`${baseUrl}/${restaurantId}/upload-image`, formData);
    };

    return {
        uploadImages,
    };
};

export const useGetAllRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await request.get(`${baseUrl}`);
                setRestaurants(response);
            } catch (err) {
                console.error("Error fetching restaurants:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    return {
        restaurants,
        loading,
        error,
    };
};

export const useGetRestaurantById = () => {
    const getById = async (id) => {
        return request.get(`${baseUrl}/${id}`);
    };

    return {
        getById,
    };
};

export const useUpdateRestaurant = () => {
    const { accessToken } = useContext(UserContext);

    const updateRestaurant = async (id, updatedData) => {
        return request.put(`${baseUrl}/${id}`, updatedData, {
            headers: {
                "X-Authorization": accessToken,
            },
        });
    };

    return {
        updateRestaurant,
    };
};

export const useDeleteRestaurant = () => {
    const { request } = useAuth();

    const deleteRestaurant = async (id) => {
        return request.delete(`${baseUrl}/${id}`);
    };

    return {
        deleteRestaurant,
    };
};
