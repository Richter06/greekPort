
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './Hero'
import Manifesto from './Manifesto'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function StorySequence() {
  const ref = useRef(null)

  useGSAP(() => {
    const root = ref.current
    if (!root) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const hero = root.querySelector('#hero')
    const heroContent = root.querySelector('.hero__content')
    const heroScroll = root.querySelector('.hero__scroll')
    const manifesto = root.querySelector('#manifesto')

    if (!hero || !manifesto) return

    // Movimento reduzido: todo o conteúdo fica disponível.
    if (reducedMotion) return

    /*
     * TIMELINE 1 — HERO
     *
     * A saída do Hero depende somente da altura do próprio Hero.
     * Não fica mais presa à duração total do manifesto.
     */
    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    })

    if (heroContent) {
      heroTimeline.to(
        heroContent,
        {
          autoAlpha: 0,
          y: -26,
          duration: 0.65,
        },
        0.12,
      )
    }

    if (heroScroll) {
      heroTimeline.to(
        heroScroll,
        {
          autoAlpha: 0,
          duration: 0.35,
        },
        0.08,
      )
    }

    /*
     * TIMELINE 2 — MANIFESTO
     *
     * Começa quando o manifesto está entrando na tela.
     * O conteúdo aparece na primeira parte da seção e
     * permanece visível durante a parte final da leitura.
     */
    const header = manifesto.querySelector('.manifesto__header')
    const overline = manifesto.querySelector('.manifesto__overline')
    const titleLines = Array.from(
      manifesto.querySelectorAll('.manifesto__title-line'),
    )
    const footerItems = Array.from(
      manifesto.querySelectorAll('.manifesto__footer > *'),
    )
    const bottomLine = manifesto.querySelector(
      '.manifesto__bottom-line',
    )

    const manifestoTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: manifesto,
        start: 'top 90%',
        end: 'bottom 65%',
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    })

    // Cabeçalho editorial.
    if (header) {
      manifestoTimeline.fromTo(
        header,
        {
          autoAlpha: 0,
          y: 14,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
        },
        0,
      )
    }

    // Chamada pequena antes da mensagem principal.
    if (overline) {
      manifestoTimeline.fromTo(
        overline,
        {
          autoAlpha: 0,
          y: 16,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
        },
        0.28,
      )
    }

    // Título em etapas, sem revelar tudo de uma vez.
    if (titleLines.length) {
      manifestoTimeline.fromTo(
        titleLines,
        {
          autoAlpha: 0,
          y: 28,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.18,
        },
        0.52,
      )
    }

    // Mensagem, descrição e chamada para os projetos.
    if (footerItems.length) {
      manifestoTimeline.fromTo(
        footerItems,
        {
          autoAlpha: 0,
          y: 18,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.12,
        },
        1.55,
      )
    }

    // Assinatura fecha a composição.
    if (bottomLine) {
      manifestoTimeline.fromTo(
        bottomLine,
        {
          autoAlpha: 0,
          y: 12,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
        },
        2.15,
      )
    }

    /*
     * O fim da timeline fica vazio de propósito:
     * o usuário continua rolando, mas o manifesto
     * permanece completamente visível para leitura.
     */
    manifestoTimeline.to(
      {},
      {
        duration: 1.8,
      },
      2.5,
    )

    return () => {
      heroTimeline.scrollTrigger?.kill()
      heroTimeline.kill()
      manifestoTimeline.scrollTrigger?.kill()
      manifestoTimeline.kill()
    }
  }, { scope: ref })

  return (
    <div className="story-sequence" id="story-sequence" ref={ref}>
      <Hero />
      <Manifesto />
    </div>
  )
}
