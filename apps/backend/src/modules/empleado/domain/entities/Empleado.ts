import { role, tipoempleado } from "@prisma/client";

export class Empleado {
  constructor(
    public readonly id: number | null,
    private _nombre: string,
    private _numero: number,
    private _activo: boolean,
    private _rolId: number,
    private _tipoId: number,
    private _rol?: role,
    private _TipoEmpleado?: tipoempleado
  ) {
    if (!_nombre || _nombre.trim().length === 0) {
      throw new Error("El nombre no puede estar vacío");
    }

    if (_numero <= 0) {
      throw new Error("El número de empleado debe ser mayor que 0");
    }
  }

  get nombre() {
    return this._nombre;
  }

  get numero() {
    return this._numero;
  }

  get activo() {
    return this._activo;
  }

  get role(): role | undefined {
    return this._rol;
  }

  get tipoEmpleado(): tipoempleado | undefined {
    return this._TipoEmpleado;
  }

  activar() {
    this._activo = true;
  }

  desactivar() {
    this._activo = false;
  }

  cambiarRol(nuevoRolId: number) {
    this._rolId = nuevoRolId;
  }

  cambiarTipo(nuevoTipoId: number) {
    this._tipoId = nuevoTipoId;
  }

  actualizar(
    data: Partial<{
      nombre: string;
      numero: number;
      activo: boolean;
      rolId: number;
      tipoId: number;
    }>
  ) {
    if (data.nombre !== undefined) {
      if (!data.nombre || data.nombre.trim().length === 0) {
        throw new Error("El nombre no puede estar vacío");
      }
      this._nombre = data.nombre;
    }

    if (data.numero !== undefined) {
      if (data.numero <= 0) {
        throw new Error("El número de empleado debe ser mayor que 0");
      }
      this._numero = data.numero;
    }

    if (data.activo !== undefined) {
      this._activo = data.activo;
    }

    if (data.rolId !== undefined) {
      this._rolId = data.rolId;
    }

    if (data.tipoId !== undefined) {
      this._tipoId = data.tipoId;
    }
  }

  toPrimitives() {
    return {
      id: this.id,
      nombre: this._nombre,
      numero: this._numero,
      activo: this._activo,
      rolId: this._rolId,
      tipoId: this._tipoId,
      rol: this._rol,
      tipoEmpleado: this._TipoEmpleado,
    };
  }
}
