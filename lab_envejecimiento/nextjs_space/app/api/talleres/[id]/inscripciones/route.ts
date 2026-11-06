import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { normalizeText } from '@/lib/normalize';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, { params }: { params: { id: string } }) {
const session = await getServerSession(authOptions);
if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

try {
const b = await request.json();
const incomingPam = b?.pam ?? null;
const incomingPamId = b?.pamId ?? null;

// 1) Asegurar taller existe
const taller = await prisma.taller.findUnique({ where: { id: params.id } });
if (!taller) return NextResponse.json({ error: 'Taller no encontrado' }, { status: 404 });

// 2) Determinar o crear Pam
let pamId = incomingPamId;
if (!pamId) {
  if (!incomingPam || !incomingPam.nombreCompleto) {
    return NextResponse.json({ error: 'Datos incompletos del PAM' }, { status: 400 });
  }

  const nombreNorm = normalizeText(incomingPam.nombreCompleto);
  const telefonoNorm = (incomingPam.telefono || '').replace(/\D/g, '').slice(-10);

  let existingPam = null;
  if (telefonoNorm.length === 10) {
    existingPam = await prisma.pam.findFirst({ where: { telefono: telefonoNorm } });
  }
  if (!existingPam) {
    existingPam = await prisma.pam.findFirst({
      where: {
        nombreCompleto: incomingPam.nombreCompleto,
        fechaNacimiento: incomingPam.fechaNacimiento ? new Date(incomingPam.fechaNacimiento) : undefined,
      },
    });
  }

  if (existingPam) {
    pamId = existingPam.id;
    // actualizar campos faltantes opcionalmente
    await prisma.pam.update({
      where: { id: pamId },
      data: {
        telefono: existingPam.telefono || (telefonoNorm.length === 10 ? telefonoNorm : undefined),
      },
    });
  } else {
    const created = await prisma.pam.create({
      data: {
        nombreCompleto: incomingPam.nombreCompleto,
        fechaNacimiento: incomingPam.fechaNacimiento ? new Date(incomingPam.fechaNacimiento) : undefined,
        telefono: telefonoNorm.length === 10 ? telefonoNorm : incomingPam.telefono ?? null,
        tipoAlta: incomingPam.tipoAlta ?? 'TALLER',
      },
    });
    pamId = created.id;
  }
}

// 3) Upsert de inscripción
await prisma.inscripcionTaller.upsert({
  where: {
    tallerId_pamId: { tallerId: params.id, pamId },
  },
  create: {
    tallerId: params.id,
    pamId,
    activa: true,
  },
  update: {
    activa: true,
  },
});

return NextResponse.json({ ok: true, pamId });
} catch (e) {
console.error('POST inscripciones error', e);
return NextResponse.json({ error: 'Error al inscribir a la persona' }, { status: 500 });
}
}
