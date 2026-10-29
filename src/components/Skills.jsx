import { useState } from 'react'
import { SKILLS } from '../data/site'
import './Skills.css'

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeGroup = SKILLS[activeIndex]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <span className="section-label">Expertise</span>
        <h2 className="section-title">A practical product toolkit</h2>
        <p className="section-intro">
          Tools I use to move from a product problem to a shipped, maintainable application.
        </p>
        <div className="skills-explorer">
          <div className="skills-orbit" aria-hidden="true">
            <div className="skills-orbit-ring skills-orbit-ring-one" />
            <div className="skills-orbit-ring skills-orbit-ring-two" />
            <span className="skills-orbit-core">0{activeIndex + 1}</span>
            <i className="skills-orbit-dot skills-orbit-dot-one" />
            <i className="skills-orbit-dot skills-orbit-dot-two" />
            <i className="skills-orbit-dot skills-orbit-dot-three" />
          </div>
          <div className="skills-detail" key={activeGroup.category}>
            <span className="skills-detail-index">DISCIPLINE 0{activeIndex + 1} / 0{SKILLS.length}</span>
            <h3>{activeGroup.category}</h3>
            <p>Tools I reach for when turning this part of a product into something useful.</p>
            <ul>
              {activeGroup.items.map((item, index) => (
                <li key={item} style={{ '--skill-order': index }}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="skills-tabs" role="group" aria-label="Explore skills by discipline">
            {SKILLS.map((group, index) => (
              <button
                key={group.category}
                type="button"
                aria-pressed={activeIndex === index}
                className={activeIndex === index ? 'active' : ''}
                onClick={() => setActiveIndex(index)}
              >
                <span>0{index + 1}</span>{group.category}<i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
