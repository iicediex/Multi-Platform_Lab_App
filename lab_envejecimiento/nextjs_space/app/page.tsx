import { Protegido } from '@/components/protegido';
import { Dashboard } from '@/components/paginas/dashboard';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <Protegido>
      <Dashboard />
    </Protegido>
  );
}
