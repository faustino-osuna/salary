import { Router } from "express";
import { EmpleadoController } from "../controllers/EmpleadoController";
import { PrismaEmpleadoRepository } from "../persistence/PrismaEmpleadoRepository";

export const empleadoRouter = Router();
const repository = new PrismaEmpleadoRepository();
const controller = new EmpleadoController(repository);

empleadoRouter.post("/", controller.create);
