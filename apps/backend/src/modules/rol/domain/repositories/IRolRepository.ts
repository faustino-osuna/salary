import { RolEmpleado } from "../entities/Rol";

export interface IRolRepository {
  findAll(): Promise<RolEmpleado[]>;
}
