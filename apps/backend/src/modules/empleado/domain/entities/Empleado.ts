export class Empleado {
  constructor(
    public readonly id: number | null,
    private _nombre: string,
    private _numero: number,
    private _activo: boolean,
    private _rolId: number,
    private _tipoId: number
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

  toPrimitives() {
    return {
      id: this.id,
      nombre: this._nombre,
      numero: this._numero,
      activo: this._activo,
      rolId: this._rolId,
      tipoId: this._tipoId,
    };
  }
}
