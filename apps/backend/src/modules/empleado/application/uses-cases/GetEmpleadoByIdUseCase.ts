import { Empleado } from "../../domain/entities/Empleado";
import { IEmpleadoRepository } from "../../domain/repositories/IEmpleadoRepository";
import { GetEmpleadoByIdDTO } from "../dto/GetEmpleadoByIdDTO";

export class GetEmpleadoByIdUseCase {
  constructor(private repository: IEmpleadoRepository) {}

  async execute(data: GetEmpleadoByIdDTO): Promise<Empleado> {
    const empleado = await this.repository.findById(data.id);

    if (!empleado) {
      throw new Error("Empleado no encontrado");
    }

    return empleado;
  }
}
