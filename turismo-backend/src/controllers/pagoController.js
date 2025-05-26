import PagoModel from "../models/pagoModel.js";

export const listarPagos = async (req, res) => {
  const pagos = await PagoModel.getAll();
  res.json(pagos);
};

export const listarMisPagos = async (req, res) => {
  try {
    // El id del usuario autenticado está disponible en req.usuario.id
    const userId = req.usuario.id;
    const pagos = await PagoModel.getByUserId(userId);
    res.json(pagos);
  } catch (error) {
    console.error("Error al obtener pagos del usuario:", error);
    res.status(500).json({ mensaje: "Error al obtener tus pagos" });
  }
};

export const obtenerPago = async (req, res) => {
  const pago = await PagoModel.getById(req.params.id);
  if (!pago) return res.status(404).json({ mensaje: "Pago no encontrado" });
  res.json(pago);
};

export const crearPago = async (req, res) => {
  const id = await PagoModel.create(req.body);
  res.status(201).json({ mensaje: "Pago creado", id });
};

export const editarPago = async (req, res) => {
  await PagoModel.update(req.params.id, req.body);
  res.json({ mensaje: "Pago actualizado" });
};
