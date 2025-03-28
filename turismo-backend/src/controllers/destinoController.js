import db from "../../config/db.js";

// Obtener todos los destinos
export const getDestinos = async (req, res) => {
  try {
    const [destinos] = await db.query("SELECT * FROM destinos");
    res.json(destinos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
////// modificar el controlador para que devuelva un destino por ID

// Obtener destino por ID
export const getDestinoById = async (req, res) => {
  try {
    const [destino] = await db.query("SELECT * FROM destinos WHERE id = ?", [req.params.id]);
    if (destino.length === 0) return res.status(404).json({ error: "Destino no encontrado" });
    res.json(destino[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo destino
export const createDestino = async (req, res) => {
  try {
    const { nombre, ubicacion, descripcion, imagen, precio } = req.body;
    const [result] = await db.query(
      "INSERT INTO destinos (nombre, ubicacion, descripcion, imagen, precio) VALUES (?, ?, ?, ?, ?)",
      [nombre, ubicacion, descripcion, imagen, precio]
    );
    res.status(201).json({ message: "Destino creado exitosamente", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un destino
export const updateDestino = async (req, res) => {
  try {
    const { nombre, ubicacion, descripcion, imagen, precio } = req.body;
    const [result] = await db.query(
      "UPDATE destinos SET nombre = ?, ubicacion = ?, descripcion = ?, imagen = ?, precio = ? WHERE id = ?",
      [nombre, ubicacion, descripcion, imagen, precio, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Destino no encontrado" });
    res.json({ message: "Destino actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un destino
export const deleteDestino = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM destinos WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Destino no encontrado" });
    res.json({ message: "Destino eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};