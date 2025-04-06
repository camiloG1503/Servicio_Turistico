import db from "../config/db.js";

class DestinoModel {
    // Obtener todos los destinos
    static async getAll() {
        try {
        const [rows] = await db.query("SELECT * FROM destinos");
        return rows;
        } catch (error) {
        throw new Error("Error al obtener los destinos: " + error.message);
        }
    }

    // Obtener un destino por ID
    static async getById(id) {
        try {
            const [rows] = await db.query("SELECT * FROM destinos WHERE id_destino = ?", [id]);
            return rows[0]; // Devuelve solo el primer resultado
        } catch (error) {
            throw new Error("Error al obtener el destino: " + error.message);
        }
    }
    
        // Crear un nuevo destino
        static async create({ nombre, descripcion, ubicacion }) {
            try {
                const [result] = await db.query(
                    "INSERT INTO destinos (nombre, descripcion, ubicacion) VALUES (?, ?, ?)",
                    [nombre, descripcion, ubicacion]
                );
                return result.insertId; // Devuelve el ID del nuevo destino
            } catch (error) {
                throw new Error("Error al crear el destino: " + error.message);
            }
        }
    
        // Actualizar un destino por ID
        static async update(id, { nombre, descripcion, ubicacion }) {
            try {
                const [result] = await db.query(
                    "UPDATE destinos SET nombre = ?, descripcion = ?, ubicacion = ? WHERE id_destino = ?",
                    [nombre, descripcion, ubicacion, id]
                );
                return result.affectedRows; // Devuelve el número de filas afectadas
            } catch (error) {
                throw new Error("Error al actualizar el destino: " + error.message);
            }
        }
    
        // Eliminar un destino por ID
        static async delete(id) {
            try {
                const [result] = await db.query("DELETE FROM destinos WHERE id_destino = ?", [id]);
                return result.affectedRows; // Devuelve el número de filas afectadas
            } catch (error) {
                throw new Error("Error al eliminar el destino: " + error.message);
            }
        }
}

export default DestinoModel;
