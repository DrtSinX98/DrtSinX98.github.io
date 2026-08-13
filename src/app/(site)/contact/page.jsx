import Contact from '@/components/Contact';
import { getContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Contact | Vortex' };

export default async function ContactPage() {
  const content = await getContent('contact');
  return <Contact content={content} />;
}
