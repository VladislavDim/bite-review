import { useContext, useEffect, useState } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/api/restaurants`;

export const useCreateRestaurant = () => {
    const { accessToken } = useContext(UserContext);

    const createRestaurant = async (restaurantData) => {
        return request.post(`${baseUrl}`, restaurantData, {
            headers: {
                "X-Authorization": accessToken,
            },
        });
    };

    return {
        createRestaurant,
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
    const { accessToken } = useContext(UserContext);

    const deleteRestaurant = async (id) => {
        return request.delete(`${baseUrl}/${id}`, null, {
            headers: {
                "X-Authorization": accessToken,
            },
        });
    };

    return {
        deleteRestaurant,
    };
};
