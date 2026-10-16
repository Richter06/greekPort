import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import modelUrl from '../assets/glb/Meshy_AI_Golden_Gaze_of_Marble_1016163151_texture.glb'
import './BustScene.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)
function BustModel(){
  const floatRef=useRef(null), rotationRef=useRef(null)
  const {scene}=useGLTF(modelUrl)
  const model=useMemo(()=>scene.clone(true),[scene])
  useFrame(({clock})=>{if(floatRef.current)floatRef.current.position.y=Math.sin(clock.elapsedTime*.55)*.018})
  useGSAP(()=>{if(!rotationRef.current||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return
    gsap.fromTo(rotationRef.current.rotation,{y:-.16,x:.025},{y:.68,x:-.025,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom bottom',scrub:1}})
  },{dependencies:[model],revertOnUpdate:true})
  return <group ref={floatRef}><group ref={rotationRef} scale={1.08}><primitive object={model}/></group></group>
}
function Lighting(){return <><ambientLight intensity={1.5}/><directionalLight position={[-3,4,5]} intensity={3.1} color="#fff3d8"/><directionalLight position={[4,1,-3]} intensity={1.5} color="#b8b99a"/><pointLight position={[0,-1.5,3]} intensity={.5} color="#e3c58e"/></>}
export default function BustScene(){return <div className="bust-scene" aria-label="Busto de mármore em 3D"><div className="bust-scene__halo" aria-hidden="true"/><Canvas camera={{position:[0,.04,3.8],fov:35}} dpr={[1,1.35]} gl={{alpha:true,antialias:true,powerPreference:'high-performance'}} fallback={<p className="bust-scene__fallback">A escultura 3D não está disponível neste navegador.</p>}><Lighting/><Suspense fallback={null}><BustModel/></Suspense></Canvas></div>}
useGLTF.preload(modelUrl)