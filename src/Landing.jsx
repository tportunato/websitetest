import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Firm from './sections/Firm.jsx'
import Squeeze from './sections/Squeeze.jsx'
import Portfolio from './sections/Portfolio.jsx'
import SplitFeature from './sections/SplitFeature.jsx'
import { FUTUREPROOF } from './data/pages.js'
import Closing from './sections/Closing.jsx'
import Footer from './sections/Footer.jsx'
import BackToTop from './sections/BackToTop.jsx'
import { setLenis, scrollToHash } from './lib/scroll.js'
import { prefersReducedMotion } from './lib/motion.js'

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
    const reduced = prefersReducedMotion()

    /* Reduced motion gets the native scroller: Lenis is smooth-scroll
       hijacking, which is exactly what the preference asks us not to do. */
    const lenis = reduced ? null : new Lenis({ lerp: 0.12 })
    if (lenis) {
      setLenis(lenis)
      lenis.on('scroll', ScrollTrigger.update)
    }

    /* nav: hide when scrolling down, return when scrolling up */
    const navEl = document.querySelector('.nav')
    let lastY = 0
    const onScrollY = (y) => {
      if (!navEl) return
      /* Never hide the bar while the mobile panel is open. */
      if (navEl.querySelector('.nav-panel.open')) {
        navEl.classList.remove('nav--hidden')
        return
      }
      if (y < 80) navEl.classList.remove('nav--hidden')
      else if (y > lastY + 4) navEl.classList.add('nav--hidden')
      else if (y < lastY - 4) navEl.classList.remove('nav--hidden')
      lastY = y
    }

    let raf = null
    let onNative = null
    if (lenis) {
      lenis.on('scroll', (e) => onScrollY(e.scroll || 0))
      raf = (time) => { lenis.raf(time * 1000) }
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
    } else {
      onNative = () => onScrollY(window.pageYOffset)
      window.addEventListener('scroll', onNative, { passive: true })
    }

    /* Axis-style reveal: when a full-height section comes to rest filling the
       screen, the bar comes back even though the visitor is still scrolling
       down. Without this the header stays hidden for the whole run of beats,
       because nothing scrolls UP until they reach the footer. */
    const fullScreens = document.querySelectorAll('.hero, .firm, .manifesto, .beat .stage')
    const ioNav = new IntersectionObserver(
      (entries) => {
        if (!navEl) return
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          navEl.classList.remove('nav--hidden')
          /* Reset the reference point, otherwise the very next scroll event
             reads as "still going down" and hides it again immediately. */
          lastY = lenis ? lenis.scroll || 0 : window.pageYOffset
        })
      },
      { threshold: 0.92 }
    )
    fullScreens.forEach((el) => ioNav.observe(el))

    /* In-page anchors. App only resets scroll when the route changes, so these
       are ours to handle — through Lenis, never window.scrollTo. */
    const onHash = () => scrollToHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    /* Deep link straight to a section: wait a frame so layout has settled. */
    const deepLink = requestAnimationFrame(() => scrollToHash(window.location.hash))

    const reveals = gsap.utils.toArray('[data-reveal]')
    reveals.forEach((el) => {
      /* Hero copy plays on load. It sits at the bottom of the first screen, so
         a `top 80%` trigger can start out BELOW its own start line and leave
         the sub-line invisible until the visitor scrolls — on the one screen
         that has to land. Everything below the fold keeps the scroll trigger. */
      const inHero = !!el.closest('.hero')
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: reduced ? 0 : 42 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduced ? 0.01 : 1,
          ease: 'power3.out',
          delay: inHero && !reduced ? 0.12 : 0,
          ...(inHero ? {} : { scrollTrigger: { trigger: el, start: 'top 97%' } })
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

    /* Scroll-linked motion: the page responds to the hand, not just to time.

       scrub: true ties the tween to the scroll position on the same frame, so
       every wheel tick lands as a discrete step and the parallax reads as
       stutter against Lenis's eased scroll. A scrub DURATION lets GSAP catch up
       over ~0.6s instead, which is what makes it feel continuous. */
    if (!reduced) {
      gsap.to('.hero-content', {
        y: 110,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 }
      })
      gsap.utils.toArray('.beat video.bg').forEach((v) => {
        gsap.fromTo(
          v,
          { scale: 1.06 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: v.closest('.beat'), start: 'top bottom', end: 'top top', scrub: 0.6 }
          }
        )
      })
    }

    return () => {
      cancelAnimationFrame(deepLink)
      ioNav.disconnect()
      window.removeEventListener('hashchange', onHash)
      if (onNative) window.removeEventListener('scroll', onNative)
      if (raf) gsap.ticker.remove(raf)
      if (lenis) {
        setLenis(null)
        lenis.destroy()
      }
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
        <Firm />
        <Squeeze />
        <Portfolio />
        {/* Mirrors the firm section above: same layout, same photo treatment,
            opposite end of the page. */}
        <SplitFeature
          id="future-proof"
          eyebrow={FUTUREPROOF.eyebrow}
          statement={FUTUREPROOF.statement}
          notes={FUTUREPROOF.notes}
          image="/images/futureproof.jpg"
        >
          <a className="btn btn--lg btn--solid btn--spaced" href="#/strategy">
            <span>How we do it</span>
            <span className="btn-arrow">&rarr;</span>
          </a>
        </SplitFeature>
        <Closing />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
