import { useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import BustScene from './BustScene'
import './Hero.css'

gsap.registerPlugin(useGSAP)

export default function Hero() {
  const ref = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      '.hero__reveal',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
    )
  }, { scope: ref })

  return (
    <section className="hero" id="hero" ref={ref}>
      <div className="hero__stage">
        <BustScene />
        <div className="hero__content">
          <p className="hero__eyebrow hero__reveal">Desenvolvedor web independente</p>
          <h1 className="hero__title hero__reveal">Interfaces com<br /><em>intenção.</em></h1>
          <p className="hero__description hero__reveal">
            Sou Richard Araújo. Transformo ideias em experiências digitais cuidadosas, úteis e cheias de personalidade.
          </p>
          <div className="hero__actions hero__reveal">
            <a className="hero__primary" href="#projects">Ver projetos <ArrowUpRight size={16} /></a>
            <a className="hero__secondary" href="#about">Sobre mim</a>
          </div>
        </div>
        <a className="hero__scroll" href="#manifesto">
          <span>Conheça meu trabalho</span><ArrowDown size={14} />
        </a>
      </div>
    </section>
  )
}