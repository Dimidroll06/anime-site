import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, getLoading } from "../features/auth/authSlice";
import LoadingSpinner from "./LodaingSpinner";

const ProtectedRoute = ({ children, requireAuth }) => {
    const navigate = useNavigate();

    const isLoading = useSelector(getLoading);
    const isAuth = useSelector(getAuth);
    
    if (isLoading) return <LoadingSpinner />;
    if (!isAuth && requireAuth) {
        navigate('/login');
    }
    if (isAuth && !requireAuth) {
        navigate('/');
    }

    return <>{children}</>;
};

export default ProtectedRoute;