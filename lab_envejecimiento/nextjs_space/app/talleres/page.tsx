import { Protegido } from '@/components/protegido';
import { ListaTalleres } from './_components/lista-talleres';

export const dynamic = 'force-dynamic';

export default function TalleresPage() {
  return (
    <Protegido>
      <ListaTalleres />
    </Protegido>
  );
}
