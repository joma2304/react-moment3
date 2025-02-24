import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { ProductProvider } from "./context/ProductContext";
import ProductPage from "./pages/ProductPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: (
                    <ProductProvider>
                        <HomePage />
                    </ProductProvider>
                )
            },
            {
                path: "/products/:id", // Route för enskild
                element: (
                    <ProductProvider>
                        <ProductPage />
                    </ProductProvider>
                )
            },
            {
                path: "/admin",
                element: (
                    <ProductProvider>
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                    </ProductProvider>
                )
            },
            {
                path: "/login",
                element: <LoginPage />
            },
        ]
    }
])

export default router