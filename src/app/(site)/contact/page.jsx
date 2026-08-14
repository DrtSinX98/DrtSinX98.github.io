import Contact from '@/components/Contact';
import { getContentMany } from '@/lib/content';
import { getIllustration } from '@/lib/illustrations';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Contact | Vortex' };

export default async function ContactPage() {
  const { contact, site } = await getContentMany(['contact', 'site']);
  const animate = site.animations?.illustrations !== false;
  const illustration = animate ? await getIllustration(contact.image) : null;

  return <Contact content={contact} illustration={illustration} animateIllustration={animate} />;
}
