 import db from "../config/db.js";


class GuiaModel {
    // Obtener todos los guías
    static async getAll() {
        try {
        const [rows] = await db.query("SELECT id_guia, nombre, especialidad FROM guias");
        return rows;
        } catch (error) {
        throw new Error("Error al obtener los guías: " + error.message);
        }
    }
    
    // Obtener un guía por ID
    static async getById(id) {
        try {
        const [rows] = await db.query("SELECT id_guia, nombre, especialidad FROM guias WHERE id_guia = ?", [id]);
        return rows[0]; // Devuelve solo el primer resultado
        } catch (error) {
        throw new Error("Error al obtener el guía: " + error.message);
        }
    }

    // Crear un nuevo guía
    static async create({ nombre, especialidad }) {
        try {
        const [result] = await db.query(
            "INSERT INTO guias (nombre, especialidad) VALUES (?, ?)",
            [nombre, especialidad]
        );
        return result.insertId; // Devuelve el ID del nuevo guía
        } catch (error) {
        throw new Error("Error al crear el guía: " + error.message);
        }
    }

    // Actualizar un guía por ID
    static async update(id, { nombre, especialidad }) {
        try {
        const [result] = await db.query(
            "UPDATE guias SET nombre = ?, especialidad = ? WHERE id_guia = ?",
            [nombre, especialidad, id]
        );
        return result.affectedRows; // Devuelve el número de filas afectadas
        } catch (error) {
        throw new Error("Error al actualizar el guía: " + error.message);
        }
    }

    // Eliminar un guía por ID
    static async delete(id) {
        try {
        const [result] = await db.query("DELETE FROM guias WHERE id_guia = ?", [id]);
        return result.affectedRows; // Devuelve el número de filas afectadas
        } catch (error) {
        throw new Error("Error al eliminar el guía: " + error.message);
        }
    }
}

export default GuiaModel;
