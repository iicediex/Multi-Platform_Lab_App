import { Protegido } from '@/components/protegido';
import { AltaPam } from './_components/alta-pam';

export const dynamic = 'force-dynamic';

export default function NuevaPamPage() {
  return (
    <Protegido>
      <AltaPam />
    </Protegido>
  );
}
