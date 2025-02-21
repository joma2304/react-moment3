import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path:"/",
                element: <HomePage />
            },
            {
                path:"/admin",
                element: (
                    <ProtectedRoute>
                    <AdminPage />
                    </ProtectedRoute>
                )
            },
            {
                path:"/login",
                element: <LoginPage />
            },
        ]
    }
])

export default router