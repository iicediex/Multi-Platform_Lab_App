import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body?.email ?? '').toLowerCase().trim();
    const password = body?.password ?? '';
    const name = body?.name ?? '';
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Ya existe una cuenta con ese correo' }, { status: 400 });
    }
    const count = await prisma.user.count();
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, name, rol: count === 0 ? 'ADMIN' : 'GERONTOLOGO' },
    });
    return NextResponse.json({ ok: true, id: user.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al crear la cuenta' }, { status: 500 });
  }
}
