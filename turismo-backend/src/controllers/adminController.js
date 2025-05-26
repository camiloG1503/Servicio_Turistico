import db from "../config/db.js";

export const obtenerDashboard = async (req, res) => {
  // Objeto para almacenar los resultados de las consultas
  const dashboardData = {
    totales: {
      usuarios: 0,
      destinos: 0,
      reservas: 0,
      pagos: 0,
      guias: 0,
      resenas: 0
    },
    usuarios: [],
    destinos: [],
    reservas: [],
    pagos: [],
    guias: [],
    resenas: [],
    ultimasReservas: [],
    ultimasResenas: []
  };

    // Obtener totales para mostrar en las tarjetas - con manejo de errores individual
    try {
      const [[usuariosTotal]] = await db.query(
        "SELECT COUNT(*) AS total FROM usuarios"
      );
      dashboardData.totales.usuarios = usuariosTotal.total;
    } catch (error) {
      console.error("Error al obtener total de usuarios:", error.message);
      // Continuar con las demás consultas
    }

    try {
      const [[destinosTotal]] = await db.query(
        "SELECT COUNT(*) AS total FROM destinos"
      );
      dashboardData.totales.destinos = destinosTotal.total;
    } catch (error) {
      console.error("Error al obtener total de destinos:", error.message);
      // Continuar con las demás consultas
    }

    try {
      const [[reservasTotal]] = await db.query(
        "SELECT COUNT(*) AS total FROM reservas"
      );
      dashboardData.totales.reservas = reservasTotal.total;
    } catch (error) {
      console.error("Error al obtener total de reservas:", error.message);
      // Continuar con las demás consultas
    }

    try {
      const [[pagosTotal]] = await db.query(
        "SELECT COUNT(*) AS total FROM pagos"
      );
      dashboardData.totales.pagos = pagosTotal.total;
    } catch (error) {
      console.error("Error al obtener total de pagos:", error.message);
      // Continuar con las demás consultas
    }

    try {
      const [[guiasTotal]] = await db.query(
        "SELECT COUNT(*) AS total FROM usuarios WHERE rol = 'guia'"
      );
      dashboardData.totales.guias = guiasTotal.total;
    } catch (error) {
      console.error("Error al obtener total de guías:", error.message);
      // Continuar con las demás consultas
    }

    try {
      const [[resenasTotal]] = await db.query(
        "SELECT COUNT(*) AS total FROM resenas"
      );
      dashboardData.totales.resenas = resenasTotal.total;
    } catch (error) {
      console.error("Error al obtener total de reseñas:", error.message);
      // Continuar con las demás consultas
    }

    // Obtener datos detallados para cada categoría - con manejo de errores individual
    try {
      const [usuarios] = await db.query(`
        SELECT id_usuario, nombre, email, rol
        FROM usuarios
        ORDER BY id_usuario DESC
      `);
      dashboardData.usuarios = usuarios;
    } catch (error) {
      console.error("Error al obtener detalles de usuarios:", error.message);
      // Continuar con las demás consultas
    }

    try {
      const [destinos] = await db.query(`
        SELECT id_destino, nombre, ubicacion, precio
        FROM destinos
        ORDER BY id_destino DESC
      `);
      dashboardData.destinos = destinos;
    } catch (error) {
      console.error("Error al obtener detalles de destinos:", error.message);
      // Continuar con las demás consultas
    }

    try {
      const [reservas] = await db.query(`
        SELECT r.id_reserva, u.nombre AS usuario, d.nombre AS destino, r.fecha_reserva, r.estado
        FROM reservas r
        LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
        LEFT JOIN destinos d ON r.id_destino = d.id_destino
        ORDER BY r.fecha_reserva DESC
      `);
      dashboardData.reservas = reservas;
    } catch (error) {
      console.error("Error al obtener detalles de reservas:", error.message);
      // Continuar con las demás consultas
    }

    try {
      const [pagos] = await db.query(`
        SELECT p.id_pago, p.monto, p.metodo_pago, p.estado_pago, u.nombre AS usuario, d.nombre AS destino
        FROM pagos p
        LEFT JOIN reservas r ON p.id_reserva = r.id_reserva
        LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
        LEFT JOIN destinos d ON r.id_destino = d.id_destino
        ORDER BY p.fecha_pago DESC
      `);
      dashboardData.pagos = pagos;
    } catch (error) {
      console.error("Error al obtener detalles de pagos:", error.message);
      // Continuar con las demás consultas
    }

    try {
      const [guias] = await db.query(`
        SELECT id_usuario, nombre, email, idiomas
        FROM usuarios
        WHERE rol = 'guia'
        ORDER BY id_usuario DESC
      `);
      dashboardData.guias = guias;
    } catch (error) {
      console.error("Error al obtener detalles de guías:", error.message);
      // Continuar con las demás consultas
    }

    try {
      const [resenas] = await db.query(`
        SELECT r.id_resena, u.nombre AS usuario, d.nombre AS destino, r.calificacion, r.comentario, r.fecha
        FROM resenas r
        LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
        LEFT JOIN destinos d ON r.id_destino = d.id_destino
        ORDER BY r.fecha DESC
      `);
      dashboardData.resenas = resenas;
    } catch (error) {
      console.error("Error al obtener detalles de reseñas:", error.message);
      // Continuar con las demás consultas
    }

    try {
      const [ultimasReservas] = await db.query(`
        SELECT r.id_reserva, u.nombre AS usuario, d.nombre AS destino, r.fecha_reserva, r.estado
        FROM reservas r
        LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
        LEFT JOIN destinos d ON r.id_destino = d.id_destino
        ORDER BY r.fecha_reserva DESC
        LIMIT 5
      `);
      dashboardData.ultimasReservas = ultimasReservas;
    } catch (error) {
      console.error("Error al obtener últimas reservas:", error.message);
      // Continuar con las demás consultas
    }

    try {
      const [ultimasResenas] = await db.query(`
        SELECT r.id_resena, u.nombre AS usuario, d.nombre AS destino, r.calificacion, r.comentario, r.fecha
        FROM resenas r
        LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
        LEFT JOIN destinos d ON r.id_destino = d.id_destino
        ORDER BY r.fecha DESC
        LIMIT 5
      `);
      dashboardData.ultimasResenas = ultimasResenas;
    } catch (error) {
      console.error("Error al obtener últimas reseñas:", error.message);
      // Continuar con las demás consultas
    }

    // Log del objeto dashboardData completo antes de enviarlo
    console.log("Objeto dashboardData completo:", {
      totales: dashboardData.totales,
      pagos_length: dashboardData.pagos.length,
      guias_length: dashboardData.guias.length,
      resenas_length: dashboardData.resenas.length
    });

    // Enviar los datos recopilados al cliente
    res.json(dashboardData);
};
