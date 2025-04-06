import db from "../config/db.js";

class PagoModel {
    // Obtener todos los pagos
    static async getAll() {
        try {
            const [rows] = await db.query("SELECT * FROM pagos");
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los pagos: " + error.message);
        }
    }

    // Obtener un pago por ID
    static async getById(id) {
        try {
            const [rows] = await db.query("SELECT * FROM pagos WHERE id_pago = ?", [id]);
            return rows[0]; // Devuelve solo el primer resultado
        } catch (error) {
            throw new Error("Error al obtener el pago: " + error.message);
        }
    }

    // Crear un nuevo pago
    static async create({ id_reserva, monto, fecha_pago }) {
        try {
            const [result] = await db.query(
                "INSERT INTO pagos (id_reserva, monto, fecha_pago) VALUES (?, ?, ?)",
                [id_reserva, monto, fecha_pago]
            );
            return result.insertId; // Devuelve el ID del nuevo pago
        } catch (error) {
            throw new Error("Error al crear el pago: " + error.message);
        }
    }

    // Actualizar un pago por ID
    static async update(id, { id_reserva, monto, fecha_pago }) {
        try {
            const [result] = await db.query(
                "UPDATE pagos SET id_reserva = ?, monto = ?, fecha_pago = ? WHERE id_pago = ?",
                [id_reserva, monto, fecha_pago, id]
            );
            return result.affectedRows; // Devuelve el número de filas afectadas
        } catch (error) {
            throw new Error("Error al actualizar el pago: " + error.message);
        }
    }

    // Eliminar un pago por ID
    static async delete(id) {
        try {
            const [result] = await db.query("DELETE FROM pagos WHERE id_pago = ?", [id]);
            return result.affectedRows; // Devuelve el número de filas afectadas
        } catch (error) {
            throw new Error("Error al eliminar el pago: " + error.message);
        }
    }
}

export default PagoModel;
