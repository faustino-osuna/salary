import { Router } from "express";
import { RolController } from "../controllers/RolController";
import { PrismaRolRepository } from "../persistence/PrismaRolesRepository";

export const rolRouter = Router();
const repository = new PrismaRolRepository();
const controller = new RolController(repository);

rolRouter.get("/", controller.getAll);

