import './Manifesto.css'

export default function Manifesto() {
  return (
    <section className="manifesto section-shell" id="manifesto">
      <div className="manifesto__story-content">
        <div className="manifesto__top">
          <p className="section-kicker manifesto__kicker">
            Uma ideia simples
          </p>
        </div>

        <div className="manifesto__body">
          <div className="manifesto__copy">
            <h2 className="section-heading">
              A estética chama.
              <br />
              A <em>experiência</em> fica.
            </h2>

            <div className="manifesto__bottom">
              <p className="manifesto__statement">
                Um bom site não precisa escolher entre beleza e funcionalidade.
              </p>

              <p className="manifesto__detail">
                Meu objetivo é unir clareza, personalidade e cuidado técnico
                para que cada escolha visual também tenha uma razão de existir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
