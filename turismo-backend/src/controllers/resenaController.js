import db from "../../config/db.js";

// Obtener todas las reseñas con datos del usuario y destino
export const getResenas = async (req, res) => {
  try {
    const [resenas] = await db.query(`
      SELECT r.id_resena, u.nombre AS usuario, d.nombre AS destino, r.calificacion, r.comentario, r.fecha
      FROM resenas r
      JOIN usuarios u ON r.id_usuario = u.id_usuario
      JOIN destinos d ON r.id_destino = d.id_destino
      ORDER BY r.fecha DESC
    `);
    res.json(resenas);
  } catch (error) {
    console.error("Error en getResenas:", error);
    res.status(500).json({ error: "Error al obtener las reseñas", details: error.message });
  }
};

// Obtener una reseña por ID
export const getResenaById = async (req, res) => {
  try {
    const { id } = req.params;
    const [resena] = await db.query(`
      SELECT r.id_resena, u.nombre AS usuario, d.nombre AS destino, r.calificacion, r.comentario, r.fecha
      FROM resenas r
      JOIN usuarios u ON r.id_usuario = u.id_usuario
      JOIN destinos d ON r.id_destino = d.id_destino
      WHERE r.id_resena = ?
    `, [id]);

    if (resena.length === 0) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    res.json(resena[0]);
  } catch (error) {
    console.error("Error en getResenaById:", error);
    res.status(500).json({ error: "Error al obtener la reseña", details: error.message });
  }
};

// Crear una nueva reseña
export const createResena = async (req, res) => {
  try {
    const { id_usuario, id_destino, calificacion, comentario } = req.body;

    if (!id_usuario || !id_destino || !calificacion || !comentario?.trim()) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    if (calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ error: "La calificación debe estar entre 1 y 5" });
    }

    const [result] = await db.query(`
      INSERT INTO resenas (id_usuario, id_destino, calificacion, comentario)
      VALUES (?, ?, ?, ?)
    `, [id_usuario, id_destino, calificacion, comentario.trim()]);

    const [newResena] = await db.query(`
      SELECT r.id_resena, u.nombre AS usuario, d.nombre AS destino, r.calificacion, r.comentario, r.fecha
      FROM resenas r
      JOIN usuarios u ON r.id_usuario = u.id_usuario
      JOIN destinos d ON r.id_destino = d.id_destino
      WHERE r.id_resena = ?
    `, [result.insertId]);

    res.status(201).json({ message: "Reseña creada exitosamente", resena: newResena[0] });
  } catch (error) {
    console.error("Error en createResena:", error);
    res.status(500).json({ error: "Error al crear la reseña", details: error.message });
  }
};

// Actualizar una reseña
export const updateResena = async (req, res) => {
  try {
    const { id } = req.params;
    const { calificacion, comentario } = req.body;

    const [existe] = await db.query("SELECT * FROM resenas WHERE id_resena = ?", [id]);
    if (existe.length === 0) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    const campos = [];
    const valores = [];

    if (calificacion && calificacion >= 1 && calificacion <= 5) {
      campos.push("calificacion = ?");
      valores.push(calificacion);
    }

    if (comentario?.trim()) {
      campos.push("comentario = ?");
      valores.push(comentario.trim());
    }

    if (campos.length === 0) {
      return res.status(400).json({ error: "No se proporcionaron campos para actualizar" });
    }

    valores.push(id);

    await db.query(`UPDATE resenas SET ${campos.join(", ")} WHERE id_resena = ?`, valores);

    const [updated] = await db.query(`
      SELECT r.id_resena, u.nombre AS usuario, d.nombre AS destino, r.calificacion, r.comentario, r.fecha
      FROM resenas r
      JOIN usuarios u ON r.id_usuario = u.id_usuario
      JOIN destinos d ON r.id_destino = d.id_destino
      WHERE r.id_resena = ?
    `, [id]);

    res.json({ message: "Reseña actualizada", resena: updated[0] });
  } catch (error) {
    console.error("Error en updateResena:", error);
    res.status(500).json({ error: "Error al actualizar la reseña", details: error.message });
  }
};

// Eliminar una reseña
export const deleteResena = async (req, res) => {
  try {
    const { id } = req.params;

    const [existe] = await db.query("SELECT * FROM resenas WHERE id_resena = ?", [id]);
    if (existe.length === 0) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    await db.query("DELETE FROM resenas WHERE id_resena = ?", [id]);

    res.json({ message: "Reseña eliminada exitosamente", id_resena: id });
  } catch (error) {
    console.error("Error en deleteResena:", error);
    res.status(500).json({ error: "Error al eliminar la reseña", details: error.message });
  }
};
