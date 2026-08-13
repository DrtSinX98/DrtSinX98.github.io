import { Suspense } from 'react';
import CountriesManager from '@/components/admin/CountriesManager';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-empty">Loading…</div>}>
      <CountriesManager />
    </Suspense>
  );
}
