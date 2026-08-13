import { Suspense } from 'react';
import PhotosManager from '@/components/admin/PhotosManager';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="admin-empty">Loading…</div>}>
      <PhotosManager />
    </Suspense>
  );
}
