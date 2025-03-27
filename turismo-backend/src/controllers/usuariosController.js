import db from "../../config/db.js";


// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const [usuarios] = await db.query("SELECT * FROM usuarios"); // <- Usa await
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener usuario por ID
export const getUsuarioById = async (req, res) => {
  try {
    const [usuario] = await db.query("SELECT * FROM usuarios WHERE id = ?", [req.params.id]);
    if (usuario.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    await db.query("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)", [
      nombre, email, password,
    ]);
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario
export const updateUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const [result] = await db.query(
      "UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?",
      [nombre, email, password, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM usuarios WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
