import db from "../../config/db.js";

// Obtener todas las reservas
export const getReservas = async (req, res) => {
  try {
    const [reservas] = await db.query(`
      SELECT r.*, u.nombre as nombre_usuario, d.nombre as nombre_destino 
      FROM reservas r
      JOIN usuarios u ON r.id_usuario = u.id_usuario
      JOIN destinos d ON r.id_destino = d.id_destino
    `);
    res.json(reservas);
  } catch (error) {
    console.error("Error en getReservas:", error);
    res.status(500).json({ 
      error: "Error al obtener las reservas",
      details: error.message 
    });
  }
};

// Obtener una reserva por ID
export const getReservaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de reserva inválido" });
    }

    const [reserva] = await db.query(`
      SELECT r.*, u.nombre as nombre_usuario, d.nombre as nombre_destino 
      FROM reservas r
      JOIN usuarios u ON r.id_usuario = u.id_usuario
      JOIN destinos d ON r.id_destino = d.id_destino
      WHERE r.id_reserva = ?
    `, [id]);

    if (reserva.length === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    res.json(reserva[0]);
  } catch (error) {
    console.error("Error en getReservaById:", error);
    res.status(500).json({ 
      error: "Error al obtener la reserva",
      details: error.message 
    });
  }
};

// Crear una nueva reserva
export const createReserva = async (req, res) => {
  try {
    const { id_usuario, id_destino, fecha_reserva, cantidad_personas, estado } = req.body;

    // Validación
    if (!id_usuario || !id_destino || !fecha_reserva || !cantidad_personas) {
      return res.status(400).json({ 
        error: "Todos los campos son obligatorios excepto estado",
        campos_requeridos: ["id_usuario", "id_destino", "fecha_reserva", "cantidad_personas"]
      });
    }

    // Validar que exista el usuario y el destino
    const [usuario] = await db.query(
      "SELECT id_usuario FROM usuarios WHERE id_usuario = ?",
      [id_usuario]
    );
    
    const [destino] = await db.query(
      "SELECT id_destino FROM destinos WHERE id_destino = ?",
      [id_destino]
    );

    if (usuario.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (destino.length === 0) {
      return res.status(404).json({ error: "Destino no encontrado" });
    }

    // Validar fecha
    const fechaReserva = new Date(fecha_reserva);
    if (isNaN(fechaReserva.getTime())) {
      return res.status(400).json({ error: "Fecha de reserva inválida" });
    }

    // Validar cantidad de personas
    if (cantidad_personas <= 0) {
      return res.status(400).json({ error: "La cantidad de personas debe ser mayor a 0" });
    }

    // Estado por defecto si no se proporciona
    const estadoFinal = estado?.trim() || 'pendiente';

    const [result] = await db.query(
      "INSERT INTO reservas (id_usuario, id_destino, fecha_reserva, estado, cantidad_personas) VALUES (?, ?, ?, ?, ?)",
      [id_usuario, id_destino, fecha_reserva, estadoFinal, cantidad_personas]
    );

    // Obtener reserva creada con joins
    const [newReserva] = await db.query(`
      SELECT r.*, u.nombre as nombre_usuario, d.nombre as nombre_destino 
      FROM reservas r
      JOIN usuarios u ON r.id_usuario = u.id_usuario
      JOIN destinos d ON r.id_destino = d.id_destino
      WHERE r.id_reserva = ?
    `, [result.insertId]);

    res.status(201).json({ 
      message: "Reserva creada exitosamente",
      reserva: newReserva[0]
    });
  } catch (error) {
    console.error("Error en createReserva:", error);
    res.status(500).json({ 
      error: "Error al crear la reserva",
      details: error.message,
      sqlMessage: error.sqlMessage 
    });
  }
};

// Actualizar una reserva
export const updateReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_usuario, id_destino, fecha_reserva, cantidad_personas, estado } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de reserva inválido" });
    }

    // Validar que exista la reserva
    const [reservaExists] = await db.query(
      "SELECT id_reserva FROM reservas WHERE id_reserva = ?",
      [id]
    );

    if (reservaExists.length === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    // Construir la consulta dinámicamente
    let query = "UPDATE reservas SET ";
    const params = [];
    const updates = [];

    if (id_usuario) {
      // Validar que exista el usuario
      const [usuario] = await db.query(
        "SELECT id_usuario FROM usuarios WHERE id_usuario = ?",
        [id_usuario]
      );
      if (usuario.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      updates.push("id_usuario = ?");
      params.push(id_usuario);
    }

    if (id_destino) {
      // Validar que exista el destino
      const [destino] = await db.query(
        "SELECT id_destino FROM destinos WHERE id_destino = ?",
        [id_destino]
      );
      if (destino.length === 0) {
        return res.status(404).json({ error: "Destino no encontrado" });
      }
      updates.push("id_destino = ?");
      params.push(id_destino);
    }

    if (fecha_reserva) {
      const fechaReserva = new Date(fecha_reserva);
      if (isNaN(fechaReserva.getTime())) {
        return res.status(400).json({ error: "Fecha de reserva inválida" });
      }
      updates.push("fecha_reserva = ?");
      params.push(fecha_reserva);
    }

    if (cantidad_personas) {
      if (cantidad_personas <= 0) {
        return res.status(400).json({ error: "La cantidad de personas debe ser mayor a 0" });
      }
      updates.push("cantidad_personas = ?");
      params.push(cantidad_personas);
    }

    if (estado?.trim()) {
      updates.push("estado = ?");
      params.push(estado.trim());
    }

    if (updates.length === 0) {
      return res.status(400).json({ 
        error: "Debe proporcionar al menos un campo para actualizar",
        campos_posibles: ["id_usuario", "id_destino", "fecha_reserva", "cantidad_personas", "estado"]
      });
    }

    query += updates.join(", ") + " WHERE id_reserva = ?";
    params.push(id);

    await db.query(query, params);

    // Obtener reserva actualizada con joins
    const [updatedReserva] = await db.query(`
      SELECT r.*, u.nombre as nombre_usuario, d.nombre as nombre_destino 
      FROM reservas r
      JOIN usuarios u ON r.id_usuario = u.id_usuario
      JOIN destinos d ON r.id_destino = d.id_destino
      WHERE r.id_reserva = ?
    `, [id]);

    res.json({ 
      message: "Reserva actualizada exitosamente",
      reserva: updatedReserva[0]
    });
  } catch (error) {
    console.error("Error en updateReserva:", error);
    res.status(500).json({ 
      error: "Error al actualizar la reserva",
      details: error.message,
      sqlMessage: error.sqlMessage 
    });
  }
};

// Eliminar una reserva
export const deleteReserva = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de reserva inválido" });
    }

    // Verificar si la reserva existe
    const [reservaExists] = await db.query(
      "SELECT id_reserva FROM reservas WHERE id_reserva = ?",
      [id]
    );

    if (reservaExists.length === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    // Eliminar (ON DELETE CASCADE se encargará de los pagos relacionados)
    const [result] = await db.query(
      "DELETE FROM reservas WHERE id_reserva = ?", 
      [id]
    );

    res.json({ 
      message: "Reserva eliminada exitosamente",
      id_reserva: id
    });
  } catch (error) {
    console.error("Error en deleteReserva:", error);
    res.status(500).json({ 
      error: "Error al eliminar la reserva",
      details: error.message,
      sqlMessage: error.sqlMessage 
    });
  }
};