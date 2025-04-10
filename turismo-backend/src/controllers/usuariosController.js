import db from "../../config/db.js";
import bcrypt from 'bcryptjs';

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const [usuarios] = await db.query(
      "SELECT id_usuario, nombre, email, password, rol FROM usuarios"
    );
    res.json(usuarios);
  } catch (error) {
    console.error("Error en getUsuarios:", error);
    res.status(500).json({ 
      error: "Error al obtener los usuarios",
      details: error.message 
    });
  }
};

// Obtener un usuario por ID
export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }

    const [usuario] = await db.query(
      "SELECT id_usuario, nombre, email, password, rol FROM usuarios WHERE id_usuario = ?", 
      [id]
    );

    if (usuario.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario[0]);
  } catch (error) {
    console.error("Error en getUsuarioById:", error);
    res.status(500).json({ 
      error: "Error al obtener el usuario",
      details: error.message 
    });
  }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body; // Cambio aquí

    // Validación mejorada
    if (!nombre?.trim() || !email?.trim() || !password?.trim() || !rol?.trim()) {
      return res.status(400).json({ 
        error: "Todos los campos son obligatorios",
        campos_requeridos: ["nombre", "email", "password", "rol"] // Cambio aquí
      });
    }

    // Validar rol
    const rolesValidos = ['admin', 'turista', 'guia'];
    if (!rolesValidos.includes(rol)) {
      return res.status(400).json({ 
        error: "Rol inválido",
        roles_validos: rolesValidos
      });
    }

    // Encriptar password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // Cambio aquí

    const [result] = await db.query(
      "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)", // Cambio aquí
      [nombre.trim(), email.trim(), hashedPassword, rol]
    );

    const [newUser] = await db.query(
      "SELECT id_usuario, nombre, email, password, rol FROM usuarios WHERE id_usuario = ?",
      [result.insertId]
    );

    res.status(201).json({ 
      message: "Usuario creado exitosamente",
      usuario: newUser[0]
    });
  } catch (error) {
    console.error("Error en createUsuario:", error);
    
    // Manejar error de email duplicado
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ 
        error: "El email ya está registrado",
        details: "Intenta con otro email"
      });
    }

    res.status(500).json({ 
      error: "Error al crear el usuario",
      details: error.message,
      sqlMessage: error.sqlMessage 
    });
  }
};

// Actualizar un usuario
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, rol } = req.body; // Cambio aquí

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }

    // Validar que exista el usuario
    const [userExists] = await db.query(
      "SELECT id_usuario FROM usuarios WHERE id_usuario = ?",
      [id]
    );

    if (userExists.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Construir la consulta dinámicamente
    let query = "UPDATE usuarios SET ";
    const params = [];
    const updates = [];

    if (nombre?.trim()) {
      updates.push("nombre = ?");
      params.push(nombre.trim());
    }
    if (email?.trim()) {
      updates.push("email = ?");
      params.push(email.trim());
    }
    if (password?.trim()) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt); // Cambio aquí
      updates.push("password = ?"); // Cambio aquí
      params.push(hashedPassword);
    }
    if (rol?.trim()) {
      const rolesValidos = ['admin', 'turista', 'guia'];
      if (!rolesValidos.includes(rol)) {
        return res.status(400).json({ 
          error: "Rol inválido",
          roles_validos: rolesValidos
        });
      }
      updates.push("rol = ?");
      params.push(rol);
    }

    if (updates.length === 0) {
      return res.status(400).json({ 
        error: "Debe proporcionar al menos un campo para actualizar",
        campos_posibles: ["nombre", "email", "password", "rol"] // Cambio aquí
      });
    }

    query += updates.join(", ") + " WHERE id_usuario = ?";
    params.push(id);

    await db.query(query, params);

    // Obtener usuario actualizado
    const [updatedUser] = await db.query(
      "SELECT id_usuario, nombre, email, password, rol FROM usuarios WHERE id_usuario = ?",
      [id]
    );

    res.json({ 
      message: "Usuario actualizado exitosamente",
      usuario: updatedUser[0]
    });
  } catch (error) {
    console.error("Error en updateUsuario:", error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ 
        error: "El email ya está registrado",
        details: "Intenta con otro email"
      });
    }

    res.status(500).json({ 
      error: "Error al actualizar el usuario",
      details: error.message,
      sqlMessage: error.sqlMessage 
    });
  }
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }

    // Verificar si el usuario existe
    const [userExists] = await db.query(
      "SELECT id_usuario FROM usuarios WHERE id_usuario = ?",
      [id]
    );

    if (userExists.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Eliminar (ON DELETE CASCADE se encargará de las relaciones)
    const [result] = await db.query(
      "DELETE FROM usuarios WHERE id_usuario = ?", 
      [id]
    );

    res.json({ 
      message: "Usuario eliminado exitosamente",
      id_usuario: id
    });
  } catch (error) {
    console.error("Error en deleteUsuario:", error);
    res.status(500).json({ 
      error: "Error al eliminar el usuario",
      details: error.message,
      sqlMessage: error.sqlMessage 
    });
  }
};