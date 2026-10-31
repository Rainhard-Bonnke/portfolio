import { SITE } from '../data/site'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-shell">
        <div className="footer-brand">
          <span className="footer-mark">RB</span>
          <div>
            <strong>{SITE.name}</strong>
            <p>Product developer · Remote-ready</p>
          </div>
        </div>

        <div className="footer-meta">
          <p>Copyright © {year} {SITE.name.split(' ')[0]}. Available for product roles and contract delivery.</p>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
