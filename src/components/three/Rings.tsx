import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { MousePosition } from '../../hooks/useMousePosition'
import { ACCENT, damp } from './sceneConfig'

interface RingsProps {
  mouse: React.RefObject<MousePosition>
  animate: boolean
  segments: number
}

const RING_DEFS = [
  { radius: 1.55, tube: 0.008, rotation: [Math.PI / 2.3, 0.25, 0] as const, speed: 0.22, opacity: 0.9 },
  { radius: 1.85, tube: 0.006, rotation: [Math.PI / 1.7, -0.55, 0.3] as const, speed: -0.14, opacity: 0.5 },
  { radius: 2.25, tube: 0.004, rotation: [Math.PI / 2.9, 0.9, -0.2] as const, speed: 0.08, opacity: 0.3 },
]

/** Thin orbital rings with different tilts and speeds. */
export default function Rings({ mouse, animate, segments }: RingsProps) {
  const group = useRef<THREE.Group>(null)
  const rings = useRef<(THREE.Mesh | null)[]>([])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    const g = group.current
    if (!g) return
    const { nx, ny } = mouse.current
    g.rotation.y = damp(g.rotation.y, nx * 0.25, 2.5, dt)
    g.rotation.x = damp(g.rotation.x, -ny * 0.2, 2.5, dt)
    if (!animate) return
    rings.current.forEach((ring, i) => {
      if (ring) ring.rotation.z += dt * RING_DEFS[i].speed
    })
  })

  return (
    <group ref={group}>
      {RING_DEFS.map((def, i) => (
        <mesh
          key={def.radius}
          ref={(el) => {
            rings.current[i] = el
          }}
          rotation={[def.rotation[0], def.rotation[1], def.rotation[2]]}
        >
          <torusGeometry args={[def.radius, def.tube, 8, segments]} />
          <meshStandardMaterial
            color={i === 0 ? ACCENT : '#ffffff'}
            emissive={i === 0 ? ACCENT : '#8f85ff'}
            emissiveIntensity={i === 0 ? 1.4 : 0.5}
            transparent
            opacity={def.opacity}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}
