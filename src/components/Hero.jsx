import { lazy, Suspense } from 'react'
import { SITE } from '../data/site'
import './Hero.css'

const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero() {
  function moveScene(event) {
    if (event.pointerType === 'touch') return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    event.currentTarget.style.setProperty('--scene-x', `${x * -18}px`)
    event.currentTarget.style.setProperty('--scene-y', `${y * -14}px`)
    event.currentTarget.style.setProperty('--orbit-x', `${x * 14}px`)
    event.currentTarget.style.setProperty('--orbit-y', `${y * 14}px`)
  }

  function resetScene(event) {
    event.currentTarget.style.removeProperty('--scene-x')
    event.currentTarget.style.removeProperty('--scene-y')
    event.currentTarget.style.removeProperty('--orbit-x')
    event.currentTarget.style.removeProperty('--orbit-y')
  }

  return (
    <section id="home" className="hero" onPointerMove={moveScene} onPointerLeave={resetScene}>
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-crosshair" aria-hidden="true">RB<span>01 / 04</span></div>
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="hero-eyebrow"><span /> AVAILABLE FOR SELECT PROJECTS <i /> {SITE.location}</p>
          <h1><span>Complex things.</span><span className="hero-highlight">Beautifully simple.</span></h1>
          <p className="hero-byline">{SITE.name} <i /> Product engineer &amp; full-stack developer</p>
          <p className="hero-lead">
            I turn tangled workflows into products that feel effortless. Thoughtful interfaces, sturdy systems, and a little bit of wonder.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              Enter the work <span aria-hidden="true">↗</span>
            </a>
            <a href="#contact" className="btn btn-outline">
              Start a conversation <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="hero-footnote"><span>01</span> DESIGN WITH INTENT <b /> BUILD WITH CARE <b /> SHIP FOR PEOPLE</p>
        </div>
        <div className="hero-visual">
          <Suspense fallback={<div className="hero-scene-placeholder" aria-hidden="true" />}>
            <HeroScene />
          </Suspense>
          <div className="hero-image-wrap"><img src="/portrait-cutout-optimized.png" alt={SITE.name} width={400} height={480} /></div>
        </div>
      </div>
      <div className="hero-marquee" aria-label="Selected work: enterprise systems, commerce, applied AI, and digital products">
        <div className="hero-marquee-track" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => (
            <span className="hero-marquee-group" key={index}>
              <b>ENTERPRISE SYSTEMS</b><i>✳</i><b>COMMERCE</b><i>✳</i><b>APPLIED AI</b><i>✳</i><b>DIGITAL PRODUCTS</b><i>✳</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
