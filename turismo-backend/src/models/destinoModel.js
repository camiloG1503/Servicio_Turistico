import db from "../config/db.js";

class DestinoModel {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM destinos");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM destinos WHERE id_destino = ?", [id]);
    return rows[0];
  }

  static async create(destino) {
    const [result] = await db.query(
      `INSERT INTO destinos (nombre, ubicacion, descripcion, imagen, precio)
       VALUES (?, ?, ?, ?, ?)`,
      [
        destino.nombre,
        destino.ubicacion,
        destino.descripcion,
        destino.imagen || null,
        destino.precio
      ]
    );
    return result.insertId;
  }

  static async update(id, destino) {
    const [result] = await db.query(
      `UPDATE destinos
       SET nombre = ?, ubicacion = ?, descripcion = ?, imagen = ?, precio = ?
       WHERE id_destino = ?`,
      [
        destino.nombre,
        destino.ubicacion,
        destino.descripcion,
        destino.imagen,
        destino.precio,
        id
      ]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM destinos WHERE id_destino = ?", [id]);
    return result;
  }
}

export default DestinoModel;
