import express from "express";
import {
  listarResenas,
  obtenerResena,
  crearResena,
  borrarResena,
  resenasConUsuarios
} from "../controllers/resenaController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";
import { verificarRol } from "../middlewares/verificarRol.js";

const router = express.Router();

// Público
router.get("/", listarResenas);
router.get("/:id", obtenerResena);

// Turistas pueden comentar
router.post("/", verificarToken, verificarRol(["turista"]), crearResena);

// Admin puede eliminar
router.delete("/:id", verificarToken, verificarRol(["turista"]), borrarResena);
router.get("/admin/resenas-usuarios", verificarToken, verificarRol(["admin"]), resenasConUsuarios);



export default router;
