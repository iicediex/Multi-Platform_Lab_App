import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const body = await request.json();
    if (!body?.contenido) return NextResponse.json({ error: 'El contenido es obligatorio' }, { status: 400 });
    const nota = await prisma.notaClinica.create({
      data: {
        pamId: params?.id,
        titulo: body?.titulo ?? null,
        contenido: body.contenido,
        autorId: (session.user as any)?.id ?? null,
      },
    });
    return NextResponse.json({ ok: true, id: nota.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al guardar la nota' }, { status: 500 });
  }
}
