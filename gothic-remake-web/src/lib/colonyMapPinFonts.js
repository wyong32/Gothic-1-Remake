/**
 * Map pin rendering — teardrop + bold SVG icon silhouettes.
 */
import { DEFAULT_ICON, getIconPaths, ICON_PATHS, ICON_VIEW } from './colonyMapPinIcons.js'

export const PIN_VIEW_W = 47
export const PIN_VIEW_H = 56
/** Wand map coordinates anchor at the pin bulb center (viewBox space). */
export const PIN_ANCHOR_X = 24
export const PIN_ANCHOR_Y = 24
/** @deprecated Use PIN_ANCHOR_Y — kept for reference (tip Y in viewBox). */
export const PIN_TIP_Y = 41.98
/** Wand places icons in a 16×16 slot at translate(16,16) → center (24, 24). */
const PIN_BULB_CX = PIN_ANCHOR_X
const PIN_BULB_CY = PIN_ANCHOR_Y

const ICON_DRAW_PX = 21

const PIN_BODY = new Path2D(
  'M36 20.5C36 30.0422 30.8938 38.2395 23.5756 41.9775C16.1663 38.2386 11 30.04 11 20.5C11 13.5964 16.5964 8 23.5 8C30.4036 8 36 13.5964 36 20.5Z',
)

export const PIN_DISPLAY_SIZE = 42

const iconBBoxCache = new Map()

const PIN_RENDER_VERSION = 4

export function pinCacheKey(subcategoryId, color, iconName) {
  return `${PIN_RENDER_VERSION}|${subcategoryId}|${color}|${iconName || DEFAULT_ICON}`
}

export function loadWandPinFonts() {
  return Promise.resolve()
}

function measurePathsBBox(paths) {
  const canvas = document.createElement('canvas')
  canvas.width = ICON_VIEW
  canvas.height = ICON_VIEW
  const ctx = canvas.getContext('2d', { willReadFrequently: true })

  ctx.fillStyle = '#fff'
  for (const d of paths) {
    ctx.fill(new Path2D(d))
  }

  const { data } = ctx.getImageData(0, 0, ICON_VIEW, ICON_VIEW)
  let minX = ICON_VIEW
  let minY = ICON_VIEW
  let maxX = -1
  let maxY = -1

  for (let y = 0; y < ICON_VIEW; y += 1) {
    for (let x = 0; x < ICON_VIEW; x += 1) {
      if (data[(y * ICON_VIEW + x) * 4 + 3] > 0) {
        minX = Math.min(minX, x)
        maxX = Math.max(maxX, x)
        minY = Math.min(minY, y)
        maxY = Math.max(maxY, y)
      }
    }
  }

  if (maxX < 0) {
    return { cx: ICON_VIEW / 2, cy: ICON_VIEW / 2 }
  }

  return {
    cx: (minX + maxX + 1) / 2,
    cy: (minY + maxY + 1) / 2,
  }
}

function getIconBBox(iconName) {
  const key = iconName || DEFAULT_ICON
  if (!iconBBoxCache.has(key)) {
    iconBBoxCache.set(key, measurePathsBBox(getIconPaths(key)))
  }
  return iconBBoxCache.get(key)
}

for (const iconName of Object.keys(ICON_PATHS)) {
  getIconBBox(iconName)
}

function drawIcon(ctx, iconName, fill) {
  const paths = getIconPaths(iconName)
  const { cx, cy } = getIconBBox(iconName)
  const scale = ICON_DRAW_PX / ICON_VIEW

  ctx.save()
  ctx.translate(PIN_BULB_CX, PIN_BULB_CY)
  ctx.scale(scale, scale)
  ctx.translate(-cx, -cy)

  ctx.fillStyle = fill
  for (const d of paths) {
    ctx.fill(new Path2D(d))
  }

  ctx.restore()
}

export function renderPinToCanvas(color, iconName) {
  const dpr = 2
  const canvas = document.createElement('canvas')
  canvas.width = PIN_VIEW_W * dpr
  canvas.height = PIN_VIEW_H * dpr

  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)

  const pinFill = color || '#6aaea6'

  ctx.fillStyle = pinFill
  ctx.fill(PIN_BODY)
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 1.25
  ctx.stroke(PIN_BODY)

  drawIcon(ctx, iconName, '#ffffff')

  return canvas
}

export async function renderPinAsImage(color, iconName) {
  const canvas = renderPinToCanvas(color, iconName)
  const dataUrl = canvas.toDataURL('image/png')

  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = dataUrl
  })
}
