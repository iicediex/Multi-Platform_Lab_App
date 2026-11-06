import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const b = await request.json();
    if (!b?.pamId || !b?.fecha) return NextResponse.json({ error: 'PAM y fecha son obligatorios' }, { status: 400 });
    const c = await prisma.cita.create({
      data: {
        pamId: b.pamId,
        fecha: new Date(b.fecha),
        motivo: b?.motivo ?? null,
        gerontologoId: (session.user as any)?.id ?? null,
      },
    });
    return NextResponse.json({ ok: true, id: c.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al agendar la cita' }, { status: 500 });
  }
}
