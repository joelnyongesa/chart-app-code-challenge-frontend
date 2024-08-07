import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Register from "../components/Register";
import Products from "../components/Products";
import Charts from "../components/Charts";

const Routes = () => {
    const { token } = useAuth();

    // Routes accessible to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/",
                    element: <div>User Home Page</div>,
                },
                {
                    path: "/products",
                    element: <Products />
                },
                // {
                //     path: "/logout",
                //     element: <Logout />
                // },
                {
                    path: "/charts",
                    element: <Charts />
                }
            ],
        },
    ];

    // Routes accessible to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        }
    ];

    // Combining and including the routes based on authenticated status
    const router = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;