"use client"

import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const AdminRoute = () => {
  const { currentUser, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  return currentUser && isAdmin() ? <Outlet /> : <Navigate to="/" />
}

export default AdminRoute
