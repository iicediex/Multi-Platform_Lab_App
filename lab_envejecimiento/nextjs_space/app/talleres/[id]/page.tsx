import { Protegido } from '@/components/protegido';
import { DetalleTaller } from './_components/detalle-taller';

export const dynamic = 'force-dynamic';

export default function TallerPage({ params }: { params: { id: string } }) {
  return (
    <Protegido>
      <DetalleTaller tallerId={params?.id ?? ''} />
    </Protegido>
  );
}