import { Protegido } from '@/components/protegido';
import { GestionUsuarios } from './_components/gestion-usuarios';

export const dynamic = 'force-dynamic';

export default function UsuariosPage() {
  return (
    <Protegido>
      <GestionUsuarios />
    </Protegido>
  );
}
