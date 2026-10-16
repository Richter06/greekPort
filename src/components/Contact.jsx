import { useRef } from 'react'
import { ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Contact() {
  const ref = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo('.contact__reveal', { opacity: 0, y: 18 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    })
  }, { scope: ref })

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="section-shell contact__inner">
        <p className="section-kicker contact__reveal">Entre em contato</p>
        <h2 className="contact__title contact__reveal">Vamos fazer<br />algo <em>significativo.</em></h2>
        <p className="contact__text contact__reveal">Tem uma ideia, uma oportunidade ou simplesmente quer trocar uma ideia? Estou por aqui.</p>
        <a className="contact__cta contact__reveal" href="https://www.linkedin.com/in/richard-r-ara%C3%BAjo/" target="_blank" rel="noreferrer">
          Fale comigo pelo LinkedIn <ArrowUpRight size={17} />
        </a>
        <div className="contact__social contact__reveal">
          <a href="https://github.com/Richter06" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
          <a href="https://www.linkedin.com/in/richard-r-ara%C3%BAjo/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
        </div>
      </div>
    </section>
  )
}