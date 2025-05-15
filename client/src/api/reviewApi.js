import { useCallback } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";
const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/api/reviews`;

export const useCreateReview = () => {
    const { request } = useAuth();

    const create = async (reviewData) => {
        return request.post(baseUrl, reviewData);
    };
    return { create };
};

export const useGetReviewsByRestaurantId = () => {
    const getReviewsByRestaurantId = async (restaurantId) => {
        return request.get(`${baseUrl}/${restaurantId}`);
    };
    return { getReviewsByRestaurantId };
};

export const useGetAllReviews = () => {
    const getAll = useCallback(async () => {
        return request.get(`${baseUrl}`);
    }, []);

    return { getAll };
};