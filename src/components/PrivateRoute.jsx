import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {

    const token = sessionStorage.getItem("access");

    if (!token) {
        return <Navigate to="/" replace />;
    }

  return children;
}