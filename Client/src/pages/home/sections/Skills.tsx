import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from "@/shared/hooks";
import { skills } from '@/shared/constants/data';

const categoryColors: Record<string, string> = {
  'Frontend': '#00d4ff',
  'State': '#a78bfa',
  'Auth & Realtime': '#34d399',
  'Integrations': '#fb923c',
  'Tools': '#f472b6',
};

const SkillBar: React.FC<{ name: string; level: number; color: string; dark: boolean; delay: number }> = ({ name, level, color, dark, delay }) => {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setTimeout(() => setW(level), delay);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level, delay]);

  return (
    <div ref={ref} style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, color: dark ? '#e2e8f0' : '#0f172a', fontFamily: "'Inter', sans-serif" }}>{name}</span>
        <span style={{ fontSize: '12px', color,  fontWeight: 600 }}>{level}%</span>
      </div>
      <div style={{ height: '5px', background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)', borderRadius: '5px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${w}%`, borderRadius: '5px',
          background: `linear-gradient(90deg, ${color}66, ${color})`,
          boxShadow: `0 0 8px ${color}44`,
          transition: `width 1.1s cubic-bezier(0.34, 1.4, 0.64, 1)`,
        }} />
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const theme = useAppSelector((s) => s.theme.mode);
  const dark = theme === 'dark';

  const categories = [...new Set(skills.map((s) => s.category))];

  const tools = [
    'React', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3',
    'Redux Toolkit', 'TanStack Query', 'Keycloak', 'WebSockets',
    'LiveKit', 'Mapbox', 'REST APIs', 'Git', 'Jira', 'Agile/Scrum',
  ];

  return (
    <section id="skills" style={{ padding: '120px 32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

         <div style={{ marginBottom: '56px' }}>
          <p style={{  fontSize: '12px', color: '#00d4ff', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>03 — Skills</p>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: dark ? '#f8fafc' : '#0f172a', letterSpacing: '-1.5px', margin: 0 }}>
            What I work with
          </h2>
        </div>

        {/* Skill bars grid */}
        {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {categories.map((cat) => {
            const color = categoryColors[cat] || '#00d4ff';
            const catSkills = skills.filter((s) => s.category === cat);
            return (
              <div key={cat} style={{
                background: dark ? 'rgba(14,14,22,0.6)' : 'rgba(255,255,255,0.8)',
                border: `1px solid ${color}18`,
                borderRadius: '18px', padding: '28px',
                backdropFilter: 'blur(10px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}` }} />
                  <span style={{  fontSize: '11px', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '1.5px' }}>{cat}</span>
                </div>
                {catSkills.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} color={color} dark={dark} delay={i * 80} />
                ))}
              </div>
            );
          })}
        // </div> */} 

        {/* Tag cloud */}
        <div style={{
          background: dark ? 'rgba(14,14,22,0.6)' : 'rgba(255,255,255,0.8)',
          border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)',
          borderRadius: '18px', padding: '28px',
          backdropFilter: 'blur(10px)',
        }}>
          <p style={{  fontSize: '11px', color: dark ? 'rgba(241,245,249,0.3)' : 'rgba(15,23,42,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '18px' }}>// full stack of tools</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tools.map((tool, i) => {
              const cols = ['#00d4ff', '#a78bfa', '#34d399', '#fb923c', '#f472b6', '#60a5fa'];
              const c = cols[i % cols.length];
              return (
                <span key={tool} style={{
                  padding: '7px 14px', borderRadius: '9px',
                  background: `${c}0d`, border: `1px solid ${c}22`,
                  color: dark ? 'rgba(241,245,249,0.7)' : 'rgba(15,23,42,0.7)',
                  fontSize: '13px', fontWeight: 600, fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.2s', cursor: 'default',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${c}1a`; e.currentTarget.style.color = c; e.currentTarget.style.borderColor = `${c}44`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = `${c}0d`; e.currentTarget.style.color = dark ? 'rgba(241,245,249,0.7)' : 'rgba(15,23,42,0.7)'; e.currentTarget.style.borderColor = `${c}22`; }}
                >{tool}</span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
export { Skills };
