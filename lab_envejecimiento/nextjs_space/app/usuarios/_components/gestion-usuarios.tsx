'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { ShieldCheck, UserPlus, Loader2, ToggleLeft, ToggleRight, Download } from 'lucide-react';

export function GestionUsuarios() {
  const { data: session } = useSession() || {};
  const esAdmin = (session?.user as any)?.rol === 'ADMIN';
  const [usuarios, setUsuarios] = useState<any[] | null>(null);
  const [f, setF] = useState<Record<string, string>>({ rol: 'GERONTOLOGO' });
  const [guardando, setGuardando] = useState(false);
  const [descargando, setDescargando] = useState(false);

  const cargar = useCallback(() => {
    fetch('/api/usuarios')
      .then((r) => (r?.ok ? r.json() : []))
      .then((d) => setUsuarios(Array.isArray(d) ? d : []))
      .catch(() => setUsuarios([]));
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  const crear = async () => {
    if (!f?.name || !f?.email || !f?.password) { toast.error('Complete todos los campos'); return; }
    setGuardando(true);
    const r = await fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(f),
    }).catch(() => null);
    const d = await r?.json?.().catch(() => ({}));
    setGuardando(false);
    if (r?.ok) { toast.success('Usuario creado'); setF({ rol: 'GERONTOLOGO' }); cargar(); }
    else toast.error(d?.error ?? 'No se pudo crear');
  };

  const alternar = async (u: any) => {
    const r = await fetch(`/api/usuarios/${u?.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activo: !u?.activo }),
    }).catch(() => null);
    if (r?.ok) { toast.success(u?.activo ? 'Usuario desactivado' : 'Usuario activado'); cargar(); }
    else toast.error('No se pudo actualizar');
  };

  const descargarBackup = async () => {
    setDescargando(true);
    try {
      const r = await fetch('/api/backup');
      if (!r.ok) { toast.error('No se pudo generar el respaldo'); return; }
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `respaldo-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Respaldo descargado');
    } catch {
      toast.error('Error al descargar el respaldo');
    } finally {
      setDescargando(false);
    }
  };

  if (!esAdmin) {
    return (
      <div className="mt-8 rounded-xl bg-white p-8 text-center text-sm text-slate-400 shadow-sm">
        Solo el administrador puede gestionar usuarios.
      </div>
    );
  }

  return (
    <div>
      {/* Encabezado con botón de respaldo */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-slate-800">
            <ShieldCheck className="h-6 w-6 text-sky-500" /> Gestión de usuarios
          </h1>
          <p className="mt-1 text-sm text-slate-500">Cuentas del equipo del laboratorio (máximo 10 usuarios).</p>
        </div>
        <button
          onClick={descargarBackup}
          disabled={descargando}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
        >
          {descargando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Descargar respaldo
        </button>
      </div>

      {/* Formulario nuevo usuario */}
      <div className="mt-5 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-display text-base font-semibold text-slate-800">Nuevo usuario</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <input
            value={f?.name ?? ''}
            onChange={(e) => setF((d) => ({ ...(d ?? {}), name: e?.target?.value ?? '' }))}
            placeholder="Nombre completo"
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            type="email"
            value={f?.email ?? ''}
            onChange={(e) => setF((d) => ({ ...(d ?? {}), email: e?.target?.value ?? '' }))}
            placeholder="Correo electrónico"
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            type="password"
            value={f?.password ?? ''}
            onChange={(e) => setF((d) => ({ ...(d ?? {}), password: e?.target?.value ?? '' }))}
            placeholder="Contraseña (mín. 6)"
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
          <select
            value={f?.rol ?? 'GERONTOLOGO'}
            onChange={(e) => setF((d) => ({ ...(d ?? {}), rol: e?.target?.value ?? 'GERONTOLOGO' }))}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="GERONTOLOGO">Gerontólogo(a)</option>
            <option value="ADMIN">Administrador</option>
            <option value="PODOLOGO">Podólogo(a)</option>
            <option value="DIRECTOR">Director</option>
          </select>
        </div>
        <button
          onClick={crear}
          disabled={guardando}
          className="mt-3 flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-sky-600 disabled:opacity-50"
        >
          {guardando ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />} Crear usuario
        </button>
      </div>

      {/* Tabla de usuarios */}
      <div className="mt-4 overflow-x-auto rounded-xl bg-white p-5 shadow-sm">
        {!usuarios ? (
          <div className="flex justify-center py-6"><Loader2 className="h-6 w-6 animate-spin text-sky-500" /></div>
        ) : (
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-400">
                <th className="py-2 pr-3 font-medium">Nombre</th>
                <th className="py-2 pr-3 font-medium">Correo</th>
                <th className="py-2 pr-3 font-medium">Rol</th>
                <th className="py-2 pr-3 font-medium">Estado</th>
                <th className="py-2 pr-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u?.id} className="border-b border-slate-50">
                  <td className="py-2.5 pr-3 font-medium text-slate-700">{u?.name}</td>
                  <td className="py-2.5 pr-3 text-slate-500">{u?.email}</td>
                  <td className="py-2.5 pr-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      u?.rol === 'ADMIN' ? 'bg-indigo-100 text-indigo-700' : 'bg-teal-100 text-sky-600'
                    }`}>
                      {u?.rol === 'ADMIN' ? 'Administrador'
                        : u?.rol === 'DIRECTOR' ? 'Director'
                        : u?.rol === 'PODOLOGO' ? 'Podólogo(a)'
                        : 'Gerontólogo(a)'}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3">
                    <button onClick={() => alternar(u)} className="flex items-center gap-1 text-xs font-medium">
                      {u?.activo
                        ? <><ToggleRight className="h-5 w-5 text-emerald-600" /><span className="text-emerald-700">Activo</span></>
                        : <><ToggleLeft className="h-5 w-5 text-slate-400" /><span className="text-slate-400">Inactivo</span></>}
                    </button>
                  </td>
                  <td className="py-2.5 pr-3">
                    <button
                      onClick={async () => {
                        if (!confirm(`¿Eliminar al usuario ${u?.name}? Esta acción es irreversible.`)) return;
                        const res = await fetch(`/api/usuarios/${u?.id}`, { method: 'DELETE' });
                        if (res.ok) { toast.success('Usuario eliminado'); cargar(); }
                        else { const d = await res.json().catch(() => ({})); toast.error(d?.error ?? 'No se pudo eliminar'); }
                      }}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}