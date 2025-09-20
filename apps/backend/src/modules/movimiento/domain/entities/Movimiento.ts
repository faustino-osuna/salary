import { Empleado, Role, TipoEmpleado } from "@prisma/client";

export class Movimiento {
  constructor(
    public readonly id: number | null,
    private _empleadoId: number,
    private _rolId: number,
    private _tipoId: number,
    private _horasTrabajadas: number = 8,
    private _entregas: number = 0,
    private _fecha: Date,
    private _cubrioTurno?: boolean,
    private _empleado?: Empleado,
    private _rol?: Role,
    private _TipoEmpleado?: TipoEmpleado
  ) {
    if (_empleadoId <= 0) throw new Error("EmpleadoId inválido");
    if (_rolId <= 0) throw new Error("RolId inválido");
    if (_tipoId <= 0) throw new Error("TipoId inválido");
    if (_horasTrabajadas <= 0) throw new Error("Horas trabajadas inválidas");
    if (_entregas < 0) throw new Error("Entregas inválidas");
  }

  get empleadoId() {
    return this._empleadoId;
  }
  get rolId() {
    return this._rolId;
  }
  get tipoId() {
    return this._tipoId;
  }
  get horasTrabajadas() {
    return this._horasTrabajadas;
  }
  get entregas() {
    return this._entregas;
  }
  get fecha() {
    return this._fecha;
  }

  get cubrioTurno() {
    return this._cubrioTurno;
  }

  get empleado(): Empleado | undefined {
    return this._empleado;
  }

  get rol(): Role | undefined {
    return this._rol;
  }

  get tipoEmpleado(): TipoEmpleado | undefined {
    return this._TipoEmpleado;
  }

  actualizar(data: {
    empleadoId?: number;
    rolId?: number;
    tipoId?: number;
    horasTrabajadas?: number;
    entregas?: number;
    fecha?: Date;
    cubrioTurno?: boolean;
  }) {
    if (data.empleadoId !== undefined) {
      if (data.empleadoId <= 0) throw new Error("EmpleadoId inválido");
      this._empleadoId = data.empleadoId;
    }

    if (data.rolId !== undefined) {
      if (data.rolId <= 0) throw new Error("RolId inválido");
      this._rolId = data.rolId;
    }

    if (data.tipoId !== undefined) {
      if (data.tipoId <= 0) throw new Error("TipoId inválido");
      this._tipoId = data.tipoId;
    }

    if (data.horasTrabajadas !== undefined) {
      if (data.horasTrabajadas <= 0)
        throw new Error("Horas trabajadas inválidas");
      this._horasTrabajadas = data.horasTrabajadas;
    }

    if (data.entregas !== undefined) {
      if (data.entregas < 0) throw new Error("Entregas inválidas");
      this._entregas = data.entregas;
    }

    if (data.fecha !== undefined) {
      this._fecha = data.fecha;
    }

    if (data.cubrioTurno !== undefined) {
      this._cubrioTurno = data.cubrioTurno;
    }
  }

  toPrimitives() {
    return {
      id: this.id,
      empleadoId: this._empleadoId,
      rolId: this._rolId,
      tipoId: this._tipoId,
      horasTrabajadas: this._horasTrabajadas,
      entregas: this._entregas,
      fecha: this._fecha,
      empleado: this._empleado,
      rol: this._rol,
      tipoEmpleado: this._TipoEmpleado,
      cubrioTurno: this._cubrioTurno,
    };
  }
}
