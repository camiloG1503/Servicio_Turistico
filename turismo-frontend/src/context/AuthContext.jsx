import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      checkUserProfile(token)
    } else {
      setLoading(false)
    }
  }, [])

  const checkUserProfile = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.get("http://localhost:5000/api/usuarios/perfil", config)
      setCurrentUser(response.data)
      console.log("Usuario cargado:", response.data)
    } catch (error) {
      console.error("Error al verificar el perfil:", error)
      localStorage.removeItem("token")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await axios.post("http://localhost:5000/api/usuarios/login", {
        email,
        password,
      })
      const { token, usuario } = response.data
      localStorage.setItem("token", token)
      setCurrentUser(usuario)
      return usuario
    } catch (error) {
      setError(error.response?.data?.mensaje || "Error al iniciar sesión")
      throw error
    }
  }

  const register = async (userData) => {
    try {
      setError(null)
      const response = await axios.post("http://localhost:5000/api/usuarios/register", userData)
      const { token, usuario } = response.data
      localStorage.setItem("token", token)
      setCurrentUser(usuario)
      return usuario
    } catch (error) {
      setError(error.response?.data?.mensaje || "Error al registrarse")
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setCurrentUser(null)
  }

  const isAdmin = () => currentUser?.rol === "admin"
  const isGuide = () => currentUser?.rol === "guia"
  const isTourist = () => currentUser?.rol === "turista"

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    isAdmin,
    isGuide,
    isTourist,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
