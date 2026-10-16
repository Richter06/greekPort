import Navigation from './components/Navigation'
import StorySequence from './components/StorySequence'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'
import './Editorial.css'
import './components/StorySequence.css'

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <StorySequence />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
