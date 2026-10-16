import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BustScene from './BustScene'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const sectionSelectors = [
  '#hero',
  '#manifesto',
  '#projects',
  '#about',
  '#contact',
  '.footer',
]

export default function PortfolioScene() {
  const ref = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const experience = document.querySelector('#portfolio-experience')
    const scene = ref.current
    if (!experience || !scene) return

    const paper = scene.querySelector('.story-sequence__paper')
    const backdrop = scene.querySelector('.portfolio-scene__backdrop')
    const architecture = scene.querySelector('.portfolio-scene__architecture')
    const bust = scene.querySelector('.bust-scene')
    const sections = sectionSelectors
      .map((selector) => experience.querySelector(selector))
      .filter(Boolean)

    if (
      !paper ||
      !backdrop ||
      !architecture ||
      !bust ||
      sections.length !== sectionSelectors.length
    ) {
      return
    }

    const sectionHeights = sections.map((section) =>
      Math.max(section.offsetHeight, 1),
    )
    const totalSectionHeight = sectionHeights.reduce(
      (total, height) => total + height,
      0,
    )
    const scrollDistance = Math.max(
      experience.scrollHeight - window.innerHeight,
      1,
    )
    const timelineDuration = scrollDistance / window.innerHeight
    const durations = sectionHeights.map(
      (height) => (height / totalSectionHeight) * timelineDuration,
    )
    const starts = durations.map((_, index) =>
      durations.slice(0, index).reduce((total, duration) => total + duration, 0),
    )

    const [heroDuration, manifestoDuration, projectsDuration] = durations
    const projectsStart = starts[2]
    const aboutStart = starts[3]
    const contactStart = starts[4]
    const footerStart = starts[5]

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: experience,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    })

    timeline
      .to(backdrop, {
        opacity: 1,
        duration: heroDuration,
      }, 0)
      .to(architecture, {
        opacity: 1,
        duration: heroDuration,
      }, 0)
      .to(paper, {
        opacity: 0.97,
        duration: heroDuration * 0.54 + manifestoDuration * 0.62,
      }, heroDuration * 0.46)
      .to(paper, {
        opacity: 0,
        duration: projectsDuration * 0.3,
      }, projectsStart + projectsDuration * 0.02)
      .to(backdrop, {
        opacity: 0,
        duration: projectsDuration * 0.3,
      }, projectsStart + projectsDuration * 0.02)
      .to(architecture, {
        opacity: 0,
        duration: projectsDuration * 0.3,
      }, projectsStart + projectsDuration * 0.02)
      .to(bust, {
        x: () => -window.innerWidth * 0.14,
        y: () => window.innerHeight * 0.025,
        opacity: 0.86,
        scale: 0.94,
        duration: projectsDuration,
      }, projectsStart)
      .to(bust, {
        x: () => window.innerWidth * 0.18,
        y: () => -window.innerHeight * 0.035,
        opacity: 0.68,
        scale: 0.9,
        duration: durations[3],
      }, aboutStart)
      .to(bust, {
        x: () => -window.innerWidth * 0.045,
        y: 0,
        opacity: 0.55,
        scale: 0.82,
        duration: durations[4],
      }, contactStart)
      .to(bust, {
        x: () => window.innerWidth * 0.12,
        y: () => window.innerHeight * 0.08,
        opacity: 0.12,
        scale: 0.62,
        duration: durations[5],
      }, footerStart)

    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }, { scope: ref })

  return (
    <div
      className="story-sequence__visual portfolio-scene"
      aria-hidden="true"
      ref={ref}
    >
      <div className="portfolio-scene__backdrop" />
      <div className="story-sequence__paper" />
      <div className="portfolio-scene__architecture" />
      <BustScene />
    </div>
  )
}
