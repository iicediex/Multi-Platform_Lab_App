import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request, { params }: { params: { id: string } }) {
const session = await getServerSession(authOptions);
if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

try {
const b = await request.json();
const asistencias = Array.isArray(b?.asistencias) ? b.asistencias : [];

const result = await prisma.$transaction(async (tx) => {
  const sesion = await tx.sesionTaller.create({
    data: {
      tallerId: params.id,
      fecha: b?.fecha ? new Date(b.fecha) : new Date(),
      tema: b?.tema ?? null,
      comentarios: b?.comentarios ?? null,
    },
  });

  let created = 0;
  let bajas = 0;

  for (const a of asistencias) {
    if (!a?.pamId || typeof a.pamId !== 'string') continue;
// obtener la inscripción relacionada primero
const inscripcionParaAsistencia = await tx.inscripcionTaller.findUnique({
where: { tallerId_pamId: { tallerId: params.id, pamId: a.pamId } },
});

// si no hay inscripción activa, no creamos asistencia
if (!inscripcionParaAsistencia || !inscripcionParaAsistencia.activa) continue;

// ahora sí creamos la asistencia incluyendo inscripcionTallerId
await tx.asistencia.create({
data: {
sesionId: sesion.id,
pamId: a.pamId,
presente: !!a.presente,
inscripcionTallerId: inscripcionParaAsistencia.id,
},
});
created++;

// continuar con actualización de faltas usando inscripcionParaAsistencia
const actuales = inscripcionParaAsistencia.faltasConsecutivas ?? 0;

if (a.presente) {
await tx.inscripcionTaller.update({
where: { tallerId_pamId: { tallerId: params.id, pamId: a.pamId } },
data: { faltasConsecutivas: 0 },
});
} else {
const nuevasFaltas = actuales + 1;
if (nuevasFaltas >= 3) {
await tx.inscripcionTaller.update({
where: { tallerId_pamId: { tallerId: params.id, pamId: a.pamId } },
data: {
faltasConsecutivas: nuevasFaltas,
activa: false,
bajaDesde: new Date(),
motivoBaja: 'Baja automática por 3 faltas consecutivas',
},
});
bajas++;
} else {
await tx.inscripcionTaller.update({
where: { tallerId_pamId: { tallerId: params.id, pamId: a.pamId } },
data: { faltasConsecutivas: nuevasFaltas },
});
}
}
  }

  return { sesion, created, bajas };
});

return NextResponse.json({ ok: true, id: result.sesion.id, created: result.created, bajas: result.bajas });
} catch (e) {
console.error('POST /api/talleres/[id]/sesiones', { error: e, tallerId: params.id });
return NextResponse.json({ error: 'Error al registrar la sesión' }, { status: 500 });
}
}