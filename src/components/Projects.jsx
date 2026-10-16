import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const projects = [
  {
    name: 'Sprint',
    category: 'E-commerce · React',
    description: 'Uma experiência de loja de tênis construída em torno do produto, com uma direção visual minimalista.',
    theme: 'architecture',
    visualLabel: 'Forma e função',
    visualCaption: 'Uma loja feita para explorar',
  },
  {
    name: 'D20 Burguer',
    category: 'Landing page · Web design',
    description: 'Uma identidade digital inspirada em RPG, onde o universo da marca orienta a experiência.',
    theme: 'object',
    visualLabel: 'Identidade e apetite',
    visualCaption: 'Uma marca com universo próprio',
  },
  {
    name: 'AeroOS',
    category: 'Interface · React',
    description: 'Uma exploração de interface inspirada na estética Frutiger Aero, com transparências e referências à natureza.',
    theme: 'editorial',
    visualLabel: 'Interface e atmosfera',
    visualCaption: 'Um sistema inspirado na natureza',
  },
]

export default function Projects() {
  const ref = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo('.project-card', { opacity: 0, y: 22 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 78%' },
    })
  }, { scope: ref })

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="section-shell">
        <div className="projects__header">
          <div>
            <p className="section-kicker">Trabalhos selecionados</p>
            <h2 className="section-heading">Ideias em<br /><em>construção.</em></h2>
          </div>
          <p className="projects__intro">Projetos que exploram diferentes formas de transformar uma ideia em experiência.</p>
        </div>
        <div className="projects__grid">
          {projects.map(project => (
            <article className={`project-card project-card--${project.theme}`} key={project.name}>
              <div className="project-card__visual" aria-hidden="true">
                <div className="project-card__frame">
                  <div className="project-card__symbol"><span>{project.name === 'Sprint' ? 'S' : project.name === 'AeroOS' ? 'A' : 'D'}</span><i /><i /></div>
                </div>
              </div>
              <div className="project-card__meta">
                <div>
                  <span className="project-card__category">{project.category}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}