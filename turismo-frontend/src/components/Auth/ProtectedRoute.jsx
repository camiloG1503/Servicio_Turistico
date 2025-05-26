import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Componente para proteger rutas basado en roles de usuario
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componente hijo a renderizar si el usuario tiene acceso
 * @param {Array<string>} props.allowedRoles - Roles permitidos para acceder a la ruta
 * @param {string} [props.redirectTo="/"] - Ruta a la que redirigir si no tiene acceso
 * @returns {React.ReactNode} El componente hijo o un Navigate a la ruta de redirección
 */
const ProtectedRoute = ({ children, allowedRoles, redirectTo = "/" }) => {
  const { usuario } = useAuth();

  // Si no hay usuario autenticado, redirigir al login
  if (!usuario) {
    return <Navigate to="/login" />;
  }

  // Si el usuario no tiene un rol permitido, redirigir a la ruta especificada
  if (!allowedRoles.includes(usuario.rol)) {
    return <Navigate to={redirectTo} />;
  }

  // Si el usuario tiene acceso, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;