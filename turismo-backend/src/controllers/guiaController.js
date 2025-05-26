import GuiaModel from "../models/guiaModel.js";

export const listarGuias = async (req, res) => {
  try {
    const guias = await GuiaModel.getAll();
    res.json(guias);
  } catch (error) {
    console.error("Error en listarGuias:", error.message, error.stack);

    // Enviar una respuesta más amigable al cliente sin exponer detalles del error
    res.status(500).json({ 
      mensaje: "Error al obtener la lista de guías. Por favor, intente nuevamente más tarde.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const obtenerGuia = async (req, res) => {
  try {
    const guia = await GuiaModel.getById(req.params.id);
    if (!guia) return res.status(404).json({ mensaje: "Guía no encontrado" });
    res.json(guia);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener guía", error });
  }
};

export const crearGuia = async (req, res) => {
  try {
    const id = await GuiaModel.create(req.body);
    res.status(201).json({ mensaje: "Guía creado exitosamente", id });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear guía", error });
  }
};

export const eliminarGuia = async (req, res) => {
  try {
    const eliminado = await GuiaModel.delete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Guía no encontrado" });
    res.json({ mensaje: "Guía eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar guía", error });
  }
};

export const verUsuariosConReservas = async (req, res) => {
  try {
    const usuarios = await GuiaModel.getUsuariosConReservas();
    res.json(usuarios);
  } catch (error) {
    console.error("Error en verUsuariosConReservas:", error.message, error.stack);

    // Enviar una respuesta más amigable al cliente sin exponer detalles del error
    res.status(500).json({ 
      mensaje: "Error al obtener la lista de turistas con reservas. Por favor, intente nuevamente más tarde.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
