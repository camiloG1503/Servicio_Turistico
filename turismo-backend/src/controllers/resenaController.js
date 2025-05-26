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
  // El token almacena el ID como 'id'
  const id_usuario = req.usuario.id;
  const nueva = { ...req.body, id_usuario };
  const id = await ResenaModel.create(nueva);
  res.status(201).json({ mensaje: "Reseña creada", id });
};

export const borrarResena = async (req, res) => {
  try {
    // Obtener la reseña actual para verificar el propietario
    const resena = await ResenaModel.getById(req.params.id);
    if (!resena) {
      return res.status(404).json({ mensaje: "Reseña no encontrada" });
    }

    // Verificar que el usuario sea el propietario de la reseña
    // El token almacena el ID como 'id'
    const usuarioId = req.usuario.id;
    console.log("ID de usuario en token:", usuarioId, "tipo:", typeof usuarioId);
    console.log("ID de usuario en reseña:", resena.id_usuario, "tipo:", typeof resena.id_usuario);

    // Convertir a números para comparación consistente
    const tokenUserId = parseInt(usuarioId);
    const resenaUserId = parseInt(resena.id_usuario);

    if (resenaUserId !== tokenUserId && req.usuario.rol !== "admin") {
      return res.status(403).json({ mensaje: "No tienes permiso para eliminar esta reseña" });
    }

    // Eliminar la reseña
    await ResenaModel.delete(req.params.id);
    res.json({ mensaje: "Reseña eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar reseña:", error);
    res.status(500).json({ mensaje: "Error al eliminar la reseña", error: error.message });
  }
};

export const resenasConUsuarios = async (req, res) => {
    const resenas = await ResenaModel.getAll(); // ya trae JOIN con usuarios
    res.json(resenas);
  };

export const actualizarResena = async (req, res) => {
  try {
    // Obtener la reseña actual para verificar el propietario
    const resena = await ResenaModel.getById(req.params.id);
    if (!resena) {
      return res.status(404).json({ mensaje: "Reseña no encontrada" });
    }

    // Verificar que el usuario sea el propietario de la reseña
    // El token almacena el ID como 'id'
    const usuarioId = req.usuario.id;
    console.log("ID de usuario en token:", usuarioId, "tipo:", typeof usuarioId);
    console.log("ID de usuario en reseña:", resena.id_usuario, "tipo:", typeof resena.id_usuario);

    // Convertir a números para comparación consistente
    const tokenUserId = parseInt(usuarioId);
    const resenaUserId = parseInt(resena.id_usuario);

    if (resenaUserId !== tokenUserId && req.usuario.rol !== "admin") {
      return res.status(403).json({ mensaje: "No tienes permiso para editar esta reseña" });
    }

    // Actualizar la reseña
    await ResenaModel.update(req.params.id, req.body);
    res.json({ mensaje: "Reseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar reseña:", error);
    res.status(500).json({ mensaje: "Error al actualizar la reseña", error: error.message });
  }
};
