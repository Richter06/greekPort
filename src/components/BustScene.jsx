import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'
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

  // Normalize the asset to a known size so unusual GLB units cannot overflow the viewport.
  const fitted = useMemo(() => {
    const object = scene.clone(true)
    const bounds = new Box3().setFromObject(object)
    const center = bounds.getCenter(new Vector3())
    const size = bounds.getSize(new Vector3())
    const largestDimension = Math.max(size.x, size.y, size.z, 0.001)
    const scale = 2.45 / largestDimension

    return {
      object,
      scale,
      position: [-center.x * scale, -center.y * scale, -center.z * scale],
    }
  }, [scene])

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
        y: 0.42,
        x: -0.025,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      },
    )
  }, { dependencies: [fitted], revertOnUpdate: true })

  return (
    <group ref={floatRef}>
      <group ref={rotationRef}>
        <group scale={fitted.scale} position={fitted.position}>
          <primitive object={fitted.object} />
        </group>
      </group>
    </group>
  )
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.7} color="#fff8e9" />
      <directionalLight position={[-4, 5, 4]} intensity={2.3} color="#fff0c9" />
      <directionalLight position={[4, 1.5, 2]} intensity={0.65} color="#ffffff" />
      <spotLight
        position={[2.8, 4.5, -3]}
        intensity={2.5}
        angle={0.62}
        penumbra={0.78}
        distance={10}
        decay={2}
        color="#d7ad58"
      />
      <pointLight position={[-2.8, 0.2, -1.8]} intensity={0.55} color="#c69a45" distance={7} decay={2} />
      <pointLight position={[0, -1.5, 3]} intensity={0.22} color="#f8dfaa" distance={5} decay={2} />
    </>
  )
}

export default function BustScene() {
  return (
    <div className="bust-scene" aria-label="Busto de mármore em 3D">
      <div className="bust-scene__halo" aria-hidden="true" />
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 35, near: 0.1, far: 100 }}
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
