import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Squeeze from './sections/Squeeze.jsx'
import Edge from './sections/Edge.jsx'
import Work from './sections/Work.jsx'
import Portfolio from './sections/Portfolio.jsx'
import Proof from './sections/Proof.jsx'
import Footer from './sections/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
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

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Squeeze />
        <Edge />
        <Work />
        <Portfolio />
        <Proof />
      </main>
      <Footer />
    </>
  )
}
