export interface RolDTO {
  id: number;
  nombre: string;
}

export interface TipoEmpleadoDTO {
  id: number;
  nombre: string;
}

export interface GetEmpleadosDTO {
  id: number;
  nombre: string;
  numero: number;
  activo: boolean;
  rol: RolDTO;
  tipo: TipoEmpleadoDTO;
}
