import { Router } from "express";
import { TipoController } from "../controllers/TipoControllers";
import { PrismaTipoRepository } from "../persistence/PrismaTiposRepository";

export const tipoRouter = Router();
const repository = new PrismaTipoRepository();
const controller = new TipoController(repository);

tipoRouter.get("/", controller.getAll);

