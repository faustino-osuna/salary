import { Request, Response } from "express";
import { PrismaRolRepository } from "../persistence/PrismaRolesRepository";
import { GetRolesEmpleadosUseCase } from "../../application/uses-cases/GetRolesEmpleadosUseCase";

export class RolController {
  constructor(private repository: PrismaRolRepository) {}

  getAll = async (req: Request, res: Response) => {
    const useCase = new GetRolesEmpleadosUseCase(this.repository);

    try {
      const empleados = await useCase.execute();
      res.status(200).json(empleados);
    } catch (error: any) {
      res.status(500).json({ error: "Error al obtener los roles" });
    }
  };
}
