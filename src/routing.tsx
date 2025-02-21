import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <layout />,
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