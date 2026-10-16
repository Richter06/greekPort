import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import modelUrl from '../assets/glb/Meshy_AI_Golden_Gaze_of_Marble_1016163151_texture.glb'
import './BustScene.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function BustModel() {
  const floatRef = useRef(null)
  const rotationRef = useRef(null)
  const { scene } = useGLTF(modelUrl)
  const model = useMemo(() => scene.clone(true), [scene])

  useFrame(({ clock }) => {
    if (floatRef.current) {
      floatRef.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.018
    }
  })

  useGSAP(() => {
    if (!rotationRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      rotationRef.current.rotation,
      { y: -0.16, x: 0.025 },
      {
        y: 0.68,
        x: -0.025,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom bottom', scrub: 1 },
      },
    )
  }, { dependencies: [model], revertOnUpdate: true })

  return (
    <group ref={floatRef}>
      <group ref={rotationRef} scale={1.08}>
        <primitive object={model} />
      </group>
    </group>
  )
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.32} color="#fff8e9" />
      <directionalLight
        position={[-4, 5, 4]}
        intensity={4.2}
        color="#fff0c9"
      />
      <directionalLight
        position={[4, 1.5, 2]}
        intensity={0.85}
        color="#ffffff"
      />
      <spotLight
        position={[2.8, 4.5, -3]}
        target-position={[0, 0.5, 0]}
        intensity={5.5}
        angle={0.62}
        penumbra={0.78}
        distance={10}
        decay={2}
        color="#d7ad58"
      />
      <pointLight position={[-2.8, 0.2, -1.8]} intensity={2.1} color="#c69a45" distance={7} decay={2} />
      <pointLight position={[0, -1.5, 3]} intensity={0.28} color="#f8dfaa" distance={5} decay={2} />
    </>
  )
}

export default function BustScene() {
  return (
    <div className="bust-scene" aria-label="Busto de mármore em 3D">
      <div className="bust-scene__halo" aria-hidden="true" />
      <Canvas
        camera={{ position: [0, 0.04, 3.8], fov: 35 }}
        dpr={[1, 1.35]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        fallback={<p className="bust-scene__fallback">A escultura 3D não está disponível neste navegador.</p>}
      >
        <Lighting />
        <Suspense fallback={null}>
          <BustModel />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload(modelUrl)
