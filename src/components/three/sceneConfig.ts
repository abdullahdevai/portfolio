import * as THREE from 'three'

export const ACCENT = '#7b61ff'

/** Frame-rate independent exponential smoothing. */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  THREE.MathUtils.damp(current, target, lambda, dt)

export interface SceneQuality {
  orbDetail: number
  particleCount: number
  ringSegments: number
  dpr: [number, number]
}

export const QUALITY: Record<'high' | 'low', SceneQuality> = {
  high: { orbDetail: 24, particleCount: 320, ringSegments: 160, dpr: [1, 1.5] },
  low: { orbDetail: 12, particleCount: 110, ringSegments: 96, dpr: [1, 1.25] },
}

/** Small deterministic PRNG (mulberry32) so particle layouts are stable and render-pure. */
export function createRandom(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
