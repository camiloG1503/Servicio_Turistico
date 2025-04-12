import db from "../config/db.js";

export const crearUsuario = async ({ nombre, email, password, rol = "turista" }) => {
    const [result] = await db.execute(
      "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, password, rol]
    );
    return result.insertId;
  };
  
  export const obtenerUsuarios = async () => {
    const [rows] = await db.execute("SELECT id_usuario, nombre, email, rol FROM usuarios");
    return rows;
  };
  
  export const obtenerUsuarioPorEmail = async (email) => {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE email = ?", [email]);
    return rows[0];
  };
  
  export const obtenerUsuarioPorId = async (id) => {
    const [rows] = await db.execute("SELECT id_usuario, nombre, email, rol FROM usuarios WHERE id_usuario = ?", [id]);
    return rows[0];
  };
  
  export const actualizarUsuario = async (id, { nombre, email, password, rol }) => {
    const [result] = await db.execute(
      "UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol = ? WHERE id_usuario = ?",
      [nombre, email, password, rol, id]
    );
    return result;
  };
  
  export const eliminarUsuario = async (id) => {
    const [result] = await db.execute("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
    return result;
  };