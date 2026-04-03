import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Torus, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

function RotatingSphere() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.x = clock.elapsedTime * 0.2
    ref.current.rotation.y = clock.elapsedTime * 0.3
  })

  return (
    <Sphere ref={ref} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#7c3aed"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0}
        metalness={0.8}
        emissive="#a855f7"
        emissiveIntensity={0.3}
      />
    </Sphere>
  )
}

function OrbitingTorus({ radius = 2, speed = 0.4, color = '#06b6d4', size = 0.08 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.y = Math.sin(t * 0.7) * radius * 0.4
    ref.current.position.z = Math.sin(t) * radius * 0.6
    ref.current.rotation.x = t * 0.5
    ref.current.rotation.z = t * 0.3
  })

  return (
    <Torus ref={ref} args={[0.3, size, 16, 48]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} roughness={0.1} />
    </Torus>
  )
}

function ParticleField() {
  const count = 300
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#06b6d4" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function FloatingGeometry() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#7c3aed" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#06b6d4" />

      <RotatingSphere />
      <OrbitingTorus radius={2.2} speed={0.5} color="#06b6d4" />
      <OrbitingTorus radius={1.8} speed={-0.3} color="#a855f7" size={0.05} />
      <ParticleField />
    </Canvas>
  )
}
