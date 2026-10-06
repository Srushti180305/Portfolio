import { useEffect, useState } from 'react'
import { profile } from '../Data'
import './Navbar.css'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

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
          <button
            className="icon-btn"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? '🌙' : '☀️'}
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