import { prisma } from "../../../../shared/infraestructure/prisma/client";
import { IRolRepository } from "../../domain/repositories/IRolRepository";
import { RolEmpleado } from "../../domain/entities/Rol";

export class PrismaRolRepository implements IRolRepository {
  private prisma = prisma;

  async findAll(): Promise<RolEmpleado[]> {
    const records = await prisma.role.findMany();
    return records.map(r => new RolEmpleado(r.id, r.nombre))
  }
}