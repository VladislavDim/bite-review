import { useCallback, useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/api/restaurants`;

export const useCreateRestaurant = () => {
    const { request } = useAuth();

    const createRestaurant = useCallback(async (restaurantData) => {
        return request.post(`${baseUrl}`, restaurantData);
    }, [request]);

    return {
        createRestaurant,
    };
};

export const useUploadImages = () => {
    const { request } = useAuth();

    const uploadImages = useCallback(async (restaurantId, images) => {
        const formData = new FormData();

        images.forEach((file) => {
            formData.append("images", file);
        });

        return request.patch(`${baseUrl}/${restaurantId}/upload-image`, formData);
    }, [request]);

    return {
        uploadImages,
    };
};

export const useUpdateImages = () => {
    const { request } = useAuth();

    const updateImages = useCallback(async (restaurantId, images) => {
        return request.patch(`${baseUrl}/${restaurantId}/update-images`, images);
    }, [request]);

    return {
        updateImages,
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
    const getById = useCallback(async (id) => {
        return request.get(`${baseUrl}/${id}`);
    }, []);

    return {
        getById,
    };
};

export const useUpdateRestaurant = () => {
    const { request } = useAuth();

    const updateRestaurant = useCallback(async (id, updatedData) => {
        return request.put(`${baseUrl}/${id}`, updatedData);
    }, [request]);

    return {
        updateRestaurant,
    };
};

export const useDeleteRestaurant = () => {
    const { request } = useAuth();

    const deleteRestaurant = useCallback(async (id) => {
        return request.delete(`${baseUrl}/${id}`);
    }, [request]);

    return {
        deleteRestaurant,
    };
};
