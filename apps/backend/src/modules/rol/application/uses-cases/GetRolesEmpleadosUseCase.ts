import { IRolRepository } from "../../domain/repositories/IRolRepository";
import { GetRolEmpleadoDTO } from "../dto/GetRolesEmpleadosDTO";

export class GetRolesEmpleadosUseCase {
  constructor(private repository: IRolRepository) {}

  async execute(): Promise<GetRolEmpleadoDTO[]> {
    const tipos = await this.repository.findAll();

    return tipos.map((tipo) => ({
      id: tipo.id!,
      nombre: tipo.nombre
    }))
  }
}
