import { Request, Response } from "express";
import { PrismaTipoRepository } from "../persistence/PrismaTiposRepository";
import { GetTiposEmpleadosUseCase } from "../../application/uses-cases/GetTiposEmpleadosUseCase";

export class TipoController {
  constructor(private repository: PrismaTipoRepository) {}

  getAll = async (req: Request, res: Response) => {
    const useCase = new GetTiposEmpleadosUseCase(this.repository);

    try {
      const empleados = await useCase.execute();
      res.status(200).json(empleados);
    } catch (error: any) {
      res.status(500).json({ error: "Error al obtener los tipos" });
    }
  };
}
