import { SITE, PORTRAIT_IMAGE } from '../data/site'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="hero-eyebrow">
            {SITE.title} · {SITE.location}
          </p>
          <h1>
            Hi, I&apos;m <span className="hero-name">{SITE.name.split(' ')[0]}</span>
            <br />
            Bonnke. I build products that ship.
          </h1>
          <p className="hero-lead">{SITE.tagline}</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View my work
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in touch
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              GitHub profile
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <strong>10+</strong>
              <span>Projects on GitHub</span>
            </div>
            <div>
              <strong>Full-stack</strong>
              <span>React · TypeScript · Node</span>
            </div>
            <div>
              <strong>Nairobi</strong>
              <span>Open to remote roles</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img src={PORTRAIT_IMAGE} alt={SITE.name} width={400} height={480} />
          </div>
        </div>
      </div>
    </section>
  )
}
