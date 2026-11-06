import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

function esc(s: string) {
  return (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const nota = await prisma.notaClinica.findUnique({
      where: { id: params?.id },
      include: { pam: true, autor: { select: { name: true } } },
    });
    if (!nota) return NextResponse.json({ error: 'Nota no encontrada' }, { status: 404 });
    const fecha = new Date(nota.fecha).toLocaleDateString('es-MX', { dateStyle: 'long', timeZone: 'America/Mexico_City' });
    const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"/><style>
      body{font-family:Georgia,serif;color:#1a2b3c;margin:40px;line-height:1.6}
      .header{border-bottom:3px solid #0d9488;padding-bottom:12px;margin-bottom:24px}
      h1{color:#1e6091;font-size:20px;margin:0}
      .sub{color:#0d9488;font-size:13px}
      table{width:100%;border-collapse:collapse;margin:16px 0;font-size:13px}
      td{padding:6px 10px;border:1px solid #d8e2e8}
      td.k{background:#f0f7f5;font-weight:bold;width:32%}
      .contenido{margin-top:20px;font-size:14px;white-space:normal}
      .firma{margin-top:80px;text-align:center}
      .linea{border-top:1px solid #333;width:280px;margin:0 auto;padding-top:6px;font-size:13px}
    </style></head><body>
      <div class="header"><h1>Laboratorio de Envejecimiento Saludable</h1><div class="sub">Nota de Evolución Gerontológica</div></div>
      <table>
        <tr><td class="k">PAM (Persona Adulta Mayor)</td><td>${esc(nota.pam?.nombreCompleto ?? '')}</td></tr>
        <tr><td class="k">Edad</td><td>${nota.pam?.edad ?? '—'} años</td></tr>
        <tr><td class="k">Fecha de la nota</td><td>${fecha}</td></tr>
        <tr><td class="k">Gerontólogo(a)</td><td>${esc(nota.autor?.name ?? '—')}</td></tr>
        ${nota.titulo ? `<tr><td class="k">Título</td><td>${esc(nota.titulo)}</td></tr>` : ''}
      </table>
      <div class="contenido">${esc(nota.contenido)}</div>
      <div class="firma"><div class="linea">Nombre y firma del gerontólogo(a)</div></div>
    </body></html>`;

    const createResponse = await fetch('https://apps.abacus.ai/api/createConvertHtmlToPdfRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deployment_token: process.env.ABACUSAI_API_KEY,
        html_content: html,
        pdf_options: { format: 'Letter', margin: { top: '15mm', bottom: '15mm', left: '12mm', right: '12mm' } },
      }),
    });
    if (!createResponse.ok) return NextResponse.json({ error: 'No se pudo iniciar la generación del PDF' }, { status: 500 });
    const { request_id } = await createResponse.json();
    if (!request_id) return NextResponse.json({ error: 'Sin identificador de solicitud' }, { status: 500 });

    for (let i = 0; i < 120; i++) {
      await new Promise((r) => setTimeout(r, 1000));
      const st = await fetch('https://apps.abacus.ai/api/getConvertHtmlToPdfStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id, deployment_token: process.env.ABACUSAI_API_KEY }),
      });
      const sr = await st.json().catch(() => null);
      const status = sr?.status ?? 'FAILED';
      if (status === 'SUCCESS' && sr?.result?.result) {
        const buf = Buffer.from(sr.result.result, 'base64');
        return new NextResponse(new Uint8Array(buf), {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="nota_${params?.id}.pdf"`,
          },
        });
      }
      if (status === 'FAILED') return NextResponse.json({ error: 'Falló la generación del PDF' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Tiempo de espera agotado' }, { status: 500 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error al generar el PDF' }, { status: 500 });
  }
}
