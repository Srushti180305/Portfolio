import { useEffect, useState } from 'react'
import { profile } from '../Data'
import './Hero.css'

const roles = [
  'Java Full Stack Developer',
  'Spring Boot Developer',
  'React Enthusiast',
]

function useTyping(words, speed = 90, pause = 1500) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    const fullyTyped = !deleting && text === word
    const fullyDeleted = deleting && text === ''

    // How long to wait before the next step
    let wait = deleting ? speed / 2 : speed
    if (fullyTyped) wait = pause
    if (fullyDeleted) wait = 300

    const timer = setTimeout(() => {
      if (fullyTyped) {
        setDeleting(true)
      } else if (fullyDeleted) {
        setDeleting(false)
        setIndex((index + 1) % words.length)
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, wait)

    return () => clearTimeout(timer)
  }, [text, deleting, index, words, speed, pause])

  return text
}
function Hero() {
  const typed = useTyping(roles)

  return (
    <section id="hero" className="hero section">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="container hero-inner">
        <p className="hero-eyebrow fade-up">Hello, I'm</p>
        <h1 className="hero-name fade-up" style={{ animationDelay: '0.15s' }}>
          {profile.name}
        </h1>
        <h2 className="hero-role fade-up" style={{ animationDelay: '0.3s' }}>
          {typed}
          <span className="cursor" />
        </h2>
        <p className="hero-pitch fade-up" style={{ animationDelay: '0.45s' }}>
          {profile.pitch}
        </p>
        <div className="hero-buttons fade-up" style={{ animationDelay: '0.6s' }}>
          <a href="#projects" className="btn">View Projects</a>
          <a href="#contact" className="btn btn-outline">Contact Me</a>
        </div>
      </div>
    </section>
  )
}

export default Hero