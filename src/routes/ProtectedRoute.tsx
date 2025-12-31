import { ReactNode } from "react";
import { useAppSelector } from "../hooks/hook";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const authUser = useAppSelector((state) => state.auth.user);

    if (!authUser) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
