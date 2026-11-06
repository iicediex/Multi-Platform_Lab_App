import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.rol !== 'ADMIN') {
    return NextResponse.json({ error: 'Solo administradores pueden eliminar' }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const { password, confirmacion } = body;

  if (!password) return NextResponse.json({ error: 'Escribe tu contraseña' }, { status: 400 });
  if (confirmacion !== 'ELIMINAR') return NextResponse.json({ error: 'Escribe ELIMINAR para confirmar' }, { status: 400 });

  // Verificar identidad del admin
  const user = await prisma.user.findUnique({ where: { id: (session.user as any).id } });
  if (!user || !user.password) {
    return NextResponse.json({ error: 'No se pudo verificar tu identidad' }, { status: 403 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 403 });

  const pamId = params.id;

  // Obtener TODO el expediente para respaldar
 const pam = await prisma.pam.findUnique({
where: { id: pamId },
include: {
primeraCita: true,
signosVitales: true,
aplicaciones: true,
notas: true,
inscripciones: {
include: { taller: true, asistencias: true }
},
asistencias: true,
citas: true
}
});

  if (!pam) return NextResponse.json({ error: 'Persona no encontrada' }, { status: 404 });

  // Guardar respaldo en JSON
  await prisma.respaldoPam.create({
    data: {
      pamId,
      datos: JSON.stringify(pam),
      eliminadoPorId: user.id,
      motivo: body.motivo ?? 'Eliminación permanente con backup',
    },
  });

  // Borrar todo en una sola transacción (ajusta nombres si es necesario)
  await prisma.$transaction([
    prisma.asistencia.deleteMany({ where: { pamId } }),
    prisma.inscripcionTaller.deleteMany({ where: { pamId } }),
    prisma.aplicacionEscala.deleteMany({ where: { pamId } }),
    prisma.notaClinica.deleteMany({ where: { pamId } }),
    prisma.signosVitales.deleteMany({ where: { pamId } }),
    prisma.primeraCita.deleteMany({ where: { pamId } }),
    prisma.pam.delete({ where: { id: pamId } }),
  ]);

  return NextResponse.json({ ok: true, message: 'Expediente eliminado y respaldado' });
}