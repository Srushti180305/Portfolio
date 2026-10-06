import { useEffect, useState } from 'react'
import { profile } from '../Data'
import './Navbar.css'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]
const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light'
    } catch {
      return 'light'
    }
  })

  // Apply and remember theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  // Highlight the section currently on screen
  useEffect(() => {
    const ids = ['hero', ...links.map((l) => l.href.slice(1))]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  // Scroll progress bar + hide on scroll down
useEffect(() => {
  let lastY = window.scrollY

  const onScroll = () => {
    const y = window.scrollY
    const max = document.documentElement.scrollHeight - window.innerHeight
    setProgress(max > 0 ? (y / max) * 100 : 0)

    if (y < 80) {
      setHidden(false)            // always show near the top
    } else if (y > lastY + 5) {
      setHidden(true)             // scrolling down
      setOpen(false)              // close the mobile menu
    } else if (y < lastY - 5) {
      setHidden(false)            // scrolling up
    }
    lastY = y
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}, [])

  return (
    <nav className={`navbar ${hidden ? 'navbar-hidden' : ''}`}>
      <div className="container navbar-inner">
        <a href="#hero" className="navbar-logo">
          {profile.name.split(' ')[0]}<span>.</span>
        </a>

        <ul className={`navbar-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={active === link.href.slice(1) ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <button className="icon-btn theme-btn" aria-label="Toggle theme"
  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
>
  <span key={theme} className="theme-icon">
    {theme === 'light' ? <MoonIcon /> : <SunIcon />}
  </span>
</button>
          <button
            className="icon-btn menu-btn"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
      <div className="progress" style={{ width: `${progress}%` }} />
    </nav>
  )
}

export default Navbar