import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const hoy = new Date();
    const inicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const fin = new Date(inicio.getTime() + 24 * 60 * 60 * 1000);

    const [totalPams, pamsLab, pamsTaller, talleresActivos, citasHoy, escalasAplicadas, notasTotal, ultimasPamsRaw] =
      await Promise.all([
        prisma.pam.count({ where: { inactivo: false } }),
        prisma.pam.count({ where: { tipoAlta: 'LABORATORIO', inactivo: false } }),
        prisma.pam.count({ where: { tipoAlta: 'TALLER', inactivo: false } }),
        prisma.taller.count({ where: { activo: true } }),
        prisma.cita.findMany({
          where: { fecha: { gte: inicio, lt: fin } },
          include: {
            pam: { select: { id: true, nombreCompleto: true } },
            gerontologo: { select: { name: true } },
          },
          orderBy: { fecha: 'asc' },
        }),
        prisma.aplicacionEscala.count(),
        prisma.notaClinica.count(),
        // ← Ahora incluye inscripciones activas para calcular etiqueta correcta
        prisma.pam.findMany({
          where: { inactivo: false },
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            id: true,
            nombreCompleto: true,
            tipoAlta: true,
            motivoConsulta: true,
            createdAt: true,
            inscripciones: {
              where: { activa: true },
              select: { id: true },
            },
          },
        }),
      ]);

    // Calcular etiqueta correcta para cada persona
    const ultimasPams = ultimasPamsRaw.map((p) => {
      const enLab = p.tipoAlta === 'LABORATORIO';
      const enTaller = p.inscripciones.length > 0;
      const etiqueta =
        enLab && enTaller ? 'AMBOS' : enTaller ? 'TALLER' : 'LABORATORIO';
      return { ...p, etiqueta };
    });

    return NextResponse.json({
      totalPams,
      pamsLab,
      pamsTaller,
      talleresActivos,
      citasHoy,
      escalasAplicadas,
      notasTotal,
      ultimasPams,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al cargar el panel' }, { status: 500 });
  }
}