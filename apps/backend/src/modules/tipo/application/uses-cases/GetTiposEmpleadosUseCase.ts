import { ITipoRepository } from "../../domain/repositories/ITipoRepository";
import { GetTipoEmpleadoDTO } from "../dto/GetTiposEmpleadosDTO";

export class GetTiposEmpleadosUseCase {
  constructor(private repository: ITipoRepository) {}

  async execute(): Promise<GetTipoEmpleadoDTO[]> {
    const tipos = await this.repository.findAll();

    return tipos.map((tipo) => ({
      id: tipo.id!,
      nombre: tipo.nombre
    }))
  }
}
