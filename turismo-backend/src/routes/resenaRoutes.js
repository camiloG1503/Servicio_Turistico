import express from "express";
import {
  listarResenas,
  obtenerResena,
  crearResena,
  borrarResena,
  resenasConUsuarios,
  actualizarResena
} from "../controllers/resenaController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";
import { verificarRol } from "../middlewares/verificarRol.js";

const router = express.Router();

// Público
router.get("/", listarResenas);
router.get("/:id", obtenerResena);

// Turistas pueden comentar
router.post("/", verificarToken, verificarRol(["turista"]), crearResena);

// Turistas pueden editar sus propias reseñas
router.put("/:id", verificarToken, verificarRol(["turista", "admin"]), actualizarResena);

// Turistas pueden eliminar sus propias reseñas
router.delete("/:id", verificarToken, verificarRol(["turista", "admin"]), borrarResena);

// Admin puede ver todas las reseñas con usuarios
router.get("/admin/resenas-usuarios", verificarToken, verificarRol(["admin"]), resenasConUsuarios);



export default router;
