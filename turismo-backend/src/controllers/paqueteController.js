import db from "../../config/db.js";

// Obtener todos los paquetes con el nombre del destino
export const getPaquetes = async (req, res) => {
  try {
    const [paquetes] = await db.query(`
      SELECT p.id_paquete, p.nombre, p.descripcion, p.precio, d.nombre AS destino
      FROM paquetes p
      LEFT JOIN destinos d ON p.id_destino = d.id_destino
      ORDER BY p.id_paquete DESC
    `);
    res.json(paquetes);
  } catch (error) {
    console.error("Error en getPaquetes:", error);
    res.status(500).json({ error: "Error al obtener paquetes", details: error.message });
  }
};

// Obtener un paquete por ID
export const getPaqueteById = async (req, res) => {
  try {
    const { id } = req.params;
    const [paquete] = await db.query(`
      SELECT p.id_paquete, p.nombre, p.descripcion, p.precio, d.nombre AS destino
      FROM paquetes p
      LEFT JOIN destinos d ON p.id_destino = d.id_destino
      WHERE p.id_paquete = ?
    `, [id]);

    if (paquete.length === 0) {
      return res.status(404).json({ error: "Paquete no encontrado" });
    }

    res.json(paquete[0]);
  } catch (error) {
    console.error("Error en getPaqueteById:", error);
    res.status(500).json({ error: "Error al obtener el paquete", details: error.message });
  }
};

// Crear un nuevo paquete
export const createPaquete = async (req, res) => {
  try {
    const { nombre, descripcion, precio, id_destino } = req.body;

    if (!nombre || !descripcion || !precio || !id_destino) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const [result] = await db.query(`
      INSERT INTO paquetes (nombre, descripcion, precio, id_destino)
      VALUES (?, ?, ?, ?)
    `, [nombre.trim(), descripcion.trim(), precio, id_destino]);

    const [nuevoPaquete] = await db.query(`
      SELECT p.id_paquete, p.nombre, p.descripcion, p.precio, d.nombre AS destino
      FROM paquetes p
      LEFT JOIN destinos d ON p.id_destino = d.id_destino
      WHERE p.id_paquete = ?
    `, [result.insertId]);

    res.status(201).json({ message: "Paquete creado exitosamente", paquete: nuevoPaquete[0] });
  } catch (error) {
    console.error("Error en createPaquete:", error);
    res.status(500).json({ error: "Error al crear el paquete", details: error.message });
  }
};

// Actualizar un paquete
export const updatePaquete = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, id_destino } = req.body;

    const [existe] = await db.query("SELECT * FROM paquetes WHERE id_paquete = ?", [id]);
    if (existe.length === 0) {
      return res.status(404).json({ error: "Paquete no encontrado" });
    }

    const campos = [];
    const valores = [];

    if (nombre) {
      campos.push("nombre = ?");
      valores.push(nombre.trim());
    }
    if (descripcion) {
      campos.push("descripcion = ?");
      valores.push(descripcion.trim());
    }
    if (precio) {
      campos.push("precio = ?");
      valores.push(precio);
    }
    if (id_destino) {
      campos.push("id_destino = ?");
      valores.push(id_destino);
    }

    if (campos.length === 0) {
      return res.status(400).json({ error: "No se proporcionaron campos para actualizar" });
    }

    valores.push(id);

    await db.query(`UPDATE paquetes SET ${campos.join(", ")} WHERE id_paquete = ?`, valores);

    const [actualizado] = await db.query(`
      SELECT p.id_paquete, p.nombre, p.descripcion, p.precio, d.nombre AS destino
      FROM paquetes p
      LEFT JOIN destinos d ON p.id_destino = d.id_destino
      WHERE p.id_paquete = ?
    `, [id]);

    res.json({ message: "Paquete actualizado correctamente", paquete: actualizado[0] });
  } catch (error) {
    console.error("Error en updatePaquete:", error);
    res.status(500).json({ error: "Error al actualizar el paquete", details: error.message });
  }
};

// Eliminar un paquete
export const deletePaquete = async (req, res) => {
  try {
    const { id } = req.params;

    const [existe] = await db.query("SELECT * FROM paquetes WHERE id_paquete = ?", [id]);
    if (existe.length === 0) {
      return res.status(404).json({ error: "Paquete no encontrado" });
    }

    await db.query("DELETE FROM paquetes WHERE id_paquete = ?", [id]);

    res.json({ message: "Paquete eliminado exitosamente", id_paquete: id });
  } catch (error) {
    console.error("Error en deletePaquete:", error);
    res.status(500).json({ error: "Error al eliminar el paquete", details: error.message });
  }
};
