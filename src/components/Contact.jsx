import { useState } from 'react'
import { profile } from '../Data'
import Reveal from './Reveal'
import './Contact.css'

const RESUME = '/Srushti_Lingashettar_Resume.pdf'

const Icon = ({ children }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const LinkedInIcon = () => (
  <Icon>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M8 11v5M8 8v.01M12 16v-5M12 13a2.5 2.5 0 0 1 5 0v3" />
  </Icon>
)

const GitHubIcon = () => (
  <Icon>
    <path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.800-.3 5.500-1.400 5.500-6a4.600 4.600 0 0 0-1.300-3.200 4.200 4.200 0 0 0-.1-3.200s-1.100-.3-3.500 1.300a12 12 0 0 0-6.200 0C6.500 2.800 5.400 3.100 5.400 3.100a4.200 4.200 0 0 0-.1 3.200A4.600 4.600 0 0 0 4 9.500c0 4.600 2.700 5.700 5.500 6-.6.600-.6 1.200-.5 2V21" />
  </Icon>
)

const ResumeIcon = () => (
  <Icon>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </Icon>
)

const MailIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M3 7l9 6 9-6" />
  </Icon>
)

const links = [
  { label: 'LinkedIn', sub: "Let's connect", href: profile.linkedin, icon: <LinkedInIcon /> },
  { label: 'GitHub', sub: 'See my code', href: profile.github, icon: <GitHubIcon /> },
  { label: 'Resume', sub: 'Download PDF', href: RESUME, icon: <ResumeIcon />, download: true },
]

function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <div className="cn-panel">
            <div className="cn-left">
              <p className="cn-eyebrow">Contact</p>
              <h2 className="cn-title">Let's build something together.</h2>
              <p className="cn-text">
                I'm open to full stack developer opportunities. Drop me a message and I'll get back to you.
              </p>

              <div className="cn-email">
                <a href={`mailto:${profile.email}`} className="cn-email-link">
                  <MailIcon />
                  <span>{profile.email}</span>
                </a>
                <button className="cn-copy" onClick={copyEmail}>
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            </div>

            <ul className="cn-links">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="cn-link"
                    {...(l.download
                      ? { download: true }
                      : { target: '_blank', rel: 'noreferrer' })}
                  >
                    <span className="cn-icon">{l.icon}</span>
                    <span className="cn-link-text">
                      <strong>{l.label}</strong>
                      <small>{l.sub}</small>
                    </span>
                    <span className="cn-arrow">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact