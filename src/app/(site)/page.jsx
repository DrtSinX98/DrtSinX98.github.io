import Home from '@/components/Home';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const home = await getContent('home');
  return <Home content={home} serverHour={new Date().getHours()} />;
}
