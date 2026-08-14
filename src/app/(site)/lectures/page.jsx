import Lectures from '@/components/Lectures';
import { getContentMany } from '@/lib/content';
import { getIllustration } from '@/lib/illustrations';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Lectures | Vortex' };

export default async function LecturesPage() {
  const { lectures, site } = await getContentMany(['lectures', 'site']);
  const animate = site.animations?.illustrations !== false;
  const illustration = animate ? await getIllustration(lectures.image) : null;

  return <Lectures content={lectures} illustration={illustration} animateIllustration={animate} />;
}
