<template>
  <div v-if="loadError" class="colony-map colony-map--error" role="alert">
    <p>Could not load colony map data. Run <code>node scripts/extract-wand-map-data.mjs</code> and refresh.</p>
  </div>

  <div v-else-if="!mapData" class="colony-map colony-map--loading" aria-busy="true">
    <p>Loading The Colony atlas…</p>
  </div>

  <div v-else class="colony-map" :style="{ '--map-bg': mapData.metadata.backgroundColor }">
    <aside class="colony-map__sidebar" aria-label="Map filters">
      <header class="colony-map__sidebar-head">
        <div>
          <p class="colony-map__eyebrow">The Colony · {{ mapData.pinCount.toLocaleString() }} pins</p>
          <h3 class="colony-map__title">Interactive Valley Atlas</h3>
        </div>
        <button type="button" class="colony-map__reset" @click="resetFilters">Reset</button>
      </header>

      <label class="colony-map__search">
        <span class="sr-only">Search map pins</span>
        <input
          v-model.trim="searchQuery"
          type="search"
          placeholder="Search NPC, chest, ore vein…"
          autocomplete="off"
        />
      </label>

      <p class="colony-map__visible-count" aria-live="polite">
        Showing <strong>{{ visiblePinCount.toLocaleString() }}</strong> of
        {{ mapData.pinCount.toLocaleString() }} locations
      </p>

      <div class="colony-map__filters">
        <section
          v-for="category in mapData.categories"
          :key="category.id"
          class="colony-map__category"
        >
          <button
            type="button"
            class="colony-map__category-toggle"
            :aria-expanded="expandedCategories.has(category.id)"
            @click="toggleCategoryPanel(category.id)"
          >
            <span class="colony-map__swatch" :style="{ background: category.color }" aria-hidden="true"></span>
            <span class="colony-map__category-label">{{ category.title }}</span>
            <span class="colony-map__category-count">{{ categoryCounts[category.id] || 0 }}</span>
          </button>

          <ul v-show="expandedCategories.has(category.id)" class="colony-map__subcategory-list">
            <li v-for="sub in subcategoriesByCategory[category.id] || []" :key="sub.id">
              <label class="colony-map__filter-item">
                <input
                  type="checkbox"
                  :checked="activeSubcategories.has(sub.id)"
                  @change="toggleSubcategory(sub.id)"
                />
                <span>{{ sub.title }}</span>
                <span class="colony-map__filter-count">{{ subcategoryCounts[sub.id] || 0 }}</span>
              </label>
            </li>
          </ul>
        </section>
      </div>

      <p class="colony-map__attribution">
        Tiles, icons, and coordinates from
        <a href="https://wand.com/maps/gothic-1-remake/the-colony" target="_blank" rel="noopener noreferrer"
          >Wand — The Colony map</a
        >. Fan reference only.
      </p>
    </aside>

    <div class="colony-map__stage" @pointerenter="lockPageScroll" @pointerleave="unlockPageScroll">
      <div class="colony-map__viewport-wrap">
        <div class="colony-map__pan-layer" :style="panLayerStyle">
          <canvas
            ref="canvasRef"
            class="colony-map__canvas"
            role="application"
            aria-label="Gothic 1 Remake colony map"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
            @wheel.passive="onWheel"
          ></canvas>
        </div>
      </div>

      <div class="colony-map__toolbar" aria-label="Map zoom controls">
        <button type="button" title="Zoom in" @click="zoomBy(0.25)">+</button>
        <button type="button" title="Zoom out" @click="zoomBy(-0.25)">−</button>
        <button type="button" title="Reset view" @click="resetView">⌂</button>
      </div>

      <aside v-if="selectedPin" class="colony-map__detail" aria-live="polite">
        <button type="button" class="colony-map__detail-close" aria-label="Close pin details" @click="clearSelection">
          ×
        </button>
        <p v-if="selectedPin.categoryTitle" class="colony-map__detail-type">
          {{ selectedPin.categoryTitle }}
          <span v-if="selectedPin.subcategoryTitle">· {{ selectedPin.subcategoryTitle }}</span>
        </p>
        <h4>{{ selectedPin.title }}</h4>
        <p v-if="selectedPin.description" class="colony-map__detail-desc">{{ selectedPin.description }}</p>
        <dl class="colony-map__coords">
          <div v-if="selectedPin.gameX != null">
            <dt>Game X</dt>
            <dd>{{ formatCoord(selectedPin.gameX) }}</dd>
          </div>
          <div v-if="selectedPin.gameY != null">
            <dt>Game Y</dt>
            <dd>{{ formatCoord(selectedPin.gameY) }}</dd>
          </div>
          <div v-if="selectedPin.gameZ != null">
            <dt>Game Z</dt>
            <dd>{{ formatCoord(selectedPin.gameZ) }}</dd>
          </div>
          <div>
            <dt>Map lng</dt>
            <dd>{{ formatCoord(selectedPin.lng) }}</dd>
          </div>
          <div>
            <dt>Map lat</dt>
            <dd>{{ formatCoord(selectedPin.lat) }}</dd>
          </div>
        </dl>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ColonyMapRenderer } from '@/lib/colonyMapRenderer.js'

const mapData = ref(null)
const loadError = ref(false)
const canvasRef = ref(null)
const searchQuery = ref('')
const selectedPin = ref(null)
const activeSubcategories = ref(new Set())
const expandedCategories = ref(new Set())
const panPreview = ref({ x: 0, y: 0, active: false })

let renderer = null
let scrollLockDepth = 0
let savedBodyOverflow = ''
let resizeObserver = null
let dragState = null
let filterTimer = 0

const subcategoriesByCategory = computed(() => {
  if (!mapData.value) return {}
  const grouped = {}
  for (const sub of mapData.value.subcategories) {
    if (!grouped[sub.categoryId]) grouped[sub.categoryId] = []
    grouped[sub.categoryId].push(sub)
  }
  for (const list of Object.values(grouped)) {
    list.sort((a, b) => a.title.localeCompare(b.title))
  }
  return grouped
})

const subcategoryCounts = computed(() => {
  if (!mapData.value) return {}
  const counts = {}
  for (const pin of mapData.value.pins) {
    if (!pin.subcategoryId) continue
    counts[pin.subcategoryId] = (counts[pin.subcategoryId] || 0) + 1
  }
  return counts
})

const categoryCounts = computed(() => {
  if (!mapData.value) return {}
  const counts = {}
  for (const pin of mapData.value.pins) {
    if (!pin.categoryId) continue
    counts[pin.categoryId] = (counts[pin.categoryId] || 0) + 1
  }
  return counts
})

const filteredPins = computed(() => {
  if (!mapData.value) return []
  const query = searchQuery.value.toLowerCase()
  return mapData.value.pins.filter((pin) => {
    if (!pin.subcategoryId || !activeSubcategories.value.has(pin.subcategoryId)) return false
    if (!query) return true
    const haystack = `${pin.title} ${pin.categoryTitle || ''} ${pin.subcategoryTitle || ''}`.toLowerCase()
    return haystack.includes(query)
  })
})

const visiblePinCount = computed(() => filteredPins.value.length)

const panLayerStyle = computed(() => {
  if (!panPreview.value.active) return null
  return {
    transform: `translate3d(${panPreview.value.x}px, ${panPreview.value.y}px, 0)`,
    willChange: 'transform',
  }
})

function defaultActiveSubcategories() {
  const active = new Set()
  if (!mapData.value) return active
  const defaultCategories = new Set(
    mapData.value.categories.filter((c) => c.visibleByDefault).map((c) => c.id),
  )
  for (const sub of mapData.value.subcategories) {
    if (defaultCategories.has(sub.categoryId)) active.add(sub.id)
  }
  return active
}

function syncPinsToRenderer() {
  if (!renderer) return
  renderer.setActivePins(filteredPins.value)
}

function measureAndRender() {
  const canvas = canvasRef.value
  if (!canvas || !renderer) return
  const wrap = canvas.closest('.colony-map__viewport-wrap')
  if (!wrap) return
  const { width, height } = wrap.getBoundingClientRect()
  if (width > 0 && height > 0) {
    renderer.setSize(width, height)
  }
}

function applyLocationFromUrl() {
  const pinId = new URLSearchParams(window.location.search).get('location')
  if (!pinId || !renderer || !mapData.value) return
  const pin = mapData.value.pins.find((p) => p.id === pinId)
  if (!pin || pin.lng == null || pin.lat == null) return
  renderer.flyTo(pin.lng, pin.lat, 4)
  selectedPin.value = pin
  renderer.setSelectedPinId(pin.id)
}

function initRenderer() {
  if (!canvasRef.value || !mapData.value || renderer) return
  renderer = new ColonyMapRenderer(canvasRef.value, mapData.value)
  renderer.resetView()
  syncPinsToRenderer()

  renderer.preloadPinIcons()

  requestAnimationFrame(() => {
    measureAndRender()
    requestAnimationFrame(() => {
      measureAndRender()
      renderer.preloadVisibleTiles()
      applyLocationFromUrl()
    })
  })
}

function lockPageScroll() {
  if (scrollLockDepth === 0) {
    savedBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  scrollLockDepth += 1
}

function unlockPageScroll() {
  if (scrollLockDepth === 0) return
  scrollLockDepth -= 1
  if (scrollLockDepth === 0) {
    document.body.style.overflow = savedBodyOverflow
  }
}

function onWheel(event) {
  if (!renderer || !canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const logDelta = Math.max(-0.35, Math.min(0.35, -event.deltaY * 0.0015))
  renderer.zoomAt(x, y, logDelta)
}

function zoomBy(delta) {
  const canvas = canvasRef.value
  if (!renderer || !canvas) return
  const { width, height } = canvas.getBoundingClientRect()
  renderer.zoomBy(delta, width / 2, height / 2)
}

function resetView() {
  renderer?.resetView()
  clearSelection()
}

function onPointerDown(event) {
  if (!renderer || event.button !== 0) return
  dragState = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    moved: false,
  }
  renderer.beginDrag()
  canvasRef.value?.setPointerCapture(event.pointerId)
}

function onPointerMove(event) {
  if (!renderer || !dragState || dragState.pointerId !== event.pointerId) return
  const dx = event.clientX - dragState.startX
  const dy = event.clientY - dragState.startY
  if (Math.abs(dx) > 2 || Math.abs(dy) > 2) dragState.moved = true
  renderer.dragBy(dx - (dragState.lastDx || 0), dy - (dragState.lastDy || 0))
  dragState.lastDx = dx
  dragState.lastDy = dy
}

function onPointerUp(event) {
  if (!renderer || !dragState || dragState.pointerId !== event.pointerId) return

  if (!dragState.moved) {
    const hit = renderer.hitTest(event.clientX, event.clientY)
    selectedPin.value = hit || null
    renderer.setSelectedPinId(hit?.id || null)
  } else {
    renderer.endDrag()
  }

  dragState = null
  canvasRef.value?.releasePointerCapture(event.pointerId)
}

function toggleCategoryPanel(categoryId) {
  const next = new Set(expandedCategories.value)
  if (next.has(categoryId)) next.delete(categoryId)
  else next.add(categoryId)
  expandedCategories.value = next
}

function toggleSubcategory(subcategoryId) {
  const next = new Set(activeSubcategories.value)
  if (next.has(subcategoryId)) next.delete(subcategoryId)
  else next.add(subcategoryId)
  activeSubcategories.value = next
}

function resetFilters() {
  activeSubcategories.value = defaultActiveSubcategories()
  searchQuery.value = ''
  clearSelection()
}

function clearSelection() {
  selectedPin.value = null
  renderer?.setSelectedPinId(null)
}

function formatCoord(value) {
  if (value == null || value === '') return '—'
  const num = Number(value)
  return Number.isFinite(num) ? num.toFixed(num % 1 === 0 ? 0 : 3) : String(value)
}

async function loadMapData() {
  try {
    const res = await fetch('/data/colonyMap.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    mapData.value = await res.json()
    expandedCategories.value = new Set(mapData.value.categories.map((c) => c.id))
    activeSubcategories.value = defaultActiveSubcategories()

    await nextTick()
    initRenderer()

    if (typeof ResizeObserver !== 'undefined' && canvasRef.value?.parentElement) {
      resizeObserver = new ResizeObserver(() => measureAndRender())
      resizeObserver.observe(canvasRef.value.parentElement)
    }
  } catch {
    loadError.value = true
  }
}

watch([filteredPins], () => {
  clearTimeout(filterTimer)
  filterTimer = window.setTimeout(syncPinsToRenderer, 80)
})

watch(canvasRef, () => {
  if (canvasRef.value && mapData.value) initRenderer()
})

onMounted(() => {
  loadMapData()
  window.addEventListener('resize', measureAndRender)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', measureAndRender)
  resizeObserver?.disconnect()
  clearTimeout(filterTimer)
  renderer?.destroy()
  renderer = null
  scrollLockDepth = 0
  document.body.style.overflow = savedBodyOverflow
})
</script>

<style scoped>
.colony-map--loading,
.colony-map--error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 16rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--gradient-panel);
  color: var(--color-muted);
  font-size: 0.9rem;
}

.colony-map {
  display: grid;
  grid-template-columns: minmax(15rem, 18rem) minmax(0, 1fr);
  gap: 0;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  min-height: 34rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  overflow: hidden;
  overscroll-behavior: contain;
  background: var(--map-bg, #031727);
  box-shadow: var(--shadow-panel), var(--shadow-glow-accent);
}

.colony-map__sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: color-mix(in srgb, var(--color-bg-elevated) 92%, var(--map-bg) 8%);
  border-right: 1px solid var(--color-border);
  max-height: 34rem;
  overflow: auto;
}

.colony-map__sidebar-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
}

.colony-map__eyebrow {
  margin: 0 0 0.2rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent-3);
}

.colony-map__title {
  margin: 0;
  font-size: 1rem;
}

.colony-map__reset {
  flex-shrink: 0;
  padding: 0.3rem 0.55rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
}

.colony-map__reset:hover {
  color: var(--color-text);
  border-color: var(--color-accent);
}

.colony-map__search input {
  width: 100%;
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-bg) 80%, transparent);
  color: var(--color-text);
  font-size: 0.84rem;
}

.colony-map__visible-count {
  margin: 0;
  font-size: 0.78rem;
  color: var(--color-muted);
}

.colony-map__filters {
  display: grid;
  gap: 0.45rem;
}

.colony-map__category {
  border: 1px solid color-mix(in srgb, var(--color-border) 80%, transparent);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.colony-map__category-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.55rem 0.65rem;
  border: 0;
  background: color-mix(in srgb, var(--color-bg-elevated) 70%, transparent);
  color: var(--color-text);
  font-size: 0.82rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.colony-map__swatch {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 999px;
  flex-shrink: 0;
}

.colony-map__category-label {
  flex: 1;
}

.colony-map__category-count,
.colony-map__filter-count {
  font-size: 0.68rem;
  color: var(--color-muted);
}

.colony-map__subcategory-list {
  list-style: none;
  margin: 0;
  padding: 0.35rem 0.5rem 0.5rem;
  display: grid;
  gap: 0.2rem;
}

.colony-map__filter-item {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.78rem;
  color: var(--color-muted);
  cursor: pointer;
}

.colony-map__filter-item span:first-of-type {
  flex: 1;
}

.colony-map__attribution {
  margin: auto 0 0;
  font-size: 0.68rem;
  line-height: 1.45;
  color: var(--color-muted);
}

.colony-map__stage {
  position: relative;
  height: 34rem;
  min-height: 34rem;
  overscroll-behavior: contain;
}

.colony-map__viewport-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
  overscroll-behavior: contain;
  background: var(--map-bg, #031727);
}

.colony-map__pan-layer {
  width: 100%;
  height: 100%;
}

.colony-map__canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: grab;
  touch-action: none;
}

.colony-map__canvas:active {
  cursor: grabbing;
}

.colony-map__toolbar {
  position: absolute;
  left: 0.75rem;
  top: 0.75rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.colony-map__toolbar button {
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-bg-elevated) 88%, transparent);
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
}

.colony-map__detail {
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  z-index: 3;
  width: min(18rem, calc(100% - 1.5rem));
  padding: 0.9rem 1rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-bg-elevated) 94%, transparent);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-panel);
}

.colony-map__detail-close {
  position: absolute;
  top: 0.35rem;
  right: 0.45rem;
  border: 0;
  background: transparent;
  color: var(--color-muted);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
}

.colony-map__detail-type {
  margin: 0 0 0.35rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-3);
}

.colony-map__detail h4 {
  margin: 0 0 0.5rem;
  padding-right: 1.25rem;
  font-size: 0.98rem;
}

.colony-map__detail-desc {
  margin: 0 0 0.65rem;
  font-size: 0.82rem;
  color: var(--color-muted);
}

.colony-map__coords {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.35rem 0.75rem;
  margin: 0;
}

.colony-map__coords div {
  display: grid;
  gap: 0.1rem;
}

.colony-map__coords dt {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.colony-map__coords dd {
  margin: 0;
  font-size: 0.78rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 900px) {
  .colony-map {
    grid-template-columns: 1fr;
    min-height: 42rem;
  }

  .colony-map__sidebar {
    max-height: none;
    border-right: 0;
    border-bottom: 1px solid var(--color-border);
  }

  .colony-map__stage {
    min-height: 28rem;
  }
}
</style>
