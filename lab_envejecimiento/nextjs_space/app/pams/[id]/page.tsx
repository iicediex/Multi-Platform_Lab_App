import { Protegido } from '@/components/protegido';
import { PerfilPam } from './_components/perfil-pam';

export const dynamic = 'force-dynamic';

export default function PerfilPamPage({ params }: { params: { id: string } }) {
  return (
    <Protegido>
      <PerfilPam pamId={params?.id ?? ''} />
    </Protegido>
  );
}
