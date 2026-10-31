import { useState } from 'react'
import { PROJECTS } from '../data/projects'
import './Projects.css'

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'systems', label: 'Systems' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'ai', label: 'Applied AI' },
  { id: 'experiences', label: 'Experiences' },
]

const PROJECT_STATS = [
  { value: '5+', label: 'product launches' },
  { value: '3', label: 'delivery modes' },
  { value: '10+', label: 'workflow systems' },
  { value: 'AI + ops', label: 'product focus' },
]

function ProjectPreview({ project, eager = false }) {
  const domain = project.demo?.replace(/^https?:\/\//i, '').replace(/\/$/, '') || project.name
  const previewImage = project.previewImage || project.repoImage || project.demoImage
  const destination = project.demo || project.repo

  return (
    <div
      className={`live-preview live-preview-${project.visual} ${previewImage ? 'has-image' : ''}`}
      aria-label={`${project.name} project screenshot`}
    >
      <div className="preview-toolbar">
        <span className="preview-window-dots" aria-hidden="true"><i /><i /><i /></span>
        <small>{domain}</small>
        {project.demo && <span className="preview-live-status">LIVE</span>}
        <a href={destination} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name}`}>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      {previewImage && (
        <img
          src={previewImage}
          alt={`${project.name} product preview`}
          className="project-real-preview"
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
        />
      )}
    </div>
  )
}

function ProjectLinks({ project }) {
  return (
    <div className="project-actions">
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link project-link-live">
          Open live product <span aria-hidden="true">↗</span>
        </a>
      )}
      <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-link">
        Explore source <span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}

function ProjectHighlights({ items }) {
  if (!items?.length) return null

  return (
    <ul className="project-highlights">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const filteredProjects = PROJECTS
    .filter((project) => activeFilter === 'all' || project.category === activeFilter)
    .sort((first, second) => (first.order || 99) - (second.order || 99))
  const lead = filteredProjects.find((project) => project.featured) || filteredProjects[0]
  const allSupporting = filteredProjects.filter((project) => project !== lead)
  const supporting = activeFilter === 'all' && !showAll
    ? allSupporting.filter((project) => project.featured)
    : allSupporting

  function updateTilt(event) {
    if (event.pointerType !== 'mouse') return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    event.currentTarget.style.setProperty('--tilt-x', `${y * -2.5}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${x * 2.5}deg`)
  }

  function resetTilt(event) {
    event.currentTarget.style.removeProperty('--tilt-x')
    event.currentTarget.style.removeProperty('--tilt-y')
  }

  function selectFilter(filterId) {
    setActiveFilter(filterId)
    if (filterId !== 'all') setShowAll(true)
    else setShowAll(false)
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="projects-heading">
          <div>
            <span className="section-label">Selected work / 2025—26</span>
            <h2 className="section-title">Product work built for real outcomes.</h2>
          </div>
          <div className="projects-header-stack">
            <p>Commerce, operations, and AI-enabled tools designed around actual workflows, business logic, and user trust.</p>
            <div className="projects-proof" aria-label="Portfolio proof points">
              <span><strong>5+</strong> launches</span>
              <span><strong>CRES</strong> team + contract</span>
              <span><strong>AI</strong> + ops systems</span>
            </div>
          </div>
        </div>

        <div className="projects-stats" aria-label="Delivery proof points">
          {PROJECT_STATS.map((stat) => (
            <div className="project-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        {lead && (
          <article className="project-feature">
            <div className="feature-copy">
              <span className="feature-kicker"><i /> LEAD PROJECT · {lead.contribution}</span>
              <h3>{lead.name}</h3>
              <p>{lead.description}</p>
              <ProjectHighlights items={lead.highlights} />
              <div className="project-stack">
                {lead.stack.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <ProjectLinks project={lead} />
            </div>
            <div className="feature-visual"><ProjectPreview project={lead} eager /></div>
            <span className="feature-index" aria-hidden="true">01</span>
          </article>
        )}

        <div className="project-explorer">
          <div className="project-explorer-heading">
            <div>
              <span className="project-explorer-kicker">THE PROJECT INDEX</span>
              <p>Pick a rabbit hole.</p>
            </div>
            <span className="project-result-count" aria-live="polite">{filteredProjects.length} projects</span>
          </div>
          <div className="project-filters" aria-label="Filter projects">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`project-filter${activeFilter === filter.id ? ' active' : ''}`}
                aria-pressed={activeFilter === filter.id}
                onClick={() => selectFilter(filter.id)}
              >
                {filter.label}
                <span>{filter.id === 'all' ? PROJECTS.length : PROJECTS.filter((project) => project.category === filter.id).length}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {supporting.map((project, index) => (
            <article
              key={project.name}
              className={`project-card project-card-${project.visual}`}
              style={{ '--card-order': index }}
              onPointerMove={updateTilt}
              onPointerLeave={resetTilt}
            >
              <div className="project-card-visual"><ProjectPreview project={project} /></div>
              <div className="project-card-copy">
                <div className="project-header">
                  <span className="project-number">{String(index + 2).padStart(2, '0')}</span>
                  <span className="project-contribution">{project.contribution || project.language}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <ProjectHighlights items={project.highlights} />
                <div className="project-stack">
                  {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <ProjectLinks project={project} />
              </div>
            </article>
          ))}
        </div>

        {activeFilter === 'all' && !showAll && allSupporting.length > supporting.length && (
          <div className="projects-more">
            <button type="button" className="btn btn-outline" onClick={() => setShowAll(true)}>
              Open the full index <span aria-hidden="true">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
