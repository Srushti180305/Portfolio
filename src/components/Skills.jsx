import { useState } from 'react'
import { skills } from '../Data'
import Reveal from './Reveal'
import './Skills.css'

const allSkills = skills.flatMap((g) => g.items)

function Skills() {
  const [active, setActive] = useState(0)
  const group = skills[active]

  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Skills</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="skills-layout">
            <div className="skills-tabs" role="tablist">
              {skills.map((g, i) => (
                <button
                  key={g.group}
                  role="tab"
                  aria-selected={active === i}
                  className={`skills-tab ${active === i ? 'active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <span>{g.group}</span>
                  <small>{String(g.items.length).padStart(2, '0')}</small>
                </button>
              ))}
            </div>

            <div className="skills-panel" key={active}>
              <h3 className="skills-panel-title">{group.group}</h3>
              <ul className="skills-chips">
                {group.items.map((item, i) => (
                  <li
                    key={item}
                    className="skill-chip"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="marquee" aria-hidden="true">
  <div className="marquee-track">
    {[...allSkills, ...allSkills].map((s, i) => (
      <span key={i} className="marquee-item">{s}</span>
    ))}
  </div>
</div>
    </section>
  )
}

export default Skills