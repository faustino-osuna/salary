import { IEmpleadoRepository } from "../../domain/repositories/IEmpleadoRepository";
import { Empleado } from "../../domain/entities/Empleado";
import { CreateEmpleadoDTO } from "../dto/CreateEmpleadoDTO";

export class CreateEmpleadoUseCase {
  constructor(private empleadoRepository: IEmpleadoRepository) {}

  async execute(data: CreateEmpleadoDTO): Promise<void> {
    const empleado = new Empleado(
      null,
      data.nombre,
      data.numero,
      true,
      data.rolId,
      data.tipoId
    );

    await this.empleadoRepository.create(empleado);
  }
}
