// app/api/talleres/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// ── GET: lista de talleres ───────────────────────────────────────
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const talleres = await prisma.taller.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        encargados: {
          include: { user: { select: { id: true, name: true, email: true, rol: true } } },
        },
        encargado: { select: { id: true, name: true } },
        _count: { select: { inscripciones: true, sesiones: true } },
      },
    });
    return NextResponse.json(talleres);
  } catch (e) {
    console.error('GET /api/talleres', e);
    return NextResponse.json({ error: 'Error al cargar talleres' }, { status: 500 });
  }
}

// ── POST: crear taller ───────────────────────────────────────────
//
//  Campos obligatorios: nombre, horario, totalSesiones, y consentimiento (texto o PDF)
//  Campos opcionales:   descripcion, consentimientoTexto, consentimientoPdfUrl, encargadoIds[]
//
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const b = await request.json();

    // ── Validaciones obligatorias ──
    if (!b?.nombre || String(b.nombre).trim() === '')
      return NextResponse.json({ error: 'El nombre del taller es obligatorio' }, { status: 400 });

    if (!b?.horario || String(b.horario).trim() === '')
      return NextResponse.json({ error: 'El horario es obligatorio' }, { status: 400 });

    if (!b?.totalSesiones || Number(b.totalSesiones) < 1)
      return NextResponse.json({ error: 'El número total de sesiones es obligatorio' }, { status: 400 });

    // ── Consentimiento obligatorio: al menos texto O pdf ──
    const tieneTexto = typeof b?.consentimientoTexto === 'string' && b.consentimientoTexto.trim() !== '';
    const tienePdf = typeof b?.consentimientoPdfUrl === 'string' && b.consentimientoPdfUrl.trim() !== '';

    if (!tieneTexto && !tienePdf) {
      return NextResponse.json(
        { error: 'Debe proporcionar el consentimiento: escriba el texto o suba el PDF del consentimiento' },
        { status: 400 }
      );
    }

    // ── Normalizar/validar encargadoIds (si viene) ──
    const encargadoIds: string[] = Array.isArray(b?.encargadoIds)
      ? b.encargadoIds.filter((id: any) => typeof id === 'string' && id.trim() !== '')
      : [];

    // ── Determinar encargado principal: viene en body o usamos al usuario de sesión ──
    const encargadoPrincipalId = typeof b?.encargadoId === 'string' && b.encargadoId.trim() !== ''
      ? b.encargadoId
      : (session.user as any)?.id || null;

    // ── Crear taller ──
    const taller = await prisma.taller.create({
      data: {
        nombre:               String(b.nombre).trim(),
        descripcion:          b.descripcion ? String(b.descripcion).trim() : null,
        horario:              String(b.horario).trim(),
        totalSesiones:        Number(b.totalSesiones),
        encargadoId:          encargadoPrincipalId,
        consentimientoTexto:  tieneTexto ? String(b.consentimientoTexto).trim() : null,
        consentimientoPdfUrl: tienePdf ? String(b.consentimientoPdfUrl).trim() : null,
      },
    });

    // ── Asignar encargados adicionales ──
    if (encargadoIds.length > 0) {
      await prisma.tallerEncargado.createMany({
        data: encargadoIds.map((userId) => ({ tallerId: taller.id, userId })),
        skipDuplicates: true,
      });
    }

    return NextResponse.json({ ok: true, id: taller.id });
  } catch (e) {
    console.error('POST /api/talleres', e);
    return NextResponse.json({ error: 'Error al crear taller' }, { status: 500 });
  }
}