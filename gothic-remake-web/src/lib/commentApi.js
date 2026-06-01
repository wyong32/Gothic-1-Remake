import { commentConfig } from '@/config/comments.js'

function publicBase() {
  const origin = commentConfig.apiOrigin.replace(/\/+$/, '')
  return `${origin}/api/v1/p/${commentConfig.projectSlug}`
}

async function parseResponse(res) {
  if (res.status === 204) return null
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function errorMessage(res, payload) {
  const apiMsg = payload?.error?.message
  if (apiMsg) return apiMsg
  if (res.status === 401) return 'Comment service authentication failed.'
  if (res.status === 403) return 'This origin is not allowed to post comments.'
  if (res.status === 429) return 'Too many comments from your network. Please wait and try again.'
  if (res.status >= 500) return 'Comment service is temporarily unavailable.'
  return `Request failed (${res.status}).`
}

async function request(path, options = {}) {
  const headers = {
    'X-API-Key': commentConfig.apiKey,
    ...options.headers,
  }
  const res = await fetch(`${publicBase()}${path}`, { ...options, headers })
  const payload = await parseResponse(res)
  if (!res.ok) {
    throw new Error(errorMessage(res, payload))
  }
  return payload
}

export function listReviews(sectionSlug, { page = 1, pageSize = 10, sort = 'createdAt_desc' } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    sort,
  })
  return request(`/sections/${encodeURIComponent(sectionSlug)}/reviews?${params}`)
}

export function createReview(sectionSlug, body) {
  return request(`/sections/${encodeURIComponent(sectionSlug)}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}
