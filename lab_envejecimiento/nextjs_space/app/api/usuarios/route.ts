import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'asc' },
      select: { id: true, name: true, email: true, rol: true, activo: true, createdAt: true },
    });
    return NextResponse.json(users);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al cargar usuarios' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.rol !== 'ADMIN') {
    return NextResponse.json({ error: 'Solo el administrador puede crear usuarios' }, { status: 403 });
  }
  try {
    const b = await request.json();
    const email = (b?.email ?? '').toLowerCase().trim();
    if (!email || !b?.password || !b?.name) return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    const total = await prisma.user.count();
    if (total >= 10) return NextResponse.json({ error: 'Se alcanzó el límite de 10 usuarios' }, { status: 400 });
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: 'Ya existe un usuario con ese correo' }, { status: 400 });
    const hashed = await bcrypt.hash(b.password, 10);
    const u = await prisma.user.create({
      data: { email, password: hashed, name: b.name, rol: b?.rol === 'ADMIN' ? 'ADMIN' : 'GERONTOLOGO' },
    });
    return NextResponse.json({ ok: true, id: u.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });
  }
}