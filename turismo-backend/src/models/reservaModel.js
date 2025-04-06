import db from "../config/db.js";


class ReservaModel {
    // Obtener todas las reservas
    static async getAll() {
        try {
        const [rows] = await db.query("SELECT * FROM reservas");
        return rows;
        } catch (error) {
        throw new Error("Error al obtener las reservas: " + error.message);
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.query("SELECT * FROM reservas WHERE id_reserva = ?", [id]);
            return rows[0]; // Devuelve solo el primer resultado
        } catch (error) {
            throw new Error("Error al obtener la reserva: " + error.message);
        }
    }
    
        // Crear una nueva reserva
        static async create({ id_usuario, id_hotel, fecha_inicio, fecha_fin, numero_personas }) {
            try {
                const [result] = await db.query(
                    "INSERT INTO reservas (id_usuario, id_hotel, fecha_inicio, fecha_fin, numero_personas) VALUES (?, ?, ?, ?, ?)",
                    [id_usuario, id_hotel, fecha_inicio, fecha_fin, numero_personas]
                );
                return result.insertId; // Devuelve el ID de la nueva reserva
            } catch (error) {
                throw new Error("Error al crear la reserva: " + error.message);
            }
        }
    
        // Actualizar una reserva por ID
        static async update(id, { id_usuario, id_hotel, fecha_inicio, fecha_fin, numero_personas }) {
            try {
                const [result] = await db.query(
                    "UPDATE reservas SET id_usuario = ?, id_hotel = ?, fecha_inicio = ?, fecha_fin = ?, numero_personas = ? WHERE id_reserva = ?",
                    [id_usuario, id_hotel, fecha_inicio, fecha_fin, numero_personas, id]
                );
                return result.affectedRows; // Devuelve el número de filas afectadas
            } catch (error) {
                throw new Error("Error al actualizar la reserva: " + error.message);
            }
        }
    
        // Eliminar una reserva por ID
        static async delete(id) {
            try {
                const [result] = await db.query("DELETE FROM reservas WHERE id_reserva = ?", [id]);
                return result.affectedRows; // Devuelve el número de filas afectadas
            } catch (error) {
                throw new Error("Error al eliminar la reserva: " + error.message);
            }
        }
}

export default ReservaModel;

