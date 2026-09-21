import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { MousePosition } from '../../hooks/useMousePosition'
import { simplexNoise3D } from './noise.glsl'
import { ACCENT, damp } from './sceneConfig'

const DISTORT_STRENGTH = 0.07

type OrbShader = { uniforms: { uTime: { value: number } } }

interface OrbProps {
  mouse: React.RefObject<MousePosition>
  detail: number
  animate: boolean
  scaleTarget: React.RefObject<number>
}

/**
 * Metallic orb with clearcoat + iridescence and a low-amplitude simplex
 * displacement injected into the physical material's vertex stage.
 */
export default function Orb({ mouse, detail, animate, scaleTarget }: OrbProps) {
  const group = useRef<THREE.Group>(null)
  const mesh = useRef<THREE.Mesh>(null)
  const material = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#15151c'),
      metalness: 0.9,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      iridescence: 0.55,
      iridescenceIOR: 1.4,
      envMapIntensity: 1.6,
      sheen: 0.3,
      sheenColor: new THREE.Color(ACCENT),
    })
    m.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 }
      shader.uniforms.uStrength = { value: DISTORT_STRENGTH }
      // Keep a handle so the frame loop can advance time without re-rendering.
      m.userData.shader = shader
      shader.vertexShader =
        `uniform float uTime;\nuniform float uStrength;\n${simplexNoise3D}\n` +
        shader.vertexShader.replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          float n = snoise(position * 1.6 + vec3(0.0, uTime * 0.18, uTime * 0.12));
          float n2 = snoise(position * 4.0 - uTime * 0.25) * 0.25;
          transformed += normal * (n + n2) * uStrength;`,
        )
    }
    m.customProgramCacheKey = () => 'orb-distort'
    return m
  }, [])

  useEffect(() => () => material.dispose(), [material])

  const glowMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(ACCENT) }, uIntensity: { value: 0.55 } },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform float uIntensity;
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            float fresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.6);
            gl_FragColor = vec4(uColor, fresnel * uIntensity);
          }`,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
      }),
    [],
  )
  useEffect(() => () => glowMaterial.dispose(), [glowMaterial])

  useFrame((_, delta) => {
    const g = group.current
    const m = mesh.current
    if (!g || !m) return
    const dt = Math.min(delta, 0.05)
    const { nx, ny } = mouse.current

    const shader = (m.material as THREE.MeshPhysicalMaterial).userData.shader as OrbShader | undefined
    if (animate && shader) shader.uniforms.uTime.value += dt

    // Auto rotation + lean toward the cursor.
    if (animate) m.rotation.y += dt * 0.12
    g.rotation.y = damp(g.rotation.y, nx * 0.45, 3, dt)
    g.rotation.x = damp(g.rotation.x, -ny * 0.35, 3, dt)

    // Intro scale (0.8 → 1) driven by the parent.
    const s = damp(g.scale.x, scaleTarget.current, 2.2, dt)
    g.scale.setScalar(s)
  })

  return (
    <group ref={group} scale={0.8}>
      <mesh ref={mesh} material={material}>
        <icosahedronGeometry args={[1, detail]} />
      </mesh>
      {/* Rim glow */}
      <mesh material={glowMaterial} scale={1.015}>
        <sphereGeometry args={[1, 48, 48]} />
      </mesh>
      {/* Soft outer halo */}
      <mesh scale={1.45}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.06} side={THREE.BackSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  )
}
