import db from "../config/db.js";

class UsuarioModel {
  static async create({ nombre, email, password, rol = "turista" }) {
    const [result] = await db.execute(
      "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, password, rol]
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await db.execute("SELECT id_usuario, nombre, email, rol FROM usuarios");
    return rows;
  }

  static async getByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE email = ?", [email]);
    return rows[0];
  }

  static async getById(id) {
    const [rows] = await db.execute("SELECT id_usuario, nombre, email, rol FROM usuarios WHERE id_usuario = ?", [id]);
    return rows[0];
  }

  static async update(id, { nombre, email, password, rol }) {
    const [result] = await db.execute(
      "UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol = ? WHERE id_usuario = ?",
      [nombre, email, password, rol, id]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await db.execute("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
    return result;
  }
}

export default UsuarioModel;
