import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin } from 'lucide-react';
import { DEFAULT_PROFILE, EDUCATION_HISTORY, EXPERIENCE_TIMELINE, INITIAL_CERTIFICATIONS, INITIAL_PROJECTS, INITIAL_SKILLS } from '../data/blueTeamData';
import './light-portfolio.css';

const projectImages: Record<string, string> = {
  'email-phishing-sandbox-triage': '/assets/project-architectures/phishing-screening.webp',
  'wazuh-siem-detection-lab': '/assets/project-architectures/wazuh-siem-monitoring.webp',
  'agenttesla-malware-dynamic-analysis': '/assets/project-architectures/agenttesla-analysis.webp',
  'iot-malware-ensemble-dnn': '/assets/project-architectures/iot-traffic-detection.webp',
  'lolbins-hybrid-detection-engine': '/assets/project-architectures/lolbins-endpoint-detection.webp',
  'c2-beaconing-detection-engine': '/assets/project-architectures/c2-beacon-detection.webp',
  'secureassess-risk-platform': '/assets/project-architectures/secureassess-risk-flow.webp',
};

const LightPortfolio: React.FC = () => {
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const title = document.title;
    document.title = `${DEFAULT_PROFILE.fullName} — Cyber Security Analyst`;
    return () => { document.title = title; };
  }, []);
  const enter = (delay = 0) => reduceMotion ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: .55, delay } };

  return <div className="light-site">
    <a className="light-skip" href="#light-main">Skip to content</a>
    <header className="light-header"><a className="light-brand" href="#light-home"><span className="light-mark">SE</span><span>Sharabu Eswarachari<small>Cyber Security · Blue Team</small></span></a>
      <nav aria-label="Main navigation"><a href="#light-about">About</a><a href="#light-projects">Projects</a><a href="#light-skills">Skills</a><a href="#light-certifications">Certifications</a><a href="#light-contact">Contact</a></nav>
      <a className="light-switch" href="/">Dark edition <ArrowUpRight size={14} /></a>
    </header>
    <main id="light-main">
      <section className="light-hero" id="light-home">
        <motion.div className="light-copy" {...enter(.05)}>
          <p className="light-eyebrow"><i /> TIRUPATI, INDIA <span>/</span> OPEN TO SOC ROLES</p>
          <h1><span>Hunting threats</span><span>in the noise.</span><em>Defending with intent.</em></h1>
          <p className="light-role">Cyber Security Analyst <span>·</span> Blue Team &amp; SOC Operations</p>
          <p className="light-summary">{DEFAULT_PROFILE.headline}</p>
          <div className="light-actions"><a className="light-button light-primary" href="#light-projects">Explore my work <ArrowDown size={15} /></a><a className="light-button light-outline" href={DEFAULT_PROFILE.resumePdfUrl} target="_blank" rel="noreferrer"><Download size={15} /> Résumé</a></div>
          <div className="light-meta"><span>B.TECH · CYBER SECURITY</span><span>SOC INTERN · SURE PROED</span><span>8 CERTIFICATIONS</span></div>
        </motion.div>
        <motion.figure className="light-portrait" {...enter(.16)}>
          <figcaption><span>PROFILE / 01</span><span>BLUE TEAM</span></figcaption>
          <img src={DEFAULT_PROFILE.portraitDataUrl ?? '/assets/aistudio/Screenshot_2026-10-25_at_7.32.55_PM_3e1d5418.png'} alt="Sharabu Eswarachari" />
          <div><small>CURRENT FOCUS</small><strong>Detection · Response · DLP</strong></div>
        </motion.figure>
      </section>

      <section className="light-about light-section" id="light-about">
        <div className="light-section-title"><p className="light-kicker">01 / ABOUT</p><h2>Calm analysis.<br /><em>Clear action.</em></h2></div>
        <div className="light-about-copy"><p>{DEFAULT_PROFILE.bio.replace(/\s*\(8\.0 CGPA\)/gi, '')}</p>
          <div className="light-stats"><div><b>102</b><span>PortSwigger labs solved</span></div><div><b>25</b><span>LetsDefend modules</span></div><div><b>8</b><span>Industry certifications</span></div></div>
          <div className="light-resume-details"><div><small>EDUCATION</small>{EDUCATION_HISTORY.map(item => <article key={item.id}><b>{item.degree}</b><span>{item.institution}</span><i>{item.period} · {item.score}</i></article>)}</div><div><small>EXPERIENCE</small>{EXPERIENCE_TIMELINE.map(item => <article key={item.id}><b>{item.role}</b><span>{item.company} · {item.mode}</span><i>{item.period}</i></article>)}</div></div>
        </div>
      </section>

      <section className="light-projects light-section" id="light-projects"><div className="light-heading-row"><div><p className="light-kicker">02 / SELECTED WORK</p><h2>Projects that solve<br /><em>real security problems.</em></h2></div><p>Practical tools and investigations, explained in plain language.</p></div>
        <div className="light-project-grid">{INITIAL_PROJECTS.map((project, index) => <motion.article className="light-project" key={project.id} {...enter((index % 2) * .06)}>
          {(() => { const isGitHub = project.repoUrl.includes('github.com'); const action = isGitHub ? 'GitHub' : 'Case report'; return <>
            <a className="light-project-image" href={project.repoUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} ${isGitHub ? 'on GitHub' : 'case report'}`}><img src={projectImages[project.id]} alt={`${project.title} overview`} loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span><i><ArrowUpRight size={17} /></i></a>
            <div className="light-project-copy"><small>{project.category} <span>{project.timeline.split('·')[0].trim()}</span></small><h3>{project.title}</h3><p>{project.whatIBuilt || project.summary}</p><div className="light-result"><small>RESULT</small><b>{project.impactMetric}</b></div><footer><span>{project.toolsUsed.slice(0, 3).join(' · ')}</span><a href={project.repoUrl} target="_blank" rel="noreferrer">{isGitHub ? <Github size={14} /> : <ArrowUpRight size={14} />} {action} <ArrowUpRight size={13} /></a></footer></div>
          </>; })()}
        </motion.article>)}</div>
      </section>

      <section className="light-skills light-section" id="light-skills"><div className="light-section-title"><p className="light-kicker">03 / HOW I WORK</p><h2>From alert<br />to <em>understanding.</em></h2><p>Monitoring, investigation, network security, automation, and data protection.</p></div><div className="light-skill-list">{INITIAL_SKILLS.map((skill, i) => <article key={skill.id}><small>0{i + 1}</small><div><h3>{skill.domain}</h3><p>{skill.subtitle}</p></div><span>{skill.tools.slice(0, 4).join(' · ')}</span></article>)}</div></section>

      <section className="light-certs light-section" id="light-certifications"><div className="light-heading-row"><div><p className="light-kicker">04 / CREDENTIALS</p><h2>Proof of <em>practice.</em></h2></div><p>Eight certifications and learning paths. Select a credential to view its certificate or verification page.</p></div>
        <div className="light-cert-grid">{INITIAL_CERTIFICATIONS.map((cert, i) => <a key={cert.id} className="light-cert" href={cert.certificateAssetUrl || cert.verifiedUrl || '#light-certifications'} target={cert.certificateAssetUrl || cert.verifiedUrl ? '_blank' : undefined} rel="noreferrer"><span>{String(i + 1).padStart(2, '0')}</span><img src={cert.badgeImageUrl || cert.previewImageUrl} alt="" loading="lazy" /><div><b>{cert.name}</b><small>{cert.issuer}</small></div><ArrowUpRight size={15} /></a>)}</div>
      </section>
    </main>
    <footer className="light-contact" id="light-contact"><div><p className="light-kicker">05 / GET IN TOUCH</p><h2>Let’s make<br /><em>systems safer.</em></h2></div><a className="light-email" href={`mailto:${DEFAULT_PROFILE.email}`}>{DEFAULT_PROFILE.email} <ArrowUpRight size={16} /></a><div className="light-footer-bottom"><span>TIRUPATI, ANDHRA PRADESH, INDIA</span><span><a href={DEFAULT_PROFILE.linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn</a><a href={DEFAULT_PROFILE.githubUrl} target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a></span><small>© 2026 SHARABU ESWARACHARI</small></div></footer>
  </div>;
};

export default LightPortfolio;
