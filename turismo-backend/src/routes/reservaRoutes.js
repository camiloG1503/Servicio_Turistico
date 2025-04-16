import express from "express";
import {
  listarReservas,
  obtenerReserva,
  crearReserva,
  editarReserva,
  borrarReserva,
  reservasPorUsuario,
  reservasConUsuarios
} from "../controllers/reservaController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";
import { verificarRol } from "../middlewares/verificarRol.js";

const router = express.Router();

// Público autenticado (turistas, guías, admin)
router.post("/", verificarToken, verificarRol(["turista"]), crearReserva);
router.get("/mis-reservas", verificarToken, reservasPorUsuario);

// Admin y guía
router.get("/", verificarToken, verificarRol(["admin", "guia"]), listarReservas);
router.get("/:id", verificarToken, verificarRol(["admin", "guia"]), obtenerReserva);
router.put("/:id", verificarToken, verificarRol(["turista"]), editarReserva);
router.delete("/:id", verificarToken, verificarRol(["turista"]), borrarReserva);
router.get("/admin/reservas-usuarios", verificarToken, verificarRol(["admin"]), reservasConUsuarios);

export default router;
