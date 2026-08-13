import Gallery from '@/components/Gallery';
import { getContent, getCountries, getGalleries } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Gallery | Vortex' };

export default async function GalleryPage() {
  const [content, allCountries, galleries] = await Promise.all([
    getContent('gallery'),
    getCountries(),
    getGalleries(),
  ]);

  const countries = allCountries.filter((c) => c.visited !== false);

  return <Gallery content={content} countries={countries} galleries={galleries} />;
}
