import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export const ProtectedRoute = () => {
    const { token } = useAuth();

    // Checking if the user is authenticated
    if(!token){
        // Redirect to the log in page
        return <Navigate to="/login" />
    }

    // If authenticated, render the child routes
    return <Outlet />
}