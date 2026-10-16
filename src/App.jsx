import Navigation from './components/Navigation'
import PortfolioScene from './components/PortfolioScene'
import StorySequence from './components/StorySequence'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'
import './Editorial.css'
import './components/StorySequence.css'
import './components/StorySequenceMotion.css'
import './components/PortfolioScene.css'

export default function App() {
  return (
    <div className="portfolio-experience" id="portfolio-experience">
      <PortfolioScene />
      <Navigation />
      <main>
        <StorySequence />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
