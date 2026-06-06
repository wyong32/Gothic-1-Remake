/**
 * Pin icon silhouettes — 24×24 viewBox, bold fills for map readability.
 */
export const ICON_VIEW = 24

export const ICON_PATHS = {
  // ── Item ──────────────────────────────────────────────
  'box-open': [
    'M3 10 L12 6 L21 10 L21 20 L3 20 Z',
    'M3 10 L12 14 L21 10',
    'M10 15 L14 15 L14 18 L10 18 Z',
  ],
  box: 'M5 7 L19 7 L19 19 L5 19 Z M7 7 L7 5 L17 5 L17 7',
  sword: 'M11 2 L13 2 L13 15 L16.5 19 L14.5 22 L12 18 L9.5 22 L7.5 19 L11 15 Z',
  'flask-potion': 'M9 3 L15 3 L14 11 L18 21 L6 21 L10 11 Z M10 6 L14 6',
  cubes: 'M3 14 L9 11 L15 14 L15 20 L9 23 L3 20 Z M9 5 L15 8 L15 14 L9 11 L9 5 Z',
  'bow-arrow': [
    'M4 12 Q12 5 20 12 L18 14 Q12 8.5 6 14 Z',
    'M18 10 L21 12 L18 14 Z',
    'M4 12 L1 12 L3 10 Z',
  ],
  gem: 'M12 3 L20 10 L12 21 L4 10 Z M12 3 L4 10 L20 10',
  'book-spells': [
    'M4 4 L14 4 L14 20 L4 20 Z',
    'M14 4 L20 7 L20 20 L14 20',
    'M8 8 L12 8 L10 12 Z',
  ],
  utensils: [
    'M6 3 L8 3 L8 8 L7.5 13 L9 20 L7 20 L5.5 13 L6 8 Z',
    'M14 3 L16 3 L16 8 L16.5 13 L18 20 L16 20 L14.5 13 L14 8 Z',
  ],
  'book-open-cover': [
    'M3 5 L12 3 L12 20 L3 18 Z',
    'M12 3 L21 5 L21 18 L12 20',
  ],

  // ── Monster ───────────────────────────────────────────
  'roundies:animals-wolf':
    'M5 14 Q3 10 6 7 Q9 4 12 5 Q15 4 18 7 Q21 10 19 14 Q17 17 12 18 Q7 17 5 14 M7.5 9.5 L8.5 10.5 L7.5 11.5 Z M15.5 9.5 L16.5 10.5 L15.5 11.5 Z M10 13 L14 13 L14 14 L10 14 Z',
  bug: [
    'M12 8 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0',
    'M6 10 L3 13 M18 10 L21 13 M7 14 L4 18 M17 14 L20 18 M12 12 L12 17',
  ],
  'roundies:animals-spider': [
    'M12 10 m-3,0 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0',
    'M5 11 L2 8 M19 11 L22 8 M6 13 L3 17 M18 13 L21 17 M8 15 L6 20 M16 15 L18 20 M10 16 L10 21 M14 16 L14 21',
  ],
  'roundies:animals-mouse':
    'M8 15 Q6 12 8 9 Q10 7 13 8 Q16 9 16 12 Q15 15 12 16 Q9 16 8 15 M14 9 L16 7 M8 14 L6 17 M16 14 L18 17',
  'hand-lizard':
    'M6 14 Q4 11 7 8 L13 6 Q17 7 17 11 L15 15 Q13 18 10 18 L7 17 Q5 16 6 14 M9 10 L11 10 L11 11 L9 11 Z',
  'skull-crossbones': [
    'M12 6 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0',
    'M8 13 L8 16 M16 13 L16 16 M9 17 L15 17',
    'M4 19 L9 15 M20 19 L15 15',
  ],
  'roundies:animals-chicken':
    'M12 7 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M8 13 L6 18 M16 13 L18 18 M9 11 L15 11',
  'roundies:animals-fly': [
    'M12 11 m-2.5,0 a2.5,2.5 0 1,0 5,0 a2.5,2.5 0 1,0 -5,0',
    'M4 9 L1 6 M20 9 L23 6 M5 12 L2 15 M19 12 L22 15',
  ],
  'roundies:animals-dog':
    'M7 15 Q5 12 7 9 Q9 6 12 6 Q15 6 17 9 Q19 12 17 15 Q15 17 12 18 Q9 17 7 15 M8.5 9.5 L9.5 10.5 L8.5 11.5 Z M14.5 9.5 L15.5 10.5 L14.5 11.5 Z M11 13 L13 13 L13 14 L11 14 Z',
  'roundies:animals-bear':
    'M7 8 m-3,0 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0 M17 8 m-3,0 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0 M8 14 Q12 11 16 14 Q17 17 12 19 Q7 17 8 14',
  'roundies:animals-eagle': [
    'M12 5 L15 9 L12 11 L9 9 Z',
    'M3 11 L12 10 L21 11',
    'M12 11 L12 16',
  ],
  skeleton:
    'M12 4 m-3.5,0 a3.5,3.5 0 1,0 7,0 a3.5,3.5 0 1,0 -7,0 M9 9 L15 9 M10 9 L10 17 M14 9 L14 17 M8 17 L16 17 M10 17 L10 20 M14 17 L14 20',
  skull:
    'M12 6 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 M8 13 L8 16 M16 13 L16 16 M9 17 L15 17',
  'fire-flame-curved': 'M12 20 Q7 17 8 13 Q7 9 12 4 Q17 9 16 13 Q17 17 12 20',

  // ── NPC ───────────────────────────────────────────────
  user: 'M12 5 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 M5 21 Q5 14 12 14 Q19 14 19 21',
  users: [
    'M8 6 m-3,0 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0 M4 20 Q4 15 8 15 Q12 15 12 20',
    'M16 6 m-3,0 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0 M12 20 Q12 15 16 15 Q20 15 20 20',
  ],
  'person-praying': 'M12 3 L12 8 M8 11 L16 11 M6 21 L12 13 L18 21 M10 8 L14 8',
  shield: 'M12 3 L19 7 L19 14 Q19 18 12 21 Q5 18 5 14 L5 7 Z',
  'user-crown': [
    'M8 4 L10 6 L12 5 L14 6 L16 4 L15 7 L9 7 Z',
    'M12 8 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0',
    'M5 21 Q5 15 12 15 Q19 15 19 21',
  ],
  'circle-user': [
    'M12 2 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0',
    'M12 8 m-3,0 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0',
    'M7 19 Q7 15 12 15 Q17 15 17 19',
  ],
  'material:person_shield': [
    'M5 21 Q5 15 10 15 M14 15 Q19 15 19 21',
    'M16 5 L20 8 L20 14 L16 17 L12 14 L12 8 Z',
  ],
  'material:shield_person': [
    'M3 7 L8 4 L8 13 L3 16 Z',
    'M13 6 m-3.5,0 a3.5,3.5 0 1,0 7,0 a3.5,3.5 0 1,0 -7,0',
    'M9 20 Q9 16 14 16 Q19 16 19 20',
  ],

  // ── Crafting / world ──────────────────────────────────
  'roundies:games-and-sports-shield': 'M12 3 L18 6.5 L18 14 Q18 18 12 21 Q6 18 6 14 L6 6.5 Z',
  'roundies:games-and-sports-bow-and-arrow': [
    'M4 12 Q12 5 20 12 L18 14 Q12 8.5 6 14 Z',
    'M18 10 L21 12 L18 14 Z',
  ],
  'hammer-war': [
    'M4 18 L18 4',
    'M15 2 L20 7 L17 10 L12 5 Z',
    'M2 16 L7 21 L4 22 L2 20 Z',
  ],
  'hammer-crash': [
    'M3 17 L14 6',
    'M12 4 L17 9 L14 12 L9 7 Z',
    'M2 19 L10 19 L10 15 L2 15 Z',
  ],
  'roundies:architecture-toolbox': 'M4 9 L20 9 L20 19 L4 19 Z M8 9 L8 6 L16 6 L16 9 M12 12 L12 16',
  cauldron: [
    'M5 12 L19 12 L17 19 L7 19 Z',
    'M7 12 Q12 7 17 12',
    'M10 19 L10 21 M14 19 L14 21',
  ],
  'material:cooking': [
    'M5 13 L19 13 L17 20 L7 20 Z',
    'M7 13 L7 10 L17 10 L17 13',
    'M10 7 Q12 4 14 7',
  ],
  'roundies:architecture-pick-axe': [
    'M12 4 L12 20',
    'M6 7 L18 7',
    'M4 5 L8 9 M20 5 L16 9',
  ],
}

export const DEFAULT_ICON = 'box'

export function getIconPaths(iconName) {
  const raw = ICON_PATHS[iconName] || ICON_PATHS[DEFAULT_ICON]
  return Array.isArray(raw) ? raw : [raw]
}
