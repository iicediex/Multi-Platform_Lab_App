'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getEscala, calcularPuntaje, interpretarPuntaje } from '@/lib/escalas-data';
import { ArrowLeft, MonitorSmartphone, Info, Loader2, Clock, Target } from 'lucide-react';

export function AplicarEscala({ pamId, escalaId }: { pamId: string; escalaId: string }) {
  const router = useRouter();
  const escala = useMemo(() => getEscala(escalaId), [escalaId]);
  const [respuestas, setRespuestas] = useState<Record<string, any>>({});
  const [comentarios, setComentarios] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [esMovil, setEsMovil] = useState(false);
  const [pam, setPam] = useState<any | null>(null);

  useEffect(() => {
    const check = () => setEsMovil((window?.innerWidth ?? 1200) < 768);
    check();
    window?.addEventListener?.('resize', check);
    return () => window?.removeEventListener?.('resize', check);
  }, []);

  useEffect(() => {
    fetch(`/api/pams/${pamId}`).then((r) => (r?.ok ? r.json() : null)).then((d) => setPam(d)).catch(() => null);
  }, [pamId]);

  const puntaje = escala ? calcularPuntaje(escala, respuestas) : null;
  const interpretacion = escala ? interpretarPuntaje(escala, puntaje) : null;

  if (!escala) return <div className="mt-8 rounded-xl bg-white p-8 text-center text-sm text-slate-400 shadow-sm">Escala no encontrada.</div>;

  if (!escala?.aptaMovil && esMovil) {
    return (
      <div className="mx-auto max-w-lg">
        <Link href={`/pams/${pamId}`} className="flex items-center gap-1 text-sm text-sky-600 hover:underline"><ArrowLeft className="h-4 w-4" /> Volver al expediente</Link>
        <div className="mt-6 rounded-xl bg-white p-6 text-center shadow-sm">
          <MonitorSmartphone className="mx-auto h-10 w-10 text-amber-500" />
          <h1 className="mt-3 font-display text-lg font-bold text-slate-800">{escala?.nombreCorto}</h1>
          <p className="mt-2 text-sm text-slate-600">Esta escala no puede aplicarse desde un dispositivo móvil. Por favor utilice una computadora (PC) del laboratorio.</p>
          {escala?.razonNoApta && <p className="mt-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">{escala?.razonNoApta}</p>}
          <p className="mt-3 text-xs text-slate-400">Los resultados previos de esta escala pueden consultarse en el expediente de la PAM.</p>
        </div>
      </div>
    );
  }

  const guardar = async () => {
    setGuardando(true);
    const r = await fetch(`/api/pams/${pamId}/escalas`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ escalaId, respuestas, comentarios }),
    }).catch(() => null);
    setGuardando(false);
    if (r?.ok) { toast.success('Escala guardada'); router?.push?.(`/pams/${pamId}`); }
    else toast.error('No se pudo guardar la escala');
  };

  let seccionActual = '';

  return (
    <div className="mx-auto max-w-3xl">
      <Link href={`/pams/${pamId}`} className="flex items-center gap-1 text-sm text-sky-600 hover:underline"><ArrowLeft className="h-4 w-4" /> Volver al expediente</Link>
      <h1 className="mt-2 font-display text-xl font-bold tracking-tight text-slate-800">{escala?.nombre}</h1>
      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <span className="rounded-full bg-teal-100 px-2 py-0.5 font-semibold text-sky-600">{escala?.categoria}</span>
        {escala?.tiempoAplicacion && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {escala?.tiempoAplicacion}</span>}
        {escala?.rango && <span>Rango: {escala?.rango}</span>}
      </div>
      <p className="mt-2 text-sm text-slate-600">{escala?.descripcion}</p>
      {pam?.motivoConsulta && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-3 text-xs text-amber-900">
          <Target className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span><strong>PAM: {pam?.nombreCompleto}</strong> · Motivo de consulta: {pam?.motivoConsulta}</span>
        </div>
      )}

      <div className="mt-4 space-y-3">
        {escala?.items?.map?.((item) => {
          const nuevaSeccion = item?.seccion && item?.seccion !== seccionActual;
          if (nuevaSeccion) seccionActual = item?.seccion ?? '';
          return (
            <div key={item?.id}>
              {nuevaSeccion && <div className="mb-1 mt-4 text-xs font-bold uppercase tracking-wide text-sky-600">{item?.seccion}</div>}
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <div className="text-sm font-medium text-slate-800">{item?.texto}</div>
                {item?.instruccion && <div className="mt-1 flex items-start gap-1.5 rounded-md bg-slate-50 p-2 text-xs text-slate-500"><Info className="mt-0.5 h-3 w-3 shrink-0" />{item?.instruccion}</div>}
                {item?.nota && <div className="mt-1 text-[11px] italic text-amber-700">{item?.nota}</div>}
                {item?.tipo === 'opciones' && (
                  <div className="mt-2 grid gap-1.5">
                    {item?.opciones?.map?.((op, idx) => (
                      <label key={idx} className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${String(respuestas?.[item?.id]) === String(idx) ? 'border-teal-600 bg-teal-50 text-teal-900' : 'border-slate-200 text-slate-600 hover:border-teal-300'}`}>
                        <input type="radio" name={item?.id} checked={String(respuestas?.[item?.id]) === String(idx)}
                          onChange={() => setRespuestas((r) => ({ ...(r ?? {}), [item?.id]: idx }))} className="h-3.5 w-3.5 accent-teal-600" />
                        {op?.etiqueta}
                      </label>
                    ))}
                  </div>
                )}
                {item?.tipo === 'numero' && (
                  <div className="mt-2 flex items-center gap-2">
                    <input type="number" min={item?.min} max={item?.max} step={item?.step ?? 1}
                      value={respuestas?.[item?.id] ?? ''}
                      onChange={(e) => {
                        const v = e?.target?.value ?? '';
                        setRespuestas((r) => ({ ...(r ?? {}), [item?.id]: v === '' ? '' : Math.min(Math.max(parseFloat(v), item?.min ?? 0), item?.max ?? 9999) }));
                      }}
                      className="w-32 rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
                    {item?.unidad && <span className="text-xs text-slate-500">{item?.unidad} {item?.max != null ? `(máx. ${item?.max})` : ''}</span>}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resultado en vivo */}
      <div className="mt-5 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 p-5 text-white shadow-md">
        <div className="text-xs uppercase tracking-wide opacity-80">Puntuación automática</div>
        <div className="mt-1 font-display text-3xl font-bold">{puntaje ?? '—'}{escala?.rango ? <span className="ml-2 text-base font-normal opacity-70">/ {escala?.rango}</span> : null}</div>
        {interpretacion && <div className="mt-1 text-sm font-medium">{interpretacion}</div>}
        {escala?.notaInterpretacion && <div className="mt-2 text-xs opacity-80">{escala?.notaInterpretacion}</div>}
        {escala?.metodoPuntuacion && <div className="mt-1 text-[11px] opacity-60">Método: {escala?.metodoPuntuacion}</div>}
      </div>

      <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
        <label className="mb-1 block text-sm font-semibold text-slate-700">Comentarios del gerontólogo(a)</label>
        <textarea rows={3} value={comentarios} onChange={(e) => setComentarios(e?.target?.value ?? '')}
          placeholder="Observaciones clínicas, condiciones de aplicación, hallazgos relevantes…"
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
      </div>

      <button onClick={guardar} disabled={guardando}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-sky-500 py-3 text-sm font-semibold text-white shadow hover:bg-sky-600 disabled:opacity-50">
        {guardando && <Loader2 className="h-4 w-4 animate-spin" />} Guardar aplicación de la escala
      </button>
      {escala?.fuente && <p className="mt-3 text-[11px] text-slate-400">Fuente: {escala?.fuente}</p>}
    </div>
  );
}
