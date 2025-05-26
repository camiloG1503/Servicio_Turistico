import bcrypt from "bcryptjs";
import UsuarioModel from "../models/usuarioModel.js";
import { generarToken } from "../utils/generarToken.js";

// Registro
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol = "turista" } = req.body;

    const usuarioExistente = await UsuarioModel.getByEmail(email);
    if (usuarioExistente) return res.status(400).json({ mensaje: "El correo ya está en uso" });

    const hash = await bcrypt.hash(password, 10);
    const id = await UsuarioModel.create({ nombre, email, password: hash, rol });

    res.status(201).json({ mensaje: "Usuario registrado con éxito", id });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ mensaje: "Error al registrar usuario", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await UsuarioModel.getByEmail(email);
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const token = generarToken(usuario);

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ mensaje: "Error al iniciar sesión", error: error.message });
  }
};

export const obtenerPerfil = (req, res) => {
  try {
    const usuario = req.usuario;

    if (!usuario) {
      return res.status(404).json({ mensaje: "Token inválido o ya expiró" });
    }

    res.json({
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    });
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ mensaje: "Error al obtener el perfil del usuario", error: error.message });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.getAll();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).json({ mensaje: "Error al obtener la lista de usuarios", error: error.message });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await UsuarioModel.getById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ mensaje: "Error al obtener el usuario", error: error.message });
  }
};

export const editarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const userData = { nombre, email, rol };

    // Solo actualizar la contraseña si se proporciona
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      userData.password = hash;
    }

    await UsuarioModel.update(req.params.id, userData);
    res.json({ mensaje: "Usuario actualizado" });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ mensaje: "Error al actualizar usuario", error: error.message });
  }
};

export const borrarUsuario = async (req, res) => {
  try {
    await UsuarioModel.delete(req.params.id);
    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ mensaje: "Error al eliminar usuario", error: error.message });
  }
};
