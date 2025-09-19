import { IMovimientoRepository } from "../../domain/repositories/IMovimientoRepository";
import { GetMovimientosDTO } from "../dto/GetMovimientosDTO";

export class GetMovimientosUseCase {
  constructor(private repository: IMovimientoRepository) {}

  async execute(): Promise<GetMovimientosDTO[]> {
    const movimientos = await this.repository.findAll();

    return movimientos.map((m) => ({
      id: m.id!,
      horasTrabajadas: m.horasTrabajadas,
      entregas: m.entregas,
      fecha: m.fecha.toISOString(),
      empleado: {
        id: m.empleado!.id!,
        nombre: m.empleado!.nombre,
        numero: m.empleado!.numero,
        activo: m.empleado!.activo,
      },
      rol: {
        id: m.rol!.id,
        nombre: m.rol!.nombre,
      },
      tipo: {
        id: m.tipoEmpleado!.id,
        nombre: m.tipoEmpleado!.nombre,
      },
      cubrio_turno: m.cubrioTurno
    }));
  }
}
