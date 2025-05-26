import db from "../config/db.js";

class ResenaModel {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT r.*, u.nombre AS usuario, d.nombre AS destino
      FROM resenas r
      JOIN usuarios u ON r.id_usuario = u.id_usuario
      JOIN destinos d ON r.id_destino = d.id_destino
      ORDER BY r.fecha DESC
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM resenas WHERE id_resena = ?", [id]);
    return rows[0];
  }

  static async create(resena) {
    const [result] = await db.query(
      `INSERT INTO resenas (id_usuario, id_destino, calificacion, comentario)
       VALUES (?, ?, ?, ?)`,
      [resena.id_usuario, resena.id_destino, resena.calificacion, resena.comentario]
    );
    return result.insertId;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM resenas WHERE id_resena = ?", [id]);
    return result;
  }

  static async update(id, resena) {
    const [result] = await db.query(
      `UPDATE resenas SET id_destino = ?, calificacion = ?, comentario = ?
       WHERE id_resena = ?`,
      [resena.id_destino, resena.calificacion, resena.comentario, id]
    );
    return result;
  }
}

export default ResenaModel;
