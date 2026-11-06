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
    const num = (v: any) => (v === '' || v === null || v === undefined ? null : parseFloat(v));
    const peso = num(b?.peso);
    const talla = num(b?.talla);
    let imc: number | null = null;
    if (peso && talla && talla > 0) {
      const m = talla > 3 ? talla / 100 : talla;
      imc = Math.round((peso / (m * m)) * 10) / 10;
    }
    const sv = await prisma.signosVitales.create({
      data: {
        pamId: params?.id,
        ta: b?.ta ?? null,
        fc: num(b?.fc), fr: num(b?.fr), temperatura: num(b?.temperatura),
        peso, talla, imc, spo2: num(b?.spo2), glucosa: num(b?.glucosa),
        observaciones: b?.observaciones ?? null,
        registradoPorId: (session.user as any)?.id ?? null,
      },
    });
    return NextResponse.json({ ok: true, id: sv.id, imc });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al guardar signos vitales' }, { status: 500 });
  }
}
