import { IEmpleadoRepository } from "../../domain/repositories/IEmpleadoRepository";
import { DeleteEmpleadoDTO } from "../dto/DeleteEmpleadoDTO";

export class DeleteEmpleadoUseCase {
  constructor(private repository: IEmpleadoRepository) {}

  async execute({ id }: DeleteEmpleadoDTO): Promise<void> {
    const empleado = await this.repository.findById(id);
    console.log(empleado);

    if (!empleado) {
      throw new Error("Empleado no existe");
    }

    empleado.desactivar();

    await this.repository.update(empleado);
  }
}
