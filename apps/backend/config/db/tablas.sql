CREATE TABLE roles (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
);

CREATE TABLE tipo_empleados (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL -- 'interno' | 'subcontratado'
);

CREATE TABLE bonos (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  cantidad DECIMAL(10,2) NOT NULL,
  rol_id INT NOT NULL,
  CONSTRAINT fk_bono_rol FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE empleados (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(65) DEFAULT NULL,
  numero INT(11) DEFAULT NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  rol_id INT NOT NULL,
  tipo_id INT NOT NULL,
  CONSTRAINT fk_empleado_rol FOREIGN KEY (rol_id) REFERENCES roles(id),
  CONSTRAINT fk_empleado_tipo FOREIGN KEY (tipo_id) REFERENCES tipo_empleados(id)
);

CREATE TABLE movimientos (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  empleado_id INT NOT NULL,
  rol_id INT NOT NULL,
  tipo_id INT NOT NULL,
  horas_trabajadas DECIMAL(6,2) NOT NULL DEFAULT 8,
  entregas INT NOT NULL DEFAULT 0,
  fecha DATE NOT NULL,
  cubrio_turno TINYINT(1) NOT NULL DEFAULT 0,
  CONSTRAINT fk_movimiento_empleado FOREIGN KEY (empleado_id) REFERENCES empleados(id),
  CONSTRAINT fk_movimiento_rol FOREIGN KEY (rol_id) REFERENCES roles(id),
  CONSTRAINT fk_movimiento_tipo FOREIGN KEY (tipo_id) REFERENCES tipo_empleados(id)
);

CREATE TABLE parametros_sueldos (
  id INT NOT NULL PRIMARYY KEY AUTO_INCREMENT,
  nombre VARCHAR(65) NOT NULL UNIQUE,
  valor DECIMAL(12, 2) NOT NULL,
  descripcion VARCHAR(200)
)
