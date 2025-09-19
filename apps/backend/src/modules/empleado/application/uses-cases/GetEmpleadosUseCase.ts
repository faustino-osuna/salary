import { IEmpleadoRepository } from "../../domain/repositories/IEmpleadoRepository";
import { GetEmpleadosDTO } from "../dto/GetEmpleadosDTO";

export class GetEmpleadosUseCase {
  constructor(private repository: IEmpleadoRepository) {}

  async execute(search?: string): Promise<GetEmpleadosDTO[]> {
    const empleados = await this.repository.findAll(search);
    console.log(empleados)

    return empleados.map((e) => ({
      id: e.id!,
      nombre: e.nombre,
      numero: e.numero,
      activo: e.activo,
      rol: {
        id: e.role!.id,
        nombre: e.role!.nombre,
      },
      tipo: {
        id: e.tipoEmpleado!.id,
        nombre: e.tipoEmpleado!.nombre,
      },
    }));
  }
}
