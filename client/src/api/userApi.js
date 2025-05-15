import { useCallback } from "react";
import request from "../utils/request";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/api/users`;

export const useGetUserById = () => {
    const getUser = useCallback(async (userId) => {
        const response = await request.get(`${baseUrl}/${userId}`);
        return response;
    }, []);

    return { getUser };
};
