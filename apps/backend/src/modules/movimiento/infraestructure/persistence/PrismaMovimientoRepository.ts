import { prisma } from "../../../../shared/infraestructure/prisma/client";
import { IMovimientoRepository } from "../../domain/repositories/IMovimientoRepository";
import { Movimiento } from "../../domain/entities/Movimiento";

export class PrismaMovimientoRepository implements IMovimientoRepository {
  private prisma = prisma;

  async create(movimiento: Movimiento): Promise<void> {
    const { id, fecha, ...rest } = movimiento.toPrimitives();

    await this.prisma.movimiento.create({
      data: {
        ...rest,
        fecha: new Date(fecha),
      },
    });
  }

  async update(movimiento: Movimiento): Promise<void> {
    const { id, ...data } = movimiento.toPrimitives();
    await this.prisma.movimiento.update({
      where: { id: id! },
      data: data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.movimiento.delete({ where: { id } });
  }

  async findById(id: number): Promise<Movimiento | null> {
    const record = await this.prisma.movimiento.findUnique({ where: { id } });
    if (!record) return null;

    return new Movimiento(
      record.id,
      record.empleadoId,
      record.rolId,
      record.tipoId,
      Number(record.horasTrabajadas),
      record.entregas,
      record.fecha
    );
  }

  async findAll(): Promise<Movimiento[]> {
    const records = await this.prisma.movimiento.findMany();
    return records.map(
      (r) =>
        new Movimiento(
          r.id,
          r.empleadoId,
          r.rolId,
          r.tipoId,
          Number(r.horasTrabajadas),
          r.entregas,
          r.fecha
        )
    );
  }

  async findAllByIdEmpleado(id: number): Promise<Movimiento[] | null> {
    const records = await this.prisma.movimiento.findMany({
      where: { empleadoId: id },
    });

    if (records.length === 0) return null;

    return records.map(
      (r) =>
        new Movimiento(
          r.id,
          r.empleadoId,
          r.rolId,
          r.tipoId,
          Number(r.horasTrabajadas),
          r.entregas,
          r.fecha
        )
    );
  }
}
