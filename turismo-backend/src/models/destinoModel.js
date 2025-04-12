import db from "../config/db.js";


export const crearDestino = async ({ nombre, descripcion, precio, imagen }) => {
    const [result] = await db.execute(
      "INSERT INTO destinos (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)",
      [nombre, descripcion, precio, imagen]
    );
    return result.insertId;
};

export const obtenerDestinos = async () => {
    const [rows] = await db.execute("SELECT id_destino, nombre, descripcion, precio, imagen FROM destinos");
    return rows;
};

export const obtenerDestinoPorId = async (id) => {
    const [rows] = await db.execute("SELECT id_destino, nombre, descripcion, precio, imagen FROM destinos WHERE id_destino = ?", [id]);
    return rows[0];
}

export const actualizarDestino = async (id, { nombre, descripcion, precio, imagen }) => {
    const [result] = await db.execute(
      "UPDATE destinos SET nombre = ?, descripcion = ?, precio = ?, imagen = ? WHERE id_destino = ?",
      [nombre, descripcion, precio, imagen, id]
    );
    return result;
};

export const eliminarDestino = async (id) => {
    const [result] = await db.execute("DELETE FROM destinos WHERE id_destino = ?", [id]);
    return result;
};

export const obtenerDestinosPorNombre = async (nombre) => {
    const [rows] = await db.execute("SELECT id_destino, nombre, descripcion, precio, imagen FROM destinos WHERE nombre LIKE ?", [`%${nombre}%`]);
    return rows;
}