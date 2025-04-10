import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useLogout } from "../api/authApi";

export default function Logout() {
  const { logout, isLoggedOut } = useLogout();
  const [showRedirect, setShowRedirect] = useState(false);

  useEffect(() => {
    logout().then(() => {
      setTimeout(() => setShowRedirect(true), 300);
    });
  }, [logout]);

  if (showRedirect && isLoggedOut) return <Navigate to="/" />;

  return (
    <div className="fixed inset-0 bg-white/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center text-gray-600">
        <div className="w-10 h-10 border-4 border-[#E9762B] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-base font-medium">Logging out...</p>
      </div>
    </div>
  );
}
