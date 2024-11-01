import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ROUTES } from "../constants";

export const ProtectedRoute = () => {
    const { authToken } = useAuth();

    return !!authToken ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};