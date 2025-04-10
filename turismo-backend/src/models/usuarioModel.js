import db from "../config/db.js";

class UsuarioModel {
  // Obtener todos los usuarios
  static async getAll() {
    try {
      const [rows] = await db.query("SELECT id_usuario, nombre, email, password, rol FROM usuarios");
      return rows;
    } catch (error) {
      throw new Error("Error al obtener los usuarios: " + error.message);
    }
  }

  // Obtener un usuario por ID
  static async getById(id) {
    try {
      const [rows] = await db.query("SELECT id_usuario, nombre, email, password, rol FROM usuarios WHERE id_usuario = ?", [id]);
      return rows[0]; // Devuelve solo el primer resultado
    } catch (error) {
      throw new Error("Error al obtener el usuario: " + error.message);
    }
  }

  // Crear un nuevo usuario
  static async create({ nombre, email, password, rol }) {
    try {
      const [result] = await db.query(
        "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
        [nombre, email, password, rol]
      );
      return result.insertId; // Devuelve el ID del nuevo usuario
    } catch (error) {
      throw new Error("Error al crear el usuario: " + error.message);
    }
  }

  // Actualizar un usuario por ID
  static async update(id, { nombre, email, password, rol }) {
    try {
      const [result] = await db.query(
        "UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol = ? WHERE id_usuario = ?",
        [nombre, email, password, rol, id]
      );
      return result.affectedRows; // Devuelve el número de filas afectadas
    } catch (error) {
      throw new Error("Error al actualizar el usuario: " + error.message);
    }
  }

  // Eliminar un usuario por ID
  static async delete(id) {
    try {
      const [result] = await db.query("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
      return result.affectedRows; // Devuelve el número de filas afectadas
    } catch (error) {
      throw new Error("Error al eliminar el usuario: " + error.message);
    }
  }
}

export default UsuarioModel;