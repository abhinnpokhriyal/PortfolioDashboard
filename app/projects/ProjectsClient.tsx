"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/resume";
import { ExternalLink, Calendar } from "lucide-react";

interface Props { projects: Project[]; }

// Sort projects by start date descending (most recent first)
function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const yearA = a.startDate === "Present" ? 9999 : parseInt(a.startDate || "0", 10);
    const yearB = b.startDate === "Present" ? 9999 : parseInt(b.startDate || "0", 10);
    return yearB - yearA;
  });
}

const GithubIcon = () => (
  <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

/* Accent colour per project index */
const projectAccents = [
  { border: "var(--border-accent)", glow: "var(--red-glow)",    badge: "var(--red)" },
  { border: "var(--border-violet)", glow: "var(--violet-glow)", badge: "var(--violet-mid)" },
  { border: "rgba(20,184,166,0.3)", glow: "var(--teal-glow)",   badge: "var(--teal)" },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent  = projectAccents[index % projectAccents.length];
  const hasLink = project.githubUrl || project.liveUrl;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby={`project-title-${project.id}`}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-lg)",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
      }}
      className="hover:border-[var(--border-accent)] hover:shadow-[0_0_28px_var(--red-glow)] hover:-translate-y-1"
    >
      {/* Coloured top stripe */}
      <div
        aria-hidden="true"
        style={{
          height: 3,
          background: `linear-gradient(to right, ${accent.badge}, transparent)`,
        }}
      />

      <div style={{ padding: "22px 22px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3
            id={`project-title-${project.id}`}
            style={{
              fontWeight: 800,
              color: "var(--text-primary)",
              fontSize: "1rem",
              lineHeight: 1.35,
              flex: 1,
            }}
          >
            {project.name}
          </h3>

          {/* Links */}
          {hasLink && (
            <div className="flex gap-2 shrink-0" aria-label="Project links">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} GitHub repository`}
                  style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
                  className="hover:text-white"
                >
                  <GithubIcon />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} live project`}
                  style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
                  className="hover:text-[var(--red)]"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Date range */}
        {(project.startDate || project.endDate) && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              color: "var(--text-muted)",
              fontSize: "0.75rem",
              marginBottom: 10,
            }}
          >
            <Calendar className="w-3 h-3" aria-hidden="true" />
            {project.startDate} {project.endDate ? `– ${project.endDate}` : ""}
          </div>
        )}

        {/* Description */}
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.84rem",
            lineHeight: 1.68,
            flex: 1,
            marginBottom: 16,
          }}
        >
          {project.description}
        </p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className="space-y-1.5 mb-4" aria-label="Project highlights">
            {project.highlights.map((h, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#22c55e",
                    marginTop: 7,
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto" aria-label="Technologies used">
          {project.techStack.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsClient({ projects }: Props) {
  const sortedProjects = sortProjects(projects);

  return (
    <main
      id="main-content"
      aria-label="Projects portfolio"
      style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh", padding: "72px 0 80px" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 52 }}
        >
          <div className="section-eyebrow" aria-hidden="true">Portfolio</div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              marginBottom: 10,
            }}
          >
            Featured{" "}
            <span className="gradient-text-br">Projects</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.97rem", maxWidth: 500 }}>
            Enterprise-scale work and key initiatives I&apos;ve led or contributed to at Optum.
          </p>
        </motion.div>

        {/* Projects grid */}
        <section aria-label="Project cards">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* Bottom note */}
        <motion.aside
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            marginTop: 52,
            background: "linear-gradient(135deg, rgba(230,57,70,0.08), rgba(99,102,241,0.08))",
            border: "1px solid rgba(99,102,241,0.18)",
            borderRadius: "var(--r-lg)",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <span aria-hidden="true" style={{ fontSize: "1.4rem" }}>💼</span>
          <div>
            <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.92rem" }}>
              Enterprise projects under NDA
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginTop: 2 }}>
              Detailed case studies available on request. Source code for internal projects is proprietary.
            </p>
          </div>
        </motion.aside>
      </div>
    </main>
  );
}
