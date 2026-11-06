'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, UserPlus, Trash2, CalendarPlus, X, UserRoundPlus } from 'lucide-react';
import { NuevaSesionModal } from '@/components/NuevaSesionModal';
const fmtFecha = (f: any) => (f ? new Date(f).toLocaleDateString('es-MX', { dateStyle: 'medium', timeZone: 'America/Mexico_City' }) : '—');

const CAMPOS_SELECT: Record<string, string[]> = {
  sexo: ['Hombre', 'Mujer', 'Intersexual', 'Prefiere no decir'],
  estadoCivil: ['Soltero(a)', 'Casado(a)', 'Unión libre', 'Viudo(a)', 'Divorciado(a)', 'Separado(a)'],
  escolaridad: ['Sin estudios', 'Primaria', 'Secundaria', 'Bachillerato', 'Técnico', 'Licenciatura', 'Posgrado'],
};

export function DetalleTaller({ tallerId }: { tallerId: string }) {
  const [taller, setTaller] = useState<any | null>(null);
  const [cargando, setCargando] = useState(true);
  const [pams, setPams] = useState<any[]>([]);
  const [pamSel, setPamSel] = useState('');
  const [sesionAbierta, setSesionAbierta] = useState(false);
  const [modalConsentimiento, setModalConsentimiento] = useState(false);
  const [consentimientoAceptado, setConsentimientoAceptado] = useState(false);
  const [inscribiendo, setInscribiendo] = useState(false);
  const [fecha, setFecha] = useState('');
  const [tema, setTema] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [asistencia, setAsistencia] = useState<Record<string, boolean>>({});
  const [guardando, setGuardando] = useState(false);

  const [modalAltaRapida, setModalAltaRapida] = useState(false);
  const [altaPaso, setAltaPaso] = useState(0);
  const [altaAcepta, setAltaAcepta] = useState(false);
  const [altaNombreFirma, setAltaNombreFirma] = useState('');
  const [altaDatos, setAltaDatos] = useState<Record<string, string>>({});
  const [altaGuardando, setAltaGuardando] = useState(false);

  const cargar = useCallback(() => {
    fetch(`/api/talleres/${tallerId}`)
      .then((r) => (r?.ok ? r.json() : null))
      .then((d) => { setTaller(d); setCargando(false); })
      .catch(() => setCargando(false));
  }, [tallerId]);

  useEffect(() => {
    cargar();
    fetch('/api/pams')
      .then((r) => (r?.ok ? r.json() : []))
      .then((d) => setPams(Array.isArray(d) ? d : []))
      .catch(() => setPams([]));
  }, [cargar]);

  if (cargando) return <div className="mt-10 flex justify-center"><Loader2 className="h-7 w-7 animate-spin text-sky-500" /></div>;
  if (!taller) return <div className="mt-8 rounded-xl bg-white p-8 text-center text-sm text-slate-400 shadow-sm">Taller no encontrado.</div>;

  const inscritos = taller?.inscripciones ?? [];

  const formatearNombre = (texto: string): string => {
    const excepciones = ['de', 'la', 'las', 'los', 'del', 'e', 'el'];
    return texto
      .toLowerCase()
      .replace(/\b\w+/g, (palabra, posicion) => {
        if (posicion === 0 || !excepciones.includes(palabra)) {
          return palabra.charAt(0).toUpperCase() + palabra.slice(1);
        }
        return palabra;
      });
  };

  const normalizar = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

  const pamCoincidente = altaNombreFirma.trim().length >= 3
    ? pams.find((p) =>
        normalizar(p?.nombreCompleto ?? '') === normalizar(altaNombreFirma) &&
        !inscritos.some((i: any) => i?.pam?.id === p?.id)
      )
    : null;

  const abrirConsentimiento = () => {
    if (!pamSel) { toast.error('Seleccione una persona'); return; }
    setConsentimientoAceptado(false);
    setModalConsentimiento(true);
  };

  const confirmarInscripcion = async () => {
    if (!consentimientoAceptado) { toast.error('Debe aceptar el consentimiento para continuar'); return; }
    setInscribiendo(true);
    const r = await fetch(`/api/talleres/${tallerId}/inscripciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pamId: pamSel }),
    }).catch(() => null);
    setInscribiendo(false);
    if (r?.ok) {
      toast.success('Persona inscrita al taller');
      setModalConsentimiento(false);
      setPamSel('');
      cargar();
    } else {
      const d = await r?.json?.().catch(() => ({}));
      toast.error(d?.error ?? 'No se pudo inscribir');
    }
  };

  const darBaja = async (pamId: string) => {
    const r = await fetch(`/api/talleres/${tallerId}/inscripciones?pamId=${pamId}`, { method: 'DELETE' }).catch(() => null);
    if (r?.ok) { toast.success('Baja registrada'); cargar(); }
    else toast.error('No se pudo dar de baja');
  };

  const guardarSesion = async () => {
    setGuardando(true);
    const r = await fetch(`/api/talleres/${tallerId}/sesiones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fecha: fecha || undefined, tema, comentarios,
        asistencias: inscritos.map((i: any) => ({ pamId: i?.pam?.id, presente: !!asistencia?.[i?.pam?.id] })),
      }),
    }).catch(() => null);
    setGuardando(false);
    if (r?.ok) {
      toast.success('Sesión registrada');
      setSesionAbierta(false); setFecha(''); setTema(''); setComentarios(''); setAsistencia({});
      cargar();
    } else toast.error('No se pudo registrar la sesión');
  };

  const inscribirExistente = async (pamId: string, nombre: string) => {
    setAltaGuardando(true);
    const r = await fetch(`/api/talleres/${tallerId}/inscripciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pamId }),
    }).catch(() => null);
    setAltaGuardando(false);
    if (r?.ok) {
      toast.success(`${nombre} inscrita al taller`);
      setModalAltaRapida(false);
      setAltaPaso(0); setAltaAcepta(false); setAltaNombreFirma(''); setAltaDatos({});
      cargar();
    } else {
      const d = await r?.json?.().catch(() => ({}));
      toast.error(d?.error ?? 'No se pudo inscribir');
    }
  };

  const guardarAltaRapida = async () => {
    if (!altaDatos?.nombreCompleto) { toast.error('El nombre completo es obligatorio'); return; }
    setAltaGuardando(true);
    try {
      const resPam = await fetch('/api/pams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipoAlta: 'TALLER',
          consentimientoAceptado: altaAcepta,
          consentimientoNombre: altaNombreFirma || altaDatos?.nombreCompleto,
          nombreCompleto: altaDatos?.nombreCompleto,
          datos: altaDatos,
        }),
      }).catch(() => null);

      const pam = await resPam?.json?.().catch(() => ({}));
      if (!resPam?.ok) { toast.error(pam?.error ?? 'No se pudo crear la persona'); setAltaGuardando(false); return; }

      const resInsc = await fetch(`/api/talleres/${tallerId}/inscripciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pamId: pam?.id }),
      }).catch(() => null);

      setAltaGuardando(false);
      if (resInsc?.ok) {
        toast.success(`${altaDatos?.nombreCompleto} registrada e inscrita al taller`);
        setModalAltaRapida(false);
        setAltaPaso(0); setAltaAcepta(false); setAltaNombreFirma(''); setAltaDatos({});
        fetch('/api/pams').then((r) => r.json()).then((d) => setPams(Array.isArray(d) ? d : []));
        cargar();
      } else {
        toast.error('Persona creada pero no se pudo inscribir al taller');
      }
    } catch {
      toast.error('Error inesperado');
      setAltaGuardando(false);
    }
  };

  const setAD = (k: string, v: string) => setAltaDatos((d) => ({ ...(d ?? {}), [k]: v }));

  const pamSelObj = pams.find((p) => p?.id === pamSel);

  return (
    
    <div>
      <Link href="/talleres" className="flex items-center gap-1 text-sm text-sky-600 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Volver a talleres
      </Link>
      <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-800">{taller?.nombre}</h1>
      <div className="mt-1 text-sm text-slate-500">
        {taller?.horario && <span>{taller?.horario} · </span>}
        {taller?.totalSesiones && <span>{taller?.totalSesiones} sesiones · </span>}
        {taller?.encargado?.name && <span>Encargado(a): {taller?.encargado?.name}</span>}
      </div>
      {taller?.descripcion && <p className="mt-1 text-sm text-slate-600">{taller?.descripcion}</p>}

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-3 font-display text-base font-semibold text-slate-800">
            Personas inscritas ({inscritos.length})
          </h2>
          <div className="mb-2 flex gap-2">
            <select
              value={pamSel}
              onChange={(e) => setPamSel(e.target.value)}
              className="flex-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <option value="">Seleccionar persona existente…</option>
              {pams
                .filter((p) => !inscritos.some((i: any) => i?.pam?.id === p?.id))
                .map((p) => (
                  <option key={p?.id} value={p?.id}>{p?.nombreCompleto}</option>
                ))}
            </select>
            <button
              onClick={abrirConsentimiento}
              className="flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <UserPlus className="h-4 w-4" /> Inscribir
            </button>
          </div>

          <button
            onClick={() => { setModalAltaRapida(true); setAltaPaso(0); setAltaAcepta(false); setAltaNombreFirma(''); setAltaDatos({}); }}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-emerald-300 bg-emerald-50 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
          >
            <UserRoundPlus className="h-4 w-4" /> Registrar nueva persona e inscribir al taller
          </button>

          {inscritos.length === 0 ? (
            <p className="text-sm text-slate-400">Sin inscripciones aún.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {inscritos.map((i: any) => (
                <li key={i?.id} className="flex items-center justify-between py-2">
                  <div>
                    <Link href={`/pams/${i?.pam?.id}`} className="text-sm font-medium text-sky-600 hover:underline">
                      {i?.pam?.nombreCompleto}
                    </Link>
                  </div>
                  <button onClick={() => darBaja(i?.pam?.id)} className="text-slate-300 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
<button
  onClick={() => setSesionAbierta(true)}
  className="flex items-center gap-1 rounded-md bg-sky-500 px-3 py-2 text-xs font-semibold text-white"
>
  <CalendarPlus className="h-4 w-4" /> Nueva sesión
</button>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-slate-800">Sesiones</h2>
            <button onClick={() => setSesionAbierta(true)} className="flex items-center gap-1 rounded-md bg-sky-500 px-3 py-2 text-xs font-semibold text-white">
              <CalendarPlus className="h-4 w-4" /> Nueva sesión
            </button>
          </div>
        </div>
      </div>

      {/* MODAL ALTA RÁPIDA */}
      {modalAltaRapida && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setModalAltaRapida(false)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-slate-800">
                {altaPaso === 0 ? 'Paso 1: Consentimiento' : 'Paso 2: Datos Personales'}
              </h3>
              <button onClick={() => setModalAltaRapida(false)} className="rounded-md p-1 text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
            </div>

            {altaPaso === 0 && (
              <div>
                <div className="mb-3">
                  <label className="mb-1 block text-xs font-medium text-slate-600">Nombre completo (Firma)</label>
                  <input
                    value={altaNombreFirma}
                    onChange={(e) => setAltaNombreFirma(formatearNombre(e.target.value))}
                    placeholder="Escribe el nombre del paciente..."
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>

                {pamCoincidente ? (
                  <div className="mb-3 rounded-lg border border-sky-300 bg-sky-50 p-4">
                    <p className="mb-1 text-[13px] font-bold text-sky-800">✓ Persona ya registrada</p>
                    <p className="mb-3 text-sm text-slate-700">Encontré a <strong>{pamCoincidente.nombreCompleto}</strong>. ¿Quieres inscribirlo directamente?</p>
                    <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-lg bg-white p-3 shadow-sm">
                      <input type="checkbox" checked={altaAcepta} onChange={(e) => setAltaAcepta(e.target.checked)} className="h-4 w-4 accent-teal-600" />
                      <span className="text-sm text-slate-700">Acepto la inscripción.</span>
                    </label>
                    <button onClick={() => inscribirExistente(pamCoincidente.id, pamCoincidente.nombreCompleto)} disabled={!altaAcepta || altaGuardando}
                      className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-bold text-white disabled:opacity-50">
                      Inscribir a {pamCoincidente.nombreCompleto}
                    </button>
                    <button onClick={() => { setAD('nombreCompleto', altaNombreFirma); setAltaPaso(1); }} className="mt-2 w-full text-xs text-slate-400 underline">
                      No es él, registrar como nuevo
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <input type="checkbox" checked={altaAcepta} onChange={(e) => setAltaAcepta(e.target.checked)} className="h-4 w-4 accent-teal-600" />
                      <span className="text-sm text-slate-700">Acepto el consentimiento informado.</span>
                    </label>
                    <button disabled={!altaAcepta || !altaNombreFirma.trim()} onClick={() => { setAD('nombreCompleto', altaNombreFirma); setAltaPaso(1); }}
                      className="w-full rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-white">
                      Continuar a datos personales
                    </button>
                  </div>
                )}
              </div>
            )}

            {altaPaso === 1 && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-slate-600">Nombre completo *</label>
                  <input type="text" value={altaDatos?.nombreCompleto ?? ''} onChange={(e) => setAD('nombreCompleto', e.target.value)}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Edad</label>
                  <input type="number" value={altaDatos?.edad ?? ''}
                    onChange={(e) => {
                      const edad = e.target.value;
                      setAD('edad', edad);
                      if (edad) {
                        const anio = new Date().getFullYear() - parseInt(edad);
                        setAD('fechaNacimiento', `${anio}-01-01`);
                      }
                    }}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Fecha de nacimiento</label>
                  <input type="date" value={altaDatos?.fechaNacimiento ?? ''}
                    onChange={(e) => {
                      const f = e.target.value;
                      setAD('fechaNacimiento', f);
                      if (f) {
                        const hoy = new Date();
                        const nac = new Date(f);
                        let edad = hoy.getFullYear() - nac.getFullYear();
                        if (hoy.getMonth() < nac.getMonth() || (hoy.getMonth() === nac.getMonth() && hoy.getDate() < nac.getDate())) edad--;
                        setAD('edad', String(edad));
                      }
                    }}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Sexo</label>
                  <select value={altaDatos?.sexo ?? ''} onChange={(e) => setAD('sexo', e.target.value)} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                    <option value="">Seleccionar…</option>
                    {CAMPOS_SELECT.sexo.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Estado civil</label>
                  <select value={altaDatos?.estadoCivil ?? ''} onChange={(e) => setAD('estadoCivil', e.target.value)} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                    <option value="">Seleccionar…</option>
                    {CAMPOS_SELECT.estadoCivil.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Escolaridad</label>
                  <select value={altaDatos?.escolaridad ?? ''} onChange={(e) => setAD('escolaridad', e.target.value)} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                    <option value="">Seleccionar…</option>
                    {CAMPOS_SELECT.escolaridad.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Ocupación</label>
                  <input type="text" value={altaDatos?.ocupacion ?? ''} onChange={(e) => setAD('ocupacion', e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Teléfono</label>
                  <input type="tel" value={altaDatos?.telefono ?? ''} onChange={(e) => setAD('telefono', e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-slate-600">Dirección</label>
                  <input type="text" value={altaDatos?.direccion ?? ''} onChange={(e) => setAD('direccion', e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Alergias</label>
                  <input type="text" value={altaDatos?.alergias ?? ''} onChange={(e) => setAD('alergias', e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Persona de contacto</label>
                  <input type="text" value={altaDatos?.personaContacto ?? ''} onChange={(e) => setAD('personaContacto', e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Tel. contacto</label>
                  <input type="tel" value={altaDatos?.telefonoContacto ?? ''} onChange={(e) => setAD('telefonoContacto', e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                </div>

                <div className="sm:col-span-2 mt-4 flex gap-2">
                  <button onClick={() => setAltaPaso(0)} className="rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200">Atrás</button>
                  <button onClick={guardarAltaRapida} disabled={altaGuardando}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
                    {altaGuardando && <Loader2 className="h-4 w-4 animate-spin" />}
                    Guardar e inscribir al taller
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL CONSENTIMIENTO PERSONA EXISTENTE */}
      {modalConsentimiento && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setModalConsentimiento(false)}>
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-slate-800">Consentimiento informado</h3>
              <button onClick={() => setModalConsentimiento(false)} className="rounded-md p-1 text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
            </div>

            <p className="mb-3 text-sm text-slate-600">
              Persona a inscribir: <strong>{pamSelObj?.nombreCompleto ?? '—'}</strong>
            </p>

            <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <input type="checkbox" checked={consentimientoAceptado} onChange={(e) => setConsentimientoAceptado(e.target.checked)} className="h-4 w-4 accent-teal-600" />
              <span className="text-sm text-slate-700">Acepto el consentimiento informado para participar en este taller.</span>
            </label>

            <div className="flex gap-2">
              <button onClick={() => setModalConsentimiento(false)} className="rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200">Cancelar</button>
              <button
                onClick={confirmarInscripcion}
                disabled={!consentimientoAceptado || inscribiendo}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {inscribiendo && <Loader2 className="h-4 w-4 animate-spin" />}
                Confirmar inscripción
              </button>
            </div>
          </div>
        </div>
      )}
   
{sesionAbierta && (
  <NuevaSesionModal
    tallerId={tallerId}
    inscritos={inscritos}
    onClose={() => setSesionAbierta(false)}
    onSaved={() => {
      setSesionAbierta(false);
      cargar();
    }}
  />
)}
</div>
  );
}