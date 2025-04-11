import { useContext, useEffect, useState } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/restaurants`;

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

};
