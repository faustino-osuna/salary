import { Empleado } from "../entities/Empleado";

export interface IEmpleadoRepository {
  create(empleado: Empleado): Promise<void>;
  update(empleado: Empleado): Promise<void>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Empleado | null>;
  findByNumber(numero: number): Promise<Empleado | null>;
  findAll(): Promise<Empleado[]>;
}
