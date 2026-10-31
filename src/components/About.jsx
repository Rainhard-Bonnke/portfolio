import { useState } from 'react'
import { SITE, EXPERIENCE, ABOUT_IMAGE, PROFESSIONAL_WORK } from '../data/site'
import './About.css'

export default function About() {
  const [activeStep, setActiveStep] = useState(0)
  const selectedStep = EXPERIENCE[activeStep]

  return (
    <section id="about" className="about">
      <div className="container about-grid">
        <div className="about-image">
          <img src={ABOUT_IMAGE} alt={`About ${SITE.name}`} width={360} height={420} />
        </div>
        <div className="about-copy">
          <span className="section-label">About</span>
          <h2 className="section-title">I build systems that help teams move faster.</h2>
          <p>
            I&apos;m a product-focused developer based in {SITE.location}. I work from the first business problem
            through interface design, backend logic, data flow, and deployment, with a strong focus on software
            people can trust and use every day.
          </p>
          <p>
            My work spans commerce platforms, ERP systems, booking flows, irrigation scheduling, and machine-learning
            driven decision tools. I enjoy the full product lifecycle: understanding the workflow, building dependable
            systems, and refining the experience until it feels clear, stable, and intuitive.
          </p>

          <aside className="about-professional-work" aria-label="Professional work">
            <span className="about-professional-index">TEAM + INDEPENDENT</span>
            <div>
              <span className="about-professional-label">PROFESSIONAL WORK</span>
              <p>
                <strong>I work with <a href={PROFESSIONAL_WORK.url} target="_blank" rel="noopener noreferrer">{PROFESSIONAL_WORK.company} <span aria-hidden="true">↗</span></a></strong>
                {PROFESSIONAL_WORK.summary}
              </p>
            </div>
          </aside>

          <div className="about-process-heading">
            <h3 className="about-subhead">How I build</h3>
            <span>SELECT A PHASE <i aria-hidden="true">↘</i></span>
          </div>
          <div className="about-process">
            <div className="about-process-tabs" role="group" aria-label="Explore my build process">
              {EXPERIENCE.map((item, index) => (
                <button
                  type="button"
                  key={item.period}
                  className={activeStep === index ? 'active' : ''}
                  aria-pressed={activeStep === index}
                  onClick={() => setActiveStep(index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.period}</strong>
                  <i aria-hidden="true">↗</i>
                </button>
              ))}
            </div>
            <article className="about-process-detail" key={selectedStep.role}>
              <span>{String(activeStep + 1).padStart(2, '0')} / 03</span>
              <h4>{selectedStep.role}</h4>
              <p>{selectedStep.detail}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
