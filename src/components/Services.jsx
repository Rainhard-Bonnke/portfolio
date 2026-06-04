import { SERVICES } from '../data/site'
import './Services.css'

const ICONS = ['</>', '◆', '✦']

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <span className="section-label">What I offer</span>
        <h2 className="section-title">How I can help your team</h2>
        <p className="section-intro">
          From greenfield products to extending existing codebases, I deliver full-stack
          solutions employers can evaluate on GitHub.
        </p>
        <div className="services-grid">
          {SERVICES.map((service, i) => (
            <article key={service.title} className="service-card">
              <span className="service-icon" aria-hidden="true">
                {ICONS[i]}
              </span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
