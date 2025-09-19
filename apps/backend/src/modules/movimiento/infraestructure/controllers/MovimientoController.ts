import { Request, Response } from "express";
import { CreateMovimientoUseCase } from "../../application/uses-cases/CreateMovimientoUseCase";
import { PrismaMovimientoRepository } from "../persistence/PrismaMovimientoRepository";
import { CreateMovimientoSchema } from "../../application/dto/CreateMovimientoDTO";
import { GetMovimientosUseCase } from "../../application/uses-cases/GetMovimientosUseCase";

export class MovimientoController {
  constructor(private repository: PrismaMovimientoRepository) {}

  create = async (req: Request, res: Response) => {
    const useCase = new CreateMovimientoUseCase(this.repository);
    const parsed = CreateMovimientoSchema.safeParse(req.body);

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

    try {
      const movimientos = await useCase.execute();
      res.status(200).json(movimientos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
