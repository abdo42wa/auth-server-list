import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../constants";

export const Header = () => {
    const { signOut } = useAuth();

    const navigate = useNavigate();

    const logout = () =>
        signOut(() => {
            navigate(ROUTES.LOGIN);
        });
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#4763E4]">NordVPN</h1>
            <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
                Logout
            </button>
        </div>
    )
}
