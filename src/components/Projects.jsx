import { projects } from '../Data'
import Reveal from './Reveal'

function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Projects</h2>
        </Reveal>
        <div className="project-grid">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 150}>
              <article className="card project-card">
                <h3>{p.title}</h3>
                <p className="project-sub">{p.subtitle}</p>
                <p>{p.description}</p>
                <ul className="tags">
                  {p.tech.map((t) => (
                    <li key={t} className="tag">{t}</li>
                  ))}
                </ul>
                <div className="project-links">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="btn">Live Demo</a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects