import db from "../config/db.js";

class PaqueteModel {

    // Obtener todos los paquetes
    static async getAll() {
        try {
            const [rows] = await db.query("SELECT * FROM paquetes");
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los paquetes: " + error.message);
        }
    }

    // Obtener un paquete por ID
    static async getById(id) {
        try {
            const [rows] = await db.query("SELECT * FROM paquetes WHERE id_paquete = ?", [id]);
            return rows[0]; // Devuelve solo el primer resultado
        } catch (error) {
            throw new Error("Error al obtener el paquete: " + error.message);
        }
    }

    // Crear un nuevo paquete
    static async create({ nombre, descripcion, precio, id_destino }) {
        try {
            const [result] = await db.query(
                "INSERT INTO paquetes (nombre, descripcion, precio, id_destino) VALUES (?, ?, ?, ?)",
                [nombre, descripcion, precio, id_destino]
            );
            return result.insertId; // Devuelve el ID del nuevo paquete
        } catch (error) {
            throw new Error("Error al crear el paquete: " + error.message);
        }
    }

    // Actualizar un paquete por ID
    static async update(id, { nombre, descripcion, precio, id_destino }) {
        try {
            const [result] = await db.query(
                "UPDATE paquetes SET nombre = ?, descripcion = ?, precio = ?, id_destino = ? WHERE id_paquete = ?",
                [nombre, descripcion, precio, id_destino, id]
            );
            return result.affectedRows; // Devuelve el número de filas afectadas
        } catch (error) {
            throw new Error("Error al actualizar el paquete: " + error.message);
        }
    }

    // Eliminar un paquete por ID
    static async delete(id) {
        try {
            const [result] = await db.query("DELETE FROM paquetes WHERE id_paquete = ?", [id]);
            return result.affectedRows; // Devuelve el número de filas afectadas
        } catch (error) {
            throw new Error("Error al eliminar el paquete: " + error.message);
        }
    }

}

export default PaqueteModel;
