import express from "express";
import { obtenerDashboard } from "../controllers/adminController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";
import { verificarRol } from "../middlewares/verificarRol.js";

const router = express.Router();

// Solo admin
router.get("/dashboard", verificarToken, verificarRol(["admin"]), obtenerDashboard);

export default router;
