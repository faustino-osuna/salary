/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `Empleado` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nombre` on table `empleado` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numero` on table `empleado` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `empleado` MODIFY `nombre` VARCHAR(65) NOT NULL,
    MODIFY `numero` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Empleado_numero_key` ON `Empleado`(`numero`);
