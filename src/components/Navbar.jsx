import { profile } from '../data'
import './Navbar.css'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="#hero" className="navbar-logo">
          {profile.name.split(' ')[0]}<span>.</span>
        </a>
        <ul className="navbar-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar