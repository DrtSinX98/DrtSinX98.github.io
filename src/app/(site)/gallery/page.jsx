import Gallery from '@/components/Gallery';
import { getContentMany, getCountries, getGalleries } from '@/lib/content';
import { getIllustration } from '@/lib/illustrations';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Gallery | Vortex' };

export default async function GalleryPage() {
  const [content, allCountries, galleries] = await Promise.all([
    getContentMany(['gallery', 'site']),
    getCountries(),
    getGalleries(),
  ]);

  const { gallery, site } = content;
  const animate = site.animations?.illustrations !== false;
  const illustration = animate ? await getIllustration(gallery.image) : null;
  const countries = allCountries.filter((c) => c.visited !== false);

  return (
    <Gallery
      content={gallery}
      countries={countries}
      galleries={galleries}
      illustration={illustration}
      animateIllustration={animate}
    />
  );
}
