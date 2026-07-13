import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Squeeze from './sections/Squeeze.jsx'
import Edge from './sections/Edge.jsx'
import Work from './sections/Work.jsx'
import Manifesto from './sections/Manifesto.jsx'
import Portfolio from './sections/Portfolio.jsx'
import Proof from './sections/Proof.jsx'
import Closing from './sections/Closing.jsx'
import Footer from './sections/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Landing() {
  /* Arrival moment: brief branded veil, once per session, skipped for
     reduced-motion users. */
  const [intro, setIntro] = useState(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
      return !sessionStorage.getItem('daaIntroSeen')
    } catch (e) {
      return false
    }
  })

  useEffect(() => {
    if (!intro) return
    const t = setTimeout(() => {
      try { sessionStorage.setItem('daaIntroSeen', '1') } catch (e) {}
      setIntro(false)
    }, 1750)
    return () => clearTimeout(t)
  }, [intro])

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const reveals = gsap.utils.toArray('[data-reveal]')
    reveals.forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 42 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' }
        }
      )
    })

    const counters = gsap.utils.toArray('[data-count]')
    counters.forEach((el) => {
      const target = parseFloat(el.dataset.count)
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
        onUpdate: () => {
          el.textContent = obj.v.toFixed(decimals)
        }
      })
    })

    /* Scroll-linked motion: the page responds to the hand, not just to time. */
    gsap.to('.hero-content', {
      y: 110,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    })
    gsap.utils.toArray('.beat video.bg').forEach((v) => {
      gsap.fromTo(
        v,
        { scale: 1.06 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: v.closest('.beat'), start: 'top bottom', end: 'top top', scrub: true }
        }
      )
    })

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <>
      {intro && (
        <div className="intro-veil" aria-hidden="true">
          <img className="intro-logo" src="/images/daa-logo-white.svg" alt="" />
        </div>
      )}
      <Nav />
      <main>
        <Hero />
        <Squeeze />
        <Edge />
        <Work />
        <Manifesto />
        <Portfolio />
        <Proof />
        <Closing />
      </main>
      <Footer />
    </>
  )
}
