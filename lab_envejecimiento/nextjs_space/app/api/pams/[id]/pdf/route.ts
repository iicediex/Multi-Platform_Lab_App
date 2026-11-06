import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

function esc(s: string) {
  return (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  try {
    // El ID que llega aquí es el del PAM (Persona)
    const pam = await prisma.pam.findUnique({
      where: { id: params.id },
    });

    if (!pam) return NextResponse.json({ error: 'Persona no encontrada' }, { status: 404 });

    // Traer TODO lo relacionado a esta persona
    const [signos, escalas, notas] = await Promise.all([
      prisma.signosVitales.findMany({ where: { pamId: pam.id }, orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.aplicacionEscala.findMany({ where: { pamId: pam.id }, orderBy: { createdAt: 'desc' } }),
      prisma.notaClinica.findMany({ where: { pamId: pam.id }, include: { autor: { select: { name: true } } }, orderBy: { createdAt: 'desc' } }),
    ]);

    let plecaBase64 = '';
    try {
      const plecaPath = path.join(process.cwd(), 'public', 'Pleca.jpg');
      if (fs.existsSync(plecaPath)) {
        plecaBase64 = `data:image/jpeg;base64,${fs.readFileSync(plecaPath).toString('base64')}`;
      }
    } catch (e) { console.warn('Pleca no encontrada'); }

    const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"/><style>
      @page { margin: 15mm 10mm 30mm 10mm; }
.pleca-pie { position: fixed; bottom: 0; left: 0; width: 100%; margin: 0; padding: 0; }
.pleca-pie img { width: 100%; height: auto; display: block; }
      body { font-family: Georgia, serif; color: #1a2b3c; line-height: 1.5; margin: 0; padding: 0; font-size: 12px; }
      .content-wrapper { padding: 0 15mm; }
      .header { border-bottom: 3px solid #0d9488; padding-bottom: 10px; margin-bottom: 20px; }
      h1 { color: #1e6091; font-size: 20px; margin: 0; }
      .seccion-titulo { color: #0d9488; font-size: 14px; font-weight: bold; margin-top: 15px; border-bottom: 1px solid #0d9488; padding-bottom: 2px; }
      table { width: 100%; border-collapse: collapse; margin: 10px 0; }
      td { padding: 5px 8px; border: 1px solid #d8e2e8; }
      td.k { background: #f0f7f5; font-weight: bold; width: 30%; color: #1e6091; }
      .item-escala { background: #f8fafc; padding: 8px; margin: 5px 0; border-left: 3px solid #0d9488; }
      .nota-bloque { border-bottom: 1px solid #eee; padding: 10px 0; }
      .footer { position: fixed; bottom: -5mm; left: 0; right: 0; width: 100%; }
      .footer img { width: 100%; display: block; }
    </style></head><body>
      <div class="content-wrapper">
        <div class="header">
          <h1>Expediente Gerontológico Completo</h1>
          <div style="color:#0d9488">Laboratorio de Envejecimiento Saludable BUAP</div>
        </div>

        <div class="seccion-titulo">Datos del PAM</div>
        <table>
          <tr><td class="k">Nombre</td><td><strong>${esc(pam.nombreCompleto)}</strong></td></tr>
          <tr><td class="k">Edad / Sexo</td><td>${pam.edad ?? '—'} años / ${esc(pam.sexo ?? '—')}</td></tr>
          <tr><td class="k">F. Nacimiento</td><td>${pam.fechaNacimiento ? new Date(pam.fechaNacimiento).toLocaleDateString('es-MX') : '—'}</td></tr>
          <tr><td class="k">Tipo de Alta</td><td>${esc(pam.tipoAlta)}</td></tr>
        </table>

        <div class="seccion-titulo">Signos Vitales Recientes</div>
        ${signos.length > 0 ? signos.map(s => `
          <table>
            <tr><td class="k">Fecha: ${new Date(s.createdAt).toLocaleDateString()}</td><td>T/A: ${esc(s.ta ?? '-')} | FC: ${s.fc ?? '-'} | Glucosa: ${s.glucosa ?? '-'}</td></tr>
          </table>
        `).join('') : '<p>Sin registros.</p>'}

        <div class="seccion-titulo">Escalas Aplicadas</div>
        ${escalas.length > 0 ? escalas.map(e => `
          <div class="item-escala">
            <strong>${esc(e.escalaId)}</strong>: ${e.puntaje} pts - ${esc(e.interpretacion ?? '')}
          </div>
        `).join('') : '<p>Sin escalas aplicadas.</p>'}

        <div class="seccion-titulo">Notas de Evolución</div>
        ${notas.length > 0 ? notas.map(n => `
          <div class="nota-bloque">
            <strong>${n.titulo ?? 'Sin título'}</strong> (${new Date(n.fecha).toLocaleDateString()})<br/>
            <small>Autor: ${esc(n.autor?.name ?? '—')}</small><br/>
            ${esc(n.contenido)}
          </div>
        `).join('') : '<p>Sin notas registradas.</p>'}
      </div>
      <div class="footer">${plecaBase64 ? `<img src="${plecaBase64}"/>` : ''}</div>
    </body></html>`;

    const createResponse = await fetch('https://apps.abacus.ai/api/createConvertHtmlToPdfRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deployment_token: process.env.ABACUSAI_API_KEY,
        html_content: html,
        pdf_options: { format: 'Letter', margin: { top: '0', bottom: '0', left: '0', right: '0' } },
      }),
    });

    const { request_id } = await createResponse.json();
    for (let i = 0; i < 60; i++) {
        await new Promise(r => setTimeout(r, 1000));
        const res = await fetch('https://apps.abacus.ai/api/getConvertHtmlToPdfStatus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ request_id, deployment_token: process.env.ABACUSAI_API_KEY }),
        });
        const sr = await res.json();
        if (sr.status === 'SUCCESS') return new NextResponse(new Uint8Array(Buffer.from(sr.result.result, 'base64')), { headers: { 'Content-Type': 'application/pdf' } });
    }
    return NextResponse.json({ error: 'Timeout' }, { status: 500 });
  } catch (e) { return NextResponse.json({ error: 'Error' }, { status: 500 }); }
}