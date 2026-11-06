'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Trash2, Loader2 } from 'lucide-react';

export function BotonEliminarSeguro({
  pamId,
  pamNombre,
  onEliminado,
}: {
  pamId: string;
  pamNombre: string;
  onEliminado?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [loading, setLoading] = useState(false);

  const eliminar = async () => {
    if (confirmacion !== 'ELIMINAR') {
      toast.error('Escribe ELIMINAR exactamente');
      return;
    }
    if (!password) {
      toast.error('Escribe tu contraseña');
      return;
    }

    setLoading(true);
    const res = await fetch(`/api/pams/${pamId}/eliminar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, confirmacion }),
    }).catch(() => null);
    setLoading(false);

    if (res?.ok) {
      toast.success('Expediente eliminado y respaldado');
      setOpen(false);
      onEliminado?.();
    } else {
      const d = await res?.json().catch(() => ({}));
      toast.error(d.error || 'No se pudo eliminar');
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
      >
        <Trash2 className="h-4 w-4" /> Eliminar permanentemente
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
        <h3 className="mb-2 font-semibold text-red-700">Eliminar expediente</h3>
        <p className="mb-3 text-sm text-slate-600">
          Vas a eliminar a <b>{pamNombre}</b>. Se creará una copia de seguridad primero.
        </p>
        <div className="space-y-2">
          <input
            type="password"
            placeholder="Tu contraseña de administrador"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            placeholder="Escribe ELIMINAR para confirmar"
            value={confirmacion}
            onChange={(e) => setConfirmacion(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setOpen(false)}
            className="flex-1 rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            Cancelar
          </button>
          <button
            onClick={eliminar}
            disabled={loading}
            className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : 'Sí, eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}