import {
  getDefaultMapView,
  getVisibleTiles,
  lngLatFromPixelDelta,
  projectPin,
  zoomAtPoint,
  TILE_SIZE,
} from './colonyMapProjection.js'
import {
  loadWandPinFonts,
  pinCacheKey,
  PIN_DISPLAY_SIZE,
  PIN_TIP_Y,
  PIN_VIEW_H,
  PIN_VIEW_W,
  renderPinAsImage,
} from './colonyMapPinFonts.js'

const PIN_RADIUS = 7
const HIT_RADIUS = 22

function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = url
  })
}

export class ColonyMapRenderer {
  constructor(canvas, mapData) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d', { alpha: false })
    this.mapData = mapData
    this.metadata = mapData.metadata

    const defaultView = getDefaultMapView(mapData.metadata)
    this.centerLng = defaultView.centerLng
    this.centerLat = defaultView.centerLat
    this.zoom = defaultView.zoom

    this.width = 0
    this.height = 0
    this.dpr = 1
    this.activePins = []
    this.selectedPinId = null

    this.bufferCanvas = document.createElement('canvas')
    this.bufferCtx = this.bufferCanvas.getContext('2d', { alpha: false })

    this.tileCache = new Map()
    this.failedTiles = new Set()
    this.iconCache = new Map()
    this.subcategoryMeta = this.buildSubcategoryMeta(mapData)
    this.mapLabels = mapData.labels || []
    this.rafId = 0
    this.pendingTileRender = false
    this.isDragging = false
  }

  buildSubcategoryMeta(mapData) {
    const categoryById = Object.fromEntries(mapData.categories.map((c) => [c.id, c]))
    const meta = new Map()
    for (const sub of mapData.subcategories) {
      const category = categoryById[sub.categoryId]
      meta.set(sub.id, {
        icon: sub.icon || 'box',
        color: category?.color || '#6aaea6',
      })
    }
    return meta
  }

  setSize(width, height) {
    if (width === this.width && height === this.height) return
    this.width = width
    this.height = height
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pixelW = Math.floor(width * this.dpr)
    const pixelH = Math.floor(height * this.dpr)

    this.canvas.width = pixelW
    this.canvas.height = pixelH
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)

    this.bufferCanvas.width = pixelW
    this.bufferCanvas.height = pixelH
    this.bufferCtx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)

    this.scheduleRender()
  }

  setView(centerLng, centerLat, zoom) {
    this.centerLng = centerLng
    this.centerLat = centerLat
    this.zoom = zoom
    this.scheduleRender()
  }

  setActivePins(pins) {
    this.activePins = pins
    this.scheduleRender()
  }

  setSelectedPinId(id) {
    this.selectedPinId = id
    this.scheduleRender()
  }

  beginDrag() {
    this.isDragging = true
  }

  commitDrag(dx, dy) {
    if (dx !== 0 || dy !== 0) {
      const delta = lngLatFromPixelDelta(dx, dy, this.zoom, this.centerLng, this.centerLat)
      this.centerLng += delta.lng
      this.centerLat += delta.lat
    }
    this.isDragging = false
    this.scheduleRender()
    this.preloadVisibleTiles()
  }

  zoomBy(delta, anchorX, anchorY) {
    const factor = 2 ** delta
    const x = anchorX ?? this.width / 2
    const y = anchorY ?? this.height / 2
    this.zoomAt(x, y, Math.log2(factor))
  }

  zoomAt(screenX, screenY, logDelta) {
    const { mapMinZoom, mapMaxZoom } = this.metadata
    const oldZoom = this.zoom
    const newZoom = Math.min(mapMaxZoom, Math.max(mapMinZoom, oldZoom + logDelta))
    if (Math.abs(newZoom - oldZoom) < 1e-6) return

    const next = zoomAtPoint({
      centerLng: this.centerLng,
      centerLat: this.centerLat,
      oldZoom,
      newZoom,
      screenX,
      screenY,
      viewportWidth: this.width,
      viewportHeight: this.height,
    })

    this.zoom = next.zoom
    this.centerLng = next.centerLng
    this.centerLat = next.centerLat
    this.scheduleRender()
    this.preloadVisibleTiles()
  }

  resetView() {
    const view = getDefaultMapView(this.metadata)
    this.setView(view.centerLng, view.centerLat, view.zoom)
    this.selectedPinId = null
  }

  flyTo(lng, lat, zoom = this.zoom) {
    const { mapMinZoom, mapMaxZoom } = this.metadata
    this.setView(lng, lat, Math.min(mapMaxZoom, Math.max(mapMinZoom, zoom)))
    this.preloadVisibleTiles()
  }

  scheduleRender() {
    if (this.rafId) return
    this.rafId = requestAnimationFrame(() => {
      this.rafId = 0
      this.render()
    })
  }

  scheduleTileRender() {
    if (this.pendingTileRender || this.isDragging) return
    this.pendingTileRender = true
    requestAnimationFrame(() => {
      this.pendingTileRender = false
      if (!this.isDragging) this.scheduleRender()
    })
  }

  async preloadPinIcons() {
    await loadWandPinFonts()
    const entries = [...this.subcategoryMeta.entries()]
    await Promise.all(
      entries.map(async ([subcategoryId, meta]) => {
        const key = pinCacheKey(subcategoryId, meta.color, meta.icon)
        if (this.iconCache.has(key)) return
        const img = await renderPinAsImage(meta.color, meta.icon)
        this.iconCache.set(key, img)
      }),
    )
    this.scheduleRender()
  }

  getPinIcon(subcategoryId, fallbackColor) {
    const meta = this.subcategoryMeta.get(subcategoryId)
    if (!meta) return null
    const key = pinCacheKey(subcategoryId, meta.color, meta.icon)
    const icon = this.iconCache.get(key)
    if (icon instanceof HTMLImageElement && icon.complete && icon.naturalWidth > 0) return icon

    if (!this.iconCache.has(key)) {
      const pending = loadWandPinFonts().then(async () => {
        const img = await renderPinAsImage(meta.color || fallbackColor, meta.icon)
        this.iconCache.set(key, img)
        this.scheduleTileRender()
        return img
      })
      this.iconCache.set(key, pending)
    }
    return null
  }

  getTileImage(url, key) {
    if (this.failedTiles.has(key)) return null
    if (this.tileCache.has(key)) return this.tileCache.get(key)

    const pending = loadImage(url).then((img) => {
      if (!img) {
        this.failedTiles.add(key)
        return null
      }
      this.tileCache.set(key, img)
      this.scheduleTileRender()
      return img
    })
    this.tileCache.set(key, pending)
    return null
  }

  getCurrentTiles() {
    return getVisibleTiles({
      zoom: this.zoom,
      centerLng: this.centerLng,
      centerLat: this.centerLat,
      viewportWidth: this.width,
      viewportHeight: this.height,
      basePath: this.metadata.baseTilePath,
      tmsEnabled: this.metadata.tmsEnabled,
      minTileZoom: this.metadata.minZoom,
      maxTileZoom: this.metadata.maxZoom,
    })
  }

  async preloadVisibleTiles() {
    const tiles = this.getCurrentTiles()
    await Promise.all(
      tiles.map(async (tile) => {
        if (this.tileCache.has(tile.key) || this.failedTiles.has(tile.key)) return
        const img = await loadImage(tile.url)
        if (!img) {
          this.failedTiles.add(tile.key)
          return
        }
        this.tileCache.set(tile.key, img)
      }),
    )
    this.scheduleRender()
  }

  isLabelVisible(label) {
    const minZoom = label.minZoom ?? 1
    const maxZoom = label.maxZoom ?? 20
    return this.zoom >= minZoom && this.zoom <= maxZoom
  }

  drawMapLabels(ctx) {
    if (!this.mapLabels.length) return

    for (const label of this.mapLabels) {
      if (!this.isLabelVisible(label) || label.lng == null || label.lat == null) continue

      const pos = projectPin(
        label.lng,
        label.lat,
        this.zoom,
        this.centerLng,
        this.centerLat,
        this.width,
        this.height,
      )

      if (pos.left < -120 || pos.left > this.width + 120 || pos.top < -40 || pos.top > this.height + 40) {
        continue
      }

      const fontSize = label.fontSize ?? 16
      const title = label.title || ''
      const color = label.color || '#FFFFFF'

      ctx.save()
      ctx.font = `600 ${fontSize}px "Segoe UI", system-ui, -apple-system, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.globalAlpha = 0.6
      ctx.lineJoin = 'round'
      ctx.miterLimit = 2
      ctx.lineWidth = Math.max(2, fontSize * 0.12)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.85)'
      ctx.fillStyle = color
      ctx.strokeText(title, pos.left, pos.top)
      ctx.fillText(title, pos.left, pos.top)
      ctx.restore()
    }
  }

  render() {
    if (!this.width || !this.height) return

    const ctx = this.bufferCtx
    ctx.fillStyle = this.metadata.backgroundColor || '#031727'
    ctx.fillRect(0, 0, this.width, this.height)

    const tiles = getVisibleTiles({
      zoom: this.zoom,
      centerLng: this.centerLng,
      centerLat: this.centerLat,
      viewportWidth: this.width,
      viewportHeight: this.height,
      basePath: this.metadata.baseTilePath,
      tmsEnabled: this.metadata.tmsEnabled,
      minTileZoom: this.metadata.minZoom,
      maxTileZoom: this.metadata.maxZoom,
    })

    for (const tile of tiles) {
      const cached = this.tileCache.get(tile.key)
      const size = tile.size ?? TILE_SIZE
      if (cached && cached instanceof HTMLImageElement) {
        ctx.drawImage(cached, tile.left, tile.top, size, size)
      } else if (!(cached instanceof Promise)) {
        this.getTileImage(tile.url, tile.key)
      }
    }

    this.drawMapLabels(ctx)

    const pinPositions = []
    for (const pin of this.activePins) {
      const pos = projectPin(
        pin.lng,
        pin.lat,
        this.zoom,
        this.centerLng,
        this.centerLat,
        this.width,
        this.height,
      )
      if (pos.left < -32 || pos.left > this.width + 32 || pos.top < -32 || pos.top > this.height + 32) {
        continue
      }
      pinPositions.push({ pin, left: pos.left, top: pos.top })
    }

    const pinW = PIN_DISPLAY_SIZE
    const pinH = PIN_DISPLAY_SIZE * (PIN_VIEW_H / PIN_VIEW_W)
    const pinTipOffset = pinH * (PIN_TIP_Y / PIN_VIEW_H)

    for (const item of pinPositions) {
      const icon = item.pin.subcategoryId
        ? this.getPinIcon(item.pin.subcategoryId, item.pin.categoryColor)
        : null
      if (icon) {
        ctx.drawImage(icon, item.left - pinW / 2, item.top - pinTipOffset, pinW, pinH)
      } else {
        ctx.beginPath()
        ctx.arc(item.left, item.top, PIN_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = item.pin.categoryColor || '#6aaea6'
        ctx.fill()
        ctx.strokeStyle = '#f8f0e6'
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }

    if (this.selectedPinId) {
      const selected = pinPositions.find((p) => p.pin.id === this.selectedPinId)
      if (selected) {
        ctx.beginPath()
        ctx.arc(selected.left, selected.top, HIT_RADIUS, 0, Math.PI * 2)
        ctx.strokeStyle = '#c4a056'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }

    this.ctx.drawImage(this.bufferCanvas, 0, 0)
  }

  hitTest(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    let best = null
    let bestDist = HIT_RADIUS

    for (const pin of this.activePins) {
      const pos = projectPin(
        pin.lng,
        pin.lat,
        this.zoom,
        this.centerLng,
        this.centerLat,
        this.width,
        this.height,
      )
      const dist = Math.hypot(pos.left - x, pos.top - y)
      if (dist <= bestDist) {
        best = pin
        bestDist = dist
      }
    }
    return best
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId)
    this.tileCache.clear()
    this.iconCache.clear()
  }
}
