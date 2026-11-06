-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'GERONTOLOGO', 'PODOLOGO', 'DIRECTOR');

-- CreateEnum
CREATE TYPE "TipoAlta" AS ENUM ('LABORATORIO', 'TALLER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'GERONTOLOGO',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pam" (
    "id" TEXT NOT NULL,
    "tipoAlta" "TipoAlta" NOT NULL DEFAULT 'LABORATORIO',
    "consentimientoAceptado" BOOLEAN NOT NULL DEFAULT false,
    "consentimientoFecha" TIMESTAMP(3),
    "consentimientoNombre" TEXT,
    "nombreCompleto" TEXT NOT NULL,
    "fechaEntrevista" TIMESTAMP(3),
    "edad" INTEGER,
    "sexo" TEXT,
    "genero" TEXT,
    "fechaNacimiento" TIMESTAMP(3),
    "lugarNacimiento" TEXT,
    "grupoOriginario" TEXT,
    "lenguaIndigena" TEXT,
    "estadoCivil" TEXT,
    "aniosEscuela" INTEGER,
    "escolaridad" TEXT,
    "ocupacion" TEXT,
    "afiliacionMedica" TEXT,
    "alergias" TEXT,
    "tipoSangre" TEXT,
    "pension" TEXT,
    "religion" TEXT,
    "telefono" TEXT,
    "direccion" TEXT,
    "personaContacto" TEXT,
    "telefonoContacto" TEXT,
    "motivoConsulta" TEXT,
    "metas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrimeraCita" (
    "id" TEXT NOT NULL,
    "pamId" TEXT NOT NULL,
    "respuestas" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrimeraCita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignosVitales" (
    "id" TEXT NOT NULL,
    "pamId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ta" TEXT,
    "fc" DOUBLE PRECISION,
    "fr" DOUBLE PRECISION,
    "temperatura" DOUBLE PRECISION,
    "peso" DOUBLE PRECISION,
    "talla" DOUBLE PRECISION,
    "imc" DOUBLE PRECISION,
    "spo2" DOUBLE PRECISION,
    "glucosa" DOUBLE PRECISION,
    "observaciones" TEXT,
    "registradoPorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SignosVitales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AplicacionEscala" (
    "id" TEXT NOT NULL,
    "pamId" TEXT NOT NULL,
    "escalaId" TEXT NOT NULL,
    "respuestas" JSONB,
    "puntaje" DOUBLE PRECISION,
    "interpretacion" TEXT,
    "comentarios" TEXT,
    "aplicadaPorId" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AplicacionEscala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotaClinica" (
    "id" TEXT NOT NULL,
    "pamId" TEXT NOT NULL,
    "titulo" TEXT,
    "contenido" TEXT NOT NULL,
    "autorId" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotaClinica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Taller" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "horario" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "encargadoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Taller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InscripcionTaller" (
    "id" TEXT NOT NULL,
    "tallerId" TEXT NOT NULL,
    "pamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InscripcionTaller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SesionTaller" (
    "id" TEXT NOT NULL,
    "tallerId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tema" TEXT,
    "comentarios" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SesionTaller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asistencia" (
    "id" TEXT NOT NULL,
    "sesionId" TEXT NOT NULL,
    "pamId" TEXT NOT NULL,
    "presente" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Asistencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cita" (
    "id" TEXT NOT NULL,
    "pamId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "motivo" TEXT,
    "realizada" BOOLEAN NOT NULL DEFAULT false,
    "gerontologoId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workshop" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "consentAccepted" BOOLEAN NOT NULL DEFAULT false,
    "consentText" TEXT,
    "consentSignedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TallerEncargado" (
    "id" TEXT NOT NULL,
    "tallerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TallerEncargado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PrimeraCita_pamId_key" ON "PrimeraCita"("pamId");

-- CreateIndex
CREATE INDEX "SignosVitales_pamId_fecha_idx" ON "SignosVitales"("pamId", "fecha");

-- CreateIndex
CREATE INDEX "AplicacionEscala_pamId_escalaId_idx" ON "AplicacionEscala"("pamId", "escalaId");

-- CreateIndex
CREATE INDEX "NotaClinica_pamId_fecha_idx" ON "NotaClinica"("pamId", "fecha");

-- CreateIndex
CREATE UNIQUE INDEX "InscripcionTaller_tallerId_pamId_key" ON "InscripcionTaller"("tallerId", "pamId");

-- CreateIndex
CREATE INDEX "SesionTaller_tallerId_fecha_idx" ON "SesionTaller"("tallerId", "fecha");

-- CreateIndex
CREATE UNIQUE INDEX "Asistencia_sesionId_pamId_key" ON "Asistencia"("sesionId", "pamId");

-- CreateIndex
CREATE INDEX "Cita_fecha_idx" ON "Cita"("fecha");

-- CreateIndex
CREATE UNIQUE INDEX "TallerEncargado_tallerId_userId_key" ON "TallerEncargado"("tallerId", "userId");

-- AddForeignKey
ALTER TABLE "PrimeraCita" ADD CONSTRAINT "PrimeraCita_pamId_fkey" FOREIGN KEY ("pamId") REFERENCES "Pam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignosVitales" ADD CONSTRAINT "SignosVitales_pamId_fkey" FOREIGN KEY ("pamId") REFERENCES "Pam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignosVitales" ADD CONSTRAINT "SignosVitales_registradoPorId_fkey" FOREIGN KEY ("registradoPorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AplicacionEscala" ADD CONSTRAINT "AplicacionEscala_pamId_fkey" FOREIGN KEY ("pamId") REFERENCES "Pam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AplicacionEscala" ADD CONSTRAINT "AplicacionEscala_aplicadaPorId_fkey" FOREIGN KEY ("aplicadaPorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaClinica" ADD CONSTRAINT "NotaClinica_pamId_fkey" FOREIGN KEY ("pamId") REFERENCES "Pam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotaClinica" ADD CONSTRAINT "NotaClinica_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Taller" ADD CONSTRAINT "Taller_encargadoId_fkey" FOREIGN KEY ("encargadoId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscripcionTaller" ADD CONSTRAINT "InscripcionTaller_tallerId_fkey" FOREIGN KEY ("tallerId") REFERENCES "Taller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscripcionTaller" ADD CONSTRAINT "InscripcionTaller_pamId_fkey" FOREIGN KEY ("pamId") REFERENCES "Pam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SesionTaller" ADD CONSTRAINT "SesionTaller_tallerId_fkey" FOREIGN KEY ("tallerId") REFERENCES "Taller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_sesionId_fkey" FOREIGN KEY ("sesionId") REFERENCES "SesionTaller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_pamId_fkey" FOREIGN KEY ("pamId") REFERENCES "Pam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_pamId_fkey" FOREIGN KEY ("pamId") REFERENCES "Pam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_gerontologoId_fkey" FOREIGN KEY ("gerontologoId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TallerEncargado" ADD CONSTRAINT "TallerEncargado_tallerId_fkey" FOREIGN KEY ("tallerId") REFERENCES "Taller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TallerEncargado" ADD CONSTRAINT "TallerEncargado_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
