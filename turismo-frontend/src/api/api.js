const API_URL = "http://localhost:5000"

export const fetchData = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem("token")
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}
