import db from "../config/db.js";

// Función de utilidad para ejecutar consultas con reintentos
const executeQueryWithRetry = async (queryFn, maxRetries = 3) => {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await queryFn();
    } catch (error) {
      lastError = error;

      // Si es un error de conexión, esperar antes de reintentar
      if (
        error.code === 'ECONNRESET' || 
        error.code === 'PROTOCOL_CONNECTION_LOST' ||
        error.message.includes('Connection closed') ||
        error.message.includes('connection is in closed state')
      ) {
        console.log(`Intento ${attempt} fallido. Reintentando en ${attempt * 1000}ms...`);
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
        continue;
      }

      // Si no es un error de conexión, lanzar el error inmediatamente
      throw error;
    }
  }

  // Si llegamos aquí, todos los intentos fallaron
  throw lastError;
};

class ReservaModel {
  static async getAll() {
    return executeQueryWithRetry(async () => {
      const [rows] = await db.query(`
        SELECT r.*, u.nombre AS usuario, d.nombre AS destino
        FROM reservas r
        JOIN usuarios u ON r.id_usuario = u.id_usuario
        JOIN destinos d ON r.id_destino = d.id_destino
        ORDER BY r.fecha_reserva DESC
      `);
      return rows;
    });
  }

  static async getById(id) {
    return executeQueryWithRetry(async () => {
      const [rows] = await db.query(
        `SELECT * FROM reservas WHERE id_reserva = ?`,
        [id]
      );
      return rows[0];
    });
  }

  static async create(reserva) {
    return executeQueryWithRetry(async () => {
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
    });
  }

  static async update(id, reserva) {
    return executeQueryWithRetry(async () => {
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
    });
  }

  static async delete(id) {
    return executeQueryWithRetry(async () => {
      const [result] = await db.query("DELETE FROM reservas WHERE id_reserva = ?", [id]);
      return result;
    });
  }

  static async getByUsuario(id_usuario) {
    return executeQueryWithRetry(async () => {
      const [rows] = await db.query(
        `SELECT r.*, d.nombre AS destino
         FROM reservas r
         JOIN destinos d ON r.id_destino = d.id_destino
         WHERE r.id_usuario = ?
         ORDER BY r.fecha_reserva DESC`,
        [id_usuario]
      );
      return rows;
    });
  }
}

export default ReservaModel;
