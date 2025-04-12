import db from "../config/db.js";

export const obtenerDashboard = async (req, res) => {
  try {
    const [[usuarios]] = await db.query("SELECT COUNT(*) AS total FROM usuarios");
    const [[destinos]] = await db.query("SELECT COUNT(*) AS total FROM destinos");
    const [[reservas]] = await db.query("SELECT COUNT(*) AS total FROM reservas");
    const [[resenas]]  = await db.query("SELECT COUNT(*) AS total FROM resenas");

    const [ultimasReservas] = await db.query(`
      SELECT r.id_reserva, u.nombre AS usuario, d.nombre AS destino, r.fecha_reserva, r.estado
      FROM reservas r
      JOIN usuarios u ON r.id_usuario = u.id_usuario
      JOIN destinos d ON r.id_destino = d.id_destino
      ORDER BY r.fecha_reserva DESC
      LIMIT 5
    `);

    const [ultimasResenas] = await db.query(`
      SELECT r.id_resena, u.nombre AS usuario, d.nombre AS destino, r.calificacion, r.comentario, r.fecha
      FROM resenas r
      JOIN usuarios u ON r.id_usuario = u.id_usuario
      JOIN destinos d ON r.id_destino = d.id_destino
      ORDER BY r.fecha DESC
      LIMIT 5
    `);

    res.json({
      totales: {
        usuarios: usuarios.total,
        destinos: destinos.total,
        reservas: reservas.total,
        resenas: resenas.total
      },
      ultimasReservas,
      ultimasResenas
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener dashboard", error });
  }
};
