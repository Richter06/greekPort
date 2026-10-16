import { useRef } from 'react'
import { ArrowUpRight, Code2, Layers3, Compass } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const principles = [
  { icon: Compass, title: 'Intenção', text: 'Decisões visuais e técnicas que servem ao propósito do projeto.' },
  { icon: Layers3, title: 'Experiência', text: 'Interfaces claras, responsivas e agradáveis de usar.' },
  { icon: Code2, title: 'Construção', text: 'Código organizado, atenção aos detalhes e espaço para evoluir.' },
]

export default function About() {
  const ref = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo('.about__reveal', { opacity: 0, y: 18 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 78%' },
    })
  }, { scope: ref })

  return (
    <section className="about section-shell" id="about" ref={ref}>
      <div className="about__intro">
        <p className="section-kicker about__reveal">Um pouco sobre mim</p>
        <h2 className="section-heading about__reveal">Curiosidade<br />em <em>movimento.</em></h2>
      </div>
      <div className="about__content">
        <div className="about__portrait about__reveal" aria-hidden="true">
          <div className="about__portrait-ring"><span>Ρ</span></div>
        </div>
        <div className="about__copy">
          <p className="about__lead about__reveal">Gosto de entender como as coisas funcionam — e imaginar como podem funcionar melhor.</p>
          <p className="about__text about__reveal">
            Sou desenvolvedor web e estudo tanto a parte visual quanto a estrutura por trás das interfaces. Gosto de transformar referências, ideias e problemas reais em experiências digitais acessíveis, responsivas e bem construídas.
          </p>
          <a className="about__link about__reveal" href="https://github.com/Richter06" target="_blank" rel="noreferrer">
            Ver código no GitHub <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className="about__principles">
        {principles.map(({ icon: Icon, title, text }) => (
          <article className="principle about__reveal" key={title}>
            <div className="principle__top"><Icon size={19} strokeWidth={1.4} /></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}