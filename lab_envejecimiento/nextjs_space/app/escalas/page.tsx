import { Protegido } from '@/components/protegido';
import { CatalogoEscalas } from './_components/catalogo-escalas';

export const dynamic = 'force-dynamic';

export default function EscalasPage() {
  return (
    <Protegido>
      <CatalogoEscalas />
    </Protegido>
  );
}
