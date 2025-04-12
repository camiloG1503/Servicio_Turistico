import bcrypt from "bcryptjs";
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorEmail,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
} from "../models/usuarioModel.js";
import { generarToken } from "../utils/generarToken.js";

// Registro
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol = "turista" } = req.body;

    const usuarioExistente = await obtenerUsuarioPorEmail(email);
    if (usuarioExistente) return res.status(400).json({ mensaje: "El correo ya está en uso" });

    const hash = await bcrypt.hash(password, 10);
    const id = await crearUsuario({ nombre, email, password: hash, rol });

    res.status(201).json({ mensaje: "Usuario registrado con éxito", id });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar usuario", error });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await obtenerUsuarioPorEmail(email);
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
    res.status(500).json({ mensaje: "Error al iniciar sesión", error });
  }
};

// Obtener todos
export const listarUsuarios = async (req, res) => {
  const usuarios = await obtenerUsuarios();
  res.json(usuarios);
};

// Obtener uno
export const obtenerUsuario = async (req, res) => {
  const usuario = await obtenerUsuarioPorId(req.params.id);
  if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
  res.json(usuario);
};

// Actualizar
export const editarUsuario = async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await actualizarUsuario(req.params.id, { nombre, email, password: hash, rol });
  res.json({ mensaje: "Usuario actualizado" });
};

// Eliminar
export const borrarUsuario = async (req, res) => {
  await eliminarUsuario(req.params.id);
  res.json({ mensaje: "Usuario eliminado" });
};
