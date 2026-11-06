import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// ── GET: obtener una persona por ID ──────────────────────────────
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const pam = await prisma.pam.findUnique({
    where: { id: params.id },
    include: {
      primeraCita: true,
      inscripciones: { include: { taller: { select: { id: true, nombre: true } } } },
      // ✅ AGREGADAS para que se vean en el perfil:
      signosVitales: {
        orderBy: { createdAt: "desc" },
        include: { registradoPor: { select: { name: true } } },
      },
      aplicaciones: {
        orderBy: { createdAt: "desc" },
        include: { aplicadaPor: { select: { name: true } } },
      },
      notas: {
        orderBy: { createdAt: "desc" },
        include: { autor: { select: { name: true } } },
      },
    },
  });

  if (!pam) return NextResponse.json({ error: "Persona no encontrada" }, { status: 404 });
  return NextResponse.json(pam);
}

// ── PUT: editar datos de una persona ────────────────────────────
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const body = await request.json();
    const pam = await prisma.pam.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(pam);
  } catch (e) {
    console.error("PUT /api/pams/[id]", e);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}

// ── PATCH: pausar o reactivar una persona ───────────────────────
//
//  Para PAUSAR envía:  { accion: "pausar", motivo: "No asistió 3 sesiones" }
//  Para REACTIVAR:     { accion: "reactivar" }
//
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const { accion, motivo } = await request.json();

    if (accion === "pausar") {
      const pam = await prisma.pam.update({
        where: { id: params.id },
        data: {
          inactivo: true,
          inactivoDesde: new Date(),
          motivoPausa: motivo ?? "Sin motivo especificado",
        },
      });
      return NextResponse.json({ ok: true, pam });
    }

    if (accion === "reactivar") {
      const pam = await prisma.pam.update({
        where: { id: params.id },
        data: {
          inactivo: false,
          inactivoDesde: null,
          motivoPausa: null,
        },
      });
      return NextResponse.json({ ok: true, pam });
    }

    return NextResponse.json({ error: "Acción no válida. Usa 'pausar' o 'reactivar'" }, { status: 400 });
  } catch (e) {
    console.error("PATCH /api/pams/[id]", e);
    return NextResponse.json({ error: "Error al cambiar estado" }, { status: 500 });
  }
}

// ── DELETE: eliminar persona (solo si lleva 90+ días inactiva) ──
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const pam = await prisma.pam.findUnique({ where: { id: params.id } });
    if (!pam) return NextResponse.json({ error: "Persona no encontrada" }, { status: 404 });

    if (!pam.inactivo || !pam.inactivoDesde) {
      return NextResponse.json(
        { error: "Solo se puede eliminar una persona que esté pausada." },
        { status: 400 }
      );
    }

    const hoy = new Date();
    const diasInactiva = Math.floor(
      (hoy.getTime() - new Date(pam.inactivoDesde).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diasInactiva < 90) {
      const diasRestantes = 90 - diasInactiva;
      return NextResponse.json(
        {
          error: `Aún no se puede eliminar. Faltan ${diasRestantes} día(s) para completar el período de gracia de 90 días.`,
          diasRestantes,
        },
        { status: 400 }
      );
    }

    await prisma.pam.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true, mensaje: "Persona eliminada correctamente." });
  } catch (e) {
    console.error("DELETE /api/pams/[id]", e);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}