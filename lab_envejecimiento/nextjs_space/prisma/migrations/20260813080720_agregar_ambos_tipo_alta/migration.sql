-- AlterEnum
ALTER TYPE "TipoAlta" ADD VALUE 'AMBOS';

-- CreateTable
CREATE TABLE "RespaldoPam" (
    "id" TEXT NOT NULL,
    "pamId" TEXT NOT NULL,
    "datos" JSONB NOT NULL,
    "eliminadoPorId" TEXT,
    "eliminadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motivo" TEXT,

    CONSTRAINT "RespaldoPam_pkey" PRIMARY KEY ("id")
);
