import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Manifesto.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Manifesto() {
  const ref = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo('.manifesto__reveal', { opacity: 0, y: 18 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 78%' },
    })
  }, { scope: ref })

  return (
    <section className="manifesto section-shell" id="manifesto" ref={ref}>
      <div className="manifesto__top">
        <p className="section-kicker manifesto__reveal">Uma ideia simples</p>
      </div>
      <div className="manifesto__body">
        <div className="manifesto__copy">
          <h2 className="section-heading manifesto__reveal">A estética chama.<br />A <em>experiência</em> fica.</h2>
          <div className="manifesto__bottom">
            <p className="manifesto__statement manifesto__reveal">
              Um bom site não precisa escolher entre beleza e funcionalidade.
            </p>
            <p className="manifesto__detail manifesto__reveal">
              Meu objetivo é unir clareza, personalidade e cuidado técnico para que cada escolha visual também tenha uma razão de existir.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}