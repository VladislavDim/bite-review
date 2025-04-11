import request from "../utils/request";
const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/reviews`;

export const useCreateReview = () => {
    const create = async (reviewData, token) => {
        return request.post(baseUrl, reviewData, {
            headers: { "X-Authorization": token },
        });
    };
    return { create };
};

export const useGetReviewsByRestaurantId = () => {
    const getAll = async (restaurantId) => {
        const query = encodeURIComponent(`restaurantId="${restaurantId}"`);
        return request.get(`${baseUrl}?where=${query}`);
    };
    return { getAll };
};

export const useGetAllReviews = () => {
    const getAll = async () => {
        return request.get(`${baseUrl}`);
    };
    return { getAll };
};
