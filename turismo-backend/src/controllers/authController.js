import db from "../../config/db.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos" });
  }

  try {
    // Buscar usuario en la base de datos
    const query = "SELECT * FROM usuarios WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error en el servidor" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }

      const user = results[0];

      // Verificar contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      // Verificar si el usuario es admin
      if (user.rol !== "admin") {
        return res.status(403).json({ message: "Acceso denegado. No eres administrador" });
      }

      // Devolver información del usuario
      res.status(200).json({
        user: {
          id: user.id_usuario,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};