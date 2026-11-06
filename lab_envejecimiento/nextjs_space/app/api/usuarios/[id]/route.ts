import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.rol !== 'ADMIN') {
    return NextResponse.json({ error: 'Solo el administrador puede editar usuarios' }, { status: 403 });
  }
  try {
    const b = await request.json();
    const data: Record<string, any> = {};
    if (b?.name !== undefined) data.name = b.name;
    if (b?.rol !== undefined) data.rol = b.rol === 'ADMIN' ? 'ADMIN' : 'GERONTOLOGO';
    if (b?.activo !== undefined) data.activo = !!b.activo;
    if (b?.password) data.password = await bcrypt.hash(b.password, 10);
    const u = await prisma.user.update({ where: { id: params?.id }, data });
    return NextResponse.json({ ok: true, id: u.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al actualizar el usuario' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.rol !== 'ADMIN') {
    return NextResponse.json({ error: 'Solo el administrador puede eliminar usuarios' }, { status: 403 });
  }
  const id = params.id;
  try {
    await prisma.$transaction([
      prisma.tallerEncargado.deleteMany({ where: { userId: id } }),
      prisma.taller.updateMany({ where: { encargadoId: id }, data: { encargadoId: null } }),
      prisma.user.delete({ where: { id } }),
    ]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('DELETE /api/usuarios/[id] error', e);
    return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 });
  }
}