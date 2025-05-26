import db from "../config/db.js";

class GuiaModel {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT g.id_guia, u.nombre AS nombre_usuario, u.email, g.experiencia, g.idiomas, g.imagen, g.calificacion_promedio
      FROM guias g
      LEFT JOIN usuarios u ON g.id_usuario = u.id_usuario
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(
      `SELECT * FROM guias WHERE id_guia = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(guia) {
    const [result] = await db.query(
      `INSERT INTO guias (id_usuario, experiencia, idiomas, imagen, calificacion_promedio)
       VALUES (?, ?, ?, ?, ?)`,
      [
        guia.id_usuario,
        guia.experiencia,
        guia.idiomas,
        guia.imagen,
        guia.calificacion_promedio || 0
      ]
    );
    return result.insertId;
  }

  static async delete(id) {
    const [result] = await db.query(
      `DELETE FROM guias WHERE id_guia = ?`,
      [id]
    );
    return result.affectedRows;
  }

  static async getUsuariosConReservas() {
    const [rows] = await db.query(`
      SELECT r.id_reserva, u.nombre AS turista, u.email, r.fecha_reserva, r.estado, r.cantidad_personas
      FROM reservas r
      LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
      ORDER BY r.fecha_reserva DESC
    `);
    return rows;
  }
}

export default GuiaModel;
