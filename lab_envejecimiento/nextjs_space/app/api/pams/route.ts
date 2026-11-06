import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { normalizeText } from '@/lib/normalize';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') ?? '';
    const incluirInactivos = searchParams.get('inactivos') === 'true';

    // Búsqueda general de la lista de personas
    const pams = await prisma.pam.findMany({
      where: {
        AND: [
          incluirInactivos ? {} : { inactivo: false },
          q ? { nombreCompleto: { contains: q, mode: 'insensitive' } } : {}
        ]
      },
      orderBy: { nombreCompleto: 'asc' }
    });

    return NextResponse.json(pams);
  } catch (e: any) {
    return NextResponse.json({ error: 'Error al buscar' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    const body = await request.json();

    if (!body?.consentimientoAceptado)
      return NextResponse.json({ error: 'Debe aceptar el consentimiento' }, { status: 400 });
    if (!body?.nombreCompleto)
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 });

    const nombreInput = normalizeText(body.nombreCompleto);
    const candidatos = await prisma.pam.findMany({ where: { inactivo: false } });

    const duplicados = candidatos.filter((c) => {
      const db = normalizeText(c.nombreCompleto);
      return db === nombreInput || db.includes(nombreInput) || nombreInput.includes(db);
    });

    if (duplicados.length > 0 && body?.confirmarDuplicado !== true) {
      return NextResponse.json(
        {
          warning: true,
          message: `Se encontró a alguien similar`,
          duplicados,
        },
        { status: 409 }
      );
    }

    if (duplicados.length >= 1 && body?.confirmarDuplicado === true) {
      const existente = duplicados[0];
      const nuevoTipo =
        (existente.tipoAlta === 'TALLER' && body?.tipoAlta === 'LABORATORIO') ||
        (existente.tipoAlta === 'LABORATORIO' && body?.tipoAlta === 'TALLER')
          ? 'AMBOS'
          : existente.tipoAlta;

      await prisma.pam.update({
        where: { id: existente.id },
        data: { tipoAlta: nuevoTipo as any },
      });

      if (body?.primeraCita) {
        const yaTiene = await prisma.primeraCita.findFirst({ where: { pamId: existente.id } });
        if (!yaTiene) {
          await prisma.primeraCita.create({ data: { pamId: existente.id, respuestas: body.primeraCita } });
        }
      }
      return NextResponse.json({ ok: true, id: existente.id, actualizado: true });
    }

    const d = body?.datos ?? {};
    const pam = await prisma.pam.create({
      data: {
        tipoAlta: body?.tipoAlta === 'TALLER' ? 'TALLER' : 'LABORATORIO',
        consentimientoAceptado: true,
        consentimientoFecha: new Date(),
        consentimientoNombre: body?.consentimientoNombre ?? body?.nombreCompleto,
        nombreCompleto: body.nombreCompleto,
        fechaEntrevista: d?.fechaEntrevista ? new Date(d.fechaEntrevista) : new Date(),
        edad: d?.edad ? parseInt(d.edad, 10) : null,
        sexo: d?.sexo ?? null,
        genero: d?.genero ?? null,
        fechaNacimiento: d?.fechaNacimiento ? new Date(d.fechaNacimiento) : null,
        lugarNacimiento: d?.lugarNacimiento ?? null,
        grupoOriginario: d?.grupoOriginario ?? null,
        lenguaIndigena: d?.lenguaIndigena ?? null,
        estadoCivil: d?.estadoCivil ?? null,
        aniosEscuela: d?.aniosEscuela ? parseInt(d.aniosEscuela, 10) : null,
        escolaridad: d?.escolaridad ?? null,
        ocupacion: d?.ocupacion ?? null,
        afiliacionMedica: d?.afiliacionMedica ?? null,
        alergias: d?.alergias ?? null,
        tipoSangre: d?.tipoSangre ?? null,
        pension: d?.pension ?? null,
        religion: d?.religion ?? null,
        telefono: d?.telefono ?? null,
        direccion: d?.direccion ?? null,
        personaContacto: d?.personaContacto ?? null,
        telefonoContacto: d?.telefonoContacto ?? null,
        motivoConsulta: body?.motivoConsulta ?? null,
        metas: body?.metas ?? null,
      },
    });

    if (body?.primeraCita) {
      await prisma.primeraCita.create({ data: { pamId: pam.id, respuestas: body.primeraCita } });
    }

    return NextResponse.json({ ok: true, id: pam.id });
  } catch (e: any) {
    console.error("ERROR EN POST:", e);
    return NextResponse.json({ error: 'Error interno clínico', detalle: e.message }, { status: 500 });
  }
}