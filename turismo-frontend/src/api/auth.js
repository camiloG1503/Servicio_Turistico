import { fetchData } from "./api"

export const login = async (credentials) => {
  return await fetchData("/usuarios/login", { // Cambiado a /usuarios/login
    method: "POST",
    body: JSON.stringify(credentials),
  })
}

export const register = async (userData) => {
  return await fetchData("/usuarios/register", { // Cambiado a /usuarios/register
    method: "POST",
    body: JSON.stringify(userData),
  })
}

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user")
  return userStr ? JSON.parse(userStr) : null
}

export const isAuthenticated = () => {
  return !!localStorage.getItem("token")
}

export const isAdmin = () => {
  const user = getCurrentUser()
  return user && user.role === "admin"
}