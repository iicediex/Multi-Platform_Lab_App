import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { PrismaClient } from '@prisma/client';
import { prisma as untypedPrisma } from '@/lib/db';
const prisma = untypedPrisma as unknown as PrismaClient;

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  if ((session.user as any)?.rol !== 'ADMIN') {
    return NextResponse.json({ error: 'Solo el administrador puede descargar el respaldo' }, { status: 403 });
  }

  try {
    const [pams, talleres, inscripciones, sesiones, asistencias, notas, vitales, escalas, usuarios] = await Promise.all([
      prisma.pam.findMany(),
      prisma.taller.findMany(),
      prisma.inscripcionTaller.findMany(),
      prisma.sesionTaller.findMany(),
      prisma.asistencia.findMany(),
      prisma.notaClinica.findMany(),
      prisma.signosVitales.findMany(),
      prisma.aplicacionEscala.findMany(),
      prisma.user.findMany({ select: { id: true, name: true, email: true, rol: true, activo: true, createdAt: true } }),
    ]);

    const backup = {
      generadoEn: new Date().toISOString(),
      pams, talleres, inscripciones, sesiones, asistencias, notas, vitales, escalas, usuarios,
    };

    return new NextResponse(JSON.stringify(backup, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="respaldo-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    });
  } catch (e) {
    console.error('GET /api/backup error', e);
    return NextResponse.json({ error: 'Error al generar el respaldo' }, { status: 500 });
  }
}