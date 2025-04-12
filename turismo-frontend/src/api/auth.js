const API_URL = "http://localhost:5000/api/auth";

export const login = async (email, contrasena) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contrasena }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Error en login");
  return data;
};
