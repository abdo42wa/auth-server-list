import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "../constants";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute = () => {
    const { authToken } = useAuth();

    return authToken ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};