import { useState } from 'react'
import { profile } from '../Data'
import Reveal from './Reveal'

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
      <div className="container contact">
        <Reveal>
          <h2 className="section-title">Let's Connect</h2>
          <p className="contact-text">
            I'm open to full stack developer opportunities. Say hello!
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="contact-buttons">
            <a href={`mailto:${profile.email}`} className="btn">Email Me</a>
            <button className="btn btn-outline" onClick={copyEmail}>
              {copied ? 'Copied ✓' : 'Copy Email'}
            </button>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline">LinkedIn</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact