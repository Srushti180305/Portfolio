import { profile } from '../data'
import './Hero.css'

function Hero() {
  return (
    <section id="hero" className="hero section">
      <div className="container hero-inner">
        <p className="hero-eyebrow">Hello, I'm</p>
        <h1 className="hero-name">{profile.name}</h1>
        <h2 className="hero-role">{profile.role}</h2>
        <p className="hero-pitch">{profile.pitch}</p>
        <div className="hero-buttons">
          <a href="#projects" className="btn">View Projects</a>
          <a href="#contact" className="btn btn-outline">Contact Me</a>
        </div>
      </div>
    </section>
  )
}

export default Hero