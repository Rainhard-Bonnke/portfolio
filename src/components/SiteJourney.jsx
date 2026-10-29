import { useEffect, useState } from 'react'
import './SiteJourney.css'

const CHAPTERS = [
  { id: 'home', label: 'Intro' },
  { id: 'about', label: 'Approach' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'services', label: 'What I do' },
  { id: 'projects', label: 'Selected work' },
  { id: 'contact', label: 'Say hello' },
]

export default function SiteJourney() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const updateJourney = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      document.documentElement.style.setProperty('--page-progress', `${progress * 100}%`)

      const marker = window.innerHeight * 0.42
      let current = CHAPTERS[0].id
      CHAPTERS.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= marker) current = id
      })
      setActive((previous) => previous === current ? previous : current)
    }

    updateJourney()
    document.addEventListener('scroll', updateJourney, { passive: true, capture: true })
    window.addEventListener('resize', updateJourney)
    return () => {
      document.removeEventListener('scroll', updateJourney, true)
      window.removeEventListener('resize', updateJourney)
      document.documentElement.style.removeProperty('--page-progress')
    }
  }, [])

  return (
    <>
      <div className="journey-progress" aria-hidden="true"><span /></div>
      <nav className="journey-rail" aria-label="Page chapters">
        <span className="journey-rail-title">ON THIS JOURNEY</span>
        {CHAPTERS.map((chapter, index) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className={active === chapter.id ? 'active' : ''}
            aria-current={active === chapter.id ? 'location' : undefined}
            aria-label={`${String(index + 1).padStart(2, '0')} ${chapter.label}`}
            onClick={() => setActive(chapter.id)}
          >
            <span className="journey-rail-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="journey-rail-label">{chapter.label}</span>
            <i aria-hidden="true" />
          </a>
        ))}
      </nav>
    </>
  )
}
