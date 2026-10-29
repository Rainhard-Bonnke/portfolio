import { useState } from 'react'
import { SERVICES } from '../data/site'
import './Services.css'

const ICONS = ['</>', '◆', '✦']

export default function Services() {
  const [activeService, setActiveService] = useState(0)

  return (
    <section id="services" className="services">
      <div className="container">
        <span className="section-label">What I offer</span>
        <h2 className="section-title">Product work that ships.</h2>
        <p className="section-intro">
          I help teams turn ideas into working digital products across frontend experiences, backend systems,
          workflow tooling, and AI-assisted features that support real business operations.
        </p>
        <div className="services-grid">
          {SERVICES.map((service, i) => {
            const expanded = activeService === i
            const detailId = `service-detail-${i}`

            return (
              <article key={service.title} className={`service-card${expanded ? ' expanded' : ''}`}>
                <button
                  type="button"
                  className="service-trigger"
                  aria-expanded={expanded}
                  aria-controls={detailId}
                  onClick={() => setActiveService(expanded ? -1 : i)}
                >
                  <span className="service-icon" aria-hidden="true">{ICONS[i]}</span>
                  <span className="service-trigger-title">
                    <small>0{i + 1} / CAPABILITY</small>
                    <strong>{service.title}</strong>
                  </span>
                  <span className="service-trigger-mark" aria-hidden="true">{expanded ? '−' : '+'}</span>
                </button>
                <div className="service-detail" id={detailId} hidden={!expanded}>
                  <p>{service.description}</p>
                  <a href="#contact">Let&apos;s make it real <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
