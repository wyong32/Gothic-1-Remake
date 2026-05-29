/**
 * Fetch infobox fields and intro text from gothic.wiki for wiki entries.
 * Run: node scripts/fetch-wiki-details.mjs
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { wikiCategories } from '../src/wiki/categories.js'
import gods from '../src/wiki/entries/gods.js'
import regions from '../src/wiki/entries/regions.js'
import characters from '../src/wiki/entries/characters.js'
import bestiary from '../src/wiki/entries/bestiary.js'
import quests from '../src/wiki/entries/quests.js'
import artifacts from '../src/wiki/entries/artifacts.js'
import weapons from '../src/wiki/entries/weapons.js'
import armors from '../src/wiki/entries/armors.js'
import potions from '../src/wiki/entries/potions.js'
import runes from '../src/wiki/entries/runes.js'
import trophies from '../src/wiki/entries/trophies.js'
import other from '../src/wiki/entries/other.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outPath = path.join(root, 'src', 'wiki', 'entryDetails.json')
const API = 'https://gothic.wiki/w/api.php'

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

const WIKI_ALIASES = {
  'Joining the Old Camp': 'Admission to the Old Camp',
  'Joining the New Camp': 'Admission to the New Camp',
  'Joining the Swamp Camp': 'Admission to the Swamp Camp',
  'Two-handed sword': 'Two-Handed Sword',
  'Focus in the Mountain Fortress': 'Mountain Fort',
  'Chromatin Book': 'Chromatin Books',
  'Sleep': 'Sleep (rune)',
  'Circle of Magic': 'Magic Circle',
  'Claw': 'Claw (trophy)',
}

const FIELD_PRIORITY = {
  characters: ['Guild', 'Level', 'Location', 'Teaches', 'Weapons', 'Armor', 'Rank', 'Voice Actor'],
  bestiary: ['Level', 'HP', 'Experience', 'Strength/Dexterity', 'Loot', 'Blunt protection', 'Edge protection', 'Arrow protection'],
  regions: ['Type', 'Location', 'Leader', 'Population', 'Inhabitants', 'Notable characters', 'Notable spots', 'Quests'],
  weapons: ['Type', 'Damage', 'Attributes required', 'Skills required', 'Buy value', 'Sell value', 'Owner/s', 'Merchants'],
  armors: ['Type', 'Protection', 'Attributes required', 'Buy value', 'Sell value', 'Owner/s'],
  potions: ['Type', 'Effect', 'Ingredients', 'Buy value', 'Sell value'],
  quests: ['Type', 'Given by', 'Location', 'Reward', 'Experience', 'Requirements'],
  artifacts: ['Type', 'Title', 'Description', 'Location', 'Quest item'],
  runes: ['Circle', 'Mana cost', 'Effect', 'Type', 'Insert code'],
  gods: ['Domain', 'Opposition', 'Worship'],
  trophies: ['Loot', 'Source', 'Value'],
  other: ['Type', 'Effect', 'Trained by', 'Max value'],
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function cleanWikiText(text = '') {
  return text
    .replace(/\[\[File:[^\]|]*(?:\|[^\]]+)?\]\]/gi, '')
    .replace(/^\s*thumb\|[^.]+\.?\s*/i, '')
    .replace(/\[\[([^|\]]+\|)?([^\]]+)\]\]/g, '$2')
    .replace(/'''([^']+)'''/g, '$1')
    .replace(/''([^']+)''/g, '$1')
    .replace(/<br\s*\/?>/gi, ' · ')
    .replace(/<ref[^>]*\/>/g, '')
    .replace(/<references\s*\/>/g, '')
    .replace(/\{\{[^}]+\}\}/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s·\s·+/g, ' · ')
    .replace(/^·\s*|\s·$/g, '')
    .trim()
}

function parseTemplateFields(templateBlock) {
  const fields = {}
  if (!templateBlock) return fields

  for (const line of templateBlock.split('\n')) {
    const match = line.match(/^\s*\|\s*([^=]+?)\s*=\s*(.+?)\s*$/)
    if (!match) continue
    const key = match[1].trim()
    const value = cleanWikiText(match[2])
    if (value) fields[key] = value
  }
  return fields
}

function extractGothicTemplate(wikitext) {
  const multitabGothic = wikitext.match(
    /\{\{Multitab[\s\S]*?\|Tab1Name\s*=\s*Gothic[\s\S]*?\|Tab1\s*=\s*(\{\{(?:Character|Beast|Weapon|Item|Armor|Location|Potion|Rune)[\s\S]+?\n\s*\}\})/i,
  )
  if (multitabGothic) return multitabGothic[1]

  const multitabFirst = wikitext.match(
    /\{\{Multitab[\s\S]*?\|Tab1\s*=\s*(\{\{(?:Character|Beast|Weapon|Item|Armor|Location|Potion|Rune)[\s\S]+?\n\s*\}\})/i,
  )
  if (multitabFirst) return multitabFirst[1]

  const direct = wikitext.match(
    /^(\{\{(?:Character|Beast|Weapon|Item|Armor|Location|Potion|Rune|Quest)[\s\S]+?\n\s*\}\})/m,
  )
  if (direct) return direct[1]

  const location = wikitext.match(/(\{\{Location[\s\S]+?\n\s*\}\})/i)
  return location?.[1] ?? null
}

function extractIntro(wikitext) {
  let body = wikitext
    .replace(/^\{\{Stub\}\}\s*/i, '')
    .replace(/^\{\{Multitab[\s\S]*?\}\}\}\}/m, '')
    .replace(/^\{\{[\s\S]*?\}\}\s*/m, '')

  const beforeSection = body.split(/\n==\s/m)[0]
  const intro = cleanWikiText(beforeSection)
  if (!intro) return ''

  const sentences = intro.match(/[^.!?]+[.!?]+/g) || [intro]
  return sentences.slice(0, 3).join(' ').trim()
}

function extractQuestMeta(wikitext, fields) {
  const meta = { ...fields }
  const lower = wikitext.toLowerCase()

  if (!meta.Type) {
    if (lower.includes('main quest')) meta.Type = 'Main quest'
    else if (lower.includes('side quest')) meta.Type = 'Side quest'
  }

  const xpMatch = wikitext.match(/(\d[\d,]*)\s*(?:experience|XP)/i)
  if (xpMatch && !meta.Experience) meta.Experience = `${xpMatch[1]} XP`

  const rewardMatch = wikitext.match(/reward[s]?:?\s*([^\n.]{3,120})/i)
  if (rewardMatch && !meta.Reward) meta.Reward = cleanWikiText(rewardMatch[1])

  return meta
}

function pickFacts(categorySlug, rawFields, wikitext) {
  let fields = { ...rawFields }

  if (categorySlug === 'quests') {
    fields = extractQuestMeta(wikitext, fields)
  }

  if (categorySlug === 'weapons' && fields.Title && !fields.Name) {
    fields.Name = fields.Title
  }

  const priority = FIELD_PRIORITY[categorySlug] || Object.keys(fields)
  const facts = []

  for (const key of priority) {
    if (fields[key]) {
      facts.push({ label: normalizeLabel(key), value: fields[key] })
    }
  }

  for (const [key, value] of Object.entries(fields)) {
    if (facts.some((f) => f.label === normalizeLabel(key))) continue
    if (!value || key === 'Image' || key === 'Insert code' || key === 'Insert Code') continue
    if (facts.length >= 8) break
    facts.push({ label: normalizeLabel(key), value })
  }

  return facts.slice(0, 8)
}

function normalizeLabel(key) {
  return key
    .replace(/\//g, ' / ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
}

async function wikiFetch(params) {
  const url = `${API}?${new URLSearchParams({ format: 'json', ...params })}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Wiki API ${res.status}`)
  return res.json()
}

async function resolvePageTitle(title) {
  const aliased = WIKI_ALIASES[title] || title
  const parse = await wikiFetch({ action: 'parse', page: aliased, prop: 'wikitext' })
  if (!parse.error) return aliased

  const search = await wikiFetch({ action: 'opensearch', search: title, limit: 1 })
  const found = search[1]?.[0]
  if (found) return found

  return aliased
}

async function getWikitext(pageTitle) {
  const title = await resolvePageTitle(pageTitle)
  const data = await wikiFetch({ action: 'parse', page: title, prop: 'wikitext' })
  if (data.error) return null
  return { title, wikitext: data.parse.wikitext['*'] }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  const details = {}
  let ok = 0
  let skip = 0

  for (const cat of wikiCategories) {
    const content = contentMap[cat.slug]
    if (!content?.sections) continue

    for (const section of content.sections) {
      for (const entry of section.entries) {
        const wikiTitle = entry.wiki || entry.name
        const key = `${cat.slug}/${slugify(entry.name)}`

        try {
          const page = await getWikitext(wikiTitle)
          if (!page?.wikitext) {
            console.log(`  skip: ${key}`)
            skip++
            await sleep(100)
            continue
          }

          const template = extractGothicTemplate(page.wikitext)
          const rawFields = parseTemplateFields(template)
          const intro = extractIntro(page.wikitext)
          const facts = pickFacts(cat.slug, rawFields, page.wikitext)

          details[key] = {
            wikiTitle: page.title,
            intro: intro || entry.summary,
            facts,
          }

          console.log(`  ok: ${key} (${facts.length} facts)`)
          ok++
        } catch (err) {
          console.warn(`  fail: ${key} — ${err.message}`)
          skip++
        }

        await sleep(130)
      }
    }
  }

  await fs.writeFile(outPath, `${JSON.stringify(details, null, 2)}\n`)
  console.log(`\nSaved ${ok} entries (${skip} skipped) → ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
