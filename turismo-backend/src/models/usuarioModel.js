import db from "../config/db.js";

class UsuarioModel {
  static async create({ nombre, email, password, rol = "turista" }) {
    try {
      const [result] = await db.execute(
        "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
        [nombre, email, password, rol]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error; // Re-lanzar el error para que sea manejado por el controlador
    }
  }

  static async getAll() {
    try {
      const [rows] = await db.execute("SELECT id_usuario, nombre, email, rol FROM usuarios");
      return rows;
    } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
      throw error; // Re-lanzar el error para que sea manejado por el controlador
    }
  }

  static async getByEmail(email) {
    try {
      const [rows] = await db.execute("SELECT * FROM usuarios WHERE email = ?", [email]);
      return rows[0];
    } catch (error) {
      console.error("Error al buscar usuario por email:", error);
      throw error; // Re-lanzar el error para que sea manejado por el controlador
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.execute("SELECT id_usuario, nombre, email, rol FROM usuarios WHERE id_usuario = ?", [id]);
      return rows[0];
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      throw error; // Re-lanzar el error para que sea manejado por el controlador
    }
  }

  static async update(id, userData) {
    try {
      // Construir la consulta dinámicamente basada en los campos proporcionados
      let fields = [];
      let values = [];

      if (userData.nombre !== undefined) {
        fields.push("nombre = ?");
        values.push(userData.nombre);
      }

      if (userData.email !== undefined) {
        fields.push("email = ?");
        values.push(userData.email);
      }

      if (userData.password !== undefined) {
        fields.push("password = ?");
        values.push(userData.password);
      }

      if (userData.rol !== undefined) {
        fields.push("rol = ?");
        values.push(userData.rol);
      }

      // Si no hay campos para actualizar, retornar
      if (fields.length === 0) {
        return { affectedRows: 0 };
      }

      // Añadir el ID al final de los valores
      values.push(id);

      const query = `UPDATE usuarios SET ${fields.join(", ")} WHERE id_usuario = ?`;

      const [result] = await db.execute(query, values);
      return result;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error; // Re-lanzar el error para que sea manejado por el controlador
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.execute("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
      return result;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error; // Re-lanzar el error para que sea manejado por el controlador
    }
  }
}

export default UsuarioModel;
