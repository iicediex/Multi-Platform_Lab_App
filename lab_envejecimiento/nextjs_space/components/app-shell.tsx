'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  LayoutDashboard, Users, UserPlus, ClipboardList, HeartPulse, FileText,
  CalendarDays, Menu, X, LogOut, ShieldCheck, Leaf,
} from 'lucide-react';

const NAV = [
  { href: '/', etiqueta: 'Panel principal', icono: LayoutDashboard },
  { href: '/pams', etiqueta: 'PAM registradas', icono: Users },
  { href: '/pams/nueva', etiqueta: 'Alta de PAM', icono: UserPlus },
  { href: '/escalas', etiqueta: 'Escalas geriátricas', icono: ClipboardList },
  { href: '/talleres', etiqueta: 'Talleres', icono: CalendarDays },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession() || {};
  const pathname = usePathname() ?? '';
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const esAdmin = (session?.user as any)?.rol === 'ADMIN';

  const items = esAdmin ? [...NAV, { href: '/usuarios', etiqueta: 'Usuarios', icono: ShieldCheck }] : NAV;

  const nav = (
    <nav className="flex flex-col gap-1 px-3">
      {items.map((it) => {
        const activo = it.href === '/' ? pathname === '/' : pathname?.startsWith?.(it.href) && !(it.href === '/pams' && pathname?.startsWith?.('/pams/nueva'));
        const Icono = it.icono;
        return (
          <Link
            key={it.href}
            href={it.href}
            onClick={() => setAbierto(false)}
            className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
              activo ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-600 hover:bg-teal-50 hover:text-teal-800'
            }`}
          >
            <Icono className="h-4 w-4 shrink-0" />
            {it.etiqueta}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header móvil */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <button aria-label="Abrir menú" onClick={() => setAbierto(!abierto)} className="rounded-md bg-teal-50 p-2 text-sky-600">
          {abierto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-sky-500" />
          <span className="font-display text-sm font-bold text-slate-800">Lab. Envejecimiento Saludable</span>
        </div>
        <button aria-label="Cerrar sesión" onClick={() => signOut({ callbackUrl: '/login' })} className="rounded-md p-2 text-slate-500 hover:text-red-600">
          <LogOut className="h-5 w-5" />
        </button>
      </header>
      {abierto && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setAbierto(false)}>
          <aside className="h-full w-72 bg-white pt-20 shadow-xl" onClick={(e) => e?.stopPropagation?.()}>
            {nav}
          </aside>
        </div>
      )}

      {/* Sidebar escritorio */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="rounded-lg bg-sky-500 p-2"><Leaf className="h-5 w-5 text-white" /></div>
          <div>
            <div className="font-display text-sm font-bold leading-tight text-slate-800">Laboratorio de</div>
            <div className="font-display text-sm font-bold leading-tight text-sky-600">Envejecimiento Saludable</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-2">{nav}</div>
        <div className="border-t border-slate-100 p-4">
          <div className="mb-2 text-xs text-slate-500">
            <div className="font-semibold text-slate-700">{session?.user?.name ?? ''}</div>
            <div>{esAdmin ? 'Administrador' : 'Gerontólogo(a)'}</div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex w-full items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="px-4 py-6 lg:ml-64 lg:px-8">
        <div className="mx-auto max-w-[1200px]">{children}</div>
      </main>
    </div>
  );
}
