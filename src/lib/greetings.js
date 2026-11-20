/**
 * "Hello" in the language a country is most associated with, keyed by ISO 639-3
 * code (the codes the country dataset uses). Written in Latin script, like the
 * greetings already on the globe ("Namaste", "Sawasdee", "Marhaba").
 *
 * It is a starting point, not an authority: the greeting shows when you hover a
 * country on the map and is editable afterwards. A country whose languages are
 * all missing here simply gets "Hello".
 */
export const GREETINGS = {
  afr: 'Hallo', amh: 'Selam', ara: 'Marhaba', aze: 'Salam', bel: 'Pryvitannie', ben: 'Nomoshkar',
  bos: 'Zdravo', bul: 'Zdraveyte', cat: 'Hola', ces: 'Ahoj', cym: 'Helo', dan: 'Hej', deu: 'Hallo',
  div: 'Assalaamu alaikum', ell: 'Geia sou', eng: 'Hello', est: 'Tere', eus: 'Kaixo', fas: 'Salaam',
  fij: 'Bula', fil: 'Kumusta', fin: 'Hei', fra: 'Bonjour', gle: 'Dia duit', glg: 'Ola', hat: 'Bonjou',
  haw: 'Aloha', heb: 'Shalom', hin: 'Namaste', hrv: 'Bok', hun: 'Szia', hye: 'Barev', ind: 'Halo',
  isl: 'Halló', ita: 'Ciao', jpn: 'Konnichiwa', kat: 'Gamarjoba', kaz: 'Salem', khm: 'Suostei',
  kin: 'Muraho', kor: 'Annyeong', lao: 'Sabaidee', lav: 'Sveiki', lit: 'Labas', lug: 'Oli otya',
  mkd: 'Zdravo', mlt: 'Bonġu', mon: 'Sain baina uu', mri: 'Kia ora', msa: 'Halo', mya: 'Mingalaba',
  nep: 'Namaste', nld: 'Hallo', nno: 'Hei', nob: 'Hei', nya: 'Moni', pol: 'Cześć', por: 'Olá',
  ron: 'Salut', rus: 'Privet', sin: 'Ayubowan', slk: 'Ahoj', slv: 'Živjo', smo: 'Talofa', sna: 'Mhoroi',
  som: 'Salaan', sot: 'Dumela', spa: 'Hola', sqi: 'Përshëndetje', srp: 'Zdravo', swa: 'Jambo',
  swe: 'Hej', tam: 'Vanakkam', tel: 'Namaskaram', tgl: 'Kumusta', tha: 'Sawasdee', ton: 'Malo e lelei',
  tsn: 'Dumela', tur: 'Merhaba', ukr: 'Pryvit', urd: 'Salaam', uzb: 'Salom', vie: 'Xin chào',
  xho: 'Molo', zho: 'Nǐ hǎo', zul: 'Sawubona',
};

/** Where picking by language would give a poor answer. */
const BY_COUNTRY = {
  CA: 'Hello', // English and French are co-official; "Hello" is the safer default
  ZA: 'Sawubona', // eleven official languages, none obviously first
  CH: 'Grüezi',
};

/**
 * English is skipped when a country has another language, so India greets with
 * "Namaste" rather than "Hello" — but it is kept as the last resort.
 */
export function greetingFor(languages = {}, countryCode = '') {
  if (BY_COUNTRY[countryCode]) return BY_COUNTRY[countryCode];

  const codes = Object.keys(languages || {});
  const ordered = [...codes.filter((c) => c !== 'eng'), ...codes.filter((c) => c === 'eng')];
  for (const code of ordered) {
    if (GREETINGS[code]) return GREETINGS[code];
  }
  return 'Hello';
}
