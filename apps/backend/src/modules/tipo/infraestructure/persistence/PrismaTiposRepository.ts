import { prisma } from "../../../../shared/infraestructure/prisma/client";
import { ITipoRepository } from "../../domain/repositories/ITipoRepository";
import { TipoEmpleado } from "../../domain/entities/Tipo";

export class PrismaTipoRepository implements ITipoRepository {
  private prisma = prisma;

  async findAll(): Promise<TipoEmpleado[]> {
    const records = await prisma.tipoEmpleado.findMany();
    return records.map(r => new TipoEmpleado(r.id, r.nombre))
  }
}