import { Request, Response } from "express";
import { PrismaEmpleadoRepository } from "../persistence/PrismaEmpleadoRepository";
import { CreateEmpleadoUseCase } from "../../application/uses-cases/CreateEmpleadoUseCase";
import { UpdateEmpleadoUseCase } from "../../application/uses-cases/UpdateEmpleadoUseCase";
import { DeleteEmpleadoUseCase } from "../../application/uses-cases/DeleteEmpleadoUseCase";
import { GetEmpleadoByIdUseCase } from "../../application/uses-cases/GetEmpleadoByIdUseCase";
import { GetEmpleadosUseCase } from "../../application/uses-cases/GetEmpleadosUseCase";

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

  update = async (req: Request, res: Response) => {
    const useCase = new UpdateEmpleadoUseCase(this.repository);
    const { id: idEmpleado } = req.params;

    try {
      const id = parseInt(idEmpleado, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }
      await useCase.execute({ id, ...req.body });
      res.status(200).json({ message: "empleado actualizado" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    const useCase = new DeleteEmpleadoUseCase(this.repository);
    const { id: idEmpleado } = req.params;

    try {
      const id = parseInt(idEmpleado, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      await useCase.execute({ id });
      res.status(200).json({ message: "Empleado eliminado" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    const useCase = new GetEmpleadoByIdUseCase(this.repository);
    const { id } = req.params;

    try {
      const empleadoId = parseInt(id, 10);
      if (isNaN(empleadoId)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const empleado = await useCase.execute({ id: empleadoId });

      res.status(200).json(empleado.toPrimitives());
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    const useCase = new GetEmpleadosUseCase(this.repository);

    try {
      const empleados = await useCase.execute();
      res.status(200).json(empleados);
    } catch (error: any) {
      res.status(500).json({ error: "Error al obtener los empleados" });
    }
  };
}
