/**
 * Fetch entry images from gothic.wiki and save under public/wiki/images/.
 * Run: node scripts/fetch-wiki-images.mjs
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
const outDir = path.join(root, 'public', 'wiki', 'images')
const manifestPath = path.join(root, 'src', 'wiki', 'imageManifest.json')

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

const API = 'https://gothic.wiki/w/api.php'

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function pickImageFile(images, pageTitle) {
  if (!images?.length) return null

  const normalizedTitle = pageTitle.toLowerCase().replace(/[^a-z0-9]/g, '')
  const scored = images
    .filter((name) => /\.(png|jpe?g|webp|gif)$/i.test(name))
    .filter((name) => !/icon|logo|stub|banner|nav/i.test(name))
    .map((name) => {
      const base = name.replace(/^File:/i, '').replace(/\.[^.]+$/, '')
      const normalized = base.toLowerCase().replace(/[^a-z0-9]/g, '')
      let score = 0
      if (normalized === normalizedTitle) score += 100
      if (normalized.includes(normalizedTitle) || normalizedTitle.includes(normalized)) score += 40
      if (/\.png$/i.test(name)) score += 10
      if (/g1r|prerelease|trailer|makingof/i.test(name)) score -= 30
      if (/\.webp$/i.test(name)) score -= 2
      return { name, score }
    })
    .sort((a, b) => b.score - a.score)

  return scored[0]?.name ?? images.find((n) => /\.(png|jpe?g|webp)$/i.test(n)) ?? null
}

async function wikiFetch(params) {
  const url = `${API}?${new URLSearchParams({ format: 'json', ...params })}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Wiki API ${res.status}: ${url}`)
  return res.json()
}

async function getPageImages(pageTitle) {
  const data = await wikiFetch({ action: 'parse', page: pageTitle, prop: 'images' })
  if (data.error) return []
  return data.parse?.images ?? []
}

async function getImageUrl(fileName) {
  const title = fileName.startsWith('File:') ? fileName : `File:${fileName}`
  const data = await wikiFetch({
    action: 'query',
    titles: title,
    prop: 'imageinfo',
    iiprop: 'url|mime',
  })
  const page = Object.values(data.query?.pages ?? {})[0]
  return page?.imageinfo?.[0] ?? null
}

async function downloadFile(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await fs.mkdir(path.dirname(dest), { recursive: true })
  await fs.writeFile(dest, buf)
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  const manifest = {}

  for (const cat of wikiCategories) {
    const content = contentMap[cat.slug]
    if (!content?.sections) continue

    for (const section of content.sections) {
      for (const entry of section.entries) {
        const wikiTitle = entry.wiki || entry.name
        const entrySlug = slugify(entry.name)
        const key = `${cat.slug}/${entrySlug}`

        try {
          const images = await getPageImages(wikiTitle)
          const picked = pickImageFile(images, wikiTitle)
          if (!picked) {
            console.log(`  skip (no image): ${key} <- ${wikiTitle}`)
            await sleep(120)
            continue
          }

          const info = await getImageUrl(picked)
          if (!info?.url) {
            console.log(`  skip (no url): ${key}`)
            await sleep(120)
            continue
          }

          const ext = path.extname(new URL(info.url).pathname) || '.png'
          const relPath = `/wiki/images/${cat.slug}/${entrySlug}${ext}`
          const absPath = path.join(outDir, cat.slug, `${entrySlug}${ext}`)

          await downloadFile(info.url, absPath)
          manifest[key] = relPath
          console.log(`  ok: ${key} <- ${picked}`)
        } catch (err) {
          console.warn(`  fail: ${key} — ${err.message}`)
        }

        await sleep(150)
      }
    }
  }

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`\nSaved ${Object.keys(manifest).length} images → ${manifestPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
