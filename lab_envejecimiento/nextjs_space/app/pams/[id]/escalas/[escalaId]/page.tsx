import { Protegido } from '@/components/protegido';
import { AplicarEscala } from './_components/aplicar-escala';

export const dynamic = 'force-dynamic';

export default function AplicarEscalaPage({ params }: { params: { id: string; escalaId: string } }) {
  return (
    <Protegido>
      <AplicarEscala pamId={params?.id ?? ''} escalaId={params?.escalaId ?? ''} />
    </Protegido>
  );
}
