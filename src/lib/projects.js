import { defaultProjects } from './defaults';

/**
 * Projects used to be tabs on the About page (`projectTabs`, each with a flat
 * list of title / desc / icon / link). They now have their own page and a richer
 * shape. This turns the old data into the new one, so edits made in the old
 * editor are not lost before the new section is first saved.
 *
 * A project that is still the stock one keeps its richer default entry (role,
 * tags and so on); anything else is converted field for field.
 */
export function projectsFromAbout(about) {
  const tabs = about?.projectTabs;
  if (!Array.isArray(tabs) || tabs.length === 0) return null;

  const stock = new Map(defaultProjects.items.map((item) => [item.title, item]));
  const categories = tabs.map((tab) => ({ key: tab.key, title: tab.title }));
  const items = tabs.flatMap((tab) =>
    (tab.projects || []).map((project) => {
      const base = stock.get(project.title);
      const links = project.link ? [{ label: 'View project', href: project.link }] : [];
      const converted = {
        title: project.title,
        summary: project.desc || '',
        category: tab.key,
        role: '',
        year: '',
        status: '',
        icon: project.icon || 'code',
        image: '',
        tags: [],
        links,
        featured: false,
      };
      // Keep the owner's own text and link where they changed it.
      const untouched =
        base && base.summary === project.desc && base.links[0]?.href === project.link && base.icon === project.icon;
      return untouched ? { ...base, category: tab.key } : converted;
    }),
  );

  return { categories, items };
}
