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

    if (!hero || !manifesto || reducedMotion) return

    /*
     * HERO
     * A saída continua acompanhando o scroll para preservar
     * a transição cinematográfica já existente.
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
     * MANIFESTO
     * Diferente da versão anterior, esta timeline NÃO usa scrub.
     * Ao entrar na área visível, a sequência começa e termina
     * mesmo que a pessoa pare de rolar. O texto fica disponível
     * durante a leitura e só reverte ao voltar acima da seção.
     */
    const header = manifesto.querySelector('.manifesto__header')
    const overline = manifesto.querySelector('.manifesto__overline')
    const titleLines = Array.from(
      manifesto.querySelectorAll('.manifesto__title-line'),
    )
    const footerItems = Array.from(
      manifesto.querySelectorAll('.manifesto__footer > *'),
    )
    const bottomLine = manifesto.querySelector('.manifesto__bottom-line')

    const manifestoTimeline = gsap.timeline({
      defaults: {
        ease: 'power2.out',
      },
      scrollTrigger: {
        trigger: manifesto,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
        invalidateOnRefresh: true,
      },
    })

    if (header) {
      manifestoTimeline.fromTo(
        header,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.45 },
        0,
      )
    }

    if (overline) {
      manifestoTimeline.fromTo(
        overline,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.45 },
        0.18,
      )
    }

    if (titleLines.length) {
      manifestoTimeline.fromTo(
        titleLines,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.13,
        },
        0.38,
      )
    }

    if (footerItems.length) {
      manifestoTimeline.fromTo(
        footerItems,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.1,
        },
        1.05,
      )
    }

    if (bottomLine) {
      manifestoTimeline.fromTo(
        bottomLine,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.4 },
        1.65,
      )
    }

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
