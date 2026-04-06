import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "@/app/providers/UserProvider";

interface ProtectedRouteProps {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, loading } = useCurrentUser();

  if (loading) return;

  if (!currentUser) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
