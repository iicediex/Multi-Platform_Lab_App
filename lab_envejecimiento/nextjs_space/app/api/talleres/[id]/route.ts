// app/api/talleres/[id]/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

// ── GET: obtener taller con todo su detalle ──────────────────────
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const taller = await prisma.taller.findUnique({
      where: { id: params.id },
      include: {
        encargado: { select: { id: true, name: true } },
        encargados: {
          include: { user: { select: { id: true, name: true, email: true, rol: true } } },
        },
        inscripciones: {
          include: { pam: { select: { id: true, nombreCompleto: true } } },
        },
        sesiones: { include: { asistencias: true } },
        _count: { select: { inscripciones: true, sesiones: true } },
      },
    });

    if (!taller) return NextResponse.json({ error: 'Taller no encontrado' }, { status: 404 });
    return NextResponse.json(taller);
  } catch (e) {
    console.error('GET /api/talleres/[id]', e);
    return NextResponse.json({ error: 'Error al cargar taller' }, { status: 500 });
  }
}

// ── PATCH: editar taller (nombre, horario, consentimiento, etc.) ─
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const body = await request.json();

    // Validar campos obligatorios si se envían vacíos
    if (body.horario !== undefined && !body.horario)
      return NextResponse.json({ error: 'El horario no puede estar vacío' }, { status: 400 });
    if (body.totalSesiones !== undefined && body.totalSesiones < 1)
      return NextResponse.json({ error: 'El total de sesiones debe ser mayor a 0' }, { status: 400 });

    const taller = await prisma.taller.update({
      where: { id: params.id },
      data: {
        nombre:               body.nombre,
        descripcion:          body.descripcion,
        horario:              body.horario,
        totalSesiones:        body.totalSesiones,
        activo:               body.activo,
        consentimientoTexto:  body.consentimientoTexto,
        consentimientoPdfUrl: body.consentimientoPdfUrl,
      },
    });

    return NextResponse.json({ ok: true, taller });
  } catch (e) {
    console.error('PATCH /api/talleres/[id]', e);
    return NextResponse.json({ error: 'Error al actualizar taller' }, { status: 500 });
  }
}

// ── DELETE: eliminar taller ──────────────────────────────────────
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    await prisma.taller.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('DELETE /api/talleres/[id]', e);
    return NextResponse.json({ error: 'Error al eliminar taller' }, { status: 500 });
  }
}