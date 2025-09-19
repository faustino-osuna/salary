import { IMovimientoRepository } from "../../domain/repositories/IMovimientoRepository";
import { GetMovimientoByEmpleadoIdDTO } from "../dto/GetMovimientosByEmpleadoIdDTO";

export class GetMovimientosUseCase {
  constructor(private repository: IMovimientoRepository) {}

  async execute(id: number): Promise<GetMovimientoByEmpleadoIdDTO[]> {
    const movimientos = await this.repository.findAllByIdEmpleado(id);

    if (!movimientos) {
      throw new Error("Empleado no encontrado");
    }

    return movimientos;
  }
}
