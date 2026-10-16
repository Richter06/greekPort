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
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    gsap.fromTo(
      '.hero__reveal',
      {
        opacity: 0,
        y: 22,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      },
    )
  }, { scope: ref })

  return (
    <section className="hero" id="hero" ref={ref}>
      <div className="hero__stage">
        <BustScene />

        <div className="hero__content">
          <div className="hero__eyebrow hero__reveal">
            <span className="hero__eyebrow-mark" aria-hidden="true" />
            <span>Código, forma & interação</span>
          </div>

          <div className="hero__edition hero__reveal">
            PORTFÓLIO AUTORAL
            <span> / </span>
            DESENVOLVIMENTO CRIATIVO
          </div>

          <h1 className="hero__title hero__reveal">
            <span>Entre a arte</span>
            <em>e o algoritmo.</em>
          </h1>

          <div className="hero__description-wrap hero__reveal">
            <span
              className="hero__description-line"
              aria-hidden="true"
            />

            <p className="hero__description">
              Sou Richard Araújo. Exploro o encontro entre design,
              interação e desenvolvimento para criar experiências
              digitais com identidade própria.
            </p>
          </div>

          <div className="hero__actions hero__reveal">
            <a className="hero__primary" href="#projects">
              <span>Explorar projetos</span>
              <ArrowUpRight size={17} strokeWidth={1.5} />
            </a>

            <a className="hero__secondary" href="#about">
              <span>Conhecer o autor</span>
              <span className="hero__secondary-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <div className="hero__signature hero__reveal">
            <span className="hero__signature-line" />
            <span>Ideias moldadas em código.</span>
          </div>
        </div>

        <a className="hero__scroll" href="#manifesto">
          <span className="hero__scroll-index">01</span>

          <span className="hero__scroll-label">
            Continue a exploração
          </span>

          <ArrowDown size={14} strokeWidth={1.5} />
        </a>

        <div className="hero__side-note" aria-hidden="true">
          ARS · LOGICA · DIGITAL
        </div>
      </div>
    </section>
  )
}