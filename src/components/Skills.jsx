import { SKILLS } from '../data/site'
import './Skills.css'

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <span className="section-label">Expertise</span>
        <h2 className="section-title">Skills & stack</h2>
        <p className="section-intro">
          Technologies I use daily across client and server, aligned with the projects in my
          GitHub portfolio.
        </p>
        <div className="skills-grid">
          {SKILLS.map((group) => (
            <article key={group.category} className="skill-card">
              <h3>{group.category}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
