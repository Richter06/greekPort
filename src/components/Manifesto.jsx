import { ArrowUpRight } from 'lucide-react'
import './Manifesto.css'

export default function Manifesto() {
  return (
    <section className="manifesto section-shell" id="manifesto">
      <div className="manifesto__story-content">
        <header className="manifesto__header">
          <p className="section-kicker manifesto__kicker">
            Princípios de construção
          </p>
          <span className="manifesto__folio">
            <span>GREEKPORT</span> / ENSAIO Nº 01
          </span>
        </header>

        <div className="manifesto__composition">
          <aside className="manifesto__index" aria-hidden="true">
            <span className="manifesto__index-number">Ι</span>
            <span className="manifesto__index-line" />
            <span className="manifesto__index-label">FORMA</span>
          </aside>

          <div className="manifesto__main">
            <div className="manifesto__title-wrap">
              <div className="manifesto__overline">
                <span className="manifesto__overline-mark" aria-hidden="true">✳</span>
                <span>ΜΕΤΡΟ · ΑΡΜΟΝΙΑ · ΛΟΓΟΣ</span>
              </div>

              <h2 className="manifesto__title">
                <span className="manifesto__title-line">A estética</span>
                <span className="manifesto__title-line manifesto__title-line--accent">abre portas.</span>
                <span className="manifesto__title-line manifesto__title-line--support">A experiência</span>
                <span className="manifesto__title-line manifesto__title-line--accent manifesto__title-line--last">faz ficar.</span>
              </h2>

              <div className="manifesto__temple" aria-hidden="true">
                <span className="manifesto__temple-sun" />
                <span className="manifesto__temple-arch" />
                <span className="manifesto__temple-column manifesto__temple-column--left" />
                <span className="manifesto__temple-column manifesto__temple-column--right" />
                <span className="manifesto__temple-capital manifesto__temple-capital--left" />
                <span className="manifesto__temple-capital manifesto__temple-capital--right" />
                <span className="manifesto__temple-base" />
                <span className="manifesto__temple-caption">ΑΡΕΤΗ <i>—</i> 001</span>
              </div>
            </div>

            <div className="manifesto__footer">
              <div className="manifesto__rule" aria-hidden="true"><span /></div>
              <p className="manifesto__statement">
                Beleza que desperta interesse. Funcionalidade que conquista confiança.
              </p>
              <div className="manifesto__detail">
                <p>
                  Cada escolha deve ter um propósito. Da primeira impressão
                  à última interação, construo experiências digitais que
                  equilibram clareza, personalidade e cuidado.
                </p>
                <a className="manifesto__link" href="#projects">
                  <span>Ver os princípios em prática</span>
                  <ArrowUpRight size={15} strokeWidth={1.6} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="manifesto__bottom-line" aria-hidden="true">
          <span>ΚΑΛΛΟΣ</span>
          <span className="manifesto__bottom-rule" />
          <span>ΛΟΓΟΣ</span>
          <span className="manifesto__bottom-dot">✳</span>
          <span>ΕΜΠΕΙΡΙΑ</span>
        </div>
      </div>
    </section>
  )
}
