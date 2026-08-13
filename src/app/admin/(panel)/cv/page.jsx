import { Suspense } from 'react';
import CvEditor from '@/components/admin/editors/CvEditor';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-empty">Loading…</div>}>
      <CvEditor />
    </Suspense>
  );
}
