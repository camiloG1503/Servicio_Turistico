import ResenaModel from "../models/resenaModel.js";

export const listarResenas = async (req, res) => {
  const resenas = await ResenaModel.getAll();
  res.json(resenas);
};

export const obtenerResena = async (req, res) => {
  const resena = await ResenaModel.getById(req.params.id);
  if (!resena) return res.status(404).json({ mensaje: "Reseña no encontrada" });
  res.json(resena);
};

export const crearResena = async (req, res) => {
  const id_usuario = req.usuario.id || req.usuario.id_usuario;
  const nueva = { ...req.body, id_usuario };
  const id = await ResenaModel.create(nueva);
  res.status(201).json({ mensaje: "Reseña creada", id });
};

export const borrarResena = async (req, res) => {
  await ResenaModel.delete(req.params.id);
  res.json({ mensaje: "Reseña eliminada" });
};

export const resenasConUsuarios = async (req, res) => {
    const resenas = await ResenaModel.getAll(); // ya trae JOIN con usuarios
    res.json(resenas);
  };
  
