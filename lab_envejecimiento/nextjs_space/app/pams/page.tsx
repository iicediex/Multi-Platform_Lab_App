import { Protegido } from '@/components/protegido';
import { ListaPams } from './_components/lista-pams';

export const dynamic = 'force-dynamic';

export default function PamsPage() {
  return (
    <Protegido>
      <ListaPams />
    </Protegido>
  );
}
