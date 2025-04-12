import express from "express";
import {
  registrarUsuario,
  login,
  listarUsuarios,
  obtenerUsuario,
  editarUsuario,
  borrarUsuario,
} from "../controllers/usuarioController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";
import { verificarRol } from "../middlewares/verificarRol.js";

const router = express.Router();

router.post("/register", registrarUsuario);
router.post("/login", login);
router.get("/", verificarToken, verificarRol(["admin"]), listarUsuarios);
router.get("/:id", obtenerUsuario);
router.put("/:id", editarUsuario);
router.delete("/:id", borrarUsuario);

export default router;
