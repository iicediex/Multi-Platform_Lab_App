'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { CalendarDays, Plus, Loader2, Users, X, ShieldCheck } from 'lucide-react';

export function ListaTalleres() {
  const [talleres, setTalleres] = useState<any[] | null>(null);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [abierto, setAbierto] = useState(false);
  const [f, setF] = useState<Record<string, any>>({});
  const [selectedEncargados, setSelectedEncargados] = useState<string[]>([]);
  const [guardando, setGuardando] = useState(false);

  const cargar = useCallback(() => {
    fetch('/api/talleres')
      .then((r) => (r?.ok ? r.json() : []))
      .then((d) => setTalleres(Array.isArray(d) ? d : []))
      .catch(() => setTalleres([]));
  }, []);

  useEffect(() => {
    cargar();
    fetch('/api/usuarios')
      .then((r) => (r?.ok ? r.json() : []))
      .then((d) => setUsuarios(Array.isArray(d) ? d : []))
      .catch(() => setUsuarios([]));
  }, [cargar]);

  const crear = async () => {
    // Validaciones: nombre / horas / sesiones
    if (!f?.nombre) { toast.error('El nombre del taller es obligatorio'); return; }
    if (!f?.horaInicio || !f?.horaFin) { toast.error('La hora de inicio y fin son obligatorias'); return; }
    if (!f?.totalSesiones || Number(f?.totalSesiones) < 1) { toast.error('El número de sesiones es obligatorio'); return; }

    // Validación consentimiento obligatoria (frontend)
    const tieneTexto = typeof f?.consentimientoTexto === 'string' && f.consentimientoTexto.trim() !== '';
    const tienePdf = typeof f?.consentimientoPdfUrl === 'string' && f.consentimientoPdfUrl.trim() !== '';
    if (!tieneTexto && !tienePdf) {
      toast.error('Debe escribir el consentimiento o pegar la URL del PDF del consentimiento');
      return;
    }

    setGuardando(true);
    try {
      const horaInicio = f?.horaInicio ?? '';
      const horaFin = f?.horaFin ?? '';
      const dias = f?.dias ?? '';
      const horario = dias ? `${dias} ${horaInicio}–${horaFin}`.trim() : `${horaInicio}–${horaFin}`.trim();
      const body = { ...f, horario, totalSesiones: Number(f?.totalSesiones), encargadoIds: selectedEncargados };

      const r = await fetch('/api/talleres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      setGuardando(false);
      if (r.ok) {
        toast.success('Taller creado');
        setAbierto(false);
        setF({});
        setSelectedEncargados([]);
        cargar();
      } else {
        const d = await r.json().catch(() => ({}));
        toast.error(d?.error ?? 'No se pudo crear el taller');
      }
    } catch {
      setGuardando(false);
      toast.error('Error de red al crear el taller');
    }
  };

  const borrarTaller = async (id: string) => {
    if (!confirm('¿Eliminar este taller? Esta acción es irreversible.')) return;
    const res = await fetch(`/api/talleres/${id}`, { method: 'DELETE' }).catch(() => null);
    if (res?.ok) { toast.success('Taller eliminado'); cargar(); }
    else { const d = await res?.json?.().catch(() => ({})); toast.error(d?.error ?? 'No se pudo eliminar'); }
  };

  // Computos para habilitar botón de crear (UX)
  const tieneTexto = typeof f?.consentimientoTexto === 'string' && f.consentimientoTexto.trim() !== '';
  const tienePdf = typeof f?.consentimientoPdfUrl === 'string' && f.consentimientoPdfUrl.trim() !== '';
  const canCreate = !!f?.nombre && !!f?.horaInicio && !!f?.horaFin && Number(f?.totalSesiones) >= 1 && (tieneTexto || tienePdf);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-800">Talleres</h1>
          <p className="mt-1 text-sm text-slate-500">Talleres del laboratorio, con lista de asistencia y comentarios por sesión.</p>
        </div>
        <button
          onClick={() => setAbierto(true)}
          className="flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-600"
        >
          <Plus className="h-4 w-4" /> Nuevo taller
        </button>
      </div>

      {!talleres ? (
        <div className="mt-10 flex justify-center"><Loader2 className="h-7 w-7 animate-spin text-sky-500" /></div>
      ) : talleres.length === 0 ? (
        <div className="mt-8 rounded-xl bg-white p-8 text-center text-sm text-slate-400 shadow-sm">
          Aún no hay talleres. Cree el primero con el botón "Nuevo taller".
        </div>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {talleres.map((t) => (
            <Link
              key={t?.id}
              href={`/talleres/${t?.id}`}
              className="relative rounded-xl bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-2 inline-flex rounded-lg bg-emerald-600 p-2">
                <CalendarDays className="h-4 w-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-800">{t?.nombre}</span>
                {!t?.activo && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">Inactivo</span>}
                {t?.consentimientoTexto && (
                  <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] text-teal-600 flex items-center gap-0.5">
                    <ShieldCheck className="h-2.5 w-2.5" /> Consent.
                  </span>
                )}
              </div>
              {t?.horario && <div className="mt-0.5 text-xs text-slate-500">{t?.horario}</div>}
              {t?.descripcion && <p className="mt-1 line-clamp-2 text-xs text-slate-400">{t?.descripcion}</p>}
              <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> {t?._count?.inscripciones ?? 0} personas
                </span>
                <span>{t?._count?.sesiones ?? 0}{t?.totalSesiones ? `/${t?.totalSesiones}` : ''} sesiones</span>
                {(() => {
                  if (Array.isArray(t?.encargados) && t.encargados.length > 0) {
                    const names = t.encargados.map((e: any) => e?.user?.name ?? e?.name).filter(Boolean);
                    if (names.length) return <span className="text-slate-400">· {names.join(', ')}</span>;
                  }
                  if (t?.encargado?.name) return <span className="text-slate-400">· {t.encargado.name}</span>;
                  return null;
                })()}
              </div>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); borrarTaller(t.id); }}
                className="absolute right-3 top-3 text-xs text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </Link>
          ))}
        </div>
      )}

      {abierto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setAbierto(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-slate-800">Nuevo taller</h3>
              <button onClick={() => setAbierto(false)} className="rounded-md p-1 text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Nombre */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Nombre *</label>
                <input
                  value={f?.nombre ?? ''}
                  onChange={(e) => setF((d) => ({ ...d, nombre: e.target.value ?? '' }))}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  placeholder="Ej. Taller de memoria"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Descripción</label>
                <textarea
                  rows={2}
                  value={f?.descripcion ?? ''}
                  onChange={(e) => setF((d) => ({ ...d, descripcion: e.target.value ?? '' }))}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              {/* Días */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Días *</label>
                <input
                  value={f?.dias ?? ''}
                  onChange={(e) => setF((d) => ({ ...d, dias: e.target.value ?? '' }))}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  placeholder="Ej. Lunes y Miércoles"
                />
              </div>

              {/* Hora inicio / fin + Total sesiones */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Hora inicio *</label>
                  <select
                    value={f?.horaInicio ?? ''}
                    onChange={(e) => setF((d) => ({ ...d, horaInicio: e.target.value ?? '' }))}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                  >
                    <option value="">--:--</option>
                    {Array.from({ length: 24 * 4 }, (_, i) => {
                      const h = String(Math.floor(i / 4)).padStart(2, '0');
                      const m = String((i % 4) * 15).padStart(2, '0');
                      return `${h}:${m}`;
                    }).map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Hora fin *</label>
                  <select
                    value={f?.horaFin ?? ''}
                    onChange={(e) => setF((d) => ({ ...d, horaFin: e.target.value ?? '' }))}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                  >
                    <option value="">--:--</option>
                    {Array.from({ length: 24 * 4 }, (_, i) => {
                      const h = String(Math.floor(i / 4)).padStart(2, '0');
                      const m = String((i % 4) * 15).padStart(2, '0');
                      return `${h}:${m}`;
                    }).map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Total sesiones *</label>
                  <input
                    type="number"
                    min={1}
                    value={f?.totalSesiones ?? ''}
                    onChange={(e) => setF((d) => ({ ...d, totalSesiones: e.target.value ?? '' }))}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Ej. 12"
                  />
                </div>
              </div>

              {/* Consentimiento informado */}
              <div className="rounded-lg border border-teal-200 bg-teal-50 p-3 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-700">
                  <ShieldCheck className="h-4 w-4" /> Consentimiento informado del taller
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Texto del consentimiento</label>
                  <textarea
                    rows={4}
                    value={f?.consentimientoTexto ?? ''}
                    onChange={(e) => setF((d) => ({ ...d, consentimientoTexto: e.target.value ?? '' }))}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                    placeholder="Escriba aquí el texto del consentimiento informado que la persona deberá aceptar al inscribirse…"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">URL del PDF de consentimiento (opcional)</label>
                  <input
                    value={f?.consentimientoPdfUrl ?? ''}
                    onChange={(e) => setF((d) => ({ ...d, consentimientoPdfUrl: e.target.value ?? '' }))}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                    placeholder="https://… (enlace al PDF)"
                  />
                </div>

                {/* Vista previa / enlace */}
                <div className="mt-2 space-y-2">
                  {(!tieneTexto && !tienePdf) && (
                    <div className="text-xs text-amber-700">
                      Debe escribir el texto del consentimiento o pegar la URL del PDF antes de crear el taller.
                    </div>
                  )}

                  {tieneTexto && (
                    <div className="max-h-48 overflow-y-auto rounded border border-slate-100 bg-white p-3 text-sm text-slate-700 whitespace-pre-line">
                      {f.consentimientoTexto}
                    </div>
                  )}

                  {tienePdf && (
                    <div className="space-y-1">
                      <a href={f.consentimientoPdfUrl} target="_blank" rel="noreferrer" className="text-sky-600 underline text-sm">
                        Ver consentimiento en PDF
                      </a>
                      <div className="hidden sm:block">
                        <iframe src={f.consentimientoPdfUrl} className="mt-1 h-40 w-full rounded-md border" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Encargados */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Encargados</label>
                <div className="max-h-40 overflow-auto rounded border border-slate-100 p-2 grid gap-2">
                  {usuarios.map((u) => (
                    <label key={u.id} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedEncargados.includes(u.id)}
                        onChange={(e) => {
                          setSelectedEncargados((prev) =>
                            e.target.checked ? [...prev, u.id] : prev.filter((id) => id !== u.id)
                          );
                        }}
                        className="h-4 w-4"
                      />
                      <span className="truncate">{u.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={crear}
                disabled={guardando || !canCreate}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-50"
              >
                {guardando && <Loader2 className="h-4 w-4 animate-spin" />} Crear taller
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}