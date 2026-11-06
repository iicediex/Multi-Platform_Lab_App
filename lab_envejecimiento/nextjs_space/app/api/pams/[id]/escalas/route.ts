import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getEscala, calcularPuntaje, interpretarPuntaje } from '@/lib/escalas-data';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const body = await request.json();
    const escala = getEscala(body?.escalaId ?? '');
    if (!escala) return NextResponse.json({ error: 'Escala no encontrada' }, { status: 400 });
    const puntaje = calcularPuntaje(escala, body?.respuestas ?? {});
    const interpretacion = interpretarPuntaje(escala, puntaje);
    const ap = await prisma.aplicacionEscala.create({
      data: {
        pamId: params?.id,
        escalaId: escala.id,
        respuestas: body?.respuestas ?? {},
        puntaje,
        interpretacion,
        comentarios: body?.comentarios ?? null,
        aplicadaPorId: (session.user as any)?.id ?? null,
      },
    });
    return NextResponse.json({ ok: true, id: ap.id, puntaje, interpretacion });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al guardar la escala' }, { status: 500 });
  }
}
