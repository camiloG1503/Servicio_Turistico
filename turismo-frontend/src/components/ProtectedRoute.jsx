import { Navigate } from "react-router-dom"
import { isAuthenticated, isAdmin } from "../api/auth"

const ProtectedRoute = ({ children, adminRoute = false }) => {
  const authenticated = isAuthenticated()
  const admin = isAdmin()

  if (!authenticated) {
    return <Navigate to="/login" />
  }

  if (adminRoute && !admin) {
    return <Navigate to="/dashboard" />
  }

  return children
}

export default ProtectedRoute
