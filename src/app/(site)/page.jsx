import Home from '@/components/Home';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const content = await getContent('home');
  return <Home content={content} serverHour={new Date().getHours()} />;
}
