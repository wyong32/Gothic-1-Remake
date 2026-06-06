/**
 * Gothic 1 Remake Guide — canonical、OG、Twitter、sitemap 使用此域名。
 */
export const seoConfig = {
  domain: 'gothic1remake.com',
  fullDomain: 'https://gothic1remake.com',
  siteName: 'Gothic 1 Remake Guide',
  defaultOgImage: '/images/logo.webp',
  defaults: {
    title: 'Gothic 1 Remake Guide — Release, Walkthroughs & Quests',
    description:
      'Gothic 1 Remake guide: June 5, 2026 release date, beginner walkthroughs, three-camp builds, quest directory, wiki, and interactive map for the Mining Valley.',
    keywords:
      'Gothic 1 Remake, Gothic 1 Remake guide, release date, walkthrough, quests, factions, wiki, interactive map',
    author: 'Gothic 1 Remake Guide',
    type: 'website',
  },
  priorities: {
    home: 1.0,
    beginner: 0.95,
    wiki: 0.92,
    'wiki-category': 0.85,
    'factions-builds': 0.9,
    'quests-story': 0.9,
    guides: 0.9,
    'guide-detail': 0.8,
    'interactive-map': 0.88,
    'lockpick-tool': 0.9,
    'lockpick-submit': 0.75,
    'legal-privacy': 0.35,
    'legal-terms': 0.35,
    'legal-copyright': 0.35,
    'legal-about': 0.45,
    'legal-contact': 0.45,
  },
  changefreq: {
    home: 'weekly',
    beginner: 'weekly',
    wiki: 'weekly',
    'wiki-category': 'weekly',
    'factions-builds': 'weekly',
    'quests-story': 'weekly',
    guides: 'weekly',
    'guide-detail': 'monthly',
    'interactive-map': 'weekly',
    'lockpick-tool': 'weekly',
    'lockpick-submit': 'monthly',
    'legal-privacy': 'yearly',
    'legal-terms': 'yearly',
    'legal-copyright': 'yearly',
    'legal-about': 'yearly',
    'legal-contact': 'yearly',
  },
}
