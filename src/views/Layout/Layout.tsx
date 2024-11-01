import { Outlet } from "react-router-dom"
import { Header } from "./Header"

export const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}
