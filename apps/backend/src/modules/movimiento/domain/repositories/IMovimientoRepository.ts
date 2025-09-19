import { Movimiento } from "../entities/Movimiento";

export interface IMovimientoRepository {
  create(movimiento: Movimiento): Promise<void>;
  update(movimiento: Movimiento): Promise<void>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Movimiento | null>;
  findAll(): Promise<Movimiento[]>;
  findAllByIdEmpleado(id: number): Promise<Movimiento[] | null>;
}
