import { prisma } from "../../../../shared/infraestructure/prisma/client";
import { IMovimientoRepository } from "../../domain/repositories/IMovimientoRepository";
import { Movimiento } from "../../domain/entities/Movimiento";

export class PrismaMovimientoRepository implements IMovimientoRepository {
  private prisma = prisma;

  async create(movimiento: Movimiento): Promise<void> {
    const { id, fecha, empleado, rol, tipoEmpleado, cubrioTurno, ...rest } =
      movimiento.toPrimitives();

    await this.prisma.movimiento.create({
      data: {
        ...rest,
        fecha: new Date(fecha),
        cubrio_turno: cubrioTurno
      },
    });
  }

  async update(movimiento: Movimiento): Promise<void> {
    const primitives = movimiento.toPrimitives();

    await this.prisma.movimiento.update({
      where: {
        id: primitives.id!,
      },
      data: {
        empleadoId: primitives.empleadoId,
        rolId: primitives.rolId,
        tipoId: primitives.tipoId,
        horasTrabajadas: primitives.horasTrabajadas,
        entregas: primitives.entregas,
        fecha: primitives.fecha,
        cubrio_turno: primitives.cubrioTurno,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.movimiento.delete({ where: { id } });
  }

  async findById(id: number): Promise<Movimiento | null> {
    const record = await this.prisma.movimiento.findUnique({
      where: { id },
      include: { Empleado: true, Role: true, TipoEmpleado: true },
    });
    if (!record) return null;

    return new Movimiento(
      record.id,
      record.empleadoId,
      record.rolId,
      record.tipoId,
      Number(record.horasTrabajadas),
      record.entregas,
      record.fecha,
      record.cubrio_turno,
      record.Empleado,
      record.Role,
      record.TipoEmpleado
    );
  }

  async findAll(search?: string): Promise<Movimiento[]> {
    const records = await this.prisma.movimiento.findMany({
      where: {
        Empleado: search
          ? {
              nombre: { contains: search },
            }
          : undefined,
      },
      include: { Empleado: true, Role: true, TipoEmpleado: true },
    });
    return records.map(
      (r) =>
        new Movimiento(
          r.id,
          r.empleadoId,
          r.rolId,
          r.tipoId,
          Number(r.horasTrabajadas),
          r.entregas,
          r.fecha,
          r.cubrio_turno,
          r.Empleado,
          r.Role,
          r.TipoEmpleado
        )
    );
  }

  async findAllByIdEmpleado(id: number): Promise<Movimiento[] | null> {
    const records = await this.prisma.movimiento.findMany({
      where: { empleadoId: id },
      include: { Empleado: true, Role: true, TipoEmpleado: true },
    });

    return records
      ? records.map(
          (r) =>
            new Movimiento(
              r.id,
              r.empleadoId,
              r.rolId,
              r.tipoId,
              Number(r.horasTrabajadas),
              r.entregas,
              r.fecha,
              r.cubrio_turno,
              r.Empleado,
              r.Role,
              r.TipoEmpleado
            )
        )
      : null;
  }
}
