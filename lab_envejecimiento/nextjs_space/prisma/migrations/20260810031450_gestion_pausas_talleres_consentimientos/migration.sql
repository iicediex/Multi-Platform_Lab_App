/*
  Warnings:

  - You are about to drop the `Workshop` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `totalSesiones` to the `Taller` table without a default value. This is not possible if the table is not empty.
  - Made the column `horario` on table `Taller` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "InscripcionTaller" ADD COLUMN     "activa" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "bajaDesde" TIMESTAMP(3),
ADD COLUMN     "consentimientoAceptado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "consentimientoFecha" TIMESTAMP(3),
ADD COLUMN     "consentimientoNombre" TEXT,
ADD COLUMN     "faltasConsecutivas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "motivoBaja" TEXT;

-- AlterTable
ALTER TABLE "Pam" ADD COLUMN     "inactivo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "inactivoDesde" TIMESTAMP(3),
ADD COLUMN     "motivoPausa" TEXT;

-- AlterTable
ALTER TABLE "Taller" ADD COLUMN     "consentimientoPdfUrl" TEXT,
ADD COLUMN     "consentimientoTexto" TEXT,
ADD COLUMN     "totalSesiones" INTEGER NOT NULL,
ALTER COLUMN "horario" SET NOT NULL;

-- DropTable
DROP TABLE "Workshop";
