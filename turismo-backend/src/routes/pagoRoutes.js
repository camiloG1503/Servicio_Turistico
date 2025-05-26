import express from "express";
import {
  listarPagos,
  listarMisPagos,
  obtenerPago,
  crearPago,
  editarPago
} from "../controllers/pagoController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";
import { verificarRol } from "../middlewares/verificarRol.js";

const router = express.Router();

// Admin puede ver y editar todos
router.get("/", verificarToken, verificarRol(["admin"]), listarPagos);

// Turistas pueden ver sus propios pagos
router.get("/mis-pagos", verificarToken, verificarRol(["turista"]), listarMisPagos);

// Rutas con parámetros deben ir después de rutas específicas
router.get("/:id", verificarToken, verificarRol(["admin"]), obtenerPago);
router.put("/:id", verificarToken, verificarRol(["turista"]), editarPago);

// Turistas pueden crear pagos (cuando reservan)
router.post("/", verificarToken, verificarRol(["turista"]), crearPago);

export default router;
