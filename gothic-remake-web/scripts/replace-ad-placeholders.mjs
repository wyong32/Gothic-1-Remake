import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const viewsDir = path.join(__dirname, '../src/views')

const pageIds = {
  'HomeView.vue': 'home',
  'BeginnerView.vue': 'beginner',
  'FactionsBuildsView.vue': 'factions',
  'QuestsStoryView.vue': 'quests',
  'InteractiveMapView.vue': 'map',
  'GuidesView.vue': 'guides',
  'GuideDetailView.vue': 'guide-detail',
  'WikiView.vue': 'wiki',
  'wiki/WikiCategoryView.vue': 'wiki-cat',
}

const cycle = ['inter', 1, 2, 3]
const placeholderRe =
  /[\t ]*<!-- 广告占位符 -->[\s\S]*?<aside class="container" style="display: flex; justify-content: center; align-items: center;">[\s\S]*?广告占位符[\s\S]*?<\/aside>/g

function processFile(relPath, pageId) {
  const fullPath = path.join(viewsDir, relPath)
  let content = fs.readFileSync(fullPath, 'utf8')
  let slot = 0
  const newContent = content.replace(placeholderRe, () => {
    slot += 1
    const unit = cycle[(slot - 1) % cycle.length]
    const unitAttr = unit === 'inter' ? 'unit="inter"' : `:unit="${unit}"`
    return `<GptAdSlot page-id="${pageId}" slot-id="${slot}" ${unitAttr} />`
  })
  if (slot === 0) {
    console.log('No placeholders:', relPath)
    return
  }
  fs.writeFileSync(fullPath, newContent, 'utf8')
  console.log(`Updated ${relPath} — ${slot} ads`)
}

for (const [file, pageId] of Object.entries(pageIds)) {
  processFile(file, pageId)
}
