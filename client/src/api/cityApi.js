// src/api/cityApi.js
import { useEffect, useState } from "react";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/api/cities`;
export const useGetCities = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(baseUrl)
            .then((res) => res.json())
            .then(setCities)
            .catch((err) => console.error("Failed to fetch cities", err))
            .finally(() => setLoading(false));
    }, []);

    return { cities, loading };
};
