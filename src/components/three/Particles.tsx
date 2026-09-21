import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { MousePosition } from '../../hooks/useMousePosition'
import { createRandom, damp } from './sceneConfig'

interface ParticlesProps {
  mouse: React.RefObject<MousePosition>
  count: number
  animate: boolean
}

/** Sparse point cloud on a spherical shell around the orb. */
export default function Particles({ mouse, count, animate }: ParticlesProps) {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const random = createRandom(1337)
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.4 + random() * 2.2
      const theta = random() * Math.PI * 2
      const phi = Math.acos(2 * random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    const p = points.current
    if (!p) return
    const dt = Math.min(delta, 0.05)
    const { nx, ny } = mouse.current
    if (animate) p.rotation.y += dt * 0.03
    p.rotation.x = damp(p.rotation.x, -ny * 0.15, 1.5, dt)
    p.rotation.z = damp(p.rotation.z, nx * 0.1, 1.5, dt)
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#c9c3ff"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
