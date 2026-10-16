
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDownRight } from 'lucide-react'
import './Manifesto.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Manifesto() {
  const ref = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const elements = gsap.utils.toArray('[data-manifesto-reveal]', ref.current)

    gsap.fromTo(
      elements,
      {
        autoAlpha: 0,
        y: 28,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 76%',
          once: true,
        },
      },
    )

    gsap.fromTo(
      '.manifesto__ornament',
      {
        scale: 0.88,
        rotation: -8,
      },
      {
        scale: 1,
        rotation: 0,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 76%',
          once: true,
        },
      },
    )
  }, { scope: ref })

  return (
    <section
      className="manifesto section-shell"
      id="manifesto"
      ref={ref}
    >
      <div className="manifesto__header">
        <p
          className="section-kicker manifesto__kicker"
          data-manifesto-reveal
        >
          Uma ideia simples
        </p>

        <span
          className="manifesto__folio"
          data-manifesto-reveal
        >
          PENSAMENTO <span>—</span> 001
        </span>
      </div>

      <div className="manifesto__composition">
        <div className="manifesto__index" aria-hidden="true">
          <span>01</span>
          <span className="manifesto__index-line" />
          <span>IDEIA</span>
        </div>

        <div className="manifesto__main">
          <div className="manifesto__title-wrap">
            <span
              className="manifesto__overline"
              data-manifesto-reveal
            >
              FORMA ENCONTRA FUNÇÃO
            </span>

            <h2 className="manifesto__title">
              <span
                className="manifesto__title-line"
                data-manifesto-reveal
              >
                A estética
              </span>

              <span
                className="manifesto__title-line manifesto__title-line--accent"
                data-manifesto-reveal
              >
                chama.
              </span>

              <span
                className="manifesto__title-line manifesto__title-line--last"
                data-manifesto-reveal
              >
                A experiência
              </span>

              <span
                className="manifesto__title-line manifesto__title-line--accent manifesto__title-line--last"
                data-manifesto-reveal
              >
                fica.
              </span>
            </h2>

            <span
              className="manifesto__ornament"
              aria-hidden="true"
            >
              <span className="manifesto__ornament-ring" />
              <span className="manifesto__ornament-core" />
              <span className="manifesto__ornament-cross manifesto__ornament-cross--horizontal" />
              <span className="manifesto__ornament-cross manifesto__ornament-cross--vertical" />
            </span>
          </div>

          <div className="manifesto__footer">
            <div
              className="manifesto__rule"
              data-manifesto-reveal
            >
              <span />
            </div>

            <p
              className="manifesto__statement"
              data-manifesto-reveal
            >
              Um bom site não precisa escolher entre beleza e
              funcionalidade.
            </p>

            <div
              className="manifesto__detail"
              data-manifesto-reveal
            >
              <p>
                Acredito em experiências digitais nas quais cada
                detalhe tem um propósito — da primeira impressão
                à última interação.
              </p>

              <a
                className="manifesto__link"
                href="#projects"
              >
                <span>Essa ideia em prática</span>
                <ArrowDownRight size={15} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="manifesto__bottom-line" aria-hidden="true">
        <span>ARS</span>
        <span className="manifesto__bottom-rule" />
        <span>LOGICA</span>
        <span className="manifesto__bottom-dot">✳</span>
        <span>DIGITAL</span>
      </div>
    </section>
  )
}
