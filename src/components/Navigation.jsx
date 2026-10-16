import { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import './Navigation.css'

const links = [
  { label: 'Projetos', href: '#projects' },
  { label: 'Sobre', href: '#about' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <a className="nav__brand" href="#hero" onClick={() => setOpen(false)} aria-label="Richard Araújo — início">
        <span className="nav__monogram" aria-hidden="true">Ρ</span>
        <span className="nav__brand-copy"><strong>Richard Araújo</strong><small>Desenvolvimento web</small></span>
      </a>
      <button className="nav__toggle" type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open}>
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>
      <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Navegação principal">
        {links.map(link => <a href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
      </nav>
      <a className="nav__contact" href="#contact">Vamos conversar <ArrowUpRight size={14} /></a>
    </header>
  )
}