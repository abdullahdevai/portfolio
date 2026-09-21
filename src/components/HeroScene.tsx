import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, Lightformer, PerspectiveCamera } from '@react-three/drei'
import type { MousePosition } from '../hooks/useMousePosition'
import { useInViewport } from '../hooks/useInViewport'
import { QUALITY } from './three/sceneConfig'
import Orb from './three/Orb'
import Rings from './three/Rings'
import Particles from './three/Particles'
import Rig from './three/Rig'

interface HeroSceneProps {
  mouse: React.RefObject<MousePosition>
  quality: 'high' | 'low'
  animate: boolean
  /** Starts the intro scale-up once the loader is gone. */
  active: boolean
}

export default function HeroScene({ mouse, quality, animate, active }: HeroSceneProps) {
  const wrapper = useRef<HTMLDivElement>(null)
  const visible = useInViewport(wrapper, '100px')
  const q = QUALITY[quality]
  // Read by the orb every frame; no re-render needed when it flips.
  const scaleTarget = useRef(0.8)
  useEffect(() => {
    scaleTarget.current = active ? 1 : 0.8
  }, [active])

  return (
    <div ref={wrapper} className="h-full w-full">
      <Canvas
        dpr={q.dpr}
        frameloop={visible ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
        camera={{ fov: 38, position: [0, 0, 7] }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault fov={38} position={[0, 0, 7]} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[-4, 3, 2]} intensity={1.6} color="#ffffff" />
        <directionalLight position={[3, -3, -4]} intensity={0.8} color="#6c5cff" />
        <Rig mouse={mouse} />

        <Suspense fallback={null}>
          <Environment resolution={128} frames={1}>
            <Lightformer form="ring" intensity={3} color="#ffffff" position={[0, 3, -4]} scale={4} />
            <Lightformer form="rect" intensity={1.5} color="#7b61ff" position={[-5, -1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[6, 3, 1]} />
            <Lightformer form="rect" intensity={1} color="#5fa8ff" position={[5, 1, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[5, 2, 1]} />
            <Lightformer form="circle" intensity={0.8} color="#ffffff" position={[0, -4, 3]} scale={3} />
          </Environment>

          <Float speed={animate ? 1.4 : 0} rotationIntensity={animate ? 0.35 : 0} floatIntensity={animate ? 0.9 : 0} floatingRange={[-0.15, 0.15]}>
            <Orb mouse={mouse} detail={q.orbDetail} animate={animate} scaleTarget={scaleTarget} />
            <Rings mouse={mouse} animate={animate} segments={q.ringSegments} />
          </Float>
          <Particles mouse={mouse} count={q.particleCount} animate={animate} />
        </Suspense>
      </Canvas>
    </div>
  )
}
