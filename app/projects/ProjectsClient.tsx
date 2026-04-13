"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/resume";
import { ExternalLink } from "lucide-react";

interface Props { projects: Project[]; }

const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export default function ProjectsClient({ projects }: Props) {
  return (
    <div style={{ backgroundColor: "#0a0a0f", minHeight: "100vh", padding: "64px 0" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: 8 }}>
            Projects
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
            Enterprise-scale work and key initiatives I&apos;ve led or contributed to.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "#12121f",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              className="hover:border-red-500/40 hover:shadow-[0_0_24px_rgba(230,57,70,0.1)]"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "0.95rem", lineHeight: 1.4, flex: 1 }}>
                  {project.name}
                </h3>
                <div className="flex gap-2 ml-2 shrink-0">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      style={{ color: "#475569", transition: "color 0.2s" }}
                      className="hover:text-white">
                      <GithubIcon />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      style={{ color: "#475569", transition: "color 0.2s" }}
                      className="hover:text-red-400">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <p style={{ color: "#64748b", fontSize: "0.82rem", lineHeight: 1.65, marginBottom: 16, flex: 1 }}>
                {project.description}
              </p>

              <ul className="space-y-1.5 mb-4">
                {project.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span style={{ color: "#22c55e", fontSize: "0.6rem", marginTop: 5, flexShrink: 0 }}>●</span>
                    <span style={{ color: "#94a3b8", fontSize: "0.78rem" }}>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
