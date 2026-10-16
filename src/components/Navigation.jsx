import {useState} from 'react'
import {Menu,X,ArrowUpRight} from 'lucide-react'
import './Navigation.css'
const links=[{label:'Manifesto',href:'#manifesto'},{label:'Projetos',href:'#projects'},{label:'Sobre',href:'#about'}]
export default function Navigation(){const[open,setOpen]=useState(false);return <header className="nav">
<a className="nav__brand" href="#hero" onClick={()=>setOpen(false)} aria-label="Richard Araújo — início"><span className="nav__monogram">Ρ</span><span className="nav__brand-copy"><strong>RICHARD ARAÚJO</strong><small>DESENVOLVIMENTO DIGITAL</small></span></a>
<button className="nav__toggle" type="button" onClick={()=>setOpen(!open)} aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open}>{open?<X size={19}/>:<Menu size={19}/>}</button>
<nav className={`nav__links ${open?'is-open':''}`} aria-label="Navegação principal">{links.map((l,i)=><a href={l.href} key={l.href} onClick={()=>setOpen(false)}><span>0{i+1}</span>{l.label}</a>)}</nav>
<a className="nav__contact" href="#contact">VAMOS CONVERSAR <ArrowUpRight size={14}/></a></header>}