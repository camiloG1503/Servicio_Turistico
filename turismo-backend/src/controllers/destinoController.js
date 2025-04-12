import DestinoModel from "../models/destinoModel.js";

export const listarDestinos = async (req, res) => {
  const destinos = await DestinoModel.getAll();
  res.json(destinos);
};

export const obtenerDestino = async (req, res) => {
  const destino = await DestinoModel.getById(req.params.id);
  if (!destino) return res.status(404).json({ mensaje: "Destino no encontrado" });
  res.json(destino);
};

export const crearDestino = async (req, res) => {
  const id = await DestinoModel.create(req.body);
  res.status(201).json({ mensaje: "Destino creado", id });
};

export const editarDestino = async (req, res) => {
  await DestinoModel.update(req.params.id, req.body);
  res.json({ mensaje: "Destino actualizado" });
};

export const eliminarDestino = async (req, res) => {
  await DestinoModel.delete(req.params.id);
  res.json({ mensaje: "Destino eliminado" });
};
