import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Firm from './sections/Firm.jsx'
import Squeeze from './sections/Squeeze.jsx'
import Edge from './sections/Edge.jsx'
import Work from './sections/Work.jsx'
import Manifesto from './sections/Manifesto.jsx'
import Portfolio from './sections/Portfolio.jsx'
import News from './sections/News.jsx'
import Closing from './sections/Closing.jsx'
import Footer from './sections/Footer.jsx'
import BackToTop from './sections/BackToTop.jsx'
import Wordmark from './sections/Wordmark.jsx'
import { setLenis } from './lib/scroll.js'

gsap.registerPlugin(ScrollTrigger)

/* Module scope, deliberately: this survives a route change but NOT a reload.
   Landing unmounts when you go to #/portfolio and friends, so without a flag
   the veil would replay every time you came back. sessionStorage was wrong the
   other way - it survives a refresh too, so the veil played once per tab and
   never again. This gives what it should: the front door on a real page load,
   including a refresh of the home tab, and nothing when you navigate back. */
let introShown = false

export default function Landing() {
  /* Arrival moment: branded veil on a real page load, skipped for
     reduced-motion users.

     THE VEIL LIFTS WHEN THE WORDMARK SAYS IT IS FINISHED, not on a timer.
     Timing it by hand needs two clocks to agree and they do not: React mounts
     and starts the draw's rAF loop about 300ms after the veil's own CSS
     animation begins, so a delay picked to match the 2320ms draw lifted while
     the last stroke was still travelling. It used to lift at 1150ms and nobody
     had ever seen the last 15% of the mark on the real site. `onDone` fires on
     the frame the final stroke lands; `.intro-veil--lift` then holds 250ms and
     takes 600ms to clear. The fallback below is a safety net only - if the
     draw ever fails to report, nobody is left stuck behind the veil. */
  const [intro, setIntro] = useState(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
      return !introShown
    } catch (e) {
      return false
    }
  })
  const [lift, setLift] = useState(false)

  useEffect(() => {
    if (!intro) return
    introShown = true
    const safety = setTimeout(() => setLift(true), 5000)
    return () => clearTimeout(safety)
  }, [intro])

  useEffect(() => {
    if (!lift) return
    const t = setTimeout(() => setIntro(false), 900)
    return () => clearTimeout(t)
  }, [lift])

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12 })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    /* nav: hide when scrolling down, return when scrolling up */
    const navEl = document.querySelector('.nav')
    let lastY = 0
    lenis.on('scroll', (e) => {
      if (!navEl) return
      const y = e.scroll || 0
      if (y < 80) navEl.classList.remove('nav--hidden')
      else if (y > lastY + 4) navEl.classList.add('nav--hidden')
      else if (y < lastY - 4) navEl.classList.remove('nav--hidden')
      lastY = y
    })
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
      setLenis(null)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <>
      {intro && (
        <div className={'intro-veil' + (lift ? ' intro-veil--lift' : '')} aria-hidden="true">
          <Wordmark className="intro-logo" mode="mount" duration={2200} delay={120}
                    onDone={() => setLift(true)} />
        </div>
      )}
      <Nav />
      <main>
        <Hero />
        <Firm />
        <Squeeze />
        <Edge />
        <Work />
        <Manifesto />
        <Portfolio />
        <News />
        <Closing />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
