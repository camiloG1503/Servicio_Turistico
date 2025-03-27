import db from "../../config/db.js";

export const getDestinos = (req, res) => {
  db.query("select * from destinos", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const createDestino = (req, res) => {
  const { nombre, ubicacion, descripcion, imagen, precio } = req.body;
  const sql = "insert into destinos (nombre, ubicacion, descripcion, imagen, precio) values (?, ?, ?, ?, ?)";
  
  db.query(sql, [nombre, ubicacion, descripcion, imagen, precio], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Destino creado", id: result.insertId });
  });
};

export const updateDestino = (req, res) => {
  const { id } = req.params;
  const { nombre, ubicacion, descripcion, imagen, precio } = req.body;
  const sql = "update destinos set nombre = ?, ubicacion = ?, descripcion = ?, imagen = ?, precio = ? where id = ?";
  
  db.query(sql, [nombre, ubicacion, descripcion, imagen, precio, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Destino actualizado" });
  });
}

export const deleteDestino = (req, res) => {
  const { id } = req.params;
  const sql = "delete from destinos where id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Destino eliminado" });
  });
}