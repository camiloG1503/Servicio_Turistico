import express from "express";
import {
  listarDestinos,
  obtenerDestino,
  crearDestino,
  editarDestino,
  eliminarDestino
} from "../controllers/destinoController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";
import { verificarRol } from "../middlewares/verificarRol.js";

const router = express.Router();

// Público
router.get("/", listarDestinos);
router.get("/:id", obtenerDestino);

// Admin
router.post("/", verificarToken, verificarRol(["admin"]), crearDestino);
router.put("/:id", verificarToken, verificarRol(["admin"]), editarDestino);
router.delete("/:id", verificarToken, verificarRol(["admin"]), eliminarDestino);

export default router;
