import ReservaModel from "../models/reservaModel.js";

export const listarReservas = async (req, res) => {
  try {
    const reservas = await ReservaModel.getAll();
    res.json(reservas);
  } catch (error) {
    console.error("Error al listar reservas:", error);
    res.status(500).json({ mensaje: "Error al obtener las reservas", error: error.message });
  }
};

export const obtenerReserva = async (req, res) => {
  try {
    const reserva = await ReservaModel.getById(req.params.id);
    if (!reserva) return res.status(404).json({ mensaje: "Reserva no encontrada" });
    res.json(reserva);
  } catch (error) {
    console.error("Error al obtener reserva:", error);
    res.status(500).json({ mensaje: "Error al obtener la reserva", error: error.message });
  }
};

export const crearReserva = async (req, res) => {
  try {
    // El token almacena el ID como 'id'
    const id_usuario = req.usuario.id;
    const nueva = { ...req.body, id_usuario };
    const id = await ReservaModel.create(nueva);
    res.status(201).json({ mensaje: "Reserva creada", id });
  } catch (error) {
    console.error("Error al crear reserva:", error);
    res.status(500).json({ mensaje: "Error al crear la reserva", error: error.message });
  }
};

export const editarReserva = async (req, res) => {
  try {
    await ReservaModel.update(req.params.id, req.body);
    res.json({ mensaje: "Reserva actualizada" });
  } catch (error) {
    console.error("Error al editar reserva:", error);
    res.status(500).json({ mensaje: "Error al actualizar la reserva", error: error.message });
  }
};

export const borrarReserva = async (req, res) => {
  try {
    await ReservaModel.delete(req.params.id);
    res.json({ mensaje: "Reserva eliminada" });
  } catch (error) {
    console.error("Error al borrar reserva:", error);
    res.status(500).json({ mensaje: "Error al eliminar la reserva", error: error.message });
  }
};

export const reservasPorUsuario = async (req, res) => {
  try {
    // El token almacena el ID como 'id'
    const usuarioId = req.usuario.id;
    const reservas = await ReservaModel.getByUsuario(usuarioId);
    res.json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas por usuario:", error);
    res.status(500).json({ mensaje: "Error al obtener las reservas del usuario", error: error.message });
  }
};

export const reservasConUsuarios = async (req, res) => {
  try {
    const reservas = await ReservaModel.getAll(); // ya trae join con usuario y destino
    res.json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas con usuarios:", error);
    res.status(500).json({ mensaje: "Error al obtener las reservas con información de usuarios", error: error.message });
  }
};
