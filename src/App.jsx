import Navigation from './components/Navigation'
import ProgressBar from './components/ProgressBar'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'
import './Editorial.css'

export default function App() {
  return (
    <>
      <ProgressBar />
      <Navigation />
      <main>
        <Hero />
        <Manifesto />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}