import db from "../config/db.js";


class ResenaModel {

    static async getAll() {
        try {
            const [rows] = await db.query("SELECT * FROM reseñas");
            return rows;
        } catch (error) {
            throw new Error("Error al obtener las reseñas: " + error.message);
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.query("SELECT * FROM reseñas WHERE id_resena = ?", [id]);
            return rows[0]; // Devuelve solo el primer resultado
        } catch (error) {
            throw new Error("Error al obtener la reseña: " + error.message);
        }
    }

    static async create({ id_usuario, id_paquete, calificacion, comentario }) {
        try {
            const [result] = await db.query(
                "INSERT INTO reseñas (id_usuario, id_paquete, calificacion, comentario) VALUES (?, ?, ?, ?)",
                [id_usuario, id_paquete, calificacion, comentario]
            );
            return result.insertId; // Devuelve el ID de la nueva reseña
        } catch (error) {
            throw new Error("Error al crear la reseña: " + error.message);
        }
    }

    static async update(id, { id_usuario, id_paquete, calificacion, comentario }) {
        try {
            const [result] = await db.query(
                "UPDATE reseñas SET id_usuario = ?, id_paquete = ?, calificacion = ?, comentario = ? WHERE id_resena = ?",
                [id_usuario, id_paquete, calificacion, comentario, id]
            );
            return result.affectedRows; // Devuelve el número de filas afectadas
        } catch (error) {
            throw new Error("Error al actualizar la reseña: " + error.message);
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query("DELETE FROM reseñas WHERE id_resena = ?", [id]);
            return result.affectedRows; // Devuelve el número de filas afectadas
        } catch (error) {
            throw new Error("Error al eliminar la reseña: " + error.message);
        }
    }

}

export default ResenaModel;
