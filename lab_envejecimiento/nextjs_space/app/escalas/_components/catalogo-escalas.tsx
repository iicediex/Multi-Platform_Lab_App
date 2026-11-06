'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ESCALAS, CATEGORIAS } from '@/lib/escalas-data';
import { Clock, MonitorSmartphone, X } from 'lucide-react';
import { toast } from 'sonner';

export function CatalogoEscalas() {
  const router = useRouter();
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [pams, setPams] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/pams').then((r) => (r?.ok ? r.json() : [])).then((d) => setPams(Array.isArray(d) ? d : [])).catch(() => setPams([]));
  }, []);

  const elegirPam = (pamId: string) => {
    if (!pamId) return;
    router?.push?.(`/pams/${pamId}/escalas/${seleccion}`);
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight text-slate-800">Escalas geriátricas</h1>
      <p className="mt-1 text-sm text-slate-500">Catálogo de los 25 instrumentos de valoración gerontológica, organizados por categoría. Seleccione una escala para aplicarla a una PAM.</p>

      {CATEGORIAS.map((cat) => {
        const escalasCat = ESCALAS.filter((e) => e?.categoria === cat);
        if (!escalasCat.length) return null;
        return (
          <section key={cat} className="mt-6">
            <h2 className="mb-2 font-display text-base font-semibold text-sky-600">{cat}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {escalasCat.map((e) => (
                <button key={e?.id} onClick={() => setSeleccion(e?.id)}
                  className="rounded-xl bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="text-sm font-semibold text-slate-800">{e?.nombreCorto}</div>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-500">{e?.descripcion}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                    {e?.tiempoAplicacion && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {e?.tiempoAplicacion}</span>}
                    {!e?.aptaMovil && <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 font-medium text-amber-700"><MonitorSmartphone className="h-3 w-3" /> Solo en PC</span>}
                  </div>
                </button>
              ))}
            </div>
          </section>
        );
      })}

      {seleccion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setSeleccion(null)}>
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl" onClick={(e) => e?.stopPropagation?.()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-slate-800">¿A qué PAM se aplicará?</h3>
              <button onClick={() => setSeleccion(null)} className="rounded-md p-1 text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
            </div>
            {pams.length === 0 ? (
              <p className="text-sm text-slate-400">No hay PAM registradas. Primero dé de alta a una PAM.</p>
            ) : (
              <div className="max-h-80 space-y-1 overflow-y-auto">
                {pams.map((p) => (
                  <button key={p?.id} onClick={() => elegirPam(p?.id)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-teal-50">
                    <span>{p?.nombreCompleto}</span>
                    <span className="text-xs text-slate-400">{p?.edad != null ? `${p?.edad} años` : ''}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
