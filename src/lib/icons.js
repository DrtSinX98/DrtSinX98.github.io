/**
 * Named icons available to editable content.
 *
 * Content documents store an icon *name* (e.g. "mobileScreen") rather than an
 * imported object, so the admin panel can offer a picker and the database stays
 * JSON-serialisable. The names below are unchanged from the Font Awesome era —
 * existing documents keep resolving.
 *
 * Two families, on purpose:
 *
 * - **Semantic icons** come from Lucide: a consistent 24px grid drawn in
 *   `currentColor` strokes, which reads as flat line-work next to the rest of
 *   the UI. The old Font Awesome solid set was heavy filled glyphs.
 * - **Brand marks** stay on Font Awesome. Lucide deliberately ships no company
 *   logos, and an approximated logo is worse than an accurate one.
 *
 * Render through `<Icon name="…" />` rather than reading this map directly;
 * it knows how to draw both families.
 */
import {
  House, User, Video, Images, MessageSquare, FileText, GraduationCap, Briefcase,
  Microscope, Code, Monitor, Trophy, Book, Presentation, Gamepad2, Users,
  Workflow, Smartphone, Wrench, Cpu, Eraser, Palette, HeartHandshake, Dna, Atom,
  FlaskConical, Lightbulb, Rocket, Server, Database, ChartLine, Camera, Music,
  Heart, Link, Thermometer, Droplet, CloudRain, Clock, Mail, Phone, MapPin,
  Globe, Award, Star, Save, Sun, Moon, Layers,
} from 'lucide-react';
import {
  faGithub,
  faLinkedin,
  faGoogleScholar,
  faGoogle,
  faXTwitter,
  faTelegram,
  faWhatsapp,
  faInstagram,
  faDiscord,
  faReact,
  faBootstrap,
  faYoutube,
  faFacebook,
  faMastodon,
  faReddit,
  faStackOverflow,
  faOrcid,
} from '@fortawesome/free-brands-svg-icons';

/** Semantic icons — Lucide components. */
export const LUCIDE_ICONS = {
  // navigation
  house: House,
  user: User,
  video: Video,
  images: Images,
  message: MessageSquare,
  // sections
  filePdf: FileText,
  graduationCap: GraduationCap,
  briefcase: Briefcase,
  microscope: Microscope,
  code: Code,
  desktop: Monitor,
  trophy: Trophy,
  book: Book,
  chalkboardTeacher: Presentation,
  gamepad: Gamepad2,
  users: Users,
  projectDiagram: Workflow,
  layers: Layers,
  // projects
  mobileScreen: Smartphone,
  wrench: Wrench,
  microchip: Cpu,
  broom: Eraser,
  palette: Palette,
  handHoldingHeart: HeartHandshake,
  dna: Dna,
  atom: Atom,
  flask: FlaskConical,
  lightbulb: Lightbulb,
  rocket: Rocket,
  server: Server,
  database: Database,
  chartLine: ChartLine,
  camera: Camera,
  music: Music,
  heart: Heart,
  link: Link,
  // weather / misc
  temperature: Thermometer,
  droplet: Droplet,
  cloudRain: CloudRain,
  clock: Clock,
  envelope: Mail,
  phone: Phone,
  mapMarker: MapPin,
  globe: Globe,
  fileAlt: FileText,
  award: Award,
  star: Star,
  save: Save,
  sun: Sun,
  moon: Moon,
};

/** Brand marks — Font Awesome definitions. */
export const BRAND_ICONS = {
  github: faGithub,
  linkedin: faLinkedin,
  scholar: faGoogleScholar,
  google: faGoogle,
  xTwitter: faXTwitter,
  telegram: faTelegram,
  whatsapp: faWhatsapp,
  instagram: faInstagram,
  discord: faDiscord,
  react: faReact,
  bootstrap: faBootstrap,
  youtube: faYoutube,
  facebook: faFacebook,
  mastodon: faMastodon,
  reddit: faReddit,
  stackOverflow: faStackOverflow,
  orcid: faOrcid,
};

export const ICON_NAMES = [...Object.keys(LUCIDE_ICONS), ...Object.keys(BRAND_ICONS)];

export function isBrandIcon(name) {
  return Object.prototype.hasOwnProperty.call(BRAND_ICONS, name);
}

/**
 * Resolves a stored name to something renderable, falling back to a neutral
 * link glyph so a bad name never crashes a page.
 *
 * Returns a Lucide component for semantic names and a Font Awesome definition
 * for brands — `<Icon>` tells them apart via `isBrandIcon`.
 */
export function getIcon(name) {
  return LUCIDE_ICONS[name] || BRAND_ICONS[name] || Link;
}
