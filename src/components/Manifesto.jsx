import { ArrowDownRight } from 'lucide-react'
import './Manifesto.css'

export default function Manifesto() {
  return (
    <section className="manifesto section-shell" id="manifesto">
      <div className="manifesto__story-content">
        <div className="manifesto__header">
          <p className="section-kicker manifesto__kicker">
            Uma ideia simples
          </p>

          <span className="manifesto__folio">
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
              <span className="manifesto__overline">
                FORMA ENCONTRA FUNÇÃO
              </span>

              <h2 className="manifesto__title">
                <span className="manifesto__title-line">
                  A estética
                </span>

                <span className="manifesto__title-line manifesto__title-line--accent">
                  chama.
                </span>

                <span className="manifesto__title-line manifesto__title-line--last">
                  A experiência
                </span>

                <span className="manifesto__title-line manifesto__title-line--accent manifesto__title-line--last">
                  fica.
                </span>
              </h2>

              <span className="manifesto__ornament" aria-hidden="true">
                <span className="manifesto__ornament-ring" />
                <span className="manifesto__ornament-core" />
                <span className="manifesto__ornament-cross manifesto__ornament-cross--horizontal" />
                <span className="manifesto__ornament-cross manifesto__ornament-cross--vertical" />
              </span>
            </div>

            <div className="manifesto__footer">
              <div className="manifesto__rule" aria-hidden="true">
                <span />
              </div>

              <p className="manifesto__statement">
                Um bom site não precisa escolher entre beleza e
                funcionalidade.
              </p>

              <div className="manifesto__detail">
                <p>
                  Acredito em experiências digitais nas quais cada
                  detalhe tem um propósito — da primeira impressão
                  à última interação.
                </p>

                <a className="manifesto__link" href="#projects">
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
      </div>
    </section>
  )
}
