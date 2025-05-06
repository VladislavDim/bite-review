// client/src/components/LogoutRegistrar.jsx
import { useLogout } from "../api/authApi";

const LogoutRegistrar = () => {
    useLogout();
    return null;
};

export default LogoutRegistrar;
