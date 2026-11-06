'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, UserPlus, Loader2, Target, EyeOff, Eye } from 'lucide-react';

const ETIQUETA_STYLES: Record<string, string> = {
  LABORATORIO: 'bg-sky-100 text-sky-700',
  TALLER:      'bg-emerald-100 text-emerald-700',
  AMBOS:       'bg-violet-100 text-violet-700',
};

const ETIQUETA_LABEL: Record<string, string> = {
  LABORATORIO: 'Laboratorio',
  TALLER:      'Taller',
  AMBOS:       'Lab + Taller',
};

export function ListaPams() {
  const sp = useSearchParams();
  const [q, setQ] = useState(sp?.get?.('q') ?? '');
  const [pams, setPams] = useState<any[] | null>(null);
  const [mostrarInactivos, setMostrarInactivos] = useState(false);

  const cargar = useCallback((query: string, inactivos: boolean) => {
    const url = `/api/pams?q=${encodeURIComponent(query ?? '')}&inactivos=${inactivos}`;
    fetch(url)
      .then((r) => (r?.ok ? r.json() : []))
      .then((d) => setPams(Array.isArray(d) ? d : []))
      .catch(() => setPams([]));
  }, []);

useEffect(() => { cargar(q, false); }, []); // eslint-disable-line react-hooks/exhaustive-deps
useEffect(() => { cargar(q, mostrarInactivos); }, [mostrarInactivos]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-800">Personas registradas</h1>
          <p className="mt-1 text-sm text-slate-500">Expedientes de las Personas Adultas Mayores del laboratorio y los talleres.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMostrarInactivos((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50"
          >
            {mostrarInactivos ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {mostrarInactivos ? 'Ocultar inactivos' : 'Ver inactivos'}
          </button>
          <Link href="/pams/nueva" className="flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-600">
            <UserPlus className="h-4 w-4" /> Alta de Persona
          </Link>
        </div>
      </div>

      <form onSubmit={(e) => { e?.preventDefault?.(); cargar(q, mostrarInactivos); }} className="mt-5 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e?.target?.value ?? '')}
            placeholder="Buscar por nombre…"
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <button type="submit" className="rounded-lg bg-sky-500 px-4 text-sm font-semibold text-white shadow hover:bg-sky-600">Buscar</button>
      </form>

      {!pams ? (
        <div className="mt-10 flex justify-center"><Loader2 className="h-7 w-7 animate-spin text-sky-500" /></div>
      ) : pams.length === 0 ? (
        <div className="mt-8 rounded-xl bg-white p-8 text-center text-sm text-slate-400 shadow-sm">
          No se encontraron personas. Registre la primera con el botón "Alta de Persona".
        </div>
      ) : (
        <div className="mt-5 grid gap-3">
          {pams.map((p) => {
            const etiqueta = p?.etiqueta ?? p?.tipoAlta ?? 'LABORATORIO';
            return (
              <Link
                key={p?.id}
                href={`/pams/${p?.id}`}
                className={`rounded-xl bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${p?.inactivo ? 'opacity-60' : ''}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-medium text-slate-800">{p?.nombreCompleto}</div>
                  <div className="flex items-center gap-2">
                    {p?.edad != null && <span className="text-xs text-slate-500">{p?.edad} años</span>}

                    {/* Etiqueta Laboratorio / Taller / Ambos */}
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${ETIQUETA_STYLES[etiqueta] ?? ETIQUETA_STYLES.LABORATORIO}`}>
                      {ETIQUETA_LABEL[etiqueta] ?? etiqueta}
                    </span>

                    {/* Etiqueta Inactivo */}
                    {p?.inactivo && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                        Inactivo
                      </span>
                    )}
                  </div>
                </div>

                {p?.motivoConsulta && (
                  <div className="mt-1 flex items-start gap-1.5 text-xs text-slate-500">
                    <Target className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                    <span className="line-clamp-2">{p?.motivoConsulta}</span>
                  </div>
                )}

                {/* Motivo de pausa si está inactivo */}
                {p?.inactivo && p?.motivoPausa && (
                  <div className="mt-1 text-xs text-red-400">Motivo: {p?.motivoPausa}</div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}