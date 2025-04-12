import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../TypesIndex";

export default function ProtectedRoutes({ children, allowedRoles }: ProtectedRouteProps) {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

  if (!isAuthenticated() || !auth()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = auth()?.role ?? undefined;

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
