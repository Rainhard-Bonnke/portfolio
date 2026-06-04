import { SITE } from '../data/site'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          Copyright © {year} {SITE.name.split(' ')[0]}. Made with care by Spine
        </p>
        <a href={SITE.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  )
}
