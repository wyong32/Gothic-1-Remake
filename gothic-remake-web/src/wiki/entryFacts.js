const GROUP_CATEGORIES = new Set(['characters', 'regions', 'quests', 'bestiary'])

const TYPE_LABEL = {
  characters: 'Role',
  regions: 'Zone type',
  bestiary: 'Habitat',
  quests: 'Quest type',
  weapons: 'Class',
  armors: 'Faction',
  potions: 'Use',
  runes: 'Circle',
  artifacts: 'Category',
  trophies: 'Source',
  gods: 'Domain',
  other: 'Topic',
}

const SKIP_FACT_LABELS = new Set(['Name', 'Appearance', 'Insert code', 'Insert Code', 'Image'])

export function sanitizeIntro(intro = '') {
  return intro
    .replace(/\[\[File:[^\]|]*(?:\|[^\]]+)?\]\]/gi, '')
    .replace(/^\s*thumb\|[^.]+\.?\s*/i, '')
    .replace(/^\}\}\s*/, '')
    .replace(/\s*<ref[^>]*>[\s\S]*?<\/ref>/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function buildEntryFacts(entry, section, categorySlug) {
  const facts = []

  if (entry.tags?.length) {
    facts.push({
      label: TYPE_LABEL[categorySlug] || 'Type',
      value: entry.tags.join(' · '),
    })
  }

  if (GROUP_CATEGORIES.has(categorySlug)) {
    facts.push({ label: 'Group', value: section.title })
  }

  const xpMatch = entry.summary.match(/([\d,]+)\s*XP/i)
  if (xpMatch) {
    facts.push({ label: 'Reward', value: `${xpMatch[1]} XP` })
  }

  const chapterMatch = entry.summary.match(/Chapter\s*(\d)/i) || entry.tags?.find((t) => /^Ch\./i.test(t))
  if (chapterMatch) {
    const value = typeof chapterMatch === 'string' ? chapterMatch : `Chapter ${chapterMatch[1]}`
    facts.push({ label: 'Chapter', value })
  }

  const partnerMatch = entry.summary.match(/Partner\s+([^—]+)/i)
  if (partnerMatch) {
    facts.push({ label: 'Partner', value: partnerMatch[1].trim() })
  }

  return facts
}

export function mergeFacts(wikiFacts = [], localFacts = []) {
  const merged = []
  const seen = new Set()

  for (const fact of [...wikiFacts, ...localFacts]) {
    const label = fact.label?.trim()
    if (!label || SKIP_FACT_LABELS.has(label) || seen.has(label.toLowerCase())) continue
    seen.add(label.toLowerCase())
    merged.push({ label, value: fact.value })
  }

  return merged.slice(0, 10)
}

export function entryImageKey(categorySlug, entryName) {
  return `${categorySlug}/${slugify(entryName)}`
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function extractIntroFacts(categorySlug, intro) {
  const facts = []
  const text = intro.toLowerCase()

  if (categorySlug === 'gods') {
    const domain = intro.match(/god of ([^.]+)/i)
    if (domain) facts.push({ label: 'Domain', value: domain[1].trim() })
    const oppose =
      intro.match(/opposition to (?:his brother )?([^.]+)/i) ||
      intro.match(/eternal battle with ([^.]+)/i)
    if (oppose) facts.push({ label: 'Opposition', value: oppose[1].trim() })
    const balance = intro.match(/balance between ([^.]+)/i)
    if (balance) facts.push({ label: 'Balance', value: balance[1].trim() })
  }

  if (categorySlug === 'regions') {
    const leader =
      intro.match(/ruled by ([^.]+)/i) ||
      intro.match(/rulers?\.?\s*([^.]+)/i) ||
      intro.match(/ruled over by ([^.]+)/i)
    if (leader) facts.push({ label: 'Leader', value: cleanLeader(leader[1]) })
    if (text.includes('camp')) facts.push({ label: 'Type', value: 'Camp' })
    if (text.includes('dungeon') || text.includes('mine')) facts.push({ label: 'Type', value: 'Dungeon / Mine' })
  }

  if (categorySlug === 'other') {
    if (text.includes('attribute')) facts.push({ label: 'Category', value: 'Attribute' })
    if (text.includes('skill')) facts.push({ label: 'Category', value: 'Skill' })
    if (text.includes('currency')) facts.push({ label: 'Category', value: 'Economy' })
  }

  return facts
}

function cleanLeader(value) {
  return value.replace(/\[\[|\]\]/g, '').replace(/\s+/g, ' ').trim()
}
