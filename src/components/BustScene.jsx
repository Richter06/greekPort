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
      position: [
        -center.x * scale,
        -center.y * scale,
        -center.z * scale,
      ],
    }
  }, [scene])

  useFrame(({ clock }) => {
    if (floatRef.current) {
      floatRef.current.position.y =
        Math.sin(clock.elapsedTime * 0.55) * 0.018
    }
  })

  useGSAP(() => {
    if (
      !rotationRef.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

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
      {/* Iluminação ambiente quente */}
      <ambientLight intensity={0.48} color="#fff5df" />

      {/* Luz principal frontal */}
      <directionalLight
        position={[-4, 5, 5]}
        intensity={2.1}
        color="#fff0d0"
      />

      {/* Recorte dourado dramático por trás */}
      <spotLight
        position={[3.5, 4.5, -2.5]}
        target-position={[0, 0.4, 0]}
        intensity={55}
        angle={0.72}
        penumbra={0.8}
        distance={12}
        decay={2}
        color="#ffc44f"
      />

      {/* Reflexo âmbar lateral */}
      <pointLight
        position={[-3, 0.3, -1.5]}
        intensity={5}
        color="#d99a2b"
        distance={7}
        decay={2}
      />

      {/* Preenchimento frontal suave */}
      <pointLight
        position={[0, 0.5, 3.5]}
        intensity={0.7}
        color="#fff3d8"
        distance={7}
        decay={2}
      />

      {/* Destaque dourado vindo de cima */}
      <spotLight
        position={[-1, 5, 1]}
        target-position={[0, 0.5, 0]}
        intensity={22}
        angle={0.55}
        penumbra={0.85}
        distance={10}
        decay={2}
        color="#ffe0a0"
      />
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
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        fallback={
          <p className="bust-scene__fallback">
            A escultura 3D não está disponível neste navegador.
          </p>
        }
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