import { useState } from 'react'
import { PROJECTS } from '../data/projects'
import './Projects.css'

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const featured = PROJECTS.filter((p) => p.featured)
  const rest = PROJECTS.filter((p) => !p.featured)
  const visible = showAll ? PROJECTS : featured

  return (
    <section id="projects" className="projects">
      <div className="container">
        <span className="section-label">Portfolio</span>
        <h2 className="section-title">Selected work on GitHub</h2>
        <p className="section-intro">
          Production-style applications from my{' '}
          <a
            href="https://github.com/Rainhard-Bonnke"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            @Rainhard-Bonnke
          </a>{' '}
          profile: ERP, safari bookings, travel maps, inventory, and more.
        </p>

        <div className="projects-grid">
          {visible.map((project) => (
            <article key={project.name} className="project-card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <span className="project-lang">{project.language}</span>
              </div>
              <p>{project.description}</p>
              <div className="project-stack">
                {project.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View repository →
              </a>
            </article>
          ))}
        </div>

        {!showAll && rest.length > 0 && (
          <div className="projects-more">
            <button type="button" className="btn btn-outline" onClick={() => setShowAll(true)}>
              Show {rest.length} more projects
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
