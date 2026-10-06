import { profile } from '../Data'
import Reveal from './Reveal'
import photo from '../assets/profile.jpeg'

function About() {
  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <Reveal>
          <h2 className="section-title">About Me</h2>
        </Reveal>
        <div className="about-grid">
          <Reveal>
            <div className="avatar">
                <img src={photo} alt="Portrait of Srushti Lingashettar" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="about-bio">{profile.bio}</p>
            <p className="about-location">📍 {profile.location}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About