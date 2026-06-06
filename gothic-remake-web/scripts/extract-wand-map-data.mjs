/**
 * Extract map metadata + pins from Wand RSC payload.
 * Run: node scripts/extract-wand-map-data.mjs
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const payloadPath = path.join(__dirname, 'wand-rsc-payload.txt')
const outPath = path.join(root, 'public', 'data', 'colonyMap.json')

async function fetchPayload() {
  const res = await fetch('https://wand.com/maps/gothic-1-remake/the-colony', {
    headers: { RSC: '1', Accept: '*/*', 'User-Agent': 'Mozilla/5.0' },
  })
  if (!res.ok) throw new Error(`RSC fetch failed: ${res.status}`)
  return res.text()
}

function extractProvidedMapData(text) {
  const marker = '"providedMapData":'
  const start = text.indexOf(marker)
  if (start < 0) throw new Error('providedMapData not found')

  let i = start + marker.length
  while (i < text.length && /\s/.test(text[i])) i++
  if (text[i] !== '{') throw new Error('Expected object after providedMapData')

  let depth = 0
  let inString = false
  let escaped = false
  const begin = i

  for (; i < text.length; i++) {
    const ch = text[i]
    if (inString) {
      if (escaped) escaped = false
      else if (ch === '\\') escaped = true
      else if (ch === '"') inString = false
      continue
    }
    if (ch === '"') {
      inString = true
      continue
    }
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) return text.slice(begin, i + 1)
    }
  }
  throw new Error('Unterminated providedMapData object')
}

function buildOutput(raw) {
  const { mapInfo, mapData } = raw
  const meta = mapData?.metadata || {}

  const categories = (meta.categories || []).map((cat) => ({
    id: cat.externalId,
    title: cat.title,
    color: cat.color,
    visibleByDefault: cat.visibleByDefault ?? false,
    description: cat.description || '',
  }))

  const subcategories = (meta.subcategories || []).map((sub) => ({
    id: sub.externalId,
    categoryId: sub.categoryExternalId,
    title: sub.title,
    icon: sub.icon || null,
    description: sub.description || '',
  }))

  const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]))
  const subcategoryById = Object.fromEntries(subcategories.map((s) => [s.id, s]))

  const labels = (mapData?.labels?.features || []).map((feature) => {
    const p = feature.properties || {}
    const [lng, lat] = feature.geometry?.coordinates || [null, null]

    return {
      id: p.externalId,
      title: p.title,
      lng,
      lat,
      color: p.color || '#FFFFFF',
      fontSize: p.fontSize ?? 16,
      minZoom: p.minZoom ?? 1,
      maxZoom: p.maxZoom ?? 20,
      iconId: p.iconId || null,
      iconPath: p.iconPath || null,
    }
  })

  const pins = (mapData?.geojson?.features || []).map((feature) => {
    const p = feature.properties || {}
    const sub = subcategoryById[p.subcategoryExternalId]
    const cat = sub ? categoryById[sub.categoryId] : null
    const [lng, lat] = feature.geometry?.coordinates || [null, null]

    return {
      id: p.externalId,
      title: p.title,
      description: p.description || '',
      subcategoryId: p.subcategoryExternalId || null,
      categoryId: sub?.categoryId || null,
      categoryTitle: cat?.title || null,
      subcategoryTitle: sub?.title || null,
      categoryColor: cat?.color || '#6aaea6',
      icon: sub?.icon || null,
      lng,
      lat,
      gameX: p.gameCoords?.x ?? null,
      gameY: p.gameCoords?.y ?? null,
      gameZ: p.gameCoords?.z ?? null,
      imageId: p.imageId || null,
    }
  })

  return {
    source: 'wand.com/maps/gothic-1-remake/the-colony',
    attribution: 'Map tiles, pins, and coordinates sourced from Wand (wemod.com) community atlas.',
    fetchedAt: new Date().toISOString(),
    mapInfo: mapInfo?.[0] || null,
    metadata: {
      name: meta.name,
      slug: meta.slug,
      baseTilePath: meta.baseTilePath,
      backgroundColor: meta.backgroundColor,
      minZoom: meta.minZoom,
      maxZoom: meta.maxZoom,
      initialZoom: meta.initialZoom,
      tmsEnabled: meta.tmsEnabled,
      tileSize: 256,
      hasGameCoordinates: mapInfo?.[0]?.hasGameCoordinates ?? false,
      mapMinZoom: (meta.minZoom ?? 1) - 1,
      mapMaxZoom: (meta.maxZoom ?? 6) - 1,
    },
    categories,
    subcategories,
    labels,
    labelCount: labels.length,
    pins,
    pinCount: pins.length,
  }
}

async function main() {
  let text
  try {
    text = await fs.readFile(payloadPath, 'utf8')
    console.log('Using cached RSC payload')
  } catch {
    console.log('Fetching fresh RSC payload…')
    text = await fetchPayload()
    await fs.writeFile(payloadPath, text, 'utf8')
  }

  const jsonText = extractProvidedMapData(text)
  const raw = JSON.parse(jsonText)
  const output = buildOutput(raw)

  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, JSON.stringify(output, null, 2), 'utf8')

  console.log(
    `Saved ${output.pinCount} pins, ${output.labelCount} labels, ${output.categories.length} categories, ${output.subcategories.length} subcategories → ${outPath}`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
