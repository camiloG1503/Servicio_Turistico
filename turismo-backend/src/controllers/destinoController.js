import {
    listarDestinos,
    obtenerDestino,
    crearDestino,
    editarDestino,
    borrarDestino,
} from "../controllers/destinoController.js";

export const listarDestinos = async (req, res) => {
    const destinos = await obtenerDestinos();
    res.json(destinos);
};

export const obtenerDestino = async (req, res) => {
    const destino = await obtenerDestinoPorId(req.params.id);
    if (!destino) return res.status(404).json({ mensaje: "Destino no encontrado" });
    res.json(destino);
};

export const crearDestino = async (req, res) => {
    const { nombre, descripcion, precio, imagen } = req.body;
    const id = await crearDestino({ nombre, descripcion, precio, imagen });
    res.status(201).json({ id, mensaje: "Destino creado" });
};

export const editarDestino = async (req, res) => {
    const { nombre, descripcion, precio, imagen } = req.body;
    await actualizarDestino(req.params.id, { nombre, descripcion, precio, imagen });
    res.json({ mensaje: "Destino actualizado" });
};

export const borrarDestino = async (req, res) => {
    await eliminarDestino(req.params.id);
    res.json({ mensaje: "Destino eliminado" });
};
