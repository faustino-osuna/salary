import { prisma } from "./client";

async function main() {
  await prisma.role.createMany({
    data: [
      { nombre: 'Choferes' },
      { nombre: 'Cargadores' },
      { nombre: 'Auxiliares' },
    ],
    skipDuplicates: true,
  });

  await prisma.tipoEmpleado.createMany({
    data: [
      { nombre: 'Interno' },
      { nombre: 'Externo' },
    ],
    skipDuplicates: true,
  });

  await prisma.empleado.createMany({
    data: [
      { nombre: 'Fausto', numero: 123, activo: true, rolId: 1, tipoId: 1 },
      { nombre: 'Juan', numero: 124, activo: true, rolId: 2, tipoId: 2 },
    ],
    skipDuplicates: true,
  });

  await prisma.movimiento.createMany({
    data: [
      { empleadoId: 1, rolId: 1, tipoId: 1, fecha: "2025-09-09" }
    ],
    skipDuplicates: true,
  })
}

main()
  .then(() => {
    console.log('✅ Seed ejecutado correctamente');
  })
  .catch((e) => {
    console.error('❌ Error en el seed', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
