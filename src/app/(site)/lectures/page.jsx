import Lectures from '@/components/Lectures';
import { getContentMany } from '@/lib/content';
import { getIllustration } from '@/lib/illustrations';
import { visitorTheme } from '@/lib/visitorTheme';
import { requirePage } from '@/lib/pageGate';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Lectures | Vortex' };

export default async function LecturesPage() {
  const { lectures, site } = await getContentMany(['lectures', 'site']);
  requirePage(site, 'lectures');
  const animate = site.animations?.illustrations !== false;
  const illustration = animate ? await getIllustration(lectures.image, await visitorTheme(site.theme)) : null;

  return <Lectures content={lectures} illustration={illustration} animateIllustration={animate} />;
}
