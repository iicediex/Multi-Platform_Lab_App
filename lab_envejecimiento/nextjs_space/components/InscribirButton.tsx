'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export function InscribirButton({
  tallerId,
  pamId,
  pamNombre,
}: {
  tallerId: string;
  pamId: string;
  pamNombre: string;
}) {
  const [loading, setLoading] = useState(false);

  const inscribir = async () => {
    console.log("Intentando inscribir...", { tallerId, pamId }); // <-- Esto nos dirá si el clic
    if (!confirm(`¿Inscribir a ${pamNombre} en este taller?`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/talleres/${tallerId}/inscripciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pamId }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success('Inscripción realizada');
        window.location.reload();
      } else {
        toast.error(data.error || 'No se pudo inscribir');
      }
    } catch (e) {
      toast.error('Error de red al inscribir');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
    type="button"
      onClick={inscribir}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-50"
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      Inscribir
    </button>
  );
}