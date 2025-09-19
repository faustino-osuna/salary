import { IEmpleadoRepository } from "../../domain/repositories/IEmpleadoRepository";
import { GetEmpleadosDTO } from "../dto/GetEmpleadosDTO";

export class GetEmpleadosUseCase {
  constructor(private repository: IEmpleadoRepository) {}

  async execute(): Promise<GetEmpleadosDTO[]> {
    const empleados = await this.repository.findAll();

    return empleados.map((e) => ({
      id: e.id!,
      nombre: e.nombre,
      numero: e.numero,
      activo: e.activo,
      rol: {
        id: e.rol!.id,
        nombre: e.rol!.nombre,
      },
      tipo: {
        id: e.tipo!.id,
        nombre: e.tipo!.nombre,
      },
    }));
  }
}
