import express from "express";
import {
  registrarUsuario,
  login,
  listarUsuarios,
  obtenerUsuario,
  editarUsuario,
  borrarUsuario,
  obtenerPerfil
} from "../controllers/usuarioController.js";

import { verificarToken } from "../middlewares/authMiddleware.js";
import { verificarRol } from "../middlewares/verificarRol.js";

const router = express.Router();

// Auth
router.post("/register", registrarUsuario);
router.post("/login", login);

// Perfil (usuario autenticado)
router.get("/perfil", verificarToken, obtenerPerfil);

// Admin: solo listar todos los usuarios
router.get("/", verificarToken, verificarRol(["admin"]), listarUsuarios);

// Operaciones por ID (admin o interno según config)
router.get("/:id", verificarToken, verificarRol(["admin"]), obtenerUsuario);
router.put("/:id", verificarToken, editarUsuario);
router.delete("/:id", verificarToken, borrarUsuario);

export default router;
