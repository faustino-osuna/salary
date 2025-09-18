import { Router } from "express";
import { MovimientoController } from "../controllers/MovimientoController";
import { PrismaMovimientoRepository } from "../persistence/PrismaMovimientoRepository";

export const movimientoRouter = Router();
const repository = new PrismaMovimientoRepository();
const controller = new MovimientoController(repository);

movimientoRouter.post("/", controller.create);
