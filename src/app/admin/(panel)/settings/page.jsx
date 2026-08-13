import { Suspense } from 'react';
import SettingsPanel from '@/components/admin/SettingsPanel';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-empty">Loading…</div>}>
      <SettingsPanel />
    </Suspense>
  );
}
