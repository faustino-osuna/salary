import { IMovimientoRepository } from "../../domain/repositories/IMovimientoRepository";
import { Movimiento } from "../../domain/entities/Movimiento";
import { CreateMovimientoDTO } from "../dto/CreateMovimientoDTO";

export class CreateMovimientoUseCase {
  constructor(private repository: IMovimientoRepository) {}

  async execute(data: CreateMovimientoDTO): Promise<void> {
    const movimiento = new Movimiento(
      null,
      data.empleadoId,
      data.rolId,
      data.tipoId,
      data.horasTrabajadas ?? 8,
      data.entregas ?? 0,
      new Date(data.fecha),
      data.cubrioTurno
    );
    await this.repository.create(movimiento);
  }
}
