import { IMovimientoRepository } from "../../domain/repositories/IMovimientoRepository";
import { DeleteMovimientoDTO } from "../dto/DeleteMovimientoDTO";

export class DeleteMovimientoUseCase {
  constructor(private repository: IMovimientoRepository) {}

  async execute({ id }: DeleteMovimientoDTO): Promise<void> {
    const empleado = await this.repository.findById(id);

    if (!empleado) {
      throw new Error("Empleado no existe");
    }

    await this.repository.delete(id);
  }
}
