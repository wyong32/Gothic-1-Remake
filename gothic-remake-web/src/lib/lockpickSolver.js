export const SLOT_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
export const SLOT_COUNT_OPTIONS = [3, 4, 5, 6, 7, 8]
export const POSITION_MIN = 0
export const POSITION_MAX = 6
export const TARGET_POSITION = 3
export const MAX_SOLVER_ITERATIONS = 500_000

export function slotIndex(letter) {
  return SLOT_LETTERS.indexOf(letter)
}

export function parseStartPositions(text) {
  if (!text.trim()) return []
  return text.split(',').map((part) => Number(part.trim()))
}

export function parseRules(rulesText, slotCount) {
  const matrix = Array.from({ length: slotCount }, () => Array(slotCount).fill(0))
  const normalized = rulesText.replace(/\s+/g, '').toUpperCase()
  if (!normalized) return matrix

  const activeLetters = SLOT_LETTERS.slice(0, slotCount)
  const groups = normalized.split(';').filter(Boolean)

  for (const group of groups) {
    const parts = group.split(':')
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      throw new Error(`Bad rule "${group}". Use A:B+,C- format.`)
    }

    const sourceIndex = slotIndex(parts[0])
    if (sourceIndex < 0 || sourceIndex >= slotCount) {
      throw new Error(`Slot "${parts[0]}" is outside the active ${slotCount}-slot lock.`)
    }

    for (const link of parts[1].split(',').filter(Boolean)) {
      const match = link.match(/^([A-H])([+-])$/)
      if (!match) {
        throw new Error(`Bad link "${link}". Links must look like B+ or C-.`)
      }

      const targetIndex = slotIndex(match[1])
      if (targetIndex < 0 || targetIndex >= slotCount) {
        throw new Error(`Slot "${match[1]}" is outside the active ${slotCount}-slot lock.`)
      }

      if (!activeLetters.includes(parts[0]) || !activeLetters.includes(match[1])) {
        throw new Error(`Slot "${match[1]}" is outside the active ${slotCount}-slot lock.`)
      }

      matrix[sourceIndex][targetIndex] = match[2] === '+' ? 1 : -1
    }
  }

  return matrix
}

export function validateRules(rulesText, slotCount) {
  try {
    parseRules(rulesText, slotCount)
    return ''
  } catch (error) {
    return error instanceof Error ? error.message : 'Rules could not be parsed.'
  }
}

function applyTurn(state, slotIndexValue, direction, linkMatrix, slotCount) {
  const next = [...state]
  next[slotIndexValue] += direction

  for (let index = 0; index < slotCount; index += 1) {
    const link = linkMatrix[slotIndexValue][index]
    if (link !== 0) {
      next[index] += direction * link
    }
  }

  return next.every((value) => value >= POSITION_MIN && value <= POSITION_MAX) ? next : null
}

function isTargetState(state, target) {
  return state.length === target.length && state.every((value, index) => value === target[index])
}

function stateKey(state) {
  return state.join(',')
}

export function solveLockpick(startPositions, linkMatrix, slotCount) {
  const target = Array(slotCount).fill(TARGET_POSITION)
  if (isTargetState(startPositions, target)) {
    return []
  }

  const queue = [{ state: startPositions, path: [] }]
  const visited = new Set([stateKey(startPositions)])
  let head = 0
  let iterations = 0

  while (head < queue.length && iterations < MAX_SOLVER_ITERATIONS) {
    const current = queue[head]
    head += 1
    iterations += 1

    for (let slot = 0; slot < slotCount; slot += 1) {
      for (const direction of [1, -1]) {
        const nextState = applyTurn(current.state, slot, direction, linkMatrix, slotCount)
        if (!nextState) continue

        const key = stateKey(nextState)
        if (visited.has(key)) continue

        const nextPath = [...current.path, { slotIndex: slot, dir: direction }]
        if (isTargetState(nextState, target)) {
          return nextPath
        }

        visited.add(key)
        queue.push({ state: nextState, path: nextPath })
      }
    }
  }

  return null
}
