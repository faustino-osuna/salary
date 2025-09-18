import { prisma } from "../../../../shared/infraestructure/prisma/client";
import { IEmpleadoRepository } from "../../domain/repositories/IEmpleadoRepository";
import { Empleado } from "../../domain/entities/Empleado";

export class PrismaEmpleadoRepository implements IEmpleadoRepository {
  private prisma = prisma;

  async create(empleado: Empleado): Promise<void> {
    const { id, ...data } = empleado.toPrimitives();
    await this.prisma.empleado.create({
      data,
    });
  }

  async update(empleado: Empleado): Promise<void> {
    const { id, ...rest } = empleado.toPrimitives();
    await this.prisma.empleado.update({
      where: { id: empleado.id! },
      data: rest,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.empleado.delete({ where: { id } });
  }

  async findById(id: number): Promise<Empleado | null> {
    const record = await this.prisma.empleado.findUnique({ where: { id } });
    return record
      ? new Empleado(
          record.id,
          record.nombre,
          record.numero,
          record.activo,
          record.rolId,
          record.tipoId
        )
      : null;
  }

  async findByNumber(numero: number): Promise<Empleado | null> {
    const record = await this.prisma.empleado.findUnique({ where: { numero } });
    return record
      ? new Empleado(
          record.id,
          record.nombre,
          record.numero,
          record.activo,
          record.rolId,
          record.tipoId
        )
      : null;
  }

  async findAll(): Promise<Empleado[]> {
    const records = await prisma.empleado.findMany();
    return records.map(
      (r) => new Empleado(r.id, r.nombre, r.numero, r.activo, r.rolId, r.tipoId)
    );
  }
}
