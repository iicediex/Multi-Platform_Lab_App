'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TEXTO_CONSENTIMIENTO } from '@/lib/escalas-data';
import { FileSignature, User, MessageSquareHeart, Check, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

// Campos select existentes
const CAMPOS_SELECT: Record<string, string[]> = {
  sexo: ['Hombre', 'Mujer', 'Intersexual', 'Prefiere no decir'],
  estadoCivil: ['Soltero(a)', 'Casado(a)', 'Unión libre', 'Viudo(a)', 'Divorciado(a)', 'Separado(a)'],
  escolaridad: ['Sin estudios', 'Primaria', 'Secundaria', 'Bachillerato', 'Técnico', 'Licenciatura', 'Posgrado'],
  tipoSangre: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'No me lo sé'],
  lugarNacimiento: [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
    'Ciudad de México', 'Coahuila de Zaragoza', 'Colima', 'Durango', 'Estado de México', 'Guanajuato',
    'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán de Ocampo', 'Morelos', 'Nayarit', 'Nuevo León',
    'Oaxaca', 'Puebla', 'Querétaro de Arteaga', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
    'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz de Ignacio de la Llave', 'Yucatán',
    'Zacatecas', 'Extranjero',
  ],
};

// Afiliaciones permitidas
const AFILIACIONES = [
  { value: 'IMSS', label: 'IMSS' },
  { value: 'ISSSTE', label: 'ISSSTE' },
  { value: 'IMSS_BIENESTAR', label: 'IMSS Bienestar' },
  { value: 'PEMEX', label: 'PEMEX' },
  { value: 'SECRETARIA_SALUD', label: 'Secretaría de Salud' },
  { value: 'SEDENA', label: 'SEDENA' },
  { value: 'SNDIF', label: 'SNDIF' },
  { value: 'HUP', label: 'HUP' },
  { value: 'PRIVADO', label: 'Privado' },
  { value: 'SIN_SEGURO', label: 'NO TENGO SEGURO' },
];

// Normalizar y validar teléfono
function normalizePhone(input?: string | null): string | null {
  if (!input) return null;
  const digits = String(input).replace(/\D/g, '');
  return digits === '' ? null : digits;
}

function isValidPhone10(d?: string | null): boolean {
  return typeof d === 'string' && /^\d{10}$/.test(d);
}

export function AltaPam() {
  const router = useRouter();
  const { data: session } = useSession();
  const nombreGerontologo = session?.user?.name ?? '____________________';

  const [paso, setPaso] = useState(0);
  const [acepta, setAcepta] = useState(false);
  const [nombreFirma, setNombreFirma] = useState('');
  const [datos, setDatos] = useState<Record<string, string>>({});
  const [motivo, setMotivo] = useState('');
  const [metas, setMetas] = useState('');
  const [antecedentes, setAntecedentes] = useState<Record<string, string>>({});
  const [guardando, setGuardando] = useState(false);
  const [duplicados, setDuplicados] = useState<any[]>([]);
  const [modalDuplicado, setModalDuplicado] = useState(false);
  const [pams, setPams] = useState<any[]>([]);

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

  useEffect(() => {
    fetch('/api/pams')
      .then((r) => (r.ok ? r.json() : []))
      .then((l) => setPams(Array.isArray(l) ? l : []))
      .catch(() => setPams([]));
  }, []);

  const pasos = [
    { t: 'Consentimiento', i: FileSignature },
    { t: 'Datos personales', i: User },
    { t: 'Primera cita', i: MessageSquareHeart },
  ] as const;

  const set = (k: string, v: string) => setDatos((d) => ({ ...d, [k]: v }));

  const normalizarNombre = (n: string) => n.trim().toLowerCase().replace(/\s+/g, ' ');

  const pamCoincidente =
    nombreFirma.trim().length >= 3
      ? pams.find((p) => normalizarNombre(p?.nombreCompleto ?? '') === normalizarNombre(nombreFirma))
      : null;

  const continuarConPersonaExistente = () => {
    if (!acepta) { toast.error('Debe aceptar el consentimiento'); return; }
    if (!pamCoincidente) { toast.error('No se encontró la persona'); return; }
    setDatos((d) => ({ ...d, nombreCompleto: pamCoincidente.nombreCompleto }));
    toast.success(`${pamCoincidente.nombreCompleto} ya está registrada. Continúe con la primera cita.`);
    setPaso(2);
  };

  const guardar = async (forzar = false) => {
    if (!datos?.nombreCompleto) { toast.error('El nombre completo es obligatorio'); return; }
    if (!motivo.trim()) { toast.error('El motivo de consulta es obligatorio'); return; }

    // Normalizar teléfonos antes de validar
    const tel = normalizePhone(datos?.telefono ?? null);
    const telContacto = normalizePhone(datos?.telefonoContacto ?? null);

    if (tel && !isValidPhone10(tel)) {
      toast.error('El teléfono debe tener exactamente 10 dígitos');
      return;
    }
    if (telContacto && !isValidPhone10(telContacto)) {
      toast.error('El teléfono de contacto debe tener exactamente 10 dígitos');
      return;
    }

    // Validar afiliación (opcional: si viene, debe ser una de las opciones)
    if (datos?.afiliacionMedica && !AFILIACIONES.some(a => a.value === datos.afiliacionMedica)) {
      toast.error('Afiliación médica inválida');
      return;
    }

    setGuardando(true);
    try {
      const res = await fetch('/api/pams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipoAlta: 'LABORATORIO',
          consentimientoAceptado: acepta,
          consentimientoNombre: nombreFirma || datos?.nombreCompleto,
          nombreCompleto: datos?.nombreCompleto,
          confirmarDuplicado: forzar,
          datos, // mantenemos el objeto datos con el resto de campos
          telefono: tel,
          telefonoContacto: telContacto,
          motivoConsulta: motivo,
          metas,
          primeraCita: { motivoConsulta: motivo, metas, antecedentes },
        }),
      });

      const d = await res.json().catch(() => ({}));

      if (res.status === 409 && d?.warning) {
        setDuplicados(d.duplicados ?? []);
        setModalDuplicado(true);
        setGuardando(false);
        return;
      }

      if (!res.ok) {
        toast.error(d?.error + (d?.detalle ? `: ${d.detalle}` : '') || 'Error al guardar');
        setGuardando(false);
        return;
      }

      toast.success('Persona registrada correctamente');
      router.push(`/pams/${d?.id}`);
    } catch {
      toast.error('Error de red al guardar');
      setGuardando(false);
    }
  };

  const campoTexto = (k: string, etiqueta: string, tipo = 'text', placeholder = '') => (
    <div key={k}>
      <label className="mb-1 block text-xs font-medium text-slate-600">{etiqueta}</label>
      <input
        type={tipo}
        value={datos?.[k] ?? ''}
        onChange={(e) => set(k, e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
      />
    </div>
  );

  const campoSelect = (k: string, etiqueta: string) => (
    <div key={k}>
      <label className="mb-1 block text-xs font-medium text-slate-600">{etiqueta}</label>
      <select
        value={datos?.[k] ?? ''}
        onChange={(e) => set(k, e.target.value)}
        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
      >
        <option value="">Seleccionar…</option>
        {(CAMPOS_SELECT?.[k] ?? []).map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );

  const areaAntecedente = (k: string, etiqueta: string) => (
    <div key={k}>
      <label className="mb-1 block text-xs font-medium text-slate-600">{etiqueta}</label>
      <textarea
        rows={2}
        value={antecedentes?.[k] ?? ''}
        onChange={(e) => setAntecedentes((a) => ({ ...a, [k]: e.target.value }))}
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold tracking-tight text-slate-800">Alta de Persona</h1>
      <p className="mt-1 text-sm text-slate-500">Registro de una nueva Persona Adulta Mayor en el laboratorio.</p>

      {/* Indicador de pasos */}
      <div className="mt-5 flex items-center gap-2">
        {pasos.map((p, i) => {
          const Icono = p.i;
          return (
            <div key={p.t} className="flex flex-1 items-center gap-2">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i < paso ? 'bg-sky-500 text-white' : i === paso ? 'bg-teal-100 text-sky-600 ring-2 ring-teal-600' : 'bg-slate-100 text-slate-400'}`}>
                {i < paso ? <Check className="h-4 w-4" /> : <Icono className="h-4 w-4" />}
              </div>
              <span className={`hidden text-xs font-medium sm:block ${i === paso ? 'text-sky-600' : 'text-slate-400'}`}>{p.t}</span>
              {i < pasos.length - 1 && <div className="h-0.5 flex-1 bg-slate-200" />}
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl bg-white p-5 shadow-sm">

        {/* ── Paso 0: Consentimiento ── */}
        {paso === 0 && (
          <div>
            <h2 className="mb-3 font-display text-lg font-semibold text-slate-800">Consentimiento Informado (Laboratorio)</h2>
            <div className="max-h-96 overflow-y-auto whitespace-pre-line rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
              {TEXTO_CONSENTIMIENTO.replace(/_{3,}/g, nombreGerontologo)}
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-xs font-medium text-slate-600">Nombre completo de la persona (firma)</label>
              <input
                value={nombreFirma}
                onChange={(e) => setNombreFirma(formatearNombre(e.target.value))}
                placeholder="Nombre completo"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
              />
              <p className="mt-1 text-xs text-slate-400">El sistema busca automáticamente a la persona mientras escribe.</p>
            </div>

            {pamCoincidente && (
              <div className="mt-4 rounded-lg border border-sky-300 bg-sky-50 p-4">
                <p className="text-sm font-bold text-sky-800">✓ Esta persona ya está registrada</p>
                <p className="mt-1 text-sm text-slate-700">Encontré a <strong>{pamCoincidente.nombreCompleto}</strong> en el sistema.</p>
                <p className="mt-2 text-xs text-slate-600">Sus datos ya fueron guardados antes. No necesitas volver a llenar el formulario.</p>
              </div>
            )}

            <label className="mt-3 flex cursor-pointer items-start gap-2 rounded-lg bg-teal-50 p-3 text-sm text-slate-700">
              <input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} className="mt-0.5 h-4 w-4 accent-teal-600" />
              He leído y comprendido la información anterior. Acepto voluntariamente participar.
            </label>

            {pamCoincidente ? (
              <button disabled={!acepta} onClick={continuarConPersonaExistente} className="mt-4 w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700 disabled:opacity-50">
                Continuar con primera cita de {pamCoincidente.nombreCompleto}
              </button>
            ) : (
              <button disabled={!acepta || !nombreFirma.trim()} onClick={() => { set('nombreCompleto', nombreFirma); setPaso(1); }} className="mt-4 w-full rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-600 disabled:opacity-50">
                Aceptar y continuar
              </button>
            )}
          </div>
        )}

        {/* ── Paso 1: Datos personales ── */}
        {paso === 1 && (
          <div>
            <h2 className="mb-3 font-display text-lg font-semibold text-slate-800">Datos personales</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {campoTexto('nombreCompleto', 'Nombre completo *')}

              {/* Edad con cálculo automático */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Edad</label>
                <input
                  type="number"
                  value={datos?.edad ?? ''}
                  onChange={(e) => {
                    set('edad', e.target.value);
                    if (e.target.value) set('fechaNacimiento', `${new Date().getFullYear() - parseInt(e.target.value)}-01-01`);
                  }}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Fecha de nacimiento con cálculo automático */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Fecha de nacimiento</label>
                <input
                  type="date"
                  value={datos?.fechaNacimiento ?? ''}
                  onChange={(e) => {
                    set('fechaNacimiento', e.target.value);
                    if (e.target.value) {
                      const hoy = new Date();
                      const nac = new Date(e.target.value);
                      let edad = hoy.getFullYear() - nac.getFullYear();
                      const m = hoy.getMonth() - nac.getMonth();
                      if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
                      set('edad', String(edad));
                    }
                  }}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {campoSelect('sexo', 'Sexo')}
              {campoTexto('genero', 'Género')}
              {campoSelect('lugarNacimiento', 'Lugar de nacimiento')}
              {campoTexto('grupoOriginario', 'Grupo originario')}
              {campoTexto('lenguaIndigena', 'Lengua indígena')}
              {campoSelect('estadoCivil', 'Estado civil')}
              {campoTexto('aniosEscuela', 'Años de escuela', 'number')}
              {campoSelect('escolaridad', 'Escolaridad')}
              {campoTexto('ocupacion', 'Ocupación')}

              {/* Afiliación médica (select) */}
              <div key="afiliacionMedica">
                <label className="mb-1 block text-xs font-medium text-slate-600">Afiliación médica</label>
                <select
                  value={datos?.afiliacionMedica ?? ''}
                  onChange={(e) => set('afiliacionMedica', e.target.value)}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="">Seleccionar…</option>
                  {AFILIACIONES.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
              </div>

              {campoTexto('alergias', 'Alergias')}
              {campoSelect('tipoSangre', 'Tipo de sangre')}
              {campoTexto('pension', 'Pensión')}
              {campoTexto('religion', 'Religión')}

              {/* Teléfono con validación y normalización (solo dígitos, max 10) */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Teléfono</label>
                <input
                  type="tel"
                  value={datos?.telefono ?? ''}
                  maxLength={10}
                  onChange={(e) => {
                    const soloNumeros = (e.target.value ?? '').replace(/\D/g, '').slice(0, 10);
                    set('telefono', soloNumeros);
                  }}
                  placeholder="10 dígitos"
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-teal-500 ${
                    datos?.telefono && datos.telefono.length !== 10
                      ? 'border-red-400 bg-red-50'
                      : 'border-slate-200'
                  }`}
                />
                {datos?.telefono && datos.telefono.length !== 10 && (
                  <p className="mt-1 text-xs text-red-500">{datos.telefono.length}/10 dígitos</p>
                )}
              </div>

              {campoTexto('direccion', 'Dirección')}
              {campoTexto('personaContacto', 'Persona de contacto')}

              {/* Teléfono de contacto (solo dígitos, max 10) */}
              <div key="telefonoContacto">
                <label className="mb-1 block text-xs font-medium text-slate-600">Teléfono de contacto</label>
                <input
                  type="tel"
                  value={datos?.telefonoContacto ?? ''}
                  maxLength={10}
                  onChange={(e) => {
                    const onlyDigits = (e.target.value ?? '').replace(/\D/g, '').slice(0, 10);
                    set('telefonoContacto', onlyDigits);
                  }}
                  placeholder="10 dígitos (ej. 5512345678)"
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-teal-500 ${
                    datos?.telefonoContacto && datos.telefonoContacto.length !== 10 ? 'border-red-400 bg-red-50' : 'border-slate-200'
                  }`}
                />
                {datos?.telefonoContacto && datos.telefonoContacto.length !== 10 && (
                  <p className="mt-1 text-xs text-red-500">{datos.telefonoContacto.length}/10 dígitos</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button onClick={() => setPaso(0)} className="rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200">Atrás</button>
              <button
                onClick={() => {
                  if (!datos?.nombreCompleto) { toast.error('El nombre completo es obligatorio'); return; }
                  const telNormalized = normalizePhone(datos?.telefono ?? null);
                  if (telNormalized && !isValidPhone10(telNormalized)) { toast.error('El teléfono debe tener 10 dígitos'); return; }
                  setPaso(2);
                }}
                className="flex-1 rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-600"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* ── Paso 2: Primera cita ── */}
        {paso === 2 && (
          <div>
            <h2 className="mb-1 font-display text-lg font-semibold text-slate-800">Cuestionario de primera cita</h2>
            <p className="mb-4 text-xs text-slate-500">El motivo de consulta y las metas se mostrarán de forma destacada.</p>

            <div className="space-y-4">
              <div className="rounded-lg bg-amber-50 p-3">
                <label className="mb-1 block text-sm font-semibold text-amber-800">Motivo de Consulta *</label>
                <textarea rows={3} value={motivo} onChange={(e) => setMotivo(e.target.value)} className="w-full rounded-md border border-amber-200 px-3 py-2 text-sm focus:ring-amber-500" />
              </div>

              <div className="rounded-lg bg-teal-50 p-3">
                <label className="mb-1 block text-sm font-semibold text-teal-800">Metas y Objetivos Personales</label>
                <textarea rows={4} value={metas} onChange={(e) => setMetas(e.target.value)} className="w-full rounded-md border border-teal-200 px-3 py-2 text-sm focus:ring-teal-500" />
              </div>

              <h3 className="pt-1 text-sm font-semibold text-slate-700">Antecedentes personales</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {areaAntecedente('actividadFisica', 'Actividad física habitual')}
                {areaAntecedente('alimentacion', 'Alimentación')}
                {areaAntecedente('sueno', 'Sueño y descanso')}
                {areaAntecedente('actividadesRecreativas', 'Actividades recreativas')}
                {areaAntecedente('enfermedadesCronicas', 'Enfermedades crónicas')}
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button onClick={() => setPaso(1)} className="rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200">Atrás</button>
              <button onClick={() => guardar()} disabled={guardando} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-600 disabled:opacity-50">
                {guardando && <Loader2 className="h-4 w-4 animate-spin" />}
                Guardar alta
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Modal de duplicados ── */}
      {modalDuplicado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-lg font-bold text-slate-800">Persona ya registrada</h3>
            <p className="mb-4 text-sm text-slate-600">Se encontraron {duplicados.length} persona(s) con nombre similar:</p>
            <ul className="mb-4 max-h-40 overflow-y-auto rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
              {duplicados.map((d) => (
                <li key={d.id} className="py-1">• <strong>{d.nombreCompleto}</strong> ({d.tipoAlta})</li>
              ))}
            </ul>
            <div className="flex gap-3">
              <button onClick={() => setModalDuplicado(false)} className="flex-1 rounded-lg bg-slate-100 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200">Cancelar</button>
              <button onClick={() => { setModalDuplicado(false); guardar(true); }} disabled={guardando} className="flex-1 rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-600 disabled:opacity-50">
                {guardando ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : 'Registrar de todos modos'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}