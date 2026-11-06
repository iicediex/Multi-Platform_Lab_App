'use client';

import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { X, Loader2, Check } from 'lucide-react';

type Inscrito = { id: string; pam: { id: string; nombreCompleto: string } };

type Props = {
  tallerId: string;
  inscritos: Inscrito[]; // pasar desde DetalleTaller
  onClose: () => void;
  onSaved?: () => void;
};

export function NuevaSesionModal({ tallerId, inscritos, onClose, onSaved }: Props) {
  const hoy = new Date();
  const isoFechaDefault = hoy.toISOString().slice(0, 10); // YYYY-MM-DD

  const [fecha, setFecha] = useState<string>(isoFechaDefault);
  const [tema, setTema] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [marcados, setMarcados] = useState<Record<string, boolean>>(
    () => Object.fromEntries(inscritos.map((i) => [i.pam.id, false]))
  );

  // si la lista de inscritos cambia, re-inicializar marcados (opcional)
  React.useEffect(() => {
    setMarcados(Object.fromEntries(inscritos.map((i) => [i.pam.id, false])));
  }, [inscritos]);

  const presentesCount = useMemo(
    () => Object.values(marcados).filter(Boolean).length,
    [marcados]
  );

  const toggle = (pamId: string) =>
    setMarcados((m) => ({ ...m, [pamId]: !m[pamId] }));

  const marcarTodo = (valor: boolean) =>
    setMarcados(Object.fromEntries(inscritos.map((i) => [i.pam.id, valor])));

  const guardar = async () => {
    setGuardando(true);
    try {
      const asistencias = inscritos.map((i) => ({
        pamId: i.pam.id,
        presente: !!marcados[i.pam.id],
      }));

      const r = await fetch(`/api/talleres/${tallerId}/sesiones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fecha: fecha || undefined,
          tema,
          comentarios,
          asistencias,
        }),
      });

      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        toast.error(d?.error ?? 'No se pudo registrar la sesión');
        setGuardando(false);
        return;
      }

      toast.success('Sesión registrada');
      setGuardando(false);
      onSaved?.();
    } catch (e) {
      setGuardando(false);
      toast.error('Error de red al registrar la sesión');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800">Nueva sesión</h3>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 mb-3">
          <div className="sm:col-span-1">
            <label className="block text-xs text-slate-600">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs text-slate-600">Tema</label>
            <input
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              placeholder="Ej. Memoria y atención"
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs text-slate-600">Comentarios</label>
            <textarea
              rows={2}
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
              placeholder="Notas de la sesión..."
            />
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm text-slate-700">Asistencia ({inscritos.length})</div>
          <div className="flex items-center gap-2 text-sm">
            <button
              type="button"
              onClick={() => marcarTodo(true)}
              className="rounded-md bg-sky-100 px-2 py-1 text-sky-700"
            >
              Marcar todo
            </button>
            <button
              type="button"
              onClick={() => marcarTodo(false)}
              className="rounded-md bg-slate-100 px-2 py-1 text-slate-700"
            >
              Limpiar
            </button>
            <div className="text-xs text-slate-500">Presentes: {presentesCount}</div>
          </div>
        </div>

        <div className="mb-4 max-h-60 divide-y divide-slate-100 overflow-y-auto rounded-md border border-slate-100 bg-slate-50 p-2">
          {inscritos.length === 0 ? (
            <div className="p-3 text-sm text-slate-500">No hay inscritos.</div>
          ) : (
            inscritos.map((i) => (
              <label key={i.id} className="flex items-center justify-between gap-3 p-2">
                <div className="text-sm text-slate-800">{i.pam.nombreCompleto}</div>
                <input
                  type="checkbox"
                  checked={!!marcados[i.pam.id]}
                  onChange={() => toggle(i.pam.id)}
                  className="h-4 w-4 accent-teal-600"
                />
              </label>
            ))
          )}
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className="rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200">
            Cancelar
          </button>

          <button
            onClick={guardar}
            disabled={guardando}
            className="ml-auto flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {guardando && <Loader2 className="h-4 w-4 animate-spin" />}
            <Check className="h-4 w-4" />
            Guardar sesión
          </button>
        </div>
      </div>
    </div>
  );
}