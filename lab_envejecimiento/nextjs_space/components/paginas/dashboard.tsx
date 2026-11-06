'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users, UserPlus, ClipboardList, CalendarDays, Search, FileText, FlaskConical, Loader2, ArrowRight, Target,
} from 'lucide-react';

interface Stats {
  totalPams?: number; pamsLab?: number; pamsTaller?: number; talleresActivos?: number;
  escalasAplicadas?: number; notasTotal?: number;
  citasHoy?: any[]; ultimasPams?: any[];
}

export function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [q, setQ] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => (r?.ok ? r.json() : null))
      .then((d) => setStats(d ?? {}))
      .catch(() => setStats({}));
  }, []);

  const buscar = (e: React.FormEvent) => {
    e?.preventDefault?.();
    router?.push?.(`/pams?q=${encodeURIComponent(q ?? '')}`);
  };

  const tarjetas = [
    { etiqueta: 'PAM registradas', valor: stats?.totalPams, icono: Users, color: 'bg-sky-500' },
    { etiqueta: 'Alta en Laboratorio', valor: stats?.pamsLab, icono: FlaskConical, color: 'bg-sky-600' },
    { etiqueta: 'Talleres activos', valor: stats?.talleresActivos, icono: CalendarDays, color: 'bg-emerald-600' },
    { etiqueta: 'Escalas aplicadas', valor: stats?.escalasAplicadas, icono: ClipboardList, color: 'bg-indigo-500' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight text-slate-800">Panel principal</h1>
      <p className="mt-1 text-sm text-slate-500">Resumen general del laboratorio y accesos directos a las funciones principales.</p>

      <form onSubmit={buscar} className="mt-5 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e?.target?.value ?? '')}
            placeholder="Búsqueda rápida de PAM por nombre…"
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
        </div>
        <button type="submit" className="rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-600">Buscar</button>
      </form>

      {!stats ? (
        <div className="mt-10 flex justify-center"><Loader2 className="h-7 w-7 animate-spin text-sky-500" /></div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {tarjetas.map((t) => {
              const Icono = t.icono;
              return (
                <div key={t.etiqueta} className="rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                  <div className={`mb-3 inline-flex rounded-lg ${t.color} p-2`}><Icono className="h-5 w-5 text-white" /></div>
                  <div className="font-display text-2xl font-bold text-slate-800">{t.valor ?? 0}</div>
                  <div className="text-xs text-slate-500">{t.etiqueta}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-slate-800">
                <CalendarDays className="h-4 w-4 text-sky-500" /> Citas de hoy
              </h2>
              {(stats?.citasHoy?.length ?? 0) === 0 ? (
                <p className="text-sm text-slate-400">No hay citas agendadas para hoy.</p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {stats?.citasHoy?.map?.((c: any) => (
                    <li key={c?.id} className="flex items-center justify-between py-2">
                      <div>
                        <Link href={`/pams/${c?.pam?.id}`} className="text-sm font-medium text-sky-600 hover:underline">{c?.pam?.nombreCompleto}</Link>
                        <div className="text-xs text-slate-400">{c?.motivo ?? 'Consulta'} · {c?.gerontologo?.name ?? ''}</div>
                      </div>
                      <span className="font-mono text-xs text-slate-500">
                        {new Date(c?.fecha).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City' })}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-slate-800">
                <Users className="h-4 w-4 text-sky-500" /> Últimas PAM registradas
              </h2>
              {(stats?.ultimasPams?.length ?? 0) === 0 ? (
                <p className="text-sm text-slate-400">Aún no hay PAM registradas. Comience dando de alta a la primera.</p>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {stats?.ultimasPams?.map?.((p: any) => (
                    <li key={p?.id} className="py-2">
                      <div className="flex items-center justify-between">
                        <Link href={`/pams/${p?.id}`} className="text-sm font-medium text-sky-600 hover:underline">{p?.nombreCompleto}</Link>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          p?.etiqueta === 'AMBOS'
                            ? 'bg-purple-100 text-purple-700'
                            : p?.etiqueta === 'TALLER'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-sky-100 text-sky-700'
                        }`}>
                          {p?.etiqueta === 'AMBOS' ? 'Lab + Taller' : p?.etiqueta === 'TALLER' ? 'Taller' : 'Laboratorio'}
                        </span>
                      </div>
                      {p?.motivoConsulta && (
                        <div className="mt-0.5 flex items-start gap-1 text-xs text-slate-500">
                          <Target className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                          <span className="line-clamp-1">{p?.motivoConsulta}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { href: '/pams/nueva', etiqueta: 'Dar de alta una PAM', icono: UserPlus },
              { href: '/escalas', etiqueta: 'Aplicar una escala', icono: ClipboardList },
              { href: '/pams', etiqueta: 'Ver expedientes', icono: FileText },
              { href: '/talleres', etiqueta: 'Gestionar talleres', icono: CalendarDays },
            ].map((a) => {
              const Icono = a.icono;
              return (
                <Link key={a.href} href={a.href}
                  className="group flex items-center justify-between rounded-xl bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <Icono className="h-5 w-5 text-sky-500" />
                    <span className="text-sm font-medium text-slate-700">{a.etiqueta}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-sky-500" />
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}