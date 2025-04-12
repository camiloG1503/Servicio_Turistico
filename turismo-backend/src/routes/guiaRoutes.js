import express from "express";
import {
  listarGuias,
  obtenerGuia,
  crearGuia,
  eliminarGuia,
  verUsuariosConReservas
} from "../controllers/guiaController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";
import { verificarRol } from "../middlewares/verificarRol.js";

const router = express.Router();

// Público
router.get("/", listarGuias);
router.get("/:id", obtenerGuia);

// Solo admin puede crear y eliminar
router.post("/", verificarToken, verificarRol(["admin"]), crearGuia);
router.delete("/:id", verificarToken, verificarRol(["admin"]), eliminarGuia);

// Guías autenticados pueden ver usuarios con reservas
router.get("/reservas/turistas", verificarToken, verificarRol(["guia"]), verUsuariosConReservas);

export default router;
