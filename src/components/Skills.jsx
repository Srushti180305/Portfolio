import { skills } from '../Data'
import Reveal from './Reveal'

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Skills</h2>
        </Reveal>
        <div className="skills-grid">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 100}>
              <div className="card skill-card">
                <h3>{group.group}</h3>
                <ul className="tags">
                  {group.items.map((item) => (
                    <li key={item} className="tag">{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills