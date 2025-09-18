import { Empleado } from "../../domain/entities/Empleado";
import { IEmpleadoRepository } from "../../domain/repositories/IEmpleadoRepository";
import { GetEmpleadosDTO } from "../dto/GetEmpleados";

export class GetEmpleadosUseCase {
  constructor(private repository: IEmpleadoRepository) {}

  async execute(): Promise<GetEmpleadosDTO[]> {
    const empleados = await this.repository.findAll();

    return empleados.map((empleado) => empleado.toPrimitives());
  }
}
