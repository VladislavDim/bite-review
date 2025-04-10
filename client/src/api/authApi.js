import { useCallback, useState } from "react";
import { useContext } from "react";
import request from "../utils/request"
import { UserContext } from "../contexts/UserContext";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/users`;

export const useLogin = () => {
    const login = async (email, password) =>
        request.post(
            `${baseUrl}/login`,
            { email, password },
        );

    return {
        login,
    }
};

export const useRegister = () => {
    const register = (name, email, password) =>
        request.post(`${baseUrl}/register`, { name, email, password });

    return {
        register,
    }
};

export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext);
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const logout = useCallback(async () => {
        if (!accessToken) return;

        try {
            await request.get(`${baseUrl}/logout`, null, {
                headers: {
                    'X-Authorization': accessToken,
                },
            });
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            userLogoutHandler();
            setIsLoggedOut(true);
        }
    }, [accessToken, userLogoutHandler]);

    return {
        logout,
        isLoggedOut,
    };
};