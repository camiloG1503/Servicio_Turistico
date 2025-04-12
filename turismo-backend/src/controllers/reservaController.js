import ReservaModel from "../models/reservaModel.js";

export const listarReservas = async (req, res) => {
  const reservas = await ReservaModel.getAll();
  res.json(reservas);
};

export const obtenerReserva = async (req, res) => {
  const reserva = await ReservaModel.getById(req.params.id);
  if (!reserva) return res.status(404).json({ mensaje: "Reserva no encontrada" });
  res.json(reserva);
};

export const crearReserva = async (req, res) => {
  const id_usuario = req.usuario.id_usuario || req.usuario.id; // desde token
  const nueva = { ...req.body, id_usuario };
  const id = await ReservaModel.create(nueva);
  res.status(201).json({ mensaje: "Reserva creada", id });
};

export const editarReserva = async (req, res) => {
  await ReservaModel.update(req.params.id, req.body);
  res.json({ mensaje: "Reserva actualizada" });
};

export const borrarReserva = async (req, res) => {
  await ReservaModel.delete(req.params.id);
  res.json({ mensaje: "Reserva eliminada" });
};

export const reservasPorUsuario = async (req, res) => {
  const usuarioId = req.usuario.id || req.usuario.id_usuario;
  const reservas = await ReservaModel.getByUsuario(usuarioId);
  res.json(reservas);
};

export const reservasConUsuarios = async (req, res) => {
  const reservas = await ReservaModel.getAll(); // ya trae join con usuario y destino
  res.json(reservas);
};
