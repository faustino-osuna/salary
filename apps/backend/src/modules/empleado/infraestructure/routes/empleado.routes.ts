import { Router } from "express";
import { EmpleadoController } from "../controllers/EmpleadoController";
import { PrismaEmpleadoRepository } from "../persistence/PrismaEmpleadoRepository";

export const empleadoRouter = Router();
const repository = new PrismaEmpleadoRepository();
const controller = new EmpleadoController(repository);

empleadoRouter.get("/", controller.getAll);
empleadoRouter.get("/:id", controller.getById);
empleadoRouter.post("/", controller.create);
empleadoRouter.put("/", controller.update);
empleadoRouter.delete("/:id", controller.delete);
