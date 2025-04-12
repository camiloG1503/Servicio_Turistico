import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, rolRequerido }) => {
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!token || !usuario) {
    return <Navigate to="/login" />;
  }

  if (rolRequerido && usuario.rol !== rolRequerido) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
