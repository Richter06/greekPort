import { ArrowUp } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <a className="footer__brand" href="#hero"><span aria-hidden="true">Ρ</span><span>Richard Araújo</span></a>
      <a className="footer__top" href="#hero">Voltar ao início <ArrowUp size={13} /></a>
      <span className="footer__year">© {new Date().getFullYear()}</span>
    </footer>
  )
}