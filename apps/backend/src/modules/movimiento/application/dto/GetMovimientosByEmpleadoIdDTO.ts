export interface GetEmpleadoDTO {
  id: number;
  nombre: string;
  numero: number;
  activo: boolean;
}

export interface GetRolDTO {
  id: number;
  nombre: string;
}

export interface GetTipoDTO {
  id: number;
  nombre: string;
}

export interface GetMovimientoByEmpleadoIdDTO {
  id: number;
  horasTrabajadas: number;
  entregas: number;
  fecha: Date;
  empleado: GetEmpleadoDTO;
  rol: GetRolDTO;
  tipoEmpleado: GetTipoDTO;
}
