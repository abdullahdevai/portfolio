import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import type { MousePosition } from '../../hooks/useMousePosition'
import { damp, earthTextures } from './sceneConfig'

const AXIAL_TILT = THREE.MathUtils.degToRad(23.4)
const ATMOSPHERE = '#6f8dff'
const CITY_LIGHTS = '#ffc78a'

interface EarthProps {
  mouse: React.RefObject<MousePosition>
  segments: number
  textureSize: 1024 | 2048
  animate: boolean
  scaleTarget: React.RefObject<number>
}

/**
 * Photoreal-leaning Earth: NASA day map lit by a single "sun" so a terminator
 * is visible, city lights glowing on the night side, and a two-layer
 * atmosphere (front fresnel rim + back-face halo).
 */
export default function Earth({ mouse, segments, textureSize, animate, scaleTarget }: EarthProps) {
  const group = useRef<THREE.Group>(null)
  const planet = useRef<THREE.Mesh>(null)

  const urls = earthTextures(textureSize)
  const [dayMap, lightsMap] = useTexture([urls.day, urls.lights], (loaded) => {
    for (const t of loaded) {
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = 4
    }
  })

  const rimMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(ATMOSPHERE) }, uIntensity: { value: 0.55 } },
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
            float fresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 3.0);
            gl_FragColor = vec4(uColor, fresnel * uIntensity);
          }`,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  )

  // Back-face halo: brightest at the planet's limb, fading outward. The planet
  // itself occludes the centre, leaving a soft ring of atmosphere.
  const haloMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(ATMOSPHERE) } },
        vertexShader: /* glsl */ `
          varying float vIntensity;
          void main() {
            vec3 n = normalize(normalMatrix * normal);
            vIntensity = pow(clamp(0.55 - dot(n, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 3.5);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          varying float vIntensity;
          void main() {
            gl_FragColor = vec4(uColor, vIntensity * 0.65);
          }`,
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      }),
    [],
  )

  useEffect(
    () => () => {
      rimMaterial.dispose()
      haloMaterial.dispose()
    },
    [rimMaterial, haloMaterial],
  )

  useFrame((_, delta) => {
    const g = group.current
    const p = planet.current
    if (!g || !p) return
    const dt = Math.min(delta, 0.05)
    const { nx, ny } = mouse.current

    // Slow spin on the tilted axis + lean toward the cursor.
    if (animate) p.rotation.y += dt * 0.08
    g.rotation.y = damp(g.rotation.y, nx * 0.35, 3, dt)
    g.rotation.x = damp(g.rotation.x, -ny * 0.25, 3, dt)

    // Intro scale (0.8 → 1) driven by the parent.
    const s = damp(g.scale.x, scaleTarget.current, 2.2, dt)
    g.scale.setScalar(s)
  })

  return (
    <group ref={group} scale={0.8}>
      <group rotation={[0, 0, -AXIAL_TILT]}>
        <mesh ref={planet} rotation={[0, Math.PI * 1.15, 0]}>
          <sphereGeometry args={[1, segments, segments]} />
          <meshStandardMaterial
            map={dayMap}
            emissiveMap={lightsMap}
            emissive={CITY_LIGHTS}
            emissiveIntensity={1.5}
            roughness={0.85}
            metalness={0}
            envMapIntensity={0.25}
          />
        </mesh>
        {/* Atmosphere rim */}
        <mesh material={rimMaterial} scale={1.008}>
          <sphereGeometry args={[1, 48, 48]} />
        </mesh>
        {/* Outer halo */}
        <mesh material={haloMaterial} scale={1.14}>
          <sphereGeometry args={[1, 48, 48]} />
        </mesh>
      </group>
    </group>
  )
}
