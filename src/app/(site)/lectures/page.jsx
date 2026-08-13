import Lectures from '@/components/Lectures';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Lectures | Vortex' };

export default async function LecturesPage() {
  const content = await getContent('lectures');
  return <Lectures content={content} />;
}
