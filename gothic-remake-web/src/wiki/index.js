import { wikiCategories } from './categories'
import {
  buildEntryFacts,
  entryImageKey,
  extractIntroFacts,
  mergeFacts,
  sanitizeIntro,
} from './entryFacts'
import entryDetails from './entryDetails.json'
import imageManifest from './imageManifest.json'
import gods from './entries/gods'
import regions from './entries/regions'
import characters from './entries/characters'
import bestiary from './entries/bestiary'
import quests from './entries/quests'
import artifacts from './entries/artifacts'
import weapons from './entries/weapons'
import armors from './entries/armors'
import potions from './entries/potions'
import runes from './entries/runes'
import trophies from './entries/trophies'
import other from './entries/other'

const contentMap = {
  gods,
  regions,
  characters,
  bestiary,
  quests,
  artifacts,
  weapons,
  armors,
  potions,
  runes,
  trophies,
  other,
}

function enrichEntry(entry, section, categorySlug) {
  const key = entryImageKey(categorySlug, entry.name)
  const detail = entryDetails[key]
  const intro = sanitizeIntro(detail?.intro) || entry.summary
  const introFacts = extractIntroFacts(categorySlug, intro)
  const localFacts = buildEntryFacts(entry, section, categorySlug)
  const facts = mergeFacts([...(detail?.facts || []), ...introFacts], localFacts)
  const guideNote =
    entry.summary && intro && entry.summary !== intro && !intro.includes(entry.summary.slice(0, 40))
      ? entry.summary
      : null

  return {
    ...entry,
    intro,
    guideNote,
    facts,
    image: imageManifest[key] || null,
  }
}

function enrichSections(sections, categorySlug) {
  return sections.map((section) => ({
    ...section,
    entries: section.entries.map((entry) => enrichEntry(entry, section, categorySlug)),
  }))
}

export function getAllWikiCategories() {
  return wikiCategories.map((category) => ({
    ...category,
    entryCount: countEntries(category.slug),
  }))
}

export function getWikiCategory(slug) {
  const meta = wikiCategories.find((c) => c.slug === slug)
  const content = contentMap[slug]
  if (!meta || !content) return null
  return {
    ...meta,
    ...content,
    sections: enrichSections(content.sections, slug),
  }
}

function countEntries(slug) {
  const content = contentMap[slug]
  if (!content?.sections) return 0
  return content.sections.reduce((sum, section) => sum + (section.entries?.length || 0), 0)
}

export { wikiCategories }
