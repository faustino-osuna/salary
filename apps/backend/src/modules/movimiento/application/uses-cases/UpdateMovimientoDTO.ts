import { IMovimientoRepository } from "../../domain/repositories/IMovimientoRepository";
import {
  UpdateMovimientoDTO,
  UpdateMovimientoSchema,
} from "../dto/UpdateMovimientoDTO";
import { Movimiento } from "../../domain/entities/Movimiento";

export class UpdateMovimientoUseCase {
  constructor(private repository: IMovimientoRepository) {}

  async execute(dto: UpdateMovimientoDTO): Promise<Movimiento> {
    const movimiento = await this.repository.findById(dto.id);
    if (!movimiento) {
      throw new Error("Movimiento no encontrado");
    }

    const parsed = UpdateMovimientoSchema.parse(dto);

    // Convertimos fecha si viene como string
    if (parsed.fecha) {
      parsed.fecha = new Date(parsed.fecha);
    }

    movimiento.actualizar(dto);

    await this.repository.update(movimiento);
    return movimiento;
  }
}
