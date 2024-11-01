import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { getAuthToken } from "../services";
import toast from "react-hot-toast";
import { getStorageItem, removeStorageItem, setStorageItem, StorageKey } from "../utils/storage";

interface ISignInParams {
    username: string;
    password: string;
    onSuccess: () => void;
    onError: () => void;
}

interface IAuthContext {
    authToken: string | null;
    signIn: (params: ISignInParams) => void;
    signOut: (cb: () => void) => void;
}

const AuthContextDefaultValue: IAuthContext = {
    authToken: null,
    signIn: () => null,
    signOut: () => null,
};

const AuthContext = createContext<IAuthContext>(AuthContextDefaultValue);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a provider");
    }
    return context;
};

const useProvideAuth = () => {
    const navigate = useNavigate()
    const authToken = getStorageItem(StorageKey.token)

    const signIn = async ({
        username,
        password,
        onSuccess,
        onError,
    }: ISignInParams) => {
        try {
            const token = await getAuthToken({ username, password });
            setStorageItem(StorageKey.token, token);
            onSuccess();
        } catch (error: any) {
            toast.error("Error while logging in: " + error.message);
            onError();
        }
    };

    const signOut = (cb: () => void) => {
        removeStorageItem(StorageKey.token);
        cb();
    };

    useEffect(() => {
        navigate(!!authToken ? ROUTES.SERVER : ROUTES.LOGIN);
    }, [authToken]);

    return {
        signIn,
        signOut,
        authToken,
    };
};

export const ProvideAuth: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
