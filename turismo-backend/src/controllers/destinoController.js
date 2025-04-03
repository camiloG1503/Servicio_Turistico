import db from "../../config/db.js";

// Obtener todos los destinos
export const getDestinos = async (req, res) => {
  try {
    const [destinos] = await db.query("SELECT * FROM destinos");
    res.json(destinos);
  } catch (error) {
    console.error("Error en getDestinos:", error);
    res.status(500).json({ 
      error: "Error al obtener los destinos", 
      details: error.message 
    });
  }
};

// Obtener un destino por ID
export const getDestinoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de destino inválido" });
    }

    const [destino] = await db.query(
      "SELECT * FROM destinos WHERE id_destino = ?", 
      [id]
    );

    if (destino.length === 0) {
      return res.status(404).json({ error: "Destino no encontrado" });
    }

    res.json(destino[0]);
  } catch (error) {
    console.error("Error en getDestinoById:", error);
    res.status(500).json({ 
      error: "Error al obtener el destino", 
      details: error.message 
    });
  }
};

// Crear un nuevo destino
export const createDestino = async (req, res) => {
  try {
    const { nombre, ubicacion, descripcion, imagen, precio } = req.body;

    // Validación mejorada
    if (!nombre?.trim() || !ubicacion?.trim() || !descripcion?.trim() || 
        precio === undefined || precio === null) {
      return res.status(400).json({ 
        error: "Todos los campos son obligatorios excepto imagen",
        campos_requeridos: ["nombre", "ubicacion", "descripcion", "precio"]
      });
    }

    const [result] = await db.query(
      "INSERT INTO destinos (nombre, ubicacion, descripcion, imagen, precio) VALUES (?, ?, ?, ?, ?)",
      [nombre.trim(), ubicacion.trim(), descripcion.trim(), imagen || null, parseFloat(precio)]
    );

    res.status(201).json({ 
      message: "Destino creado exitosamente",
      id_destino: result.insertId,
      data: { nombre, ubicacion, descripcion, imagen, precio }
    });
  } catch (error) {
    console.error("Error en createDestino:", error);
    res.status(500).json({ 
      error: "Error al crear el destino",
      details: error.message,
      sqlMessage: error.sqlMessage 
    });
  }
};

// Actualizar un destino
export const updateDestino = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, ubicacion, descripcion, imagen, precio } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de destino inválido" });
    }

    // Validación más flexible para actualización
    if (!nombre?.trim() && !ubicacion?.trim() && !descripcion?.trim() && 
        precio === undefined && imagen === undefined) {
      return res.status(400).json({ 
        error: "Debe proporcionar al menos un campo para actualizar",
        campos_posibles: ["nombre", "ubicacion", "descripcion", "imagen", "precio"]
      });
    }

    // Construir la consulta dinámicamente
    let query = "UPDATE destinos SET ";
    const params = [];
    const updates = [];

    if (nombre?.trim()) {
      updates.push("nombre = ?");
      params.push(nombre.trim());
    }
    if (ubicacion?.trim()) {
      updates.push("ubicacion = ?");
      params.push(ubicacion.trim());
    }
    if (descripcion?.trim()) {
      updates.push("descripcion = ?");
      params.push(descripcion.trim());
    }
    if (imagen !== undefined) {
      updates.push("imagen = ?");
      params.push(imagen || null);
    }
    if (precio !== undefined) {
      updates.push("precio = ?");
      params.push(parseFloat(precio));
    }

    query += updates.join(", ") + " WHERE id_destino = ?";
    params.push(id);

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Destino no encontrado" });
    }

    res.json({ 
      message: "Destino actualizado exitosamente",
      id_destino: id,
      campos_actualizados: updates
    });
  } catch (error) {
    console.error("Error en updateDestino:", error);
    res.status(500).json({ 
      error: "Error al actualizar el destino",
      details: error.message,
      sqlMessage: error.sqlMessage 
    });
  }
};

// Eliminar un destino
export const deleteDestino = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de destino inválido" });
    }

    const [result] = await db.query(
      "DELETE FROM destinos WHERE id_destino = ?", 
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Destino no encontrado" });
    }

    res.json({ 
      message: "Destino eliminado exitosamente",
      id_destino: id
    });
  } catch (error) {
    console.error("Error en deleteDestino:", error);
    res.status(500).json({ 
      error: "Error al eliminar el destino",
      details: error.message,
      sqlMessage: error.sqlMessage 
    });
  }
};