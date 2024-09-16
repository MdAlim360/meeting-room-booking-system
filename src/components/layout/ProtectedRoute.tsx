import { ReactNode } from "react";
import { logout } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { JwtPayload } from "jwt-decode";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector((state) => state.auth.token);

  let user: CustomJwtPayload | null = null;

  if (token) {
    user = verifyToken(token) as CustomJwtPayload;
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
