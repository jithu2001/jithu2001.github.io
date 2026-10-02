import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type RefObject } from 'react'
import * as THREE from 'three'
import type { Tier } from '../hooks/useDeviceTier'

export type LoopNode = { id: string; label: string; color: string }

type SceneProps = {
  nodes: LoopNode[]
  tier: Exclude<Tier, 'none'>
  reducedMotion: boolean
  active: number | null
  onHover: (i: number | null) => void
  onSelect: (i: number) => void
  labelRefs: RefObject<(HTMLElement | null)[]>
  running: boolean
}

// Seeded RNG so the layout is identical on every load.
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

const RADIUS_X = 2.7
const RADIUS_Z = 1.55

function nodePosition(i: number, n: number) {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2
  return new THREE.Vector3(Math.cos(a) * RADIUS_X, Math.sin(a * 2) * 0.28, Math.sin(a) * RADIUS_Z)
}

function System({ nodes, tier, reducedMotion, active, onHover, onSelect, labelRefs }: Omit<SceneProps, 'running'>) {
  const group = useRef<THREE.Group>(null)
  const { camera, size, pointer, invalidate } = useThree()
  const lite = tier === 'lite'

  const positions = useMemo(() => nodes.map((_, i) => nodePosition(i, nodes.length)), [nodes])

  const curve = useMemo(() => new THREE.CatmullRomCurve3(positions, true, 'centripetal', 0.5), [positions])
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 200, 0.012, 8, true), [curve])

  // Satellites: small components clustered around each stage, wired back to it.
  const satellites = useMemo(() => {
    const r = rng(7)
    const per = lite ? 5 : 9
    const out: { base: THREE.Vector3; parent: number; phase: number; color: THREE.Color }[] = []
    positions.forEach((p, parent) => {
      for (let k = 0; k < per; k++) {
        const dir = new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize()
        const dist = 0.45 + r() * 0.6
        out.push({ base: p.clone().addScaledVector(dir, dist), parent, phase: r() * Math.PI * 2, color: new THREE.Color(nodes[parent].color) })
      }
    })
    return out
  }, [positions, lite, nodes])

  const satMesh = useRef<THREE.InstancedMesh>(null)
  const linkGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(satellites.length * 6), 3))
    return g
  }, [satellites])

  const dust = useMemo(() => {
    const r = rng(42)
    const count = lite ? 90 : 240
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (r() - 0.5) * 14
      arr[i * 3 + 1] = (r() - 0.5) * 8
      arr[i * 3 + 2] = (r() - 0.5) * 8 - 1
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    return g
  }, [lite])

  const pulseCount = lite ? 4 : 7
  const pulses = useRef<(THREE.Mesh | null)[]>([])
  const nodeMeshes = useRef<(THREE.Group | null)[]>([])
  const tmp = useMemo(() => new THREE.Object3D(), [])
  const v = useMemo(() => new THREE.Vector3(), [])
  const scrollRef = useRef(0)

  useEffect(() => {
    const onScroll = () => (scrollRef.current = Math.min(window.scrollY / window.innerHeight, 1.5))
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    satellites.forEach((s, i) => {
      satMesh.current?.setColorAt(i, s.color)
    })
    if (satMesh.current?.instanceColor) satMesh.current.instanceColor.needsUpdate = true
  }, [satellites])

  // In reduced-motion mode the canvas renders on demand, so redraw on hover changes.
  useEffect(() => invalidate(), [active, invalidate])

  useFrame((state, delta) => {
    const t = reducedMotion ? 0 : state.clock.elapsedTime
    const g = group.current
    if (!g) return

    // Pointer parallax + slow drift + scroll-driven turn.
    const s = scrollRef.current
    const targetY = (reducedMotion ? 0 : pointer.x * 0.35) + t * 0.05 + s * 0.9
    const targetX = 0.42 + (reducedMotion ? 0 : -pointer.y * 0.16) + s * 0.25
    const k = reducedMotion ? 1 : 1 - Math.pow(0.0015, Math.min(delta, 0.05))
    g.rotation.y += (targetY - g.rotation.y) * k
    g.rotation.x += (targetX - g.rotation.x) * k
    g.position.y = -s * 1.2

    // Satellites breathe; links follow them.
    const pos = linkGeo.attributes.position as THREE.BufferAttribute
    satellites.forEach((sat, i) => {
      const wobble = Math.sin(t * 0.8 + sat.phase) * 0.06
      tmp.position.set(sat.base.x + wobble, sat.base.y + Math.cos(t * 0.6 + sat.phase) * 0.06, sat.base.z)
      const hl = active === sat.parent ? 1.35 : 1
      tmp.scale.setScalar(hl)
      tmp.updateMatrix()
      satMesh.current?.setMatrixAt(i, tmp.matrix)
      const p = positions[sat.parent]
      pos.setXYZ(i * 2, p.x, p.y, p.z)
      pos.setXYZ(i * 2 + 1, tmp.position.x, tmp.position.y, tmp.position.z)
    })
    pos.needsUpdate = true
    if (satMesh.current) satMesh.current.instanceMatrix.needsUpdate = true

    // Data pulses travelling the loop.
    pulses.current.forEach((m, i) => {
      if (!m) return
      const u = (t * 0.06 + i / pulseCount) % 1
      curve.getPointAt(u, m.position)
    })

    // Stage nodes: hover scale.
    nodeMeshes.current.forEach((m, i) => {
      if (!m) return
      const target = active === i ? 1.45 : 1
      m.scale.setScalar(m.scale.x + (target - m.scale.x) * k)
      m.rotation.z = t * 0.4 + i
    })

    // Project stage positions to screen for the DOM labels.
    const labels = labelRefs.current
    if (labels) {
      positions.forEach((p, i) => {
        const el = labels[i]
        if (!el) return
        v.copy(p).applyMatrix4(g.matrixWorld)
        const depth = v.z
        v.project(camera)
        const x = (v.x * 0.5 + 0.5) * size.width
        const y = (-v.y * 0.5 + 0.5) * size.height
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${(y - 34).toFixed(1)}px, 0) translate(-50%, -100%)`
        el.style.opacity = String(THREE.MathUtils.clamp(0.8 + depth * 0.15, 0.72, 1))
        el.style.zIndex = String(Math.round(depth * 10) + 20)
      })
    }
  })

  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight args={['#ffffff', '#d9d3ff', 0.7]} />
      <directionalLight position={[-4, 6, 5]} intensity={1.4} />
      <directionalLight position={[5, -2, 3]} intensity={0.4} color="#bcd0ff" />

      <points geometry={dust}>
        <pointsMaterial size={lite ? 0.03 : 0.025} color="#93a3c8" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
      </points>

      <group ref={group}>
        <mesh geometry={tube}>
          <meshStandardMaterial color="#9fb2e6" transparent opacity={0.55} roughness={0.6} />
        </mesh>

        <lineSegments geometry={linkGeo}>
          <lineBasicMaterial color="#8d9bc2" transparent opacity={0.28} depthWrite={false} />
        </lineSegments>

        <instancedMesh ref={satMesh} args={[undefined, undefined, satellites.length]}>
          <sphereGeometry args={[0.045, lite ? 8 : 12, lite ? 8 : 12]} />
          <meshStandardMaterial roughness={0.4} metalness={0.05} />
        </instancedMesh>

        {Array.from({ length: pulseCount }).map((_, i) => (
          <mesh key={i} ref={(m) => { pulses.current[i] = m }}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#ffffff" emissive="#7fa0ff" emissiveIntensity={1.4} />
          </mesh>
        ))}

        {positions.map((p, i) => (
          <group
            key={nodes[i].id}
            position={p}
            ref={(m) => { nodeMeshes.current[i] = m }}
            onPointerOver={(e) => { e.stopPropagation(); onHover(i); document.body.style.cursor = 'pointer' }}
            onPointerOut={() => { onHover(null); document.body.style.cursor = '' }}
            onClick={(e) => { e.stopPropagation(); onSelect(i) }}
          >
            <mesh>
              <sphereGeometry args={[0.2, lite ? 20 : 32, lite ? 20 : 32]} />
              <meshStandardMaterial color={nodes[i].color} roughness={0.25} metalness={0.1} emissive={nodes[i].color} emissiveIntensity={0.18} />
            </mesh>
            <mesh rotation={[Math.PI / 2.4, 0, 0]}>
              <torusGeometry args={[0.36, 0.008, 8, 64]} />
              <meshBasicMaterial color={nodes[i].color} transparent opacity={0.5} />
            </mesh>
            {/* Larger invisible hit area for easier hovering */}
            <mesh visible={false}>
              <sphereGeometry args={[0.5, 8, 8]} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  )
}

export default function HeroScene(props: SceneProps) {
  const { tier, reducedMotion, running } = props
  return (
    <Canvas
      dpr={tier === 'full' ? [1, 1.75] : [1, 1.25]}
      gl={{ antialias: tier === 'full', alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.4, 9.4], fov: 40 }}
      frameloop={reducedMotion ? 'demand' : running ? 'always' : 'never'}
      aria-hidden
      style={{ touchAction: 'pan-y' }}
    >
      <System {...props} />
    </Canvas>
  )
}
