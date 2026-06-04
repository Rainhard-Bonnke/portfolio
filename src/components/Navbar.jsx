import { useEffect, useState } from 'react'
import { SITE } from '../data/site'
import './Navbar.css'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) close()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className="navbar">
      <button
        type="button"
        className={`nav-backdrop ${open ? 'visible' : ''}`}
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onClick={close}
      />

      <div className="container navbar-inner">
        <a href="#home" className="logo" onClick={close}>
          <span className="logo-mark">RB</span>
          <span className="logo-text">{SITE.name.split(' ')[0]}</span>
        </a>

        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main" id="mobile-nav">
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github"
            onClick={close}
          >
            GitHub
          </a>
        </nav>

        <button
          type="button"
          className={`menu-toggle ${open ? 'open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
