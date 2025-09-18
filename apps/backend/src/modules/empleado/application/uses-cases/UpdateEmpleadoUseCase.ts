import { IEmpleadoRepository } from "../../domain/repositories/IEmpleadoRepository";
import { UpdateEmpleadoDTO } from "../dto/UpdateEmpleadoDTO";

export class UpdateEmpleadoUseCase {
  constructor(private repository: IEmpleadoRepository) {}

  async execute(data: UpdateEmpleadoDTO): Promise<void> {
    const empleado = await this.repository.findById(data.id);

    if (!empleado) {
      throw new Error("Empleado no existe");
    }

    empleado.actualizar(data);

    await this.repository.update(empleado);
  }
}
