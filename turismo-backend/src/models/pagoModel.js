import db from "../config/db.js";

class PagoModel {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT p.*, r.id_usuario, r.id_destino, d.nombre as destino, u.nombre as usuario
      FROM pagos p
      JOIN reservas r ON p.id_reserva = r.id_reserva
      JOIN destinos d ON r.id_destino = d.id_destino
      JOIN usuarios u ON r.id_usuario = u.id_usuario
    `);
    return rows;
  }

  static async getByUserId(userId) {
    const [rows] = await db.query(`
      SELECT p.*, r.id_usuario, r.id_destino, d.nombre as destino, u.nombre as usuario
      FROM pagos p
      JOIN reservas r ON p.id_reserva = r.id_reserva
      JOIN destinos d ON r.id_destino = d.id_destino
      JOIN usuarios u ON r.id_usuario = u.id_usuario
      WHERE r.id_usuario = ?
    `, [userId]);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM pagos WHERE id_pago = ?", [id]);
    return rows[0];
  }

  static async create(pago) {
    const [result] = await db.query(
      `INSERT INTO pagos (id_reserva, monto, metodo_pago, estado_pago)
       VALUES (?, ?, ?, ?)`,
      [pago.id_reserva, pago.monto, pago.metodo_pago, pago.estado_pago || "pendiente"]
    );
    return result.insertId;
  }

  static async update(id, pago) {
    const [result] = await db.query(
      `UPDATE pagos SET monto = ?, metodo_pago = ?, estado_pago = ? WHERE id_pago = ?`,
      [pago.monto, pago.metodo_pago, pago.estado_pago, id]
    );
    return result;
  }
}

export default PagoModel;
