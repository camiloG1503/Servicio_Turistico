import db from "../../config/db.js";

// Obtener todas las reservas
export const getReservas = async (req, res) => {
  try {
    const [reservas] = await db.query("SELECT * FROM reservas");
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener reserva por ID
export const getReservaById = async (req, res) => {
  try {
    const [reserva] = await db.query("SELECT * FROM reservas WHERE id = ?", [req.params.id]);
    if (reserva.length === 0) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json(reserva[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Crear una nueva reserva
export const createReserva = async (req, res) => {
  try {
    const { usuario_id, destino_id, fecha, cantidad_personas } = req.body;
    await db.query(
      "INSERT INTO reservas (usuario_id, destino_id, fecha, cantidad_personas) VALUES (?, ?, ?, ?)",
      [usuario_id, destino_id, fecha, cantidad_personas]
    );
    res.status(201).json({ message: "Reserva creada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una reserva
export const updateReserva = async (req, res) => {
  try {
    const { usuario_id, destino_id, fecha, cantidad_personas } = req.body;
    const [result] = await db.query(
      "UPDATE reservas SET usuario_id = ?, destino_id = ?, fecha = ?, cantidad_personas = ? WHERE id = ?",
      [usuario_id, destino_id, fecha, cantidad_personas, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json({ message: "Reserva actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una reserva
export const deleteReserva = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM reservas WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
