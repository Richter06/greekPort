import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
    if (!root) return

    const heroContent = root.querySelector('.hero__content')
    const heroScroll = root.querySelector('.hero__scroll')
    const manifestoHeader = root.querySelector('.manifesto__header')
    const manifestoOverline = root.querySelector('.manifesto__overline')
    const manifestoTitleLines = Array.from(
      root.querySelectorAll('.manifesto__title-line'),
    )
    const manifestoFooterItems = Array.from(
      root.querySelectorAll('.manifesto__footer > *'),
    )
    const manifestoBottomLine = root.querySelector('.manifesto__bottom-line')

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
      .fromTo(
        manifestoHeader,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.3 },
        0.65,
      )
      .fromTo(
        manifestoOverline,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.28 },
        0.76,
      )
      .fromTo(
        manifestoTitleLines,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.09,
        },
        0.84,
      )
      .fromTo(
        manifestoFooterItems,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.34,
          stagger: 0.08,
        },
        1.2,
      )
      .fromTo(
        manifestoBottomLine,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.24 },
        1.55,
      )

    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }, { scope: ref })

  return (
    <div className="story-sequence" id="story-sequence" ref={ref}>
      <Hero />
      <Manifesto />
    </div>
  )
}
