import { Request, Response } from "express";
import { CreateEmpleadoUseCase } from "../../application/uses-cases/CreateEmpleadoUseCase";
import { PrismaEmpleadoRepository } from "../persistence/PrismaEmpleadoRepository";

export class EmpleadoController {
  constructor(private repository: PrismaEmpleadoRepository) {}

  create = async (req: Request, res: Response) => {
    const useCase = new CreateEmpleadoUseCase(this.repository);

    try {
      await useCase.execute(req.body);
      res.status(201).json({ message: "empleado creado" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
