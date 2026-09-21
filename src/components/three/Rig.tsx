import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { MousePosition } from '../../hooks/useMousePosition'
import { damp } from './sceneConfig'

interface RigProps {
  mouse: React.RefObject<MousePosition>
}

const LIGHT_BASE = new THREE.Vector3(2.5, 2, 3)
const BASE_DISTANCE = 7

/** Pull the camera back on narrow (portrait) viewports so the orb never fills the frame. */
const distanceForAspect = (aspect: number) => (aspect >= 1 ? BASE_DISTANCE : BASE_DISTANCE / Math.max(aspect, 0.45) * 0.72)

/** Subtle camera drift and a cursor-following accent light. */
export default function Rig({ mouse }: RigProps) {
  const light = useRef<THREE.PointLight>(null)

  useFrame(({ camera, size }, delta) => {
    const dt = Math.min(delta, 0.05)
    const { nx, ny } = mouse.current
    camera.position.x = damp(camera.position.x, nx * 0.35, 2, dt)
    camera.position.y = damp(camera.position.y, ny * 0.25, 2, dt)
    camera.position.z = damp(camera.position.z, distanceForAspect(size.width / size.height), 4, dt)
    camera.lookAt(0, 0, 0)
    const l = light.current
    if (l) {
      l.position.x = damp(l.position.x, LIGHT_BASE.x + nx * 3, 3, dt)
      l.position.y = damp(l.position.y, LIGHT_BASE.y + ny * 2.5, 3, dt)
    }
  })

  return <pointLight ref={light} position={LIGHT_BASE} intensity={5} color="#9d8cff" distance={12} decay={2} />
}
