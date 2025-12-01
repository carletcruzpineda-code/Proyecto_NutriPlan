
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function PrivateRoute({ children }) {
  const { user, cargando } = useContext(AuthContext);

  if (cargando) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
