const TILE_SIZE = 256
const MERCATOR_LAT_LIMIT = 85.051129

export function clampLat(lat) {
  return Math.min(MERCATOR_LAT_LIMIT, Math.max(-MERCATOR_LAT_LIMIT, lat))
}

export function latToMercatorRatio(lat) {
  const clamped = clampLat(lat)
  return (180 - (180 / Math.PI) * Math.log(Math.tan(Math.PI / 4 + (clamped * Math.PI) / 360))) / 360
}

function mercatorRatioToLat(ratio) {
  const t = Math.exp(((180 - ratio * 360) * Math.PI) / 180)
  return (Math.atan(t) - Math.PI / 4) * (360 / Math.PI)
}

export function project(lng, lat, zoom) {
  const scale = TILE_SIZE * 2 ** zoom
  return {
    x: ((lng + 180) / 360) * scale,
    y: latToMercatorRatio(lat) * scale,
  }
}

export function unproject(worldX, worldY, zoom) {
  const scale = TILE_SIZE * 2 ** zoom
  return {
    lng: (worldX / scale) * 360 - 180,
    lat: mercatorRatioToLat(worldY / scale),
  }
}

/** Keep the geographic point under (screenX, screenY) fixed while changing zoom. */
export function zoomAtPoint({
  centerLng,
  centerLat,
  oldZoom,
  newZoom,
  screenX,
  screenY,
  viewportWidth,
  viewportHeight,
}) {
  const centerOld = project(centerLng, centerLat, oldZoom)
  const worldX = centerOld.x + (screenX - viewportWidth / 2)
  const worldY = centerOld.y + (screenY - viewportHeight / 2)
  const anchor = unproject(worldX, worldY, oldZoom)

  const anchorNew = project(anchor.lng, anchor.lat, newZoom)
  const centerNewX = anchorNew.x - (screenX - viewportWidth / 2)
  const centerNewY = anchorNew.y - (screenY - viewportHeight / 2)
  const centerNew = unproject(centerNewX, centerNewY, newZoom)

  return {
    centerLng: centerNew.lng,
    centerLat: centerNew.lat,
    zoom: newZoom,
  }
}

export function tileUrl(basePath, z, tileX, tileY, tmsEnabled = false) {
  return tmsEnabled
    ? `${basePath}/${z}/${tileX}/${tileY}.webp`
    : `${basePath}/${z}/${tileY}/${tileX}.webp`
}

/** Wand colony maps use a 2^z × 2^z tile grid at each zoom. */
export function tilesPerAxis(z) {
  return 2 ** z
}

export function getVisibleTiles({
  zoom,
  centerLng,
  centerLat,
  viewportWidth,
  viewportHeight,
  basePath,
  tmsEnabled,
  minTileZoom = 1,
  maxTileZoom = 6,
  dragOffsetX = 0,
  dragOffsetY = 0,
}) {
  const z = Math.min(maxTileZoom, Math.max(minTileZoom, Math.floor(zoom)))
  const zoomScale = 2 ** (zoom - z)
  const tileSize = TILE_SIZE * zoomScale
  const axisTiles = tilesPerAxis(z)
  const maxIndex = axisTiles - 1
  const center = project(centerLng, centerLat, zoom)
  const halfW = viewportWidth / 2
  const halfH = viewportHeight / 2

  const minWorldX = center.x - halfW - dragOffsetX
  const maxWorldX = center.x + halfW - dragOffsetX
  const minWorldY = center.y - halfH - dragOffsetY
  const maxWorldY = center.y + halfH - dragOffsetY

  const pad = 1
  const minTileX = Math.max(0, Math.floor(minWorldX / tileSize) - pad)
  const maxTileX = Math.min(maxIndex, Math.floor(maxWorldX / tileSize) + pad)
  const minTileY = Math.max(0, Math.floor(minWorldY / tileSize) - pad)
  const maxTileY = Math.min(maxIndex, Math.floor(maxWorldY / tileSize) + pad)

  const tiles = []
  for (let tileY = minTileY; tileY <= maxTileY; tileY += 1) {
    for (let tileX = minTileX; tileX <= maxTileX; tileX += 1) {
      const worldX = tileX * tileSize
      const worldY = tileY * tileSize
      tiles.push({
        key: `${z}-${tileX}-${tileY}`,
        z,
        tileX,
        tileY,
        url: tileUrl(basePath, z, tileX, tileY, tmsEnabled),
        left: worldX - center.x + halfW + dragOffsetX,
        top: worldY - center.y + halfH + dragOffsetY,
        size: tileSize,
      })
    }
  }
  return tiles
}

export function projectPin(
  lng,
  lat,
  zoom,
  centerLng,
  centerLat,
  viewportWidth,
  viewportHeight,
  dragOffsetX = 0,
  dragOffsetY = 0,
) {
  const point = project(lng, lat, zoom)
  const center = project(centerLng, centerLat, zoom)
  return {
    left: point.x - center.x + viewportWidth / 2 + dragOffsetX,
    top: point.y - center.y + viewportHeight / 2 + dragOffsetY,
  }
}

export function lngLatFromPixelDelta(dx, dy, zoom, centerLng, centerLat) {
  const center = project(centerLng, centerLat, zoom)
  const moved = unproject(center.x - dx, center.y - dy, zoom)
  return {
    lng: moved.lng - centerLng,
    lat: moved.lat - centerLat,
  }
}

/** Wand initializes with center [0, 0] and metadata.initialZoom. */
export function getDefaultMapView(metadata) {
  return {
    centerLng: 0,
    centerLat: 0,
    zoom: metadata.initialZoom ?? metadata.minZoom ?? 2,
  }
}

export { TILE_SIZE }
