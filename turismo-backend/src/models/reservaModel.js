import db from "../config/db.js";

class ReservaModel {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT r.*, u.nombre AS usuario, d.nombre AS destino
      FROM reservas r
      JOIN usuarios u ON r.id_usuario = u.id_usuario
      JOIN destinos d ON r.id_destino = d.id_destino
      ORDER BY r.fecha_reserva DESC
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(
      `SELECT * FROM reservas WHERE id_reserva = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(reserva) {
    const [result] = await db.query(
      `INSERT INTO reservas (id_usuario, id_destino, fecha_reserva, estado, cantidad_personas)
       VALUES (?, ?, ?, ?, ?)`,
      [
        reserva.id_usuario,
        reserva.id_destino,
        reserva.fecha_reserva,
        reserva.estado || "pendiente",
        reserva.cantidad_personas
      ]
    );
    return result.insertId;
  }

  static async update(id, reserva) {
    const [result] = await db.query(
      `UPDATE reservas SET id_usuario = ?, id_destino = ?, fecha_reserva = ?, estado = ?, cantidad_personas = ?
       WHERE id_reserva = ?`,
      [
        reserva.id_usuario,
        reserva.id_destino,
        reserva.fecha_reserva,
        reserva.estado,
        reserva.cantidad_personas,
        id
      ]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM reservas WHERE id_reserva = ?", [id]);
    return result;
  }

  static async getByUsuario(id_usuario) {
    const [rows] = await db.query(
      `SELECT r.*, d.nombre AS destino
       FROM reservas r
       JOIN destinos d ON r.id_destino = d.id_destino
       WHERE r.id_usuario = ?
       ORDER BY r.fecha_reserva DESC`,
      [id_usuario]
    );
    return rows;
  }
}

export default ReservaModel;
