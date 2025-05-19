import { useCallback } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/api/users`;

export const useGetUserById = () => {
    const getUser = useCallback(async (userId) => {
        const response = await request.get(`${baseUrl}/${userId}`);
        return response;
    }, []);

    return { getUser };
};


export const useUpdateUserProfile = () => {
    const { request } = useAuth();

    const updateUserProfile = useCallback(async (formData) => {
        return request.patch(`${baseUrl}/me`, formData);
    }, [request]);

    return { updateUserProfile };
};