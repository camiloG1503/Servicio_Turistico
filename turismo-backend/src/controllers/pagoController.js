import db from "../../config/db.js";

// Obtener todos los pagos con información de la reserva
export const getPagos = async (req, res) => {
  try {
    const [pagos] = await db.query(`
      SELECT p.id_pago, p.monto, p.metodo_pago, p.estado_pago,
             r.id_reserva, u.nombre AS usuario, d.nombre AS destino
      FROM pagos p
      LEFT JOIN reservas r ON p.id_reserva = r.id_reserva
      LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
      LEFT JOIN destinos d ON r.id_destino = d.id_destino
      ORDER BY p.id_pago DESC
    `);
    res.json(pagos);
  } catch (error) {
    console.error("Error en getPagos:", error);
    res.status(500).json({ error: "Error al obtener pagos", details: error.message });
  }
};

// Obtener un pago por ID
export const getPagoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [pago] = await db.query(`
      SELECT p.id_pago, p.monto, p.metodo_pago, p.estado_pago,
             r.id_reserva, u.nombre AS usuario, d.nombre AS destino
      FROM pagos p
      LEFT JOIN reservas r ON p.id_reserva = r.id_reserva
      LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
      LEFT JOIN destinos d ON r.id_destino = d.id_destino
      WHERE p.id_pago = ?
    `, [id]);

    if (pago.length === 0) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    res.json(pago[0]);
  } catch (error) {
    console.error("Error en getPagoById:", error);
    res.status(500).json({ error: "Error al obtener el pago", details: error.message });
  }
};

// Crear un nuevo pago
export const createPago = async (req, res) => {
  try {
    const { id_reserva, monto, metodo_pago, estado_pago = "pendiente" } = req.body;

    if (!id_reserva || !monto || !metodo_pago) {
      return res.status(400).json({ error: "id_reserva, monto y metodo_pago son obligatorios" });
    }

    const [reserva] = await db.query("SELECT * FROM reservas WHERE id_reserva = ?", [id_reserva]);
    if (reserva.length === 0) {
      return res.status(400).json({ error: "Reserva no encontrada" });
    }

    const [result] = await db.query(`
      INSERT INTO pagos (id_reserva, monto, metodo_pago, estado_pago)
      VALUES (?, ?, ?, ?)
    `, [id_reserva, monto, metodo_pago, estado_pago]);

    const [nuevoPago] = await db.query("SELECT * FROM pagos WHERE id_pago = ?", [result.insertId]);

    res.status(201).json({ message: "Pago registrado exitosamente", pago: nuevoPago[0] });
  } catch (error) {
    console.error("Error en createPago:", error);
    res.status(500).json({ error: "Error al registrar el pago", details: error.message });
  }
};

// Actualizar estado o datos de un pago
export const updatePago = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto, metodo_pago, estado_pago } = req.body;

    const [pago] = await db.query("SELECT * FROM pagos WHERE id_pago = ?", [id]);
    if (pago.length === 0) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    const campos = [];
    const valores = [];

    if (monto) {
      campos.push("monto = ?");
      valores.push(monto);
    }
    if (metodo_pago) {
      campos.push("metodo_pago = ?");
      valores.push(metodo_pago);
    }
    if (estado_pago) {
      campos.push("estado_pago = ?");
      valores.push(estado_pago);
    }

    if (campos.length === 0) {
      return res.status(400).json({ error: "No se enviaron campos para actualizar" });
    }

    valores.push(id);
    await db.query(`UPDATE pagos SET ${campos.join(", ")} WHERE id_pago = ?`, valores);

    const [actualizado] = await db.query("SELECT * FROM pagos WHERE id_pago = ?", [id]);

    res.json({ message: "Pago actualizado correctamente", pago: actualizado[0] });
  } catch (error) {
    console.error("Error en updatePago:", error);
    res.status(500).json({ error: "Error al actualizar el pago", details: error.message });
  }
};

// Eliminar un pago
export const deletePago = async (req, res) => {
  try {
    const { id } = req.params;

    const [pago] = await db.query("SELECT * FROM pagos WHERE id_pago = ?", [id]);
    if (pago.length === 0) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    await db.query("DELETE FROM pagos WHERE id_pago = ?", [id]);

    res.json({ message: "Pago eliminado correctamente", id_pago: id });
  } catch (error) {
    console.error("Error en deletePago:", error);
    res.status(500).json({ error: "Error al eliminar el pago", details: error.message });
  }
};


