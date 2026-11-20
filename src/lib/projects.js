import { defaultProjects } from './defaults';

// Projects added to the defaults after the section moved off the About page. A
// site still showing converted About data would otherwise never get them.
const ADDED_SINCE_MOVE = ['Sagabond', 'Open Mapple'];

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
  const categories = tabs.map((tab) => ({
    key: tab.key,
    title: tab.title,
    icon: defaultProjects.categories.find((c) => c.key === tab.key)?.icon || 'code',
  }));
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

  // The newer projects come first, with their area if the old tabs had no such one.
  const fresh = defaultProjects.items.filter(
    (item) => ADDED_SINCE_MOVE.includes(item.title) && !items.some((existing) => existing.title === item.title),
  );
  fresh.forEach((item) => {
    const area = defaultProjects.categories.find((c) => c.key === item.category);
    if (area && !categories.some((c) => c.key === area.key)) categories.push(area);
  });

  return { categories, items: [...fresh, ...items] };
}
