export class RolEmpleado {
  constructor(
    public readonly id: number | null,
    private _nombre: string
  ) {
    if (!_nombre || _nombre.trim().length === 0) {
      throw new Error("El nombre no puede estar vacío");
    }
  }

  get nombre() {
    return this._nombre;
  }

  actualizar(nombre: string) {
    if (!nombre || nombre.trim().length === 0) {
      throw new Error("El nombre no puede estar vacío");
    }
    this._nombre = nombre;
  }

  toPrimitives() {
    return {
      id: this.id,
      nombre: this._nombre,
    };
  }
}
