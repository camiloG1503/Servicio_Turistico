import db from "../../config/db.js";

// Obtener todos los guías con datos del usuario
export const getGuias = async (req, res) => {
  try {
    const [guias] = await db.query(`
      SELECT g.id_guia, u.nombre, u.email, g.experiencia, g.idiomas, g.calificacion_promedio
      FROM guias g
      JOIN usuarios u ON g.id_usuario = u.id_usuario
    `);
    res.json(guias);
  } catch (error) {
    console.error("Error en getGuias:", error);
    res.status(500).json({ error: "Error al obtener los guías", details: error.message });
  }
};

// Obtener un guía por ID
export const getGuiaById = async (req, res) => {
  try {
    const { id } = req.params;
    const [guia] = await db.query(`
      SELECT g.id_guia, u.nombre, u.email, g.experiencia, g.idiomas, g.calificacion_promedio
      FROM guias g
      JOIN usuarios u ON g.id_usuario = u.id_usuario
      WHERE g.id_guia = ?
    `, [id]);

    if (guia.length === 0) {
      return res.status(404).json({ error: "Guía no encontrado" });
    }

    res.json(guia[0]);
  } catch (error) {
    console.error("Error en getGuiaById:", error);
    res.status(500).json({ error: "Error al obtener el guía", details: error.message });
  }
};

// Crear un nuevo guía (requiere id_usuario existente con rol 'guia')
export const createGuia = async (req, res) => {
  try {
    const { id_usuario, experiencia, idiomas } = req.body;

    if (!id_usuario || !experiencia?.trim() || !idiomas?.trim()) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Verificar que el usuario exista y tenga rol 'guia'
    const [usuario] = await db.query(
      "SELECT * FROM usuarios WHERE id_usuario = ? AND rol = 'guia'",
      [id_usuario]
    );
    if (usuario.length === 0) {
      return res.status(400).json({ error: "Usuario no válido o no tiene rol 'guia'" });
    }

    // Verificar que no tenga ya un registro en guias
    const [existeGuia] = await db.query(
      "SELECT * FROM guias WHERE id_usuario = ?",
      [id_usuario]
    );
    if (existeGuia.length > 0) {
      return res.status(400).json({ error: "Este usuario ya está registrado como guía" });
    }

    const [result] = await db.query(
      "INSERT INTO guias (id_usuario, experiencia, idiomas) VALUES (?, ?, ?)",
      [id_usuario, experiencia.trim(), idiomas.trim()]
    );

    const [newGuia] = await db.query(`
      SELECT g.id_guia, u.nombre, u.email, g.experiencia, g.idiomas, g.calificacion_promedio
      FROM guias g
      JOIN usuarios u ON g.id_usuario = u.id_usuario
      WHERE g.id_guia = ?
    `, [result.insertId]);

    res.status(201).json({ message: "Guía creado exitosamente", guia: newGuia[0] });
  } catch (error) {
    console.error("Error en createGuia:", error);
    res.status(500).json({ error: "Error al crear el guía", details: error.message });
  }
};

// Actualizar un guía
export const updateGuia = async (req, res) => {
  try {
    const { id } = req.params;
    const { experiencia, idiomas } = req.body;

    const [existe] = await db.query("SELECT * FROM guias WHERE id_guia = ?", [id]);
    if (existe.length === 0) {
      return res.status(404).json({ error: "Guía no encontrado" });
    }

    const campos = [];
    const valores = [];

    if (experiencia?.trim()) {
      campos.push("experiencia = ?");
      valores.push(experiencia.trim());
    }

    if (idiomas?.trim()) {
      campos.push("idiomas = ?");
      valores.push(idiomas.trim());
    }

    if (campos.length === 0) {
      return res.status(400).json({ error: "No se proporcionaron campos para actualizar" });
    }

    valores.push(id);

    await db.query(`UPDATE guias SET ${campos.join(", ")} WHERE id_guia = ?`, valores);

    const [updated] = await db.query(`
      SELECT g.id_guia, u.nombre, u.email, g.experiencia, g.idiomas, g.calificacion_promedio
      FROM guias g
      JOIN usuarios u ON g.id_usuario = u.id_usuario
      WHERE g.id_guia = ?
    `, [id]);

    res.json({ message: "Guía actualizado", guia: updated[0] });
  } catch (error) {
    console.error("Error en updateGuia:", error);
    res.status(500).json({ error: "Error al actualizar el guía", details: error.message });
  }
};

// Eliminar un guía
export const deleteGuia = async (req, res) => {
  try {
    const { id } = req.params;

    const [existe] = await db.query("SELECT * FROM guias WHERE id_guia = ?", [id]);
    if (existe.length === 0) {
      return res.status(404).json({ error: "Guía no encontrado" });
    }

    await db.query("DELETE FROM guias WHERE id_guia = ?", [id]);

    res.json({ message: "Guía eliminado exitosamente", id_guia: id });
  } catch (error) {
    console.error("Error en deleteGuia:", error);
    res.status(500).json({ error: "Error al eliminar el guía", details: error.message });
  }
}; 
