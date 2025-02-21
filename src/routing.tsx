import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";


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
                element: <AdminPage />
            },
            {
                path:"/login",
                element: <LoginPage />
            },
        ]
    }
])

export default router