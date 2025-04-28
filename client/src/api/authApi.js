import { useCallback, useState } from "react";
import { useContext } from "react";
import request from "../utils/request"
import { UserContext } from "../contexts/UserContext";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/api/auth`;

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
    const register = (username, email, password) =>
        request.post(`${baseUrl}/register`, { username, email, password });

    return {
        register,
    }
};

export const useLogout = () => {
    const { token: accessToken, userLogoutHandler } = useContext(UserContext);
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const logout = useCallback(async () => {
        if (!accessToken) return;

        try {
            await request.post(`${baseUrl}/logout`, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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