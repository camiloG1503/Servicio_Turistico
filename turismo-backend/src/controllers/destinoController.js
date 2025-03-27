import db from "../../config/db.js";

export const getDestinos = (req, res) => {
  db.query("SELECT * FROM destinos", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const createDestino = (req, res) => {
  const { nombre, ubicacion, descripcion, imagen, precio } = req.body;
  const sql = "INSERT INTO destinos (nombre, ubicacion, descripcion, imagen, precio) VALUES (?, ?, ?, ?, ?)";
  
  db.query(sql, [nombre, ubicacion, descripcion, imagen, precio], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Destino creado", id: result.insertId });
  });
};
