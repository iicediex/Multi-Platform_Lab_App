'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Leaf, Mail, Lock, Loader2, User } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const { status } = useSession() || {};
  const [modo, setModo] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') router?.replace?.('/');
  }, [status, router]);

  const enviar = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    setCargando(true);
    try {
      if (modo === 'signup') {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          toast.error(data?.error ?? 'No se pudo crear la cuenta');
          setCargando(false);
          return;
        }
      }
      const r = await signIn('credentials', { email, password, redirect: false });
      if (r?.error) {
        toast.error('Correo o contraseña incorrectos');
        setCargando(false);
      } else {
        router?.replace?.('/');
      }
    } catch {
      toast.error('Ocurrió un error, intente de nuevo');
      setCargando(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-slate-50 to-blue-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex justify-center">
  <img 
    src="/logo-laboratorio.png" 
    alt="Logo Laboratorio BUAP" 
    className="h-24 w-24 object-contain rounded-2xl shadow-md" 
  />
</div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-800">Laboratorio de Envejecimiento Saludable</h1>
          <p className="mt-1 text-sm text-slate-500">Sistema de valoración gerontológica integral</p>
        </div>
        <form onSubmit={enviar} className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 font-display text-lg font-semibold text-slate-800">
            {modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </h2>
          {modo === 'signup' && (
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium text-slate-600">Nombre completo</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input value={name} onChange={(e) => setName(e?.target?.value ?? '')} required
                  className="w-full rounded-md border border-slate-200 py-2 pl-9 pr-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="Nombre y apellidos" />
              </div>
            </div>
          )}
          <div className="mb-3">
            <label className="mb-1 block text-sm font-medium text-slate-600">Correo electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e?.target?.value ?? '')} required
                className="w-full rounded-md border border-slate-200 py-2 pl-9 pr-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="correo@institucion.mx" />
            </div>
          </div>
          <div className="mb-5">
            <label className="mb-1 block text-sm font-medium text-slate-600">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input type="password" value={password} onChange={(e) => setPassword(e?.target?.value ?? '')} required minLength={6}
                className="w-full rounded-md border border-slate-200 py-2 pl-9 pr-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="••••••••" />
            </div>
          </div>
          <button type="submit" disabled={cargando}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-sky-500 py-2.5 text-sm font-semibold text-white shadow transition-colors hover:bg-sky-600 disabled:opacity-60">
            {cargando && <Loader2 className="h-4 w-4 animate-spin" />}
            {modo === 'login' ? 'Entrar' : 'Registrarme y entrar'}
          </button>
          <button type="button" onClick={() => setModo(modo === 'login' ? 'signup' : 'login')}
            className="mt-3 w-full text-center text-sm text-sky-600 hover:underline">
            {modo === 'login' ? '¿No tiene cuenta? Crear una cuenta' : '¿Ya tiene cuenta? Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
