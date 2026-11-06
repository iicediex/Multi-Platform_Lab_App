// app/api/talleres/[id]/encargados/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const tallerId = params.id;
  try {
    const { userIds } = await req.json();
    if (!Array.isArray(userIds) || userIds.length === 0) return NextResponse.json({ error: 'userIds requeridos' }, { status: 400 });

    const data = userIds.map((userId: string) => ({ tallerId, userId }));
    await prisma.tallerEncargado.createMany({ data, skipDuplicates: true });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: 'Error al asignar encargados' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const tallerId = params.id;
  try {
    const { userId } = await req.json();
    if (!userId) return NextResponse.json({ error: 'userId requerido' }, { status: 400 });

    await prisma.tallerEncargado.deleteMany({ where: { tallerId, userId } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: 'Error al quitar encargado' }, { status: 500 });
  }
}