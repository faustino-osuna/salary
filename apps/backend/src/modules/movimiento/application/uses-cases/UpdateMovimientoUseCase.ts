import { IMovimientoRepository } from "../../domain/repositories/IMovimientoRepository";
import {
  UpdateMovimientoDTO,
} from "../dto/UpdateMovimientoDTO";
import { Movimiento } from "../../domain/entities/Movimiento";

export class UpdateMovimientoUseCase {
  constructor(private repository: IMovimientoRepository) {}

  async execute(dto: UpdateMovimientoDTO): Promise<Movimiento> {
    const movimiento = await this.repository.findById(dto.id);
    if (!movimiento) {
      throw new Error("Movimiento no encontrado");
    }

    const dataToUpdate = {
      empleadoId: dto.empleadoId,
      rolId: dto.rolId,
      tipoId: dto.tipoId,
      horasTrabajadas: dto.horasTrabajadas,
      entregas: dto.entregas,
      fecha: new Date(dto.fecha),
      cubrioTurno: dto.cubrioTurno
    };

    movimiento.actualizar(dataToUpdate);

    await this.repository.update(movimiento);
    return movimiento;
  }
}
