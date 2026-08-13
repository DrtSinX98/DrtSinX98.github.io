import About from '@/components/About';
import { getContentMany } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'About | Vortex' };

export default async function AboutPage() {
  const { about, cv } = await getContentMany(['about', 'cv']);
  return <About content={about} cv={cv} />;
}
