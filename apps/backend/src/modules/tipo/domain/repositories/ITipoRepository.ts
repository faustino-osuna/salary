import { TipoEmpleado } from "../entities/Tipo";

export interface ITipoRepository {
  findAll(): Promise<TipoEmpleado[]>;
}
