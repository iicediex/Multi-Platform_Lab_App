'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ESCALAS, CATEGORIAS, getEscala } from '@/lib/escalas-data';
import {
  Target, Sparkles, HeartPulse, ClipboardList, FileText, User, Loader2, Plus, Printer, CalendarPlus, CalendarDays, PauseCircle, PlayCircle, X,
} from 'lucide-react';

const fmtFecha = (f: any) => (f ? new Date(f).toLocaleDateString('es-MX', { dateStyle: 'medium', timeZone: 'America/Mexico_City' }) : '—');
const fmtFechaHora = (f: any) => (f ? new Date(f).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Mexico_City' }) : '—');

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

export function PerfilPam({ pamId }: { pamId: string }) {
  const [pam, setPam] = useState<any | null>(null);
  const [tab, setTab] = useState<'resumen' | 'vitales' | 'escalas' | 'notas'>('resumen');
  const [cargando, setCargando] = useState(true);
  const [modalPausa, setModalPausa] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [guardandoPausa, setGuardandoPausa] = useState(false);
  const [descargandoExpediente, setDescargandoExpediente] = useState(false);

  const cargar = useCallback(() => {
    fetch(`/api/pams/${pamId}`)
      .then((r) => (r?.ok ? r.json() : null))
      .then((d) => { setPam(d); setCargando(false); })
      .catch(() => setCargando(false));
  }, [pamId]);

  useEffect(() => { cargar(); }, [cargar]);

  const togglePausa = async () => {
    if (!pam?.inactivo && !motivo.trim()) {
      toast.error('Escribe el motivo de la pausa');
      return;
    }
    setGuardandoPausa(true);
    const r = await fetch(`/api/pams/${pamId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        pam?.inactivo
          ? { accion: 'reactivar' }
          : { accion: 'pausar', motivo }
      ),
    }).catch(() => null);
    setGuardandoPausa(false);
    if (r?.ok) {
      toast.success(pam?.inactivo ? 'Persona reactivada' : 'Persona pausada');
      setModalPausa(false);
      setMotivo('');
      cargar();
    } else {
      const d = await r?.json?.().catch(() => ({}));
      toast.error(d?.error ?? 'No se pudo actualizar');
    }
  };

  const descargarExpediente = async () => {
    setDescargandoExpediente(true);
    try {
      const r = await fetch(`/api/pams/${pamId}/pdf`);
      if (!r.ok) throw new Error();
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const enlace = document.createElement('a');
      enlace.href = url;
      enlace.download = `expediente_${(pam?.nombreCompleto ?? 'persona').replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(enlace);
      enlace.click();
      enlace.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error('No se pudo generar el expediente PDF');
    } finally {
      setDescargandoExpediente(false);
    }
  };

  if (cargando) return <div className="mt-10 flex justify-center"><Loader2 className="h-7 w-7 animate-spin text-sky-500" /></div>;
  if (!pam) return <div className="mt-8 rounded-xl bg-white p-8 text-center text-sm text-slate-400 shadow-sm">No se encontró la persona.</div>;

  const inscripcionesActivas = (pam?.inscripciones ?? []).filter((i: any) => i?.activa !== false);
  const enLab = pam?.tipoAlta === 'LABORATORIO';
  const enTaller = inscripcionesActivas.length > 0;
  const etiqueta = enLab && enTaller ? 'AMBOS' : enTaller ? 'TALLER' : 'LABORATORIO';

  const tabs = [
    { id: 'resumen', t: 'Resumen', i: User },
    { id: 'vitales', t: 'Signos vitales', i: HeartPulse },
    { id: 'escalas', t: 'Escalas', i: ClipboardList },
    { id: 'notas', t: 'Notas clínicas', i: FileText },
  ] as const;

  return (
    <div>
      {pam?.inactivo && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <PauseCircle className="h-5 w-5 shrink-0 text-red-500" />
          <div>
            <span className="font-semibold">Persona inactiva</span>
            {pam?.motivoPausa && <span> · Motivo: {pam?.motivoPausa}</span>}
            {pam?.inactivoDesde && <span className="ml-1 text-red-400">desde {fmtFecha(pam?.inactivoDesde)}</span>}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-800">{pam?.nombreCompleto}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            {pam?.edad != null && <span>{pam?.edad} años</span>}
            {pam?.sexo && <span>· {pam?.sexo}</span>}
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${ETIQUETA_STYLES[etiqueta]}`}>
              {ETIQUETA_LABEL[etiqueta]}
            </span>
            {pam?.inactivo && (
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600">Inactivo</span>
            )}
            {pam?.consentimientoAceptado && (
              <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold text-sky-600">
                Consentimiento aceptado · {fmtFecha(pam?.consentimientoFecha)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* ✅ BOTÓN EXPEDIENTE PDF */}
          <button
            onClick={descargarExpediente}
            disabled={descargandoExpediente}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-50"
          >
            {descargandoExpediente ? <Loader2 className="h-4 w-4 animate-spin" /> : <Printer className="h-4 w-4" />}
            Expediente PDF
          </button>

          <button
            onClick={() => pam?.inactivo ? togglePausa() : setModalPausa(true)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold shadow ${
              pam?.inactivo
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
            }`}
          >
            {pam?.inactivo
              ? <><PlayCircle className="h-4 w-4" /> Reactivar</>
              : <><PauseCircle className="h-4 w-4" /> Pausar</>
            }
          </button>
          <AgendarCita pamId={pamId} onOk={cargar} />
        </div>
      </div>

      {modalPausa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setModalPausa(false)}>
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-slate-800">Pausar persona</h3>
              <button onClick={() => setModalPausa(false)} className="rounded-md p-1 text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
            </div>
            <p className="mb-3 text-sm text-slate-500">La persona quedará marcada como inactiva. Podrás reactivarla en cualquier momento.</p>
            <label className="mb-1 block text-xs font-medium text-slate-600">Motivo de la pausa <span className="text-red-500">*</span></label>
            <textarea
              rows={3}
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ej. No ha asistido al laboratorio en los últimos 3 meses…"
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <div className="mt-3 flex gap-2">
              <button onClick={() => setModalPausa(false)} className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancelar</button>
              <button onClick={togglePausa} disabled={guardandoPausa} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-500 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-50">
                {guardandoPausa && <Loader2 className="h-4 w-4 animate-spin" />} Confirmar pausa
              </button>
            </div>
          </div>
        </div>
      )}

      {(pam?.motivoConsulta || pam?.metas) && (
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {pam?.motivoConsulta && (
            <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 shadow-sm">
              <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-amber-800"><Target className="h-4 w-4" /> Motivo de Consulta</div>
              <p className="whitespace-pre-line text-sm text-amber-900">{pam?.motivoConsulta}</p>
            </div>
          )}
          {pam?.metas && (
            <div className="rounded-xl border-l-4 border-sky-500 bg-teal-50 p-4 shadow-sm">
              <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-teal-800"><Sparkles className="h-4 w-4" /> Metas y Objetivos Personales</div>
              <p className="whitespace-pre-line text-sm text-teal-900">{pam?.metas}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-5 flex gap-1 overflow-x-auto rounded-lg bg-slate-100 p-1">
        {tabs.map((t) => {
          const Icono = t.i;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${tab === t.id ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              <Icono className="h-4 w-4" /> {t.t}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        {tab === 'resumen' && <Resumen pam={pam} />}
        {tab === 'vitales' && <Vitales pam={pam} onOk={cargar} />}
        {tab === 'escalas' && <EscalasTab pam={pam} />}
        {tab === 'notas' && <Notas pam={pam} onOk={cargar} />}
      </div>
    </div>
  );
}

function AgendarCita({ pamId, onOk }: { pamId: string; onOk: () => void }) {
  const [abierto, setAbierto] = useState(false);
  const [fecha, setFecha] = useState('');
  const [motivo, setMotivo] = useState('');
  const [guardando, setGuardando] = useState(false);
  const guardar = async () => {
    if (!fecha) { toast.error('Seleccione fecha y hora'); return; }
    setGuardando(true);
    const r = await fetch('/api/citas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pamId, fecha, motivo }) }).catch(() => null);
    setGuardando(false);
    if (r?.ok) { toast.success('Cita agendada'); setAbierto(false); setFecha(''); setMotivo(''); onOk?.(); }
    else toast.error('No se pudo agendar');
  };
  return (
    <div className="relative">
      <button onClick={() => setAbierto(!abierto)} className="flex items-center gap-2 rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-sky-600">
        <CalendarPlus className="h-4 w-4" /> Agendar cita
      </button>
      {abierto && (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl bg-white p-4 shadow-lg ring-1 ring-slate-200">
          <label className="mb-1 block text-xs font-medium text-slate-600">Fecha y hora</label>
          <input type="datetime-local" value={fecha} onChange={(e) => setFecha(e?.target?.value ?? '')} className="mb-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
          <label className="mb-1 block text-xs font-medium text-slate-600">Motivo</label>
          <input value={motivo} onChange={(e) => setMotivo(e?.target?.value ?? '')} placeholder="Consulta de seguimiento" className="mb-3 w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
          <button onClick={guardar} disabled={guardando} className="w-full rounded-md bg-sky-500 py-2 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-50">Guardar cita</button>
        </div>
      )}
    </div>
  );
}

function Resumen({ pam }: { pam: any }) {
  const datos: [string, any][] = [
    ['Fecha de entrevista', fmtFecha(pam?.fechaEntrevista)],
    ['Fecha de nacimiento', fmtFecha(pam?.fechaNacimiento)],
    ['Lugar de nacimiento', pam?.lugarNacimiento],
    ['Género', pam?.genero],
    ['Grupo originario', pam?.grupoOriginario],
    ['Lengua indígena', pam?.lenguaIndigena],
    ['Estado civil', pam?.estadoCivil],
    ['Años de escuela', pam?.aniosEscuela],
    ['Escolaridad', pam?.escolaridad],
    ['Ocupación', pam?.ocupacion],
    ['Afiliación médica', pam?.afiliacionMedica],
    ['Alergias', pam?.alergias],
    ['Tipo de sangre', pam?.tipoSangre],
    ['Pensión', pam?.pension],
    ['Religión', pam?.religion],
    ['Teléfono', pam?.telefono],
    ['Dirección', pam?.direccion],
    ['Persona de contacto', pam?.personaContacto],
    ['Teléfono de contacto', pam?.telefonoContacto],
  ];
  const pc = pam?.primeraCita?.respuestas ?? null;
  const ETIQUETAS_PC: Record<string, string> = {
    actividadFisica: 'Actividad física habitual', alimentacion: 'Alimentación (percepción)', sueno: 'Sueño y descanso',
    actividadesRecreativas: 'Actividades recreativas y sociales', tabaco: 'Consumo de tabaco', alcohol: 'Consumo de alcohol',
    otrasSustancias: 'Uso de otras sustancias', enfermedadesCronicas: 'Enfermedades crónicas', heredofamiliares: 'Enfermedades heredofamiliares',
    hospitalizaciones: 'Hospitalizaciones previas', cirugias: 'Cirugías previas', vacunas: 'Vacunas en el último año',
    auxiliares: 'Auxiliar de funcionalidad', medicacion: 'Medicación actual',
  };
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="mb-3 font-display text-base font-semibold text-slate-800">Datos personales</h3>
        <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {datos.map(([k, v]) => (
            <div key={k}><dt className="text-xs text-slate-400">{k}</dt><dd className="text-slate-700">{v ?? '—'}</dd></div>
          ))}
        </dl>
      </div>
      {pc?.antecedentes && Object.keys(pc?.antecedentes ?? {}).length > 0 && (
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="mb-3 font-display text-base font-semibold text-slate-800">Cuestionario de primera cita</h3>
          <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
            {Object.entries(pc?.antecedentes ?? {}).map(([k, v]: [string, any]) => (
              v ? <div key={k}><dt className="text-xs text-slate-400">{ETIQUETAS_PC?.[k] ?? k}</dt><dd className="whitespace-pre-line text-slate-700">{String(v)}</dd></div> : null
            ))}
          </dl>
        </div>
      )}
      {(pam?.inscripciones?.length ?? 0) > 0 && (
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-slate-800"><CalendarDays className="h-4 w-4 text-emerald-600" /> Talleres inscritos</h3>
          <ul className="space-y-1 text-sm">
            {pam?.inscripciones?.map?.((i: any) => (
              <li key={i?.id} className="flex items-center gap-2">
                <Link href={`/talleres/${i?.taller?.id}`} className="text-sky-600 hover:underline">{i?.taller?.nombre}</Link>
                {i?.taller?.horario && <span className="text-slate-400">· {i?.taller?.horario}</span>}
                {i?.activa === false && <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-500">Baja</span>}
                {i?.faltasConsecutivas > 0 && i?.activa !== false && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
                    {i?.faltasConsecutivas} falta{i?.faltasConsecutivas > 1 ? 's' : ''}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Vitales({ pam, onOk }: { pam: any; onOk: () => void }) {
  const [f, setF] = useState<Record<string, string>>({});
  const [guardando, setGuardando] = useState(false);
  const set = (k: string, v: string) => setF((d) => ({ ...(d ?? {}), [k]: v }));
  const peso = parseFloat(f?.peso ?? '');
  const talla = parseFloat(f?.talla ?? '');
  const imc = peso > 0 && talla > 0 ? (peso / Math.pow(talla > 3 ? talla / 100 : talla, 2)) : null;

  const guardar = async () => {
    setGuardando(true);
    const r = await fetch(`/api/pams/${pam?.id}/vitales`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) }).catch(() => null);
    setGuardando(false);
    if (r?.ok) { toast.success('Signos vitales registrados'); setF({}); onOk?.(); }
    else toast.error('No se pudo guardar');
  };

  const campos: [string, string, string][] = [
    ['ta', 'TA — Presión arterial', 'mmHg (ej. 120/80)'],
    ['fc', 'FC — Frecuencia cardíaca', 'lpm'],
    ['fr', 'FR — Frecuencia respiratoria', 'rpm'],
    ['temperatura', 'Temperatura', '°C'],
    ['peso', 'Peso', 'kg'],
    ['talla', 'Talla', 'cm'],
    ['spo2', 'SpO2 — Saturación de oxígeno', '%'],
    ['glucosa', 'Glucosa', 'mg/dL'],
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-slate-800"><Plus className="h-4 w-4 text-sky-500" /> Registrar signos vitales de la visita</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {campos.map(([k, et, u]) => (
            <div key={k}>
              <label className="mb-1 block text-xs font-medium text-slate-600">{et}</label>
              <input value={f?.[k] ?? ''} onChange={(e) => set(k, e?.target?.value ?? '')} placeholder={u}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
            </div>
          ))}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">IMC (automático)</label>
            <div className="rounded-md bg-slate-50 px-3 py-2 font-mono text-sm text-slate-700">{imc ? imc.toFixed(1) + ' kg/m²' : '—'}</div>
          </div>
        </div>
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-slate-600">Observaciones</label>
          <textarea rows={2} value={f?.observaciones ?? ''} onChange={(e) => set('observaciones', e?.target?.value ?? '')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <button onClick={guardar} disabled={guardando} className="mt-3 flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-600 disabled:opacity-50">
          {guardando && <Loader2 className="h-4 w-4 animate-spin" />} Guardar registro
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl bg-white p-5 shadow-sm">
        <h3 className="mb-3 font-display text-base font-semibold text-slate-800">Historial</h3>
        {(pam?.signosVitales?.length ?? 0) === 0 ? (
          <p className="text-sm text-slate-400">Aún no hay registros.</p>
        ) : (
          <table className="w-full min-w-[720px] text-left text-xs">
            <thead><tr className="border-b border-slate-100 text-slate-400">
              {['Fecha', 'TA', 'FC', 'FR', 'Temp', 'Peso', 'Talla', 'IMC', 'SpO2', 'Glucosa', 'Registró'].map((h) => <th key={h} className="py-2 pr-3 font-medium">{h}</th>)}
            </tr></thead>
            <tbody>
              {pam?.signosVitales?.map?.((s: any) => (
                <tr key={s?.id} className="border-b border-slate-50 text-slate-700">
                  <td className="py-2 pr-3">{fmtFechaHora(s?.fecha)}</td>
                  <td className="py-2 pr-3">{s?.ta ?? '—'}</td>
                  <td className="py-2 pr-3">{s?.fc ?? '—'}</td>
                  <td className="py-2 pr-3">{s?.fr ?? '—'}</td>
                  <td className="py-2 pr-3">{s?.temperatura ?? '—'}</td>
                  <td className="py-2 pr-3">{s?.peso ?? '—'}</td>
                  <td className="py-2 pr-3">{s?.talla ?? '—'}</td>
                  <td className="py-2 pr-3 font-semibold">{s?.imc ?? '—'}</td>
                  <td className="py-2 pr-3">{s?.spo2 ?? '—'}</td>
                  <td className="py-2 pr-3">{s?.glucosa ?? '—'}</td>
                  <td className="py-2 pr-3 text-slate-400">{s?.registradoPor?.name ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function EscalasTab({ pam }: { pam: any }) {
  
  const aplicaciones = pam?.aplicaciones?? [];
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="mb-1 font-display text-base font-semibold text-slate-800">Aplicar una escala</h3>
        <p className="mb-3 text-xs text-slate-500">Seleccione la escala considerando el motivo de consulta y las metas de la persona.</p>
        <div className="space-y-3">
          {CATEGORIAS.map((cat) => {
            const escalasCat = ESCALAS.filter((e) => e?.categoria === cat);
            if (!escalasCat.length) return null;
            return (
              <div key={cat}>
                <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-sky-600">{cat}</div>
                <div className="flex flex-wrap gap-2">
                  {escalasCat.map((e) => (
                    <Link key={e?.id} href={`/pams/${pam?.id}/escalas/${e?.id}`}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-sky-500 hover:text-white">
                      {e?.nombreCorto}{!e?.aptaMovil && <span className="ml-1 text-[9px] opacity-60">(solo PC)</span>}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="mb-3 font-display text-base font-semibold text-slate-800">Resultados previos</h3>
        {aplicaciones.length === 0 ? (
          <p className="text-sm text-slate-400">Aún no se han aplicado escalas a esta persona.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {aplicaciones.map((a: any) => {
              const esc = getEscala(a?.escalaId ?? '');
              return (
                <li key={a?.id} className="py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-medium text-slate-800">{esc?.nombreCorto ?? a?.escalaId}</div>
                    <div className="flex items-center gap-2">
                      {a?.puntaje != null && <span className="rounded-md bg-teal-50 px-2 py-0.5 font-mono text-xs font-semibold text-sky-600">{a?.puntaje} pts</span>}
                      <span className="text-xs text-slate-400">{fmtFechaHora(a?.fecha)}</span>
                    </div>
                  </div>
                  {a?.interpretacion && <div className="mt-0.5 text-xs font-medium text-indigo-700">{a?.interpretacion}</div>}
                  {a?.comentarios && <div className="mt-0.5 text-xs text-slate-500">Comentarios: {a?.comentarios}</div>}
                  <div className="mt-0.5 text-[11px] text-slate-400">Aplicó: {a?.aplicadaPor?.name ?? '—'}</div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function Notas({ pam, onOk }: { pam: any; onOk: () => void }) {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [pdfCargando, setPdfCargando] = useState<string | null>(null);

  const guardar = async () => {
    if (!contenido.trim()) { toast.error('Escriba el contenido de la nota'); return; }
    setGuardando(true);
    const r = await fetch(`/api/pams/${pam?.id}/notas`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ titulo, contenido }) }).catch(() => null);
    setGuardando(false);
    if (r?.ok) { toast.success('Nota guardada'); setTitulo(''); setContenido(''); onOk?.(); }
    else toast.error('No se pudo guardar');
  };

  const descargarPdf = async (id: string) => {
    setPdfCargando(id);
    try {
      const r = await fetch(`/api/notas/${id}/pdf`);
      if (!r?.ok) { toast.error('No se pudo generar el PDF'); setPdfCargando(null); return; }
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `nota_evolucion.pdf`; a.click();
      URL.revokeObjectURL(url);
    } catch { toast.error('Error al descargar'); }
    setPdfCargando(null);
  };

  return (
    <div className="space-y-4">
  {/* ── Nueva nota ── */}
  <div className="rounded-xl bg-white p-5 shadow-sm">
    <h3 className="mb-3 font-display text-base font-semibold text-slate-800">Nueva nota de evolución</h3>
    <input value={titulo} onChange={(e) => setTitulo(e?.target?.value ?? '')} placeholder="Título (opcional)"
      className="mb-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
    <textarea rows={5} value={contenido} onChange={(e) => setContenido(e?.target?.value ?? '')} placeholder="Contenido de la nota clínica…"
      className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
    <button onClick={guardar} disabled={guardando} className="mt-3 flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-600 disabled:opacity-50">
      {guardando && <Loader2 className="h-4 w-4 animate-spin" />} Guardar nota
    </button>
  </div>

  {/* ── Historial de notas ── */}
  <div className="rounded-xl bg-white p-5 shadow-sm">
    <h3 className="mb-3 font-display text-base font-semibold text-slate-800">Historial de notas</h3>
    {(pam?.notas?.length ?? 0) === 0 ? (
      <p className="text-sm text-slate-400">Aún no hay notas clínicas.</p>
    ) : (
      <ul className="divide-y divide-slate-100">
        {pam?.notas?.map?.((n: any) => (
          <li key={n?.id} className="py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-semibold text-slate-800">{n?.titulo ?? 'Nota de evolución'}</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">
                  {fmtFechaHora(n?.createdAt || n?.fecha)} · {n?.autor?.name ?? '—'}
                </span>
                <button onClick={() => descargarPdf(n?.id)} disabled={pdfCargando === n?.id}
                  className="flex items-center gap-1 rounded-md bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700 hover:bg-sky-100 disabled:opacity-50">
                  {pdfCargando === n?.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Printer className="h-3 w-3" />} PDF
                </button>
              </div>
            </div>
            <p className="mt-1 whitespace-pre-line text-sm text-slate-600">{n?.contenido}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
);
}
