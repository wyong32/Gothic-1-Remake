import { GPT_AD_LOAD_DELAY_MS, GPT_UNITS } from '@/config/gpt'

const UNIT_PATH = {
  1: GPT_UNITS.banner1,
  2: GPT_UNITS.banner2,
  3: GPT_UNITS.banner3,
  inter: GPT_UNITS.inter,
}

const UNIT_SIZES = {
  1: [[728, 90], [320, 480]],
  2: [728, 90],
  3: [[320, 480], [728, 90]],
  inter: [[300, 50], 'fluid'],
}

function getSlotMap() {
  if (!window.__gptSlotMap) window.__gptSlotMap = {}
  return window.__gptSlotMap
}

function afterAdDelay(callback) {
  window.setTimeout(callback, GPT_AD_LOAD_DELAY_MS)
}

export function mountGptAd(elementId, unit) {
  const path = UNIT_PATH[unit] ?? UNIT_PATH[Number(unit)]
  const sizes = UNIT_SIZES[unit] ?? UNIT_SIZES[Number(unit)]
  if (!path || !elementId || !sizes) return

  afterAdDelay(() => {
    window.googletag = window.googletag || { cmd: [] }
    googletag.cmd.push(() => {
      const slotMap = getSlotMap()
      let slot = slotMap[elementId]

      if (!slot) {
        slot = googletag.defineSlot(path, sizes, elementId)?.addService(googletag.pubads())
        if (!slot) return
        slotMap[elementId] = slot
      }

      if (!document.getElementById(elementId)) return

      googletag.display(elementId)
      googletag.pubads().refresh([slot])
    })
  })
}

export function mountGptPageAds(entries) {
  for (const [elementId, unit] of entries) mountGptAd(elementId, unit)
}
