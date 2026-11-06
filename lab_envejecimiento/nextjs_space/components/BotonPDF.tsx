'use client';

import { FileText } from 'lucide-react';

export function BotonPDF({ pamId }: { pamId: string }) {
  return (
    <a
      href={`/api/pams/${pamId}/pdf`}
      target="_blank"
      className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
    >
      <FileText className="h-4 w-4" /> Descargar PDF
    </a>
  );
}