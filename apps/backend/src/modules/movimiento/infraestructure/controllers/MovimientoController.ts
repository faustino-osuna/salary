import { Request, Response } from "express";
import { CreateMovimientoUseCase } from "../../application/uses-cases/CreateMovimientoUseCase";
import { PrismaMovimientoRepository } from "../persistence/PrismaMovimientoRepository";
import { CreateMovimientoSchema } from "../../application/dto/CreateMovimientoDTO";
import { GetMovimientosUseCase } from "../../application/uses-cases/GetMovimientosUseCase";
import { UpdateMovimientoUseCase } from "../../application/uses-cases/UpdateMovimientoUseCase";
import { DeleteMovimientoUseCase } from "../../application/uses-cases/DeleteMovimientoUseCase";

export class MovimientoController {
  constructor(private repository: PrismaMovimientoRepository) {}

  create = async (req: Request, res: Response) => {
    const useCase = new CreateMovimientoUseCase(this.repository);
    const parsed = CreateMovimientoSchema.safeParse(req.body.data);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues });
    }
    try {
      await useCase.execute(parsed.data);
      res.status(201).json({ message: "movimiento creado" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  findAll = async (req: Request, res: Response) => {
    const useCase = new GetMovimientosUseCase(this.repository);
    const { search } = req.query;

    try {
      const movimientos = await useCase.execute(search as string | undefined);
      res.status(200).json(movimientos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    const useCase = new UpdateMovimientoUseCase(this.repository);
    const { id: idMovimiento } = req.params;

    try {
      const id = parseInt(idMovimiento, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }
      await useCase.execute({ id, ...req.body.data });
      res.status(200).json({ message: "movimiento actualizado" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    const useCase = new DeleteMovimientoUseCase(this.repository);
    const { id: idMovimiento } = req.params;

    try {
      const id = parseInt(idMovimiento, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      await useCase.execute({ id });
      res.status(200).json({ message: "Movimiento eliminado" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
