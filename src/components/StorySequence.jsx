import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BustScene from './BustScene'
import Hero from './Hero'
import Manifesto from './Manifesto'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function StorySequence() {
  const ref = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const root = ref.current
    const heroContent = root.querySelector('.hero__content')
    const heroScroll = root.querySelector('.hero__scroll')
    const paper = root.querySelector('.story-sequence__paper')
    const bust = root.querySelector('.story-sequence__visual .bust-scene')
    const manifestoTop = root.querySelector('.manifesto__top')
    const manifestoHeading = root.querySelector('.manifesto__copy .section-heading')
    const manifestoDetails = Array.from(
      root.querySelectorAll('.manifesto__bottom > *'),
    )

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    })

    timeline
      .to(heroContent, {
        autoAlpha: 0,
        y: -26,
        duration: 0.36,
      }, 0.08)
      .to(heroScroll, {
        autoAlpha: 0,
        duration: 0.22,
      }, 0.08)
      .to(paper, {
        opacity: 0.97,
        duration: 1.2,
      }, 0.42)
      .to(bust, {
        opacity: 0.78,
        x: () => window.innerWidth <= 700 ? 0 : window.innerWidth * 0.018,
        duration: 1.2,
      }, 0.42)
      .fromTo(
        manifestoTop,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.32 },
        0.72,
      )
      .fromTo(
        manifestoHeading,
        { autoAlpha: 0, y: 34 },
        { autoAlpha: 1, y: 0, duration: 0.48 },
        0.9,
      )
      .fromTo(
        manifestoDetails,
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          stagger: 0.1,
        },
        1.22,
      )

    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }, { scope: ref })

  return (
    <div className="story-sequence" id="story-sequence" ref={ref}>
      <div className="story-sequence__visual" aria-hidden="true">
        <div className="story-sequence__paper" />
        <BustScene />
      </div>

      <Hero />
      <Manifesto />
    </div>
  )
}
