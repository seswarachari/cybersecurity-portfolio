import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';
import type { CaseStudyProject } from '../utils/portfolioLogic';
import { ProjectVisual } from './ProjectVisual';
import { PortSwiggerReports } from './PortSwiggerReports';
import { LiveSocConsole } from './LiveSocConsole';

interface ProjectsSectionProps {
  projects: CaseStudyProject[];
  onSelectProject: (project: CaseStudyProject) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="projects-section">
      <div className="projects-wrap">
        <div className="projects-heading">
          <div>
            <p className="section-eyebrow"><span>03.</span> Practical projects &amp; problem solving</p>
            <h2>What I Built &amp; The<br /><em>Real Problems They Solve ({projects.length})</em></h2>
            <p className="projects-intro">Every project starts with a real security problem, explains what I built in plain language, and includes code and detection rules for technical reviewers.</p>
          </div>
          <div className="projects-heading-action"><span>{String(projects.length).padStart(2, '0')} projects</span></div>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => {
            const hasRepo = project.repoUrl.includes('github.com');
            return (
              <motion.article
                key={project.id}
                className="project-card"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, delay: (index % 2) * 0.06 }}
              >
                <ProjectVisual projectId={project.id} number={String(index + 1).padStart(2, '0')} />

                <div className="project-content">
                  <div className="project-meta"><span>{project.category}</span><span>{project.timeline}</span></div>
                  <h3>{project.title}</h3>
                  <div className="project-built">
                    <span>What I built</span>
                    <p className="project-summary">{project.whatIBuilt || project.summary}</p>
                  </div>

                  <div className="project-outcome"><span>Result</span><strong>{project.impactMetric}</strong></div>

                  <div className="project-tools"><span>Stack</span><div>{project.toolsUsed.slice(0, 3).map((tool) => <span key={tool}>{tool}</span>)}{project.toolsUsed.length > 3 && <span>+{project.toolsUsed.length - 3}</span>}</div></div>

                  <div className="project-actions">
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="repo-action">
                      {hasRepo ? <Github size={15} /> : <ArrowUpRight size={15} />} {hasRepo ? `GitHub · ${project.repoName.split('/').pop()}` : 'Case report'} <ArrowUpRight size={13} />
                    </a>
                    <button type="button" onClick={() => onSelectProject(project)}>Project details <ArrowUpRight size={13} /></button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <section className="project-feature" id="investigation" aria-labelledby="investigation-title">
          <div className="project-feature-heading">
            <p className="section-eyebrow"><span>04.</span> How I think &amp; investigate</p>
            <h3 id="investigation-title">How I handle a real security alert</h3>
            <p>Choose one of four scenarios to follow the investigation from the first alert to the action that protects the company.</p>
          </div>
          <LiveSocConsole />
        </section>

        <PortSwiggerReports />

        <div className="projects-footer"><span>More work and code</span><a href="https://github.com/seswarachari" target="_blank" rel="noopener noreferrer">GitHub profile <ArrowUpRight size={14} /></a></div>
      </div>
    </section>
  );
};
