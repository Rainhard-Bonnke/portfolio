import { SITE, EXPERIENCE, ABOUT_IMAGE } from '../data/site'
import './About.css'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about-grid">
        <div className="about-image">
          <img src={ABOUT_IMAGE} alt={`About ${SITE.name}`} width={360} height={420} />
        </div>
        <div className="about-copy">
          <span className="section-label">About</span>
          <h2 className="section-title">Building software for real businesses</h2>
          <p>
            I&apos;m a full-stack developer based in {SITE.location}, focused on shipping
            dependable web products, not coursework demos. Over the past few years I&apos;ve
            built ERP systems, safari booking platforms, inventory apps, and travel tools
            using React, TypeScript, Node.js, and modern cloud backends.
          </p>
          <p>
            I care about clear architecture, accessible interfaces, and code that teams can
            extend. I collaborate well across design and product, and I&apos;m looking for
            opportunities where I can own features from database to UI.
          </p>

          <h3 className="about-subhead">Professional journey</h3>
          <ul className="timeline">
            {EXPERIENCE.map((item) => (
              <li key={item.period}>
                <span className="timeline-period">{item.period}</span>
                <strong>{item.role}</strong>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
