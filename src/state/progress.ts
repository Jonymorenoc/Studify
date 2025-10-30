export type ProgressKey = string

export type ExerciseResult = {
  score: number // 0..1
  stars: number // 0..3
  attempts: number
  completedAt: number
}

const KEY_PREFIX = 'studify.progress.'

export function saveProgress(key: ProgressKey, result: ExerciseResult) {
  const all = getAll()
  all[key] = result
  localStorage.setItem(KEY_PREFIX + 'all', JSON.stringify(all))
}

export function getProgress(key: ProgressKey): ExerciseResult | undefined {
  return getAll()[key]
}

export function getAll(): Record<string, ExerciseResult> {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + 'all')
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function percentCompleted(prefix: string) {
  const all = getAll()
  const keys = Object.keys(all).filter(k => k.startsWith(prefix))
  if (keys.length === 0) return 0
  const done = keys.filter(k => (all[k]?.score ?? 0) >= 1).length
  return Math.round((done / keys.length) * 100)
}

