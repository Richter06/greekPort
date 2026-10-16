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

const sectionSelectors = [
  '#hero',
  '#manifesto',
  '#projects',
  '#about',
  '#contact',
  '.footer',
]

function BustModel() {
  const floatRef = useRef(null)
  const rotationRef = useRef(null)
  const { scene } = useGLTF(modelUrl)
  const prefersReducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

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
    if (floatRef.current && !prefersReducedMotion) {
      floatRef.current.position.y =
        Math.sin(clock.elapsedTime * 0.55) * 0.018
    }
  })

  useGSAP(() => {
    const experience = document.querySelector('#portfolio-experience')

    if (
      !experience ||
      !floatRef.current ||
      !rotationRef.current ||
      prefersReducedMotion
    ) {
      return
    }

    const sections = sectionSelectors
      .map((selector) => experience.querySelector(selector))
      .filter(Boolean)

    if (sections.length !== sectionSelectors.length) return

    const sectionHeights = sections.map((section) =>
      Math.max(section.offsetHeight, 1),
    )
    const totalSectionHeight = sectionHeights.reduce(
      (total, height) => total + height,
      0,
    )
    const scrollDistance = Math.max(
      experience.scrollHeight - window.innerHeight,
      1,
    )
    const timelineDuration = scrollDistance / window.innerHeight
    const durations = sectionHeights.map(
      (height) => (height / totalSectionHeight) * timelineDuration,
    )
    const starts = durations.map((_, index) =>
      durations.slice(0, index).reduce((total, duration) => total + duration, 0),
    )

    gsap.set(rotationRef.current.rotation, { x: 0.025, y: -0.16 })
    gsap.set(floatRef.current.position, { x: 0 })
    gsap.set(floatRef.current.scale, { x: 1, y: 1, z: 1 })

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: experience,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    })

    const poses = [
      { rotation: { x: 0.01, y: 0.08 }, x: 0.02, scale: 1 },
      { rotation: { x: -0.025, y: 0.5 }, x: 0.2, scale: 0.94 },
      { rotation: { x: 0.045, y: 0.12 }, x: -0.28, scale: 0.84 },
      { rotation: { x: -0.02, y: -0.45 }, x: 0.28, scale: 0.92 },
      { rotation: { x: 0.03, y: 0.1 }, x: -0.22, scale: 0.82 },
      { rotation: { x: -0.01, y: 0.42 }, x: 0.1, scale: 0.7 },
    ]

    poses.forEach((pose, index) => {
      timeline.to(
        rotationRef.current.rotation,
        {
          ...pose.rotation,
          duration: durations[index],
        },
        starts[index],
      )
      timeline.to(
        floatRef.current.position,
        {
          x: pose.x,
          duration: durations[index],
        },
        starts[index],
      )
      timeline.to(
        floatRef.current.scale,
        {
          x: pose.scale,
          y: pose.scale,
          z: pose.scale,
          duration: durations[index],
        },
        starts[index],
      )
    })

    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }, { dependencies: [fitted, prefersReducedMotion], revertOnUpdate: true })

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
      <ambientLight intensity={0.48} color="#fff5df" />

      <directionalLight
        position={[-4, 5, 5]}
        intensity={2.1}
        color="#fff0d0"
      />

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

      <pointLight
        position={[-3, 0.3, -1.5]}
        intensity={5}
        color="#d99a2b"
        distance={7}
        decay={2}
      />

      <pointLight
        position={[0, 0.5, 3.5]}
        intensity={0.7}
        color="#fff3d8"
        distance={7}
        decay={2}
      />

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
