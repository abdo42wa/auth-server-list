import { Route, Routes } from "react-router-dom";

import { ROUTES } from "../constants";
import { Layout } from "../views/Layout/Layout";
import { Login } from "../views/LoginView/Login";
import { ServerList } from "../views/ServerList/ServerList";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => (
    <Routes>
        <Route index path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
                <Route path={ROUTES.SERVER} element={<ServerList />} />
            </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
);

const NotFound = () => <p>nothing to see here: 404!</p>;