import express from "express";
import { getDestinos, createDestino } from "../controllers/destinoController.js";

const router = express.Router();

router.get("/", getDestinos);
router.post("/", createDestino);

export default router;
