"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WorkExperience } from "@/types/resume";
import { ChevronDown, MapPin, Calendar, Clock } from "lucide-react";

interface Props { experience: WorkExperience[]; }

const durations: Record<string, string> = {
  exp1: "4+ years · Apr 2022 – Present",
};

const roleColors: Record<number, { bg: string; border: string; dot: string; glow: string }> = {
  0: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.3)", dot: "#22c55e", glow: "rgba(34,197,94,0.4)" },
  1: { bg: "var(--red-subtle)",     border: "var(--border-accent)", dot: "var(--red)", glow: "var(--red-glow)" },
  2: { bg: "var(--violet-subtle)",  border: "var(--border-violet)", dot: "var(--violet-mid)", glow: "var(--violet-glow)" },
};

function ExperienceCard({ exp, index }: { exp: WorkExperience; index: number }) {
  const [expanded, setExpanded] = useState(true);
  const colors   = roleColors[index % 3];
  const isCurrent = exp.current;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ paddingLeft: 52, position: "relative" }}
    >
      {/* Timeline dot */}
      <div
        aria-hidden="true"
        className="timeline-dot"
        style={{
          background: colors.dot,
          boxShadow: `0 0 12px ${colors.glow}`,
        }}
      />

      <article
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-lg)",
          overflow: "hidden",
          transition: "border-color 0.25s, box-shadow 0.25s",
        }}
        className="hover:border-[var(--border-accent)] hover:shadow-[0_0_24px_var(--red-glow)]"
      >
        {/* Card header — always visible */}
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={`exp-body-${exp.id}`}
          style={{
            width: "100%",
            padding: "22px 24px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Role label */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--text-primary)" }}>
                {exp.title}
              </h3>
              {isCurrent && (
                <span className="badge-green" aria-label="Current role">
                  Current
                </span>
              )}
            </div>

            <p style={{ color: "var(--red)", fontSize: "0.87rem", fontWeight: 600, marginBottom: 8 }}>
              {exp.company}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--text-muted)", fontSize: "0.78rem" }}
              >
                <MapPin className="w-3 h-3" aria-hidden="true" />
                {exp.location}
              </span>
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--text-muted)", fontSize: "0.78rem" }}
              >
                <Calendar className="w-3 h-3" aria-hidden="true" />
                {exp.startDate} – {isCurrent ? "Present" : exp.endDate}
              </span>
              {durations[exp.id] && (
                <span
                  style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--text-muted)", fontSize: "0.78rem" }}
                >
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {durations[exp.id]}
                </span>
              )}
            </div>
          </div>

          {/* Expand toggle */}
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: 4 }}
            aria-hidden="true"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={`exp-body-${exp.id}`}
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  padding: "18px 24px 22px",
                }}
              >
                {/* Bullet points */}
                <ul aria-label="Responsibilities and achievements" className="space-y-2.5 mb-5">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--red)",
                          marginTop: 8,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                  {exp.techStack.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </motion.div>
  );
}

export default function ExperienceClient({ experience }: Props) {
  return (
    <main
      id="main-content"
      aria-label="Work experience"
      style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh", padding: "72px 0 80px" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 48 }}
        >
          <div className="section-eyebrow" aria-hidden="true">Career</div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              marginBottom: 10,
            }}
          >
            Work{" "}
            <span className="gradient-text-br">Experience</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.97rem" }}>
            4+ years building enterprise-scale pharma applications at Omnie Solutions India Private Limited.
          </p>
        </motion.div>

        {/* Company banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{
            background: "linear-gradient(135deg, rgba(230,57,70,0.12), rgba(99,102,241,0.12))",
            border: "1px solid rgba(230,57,70,0.22)",
            borderRadius: "var(--r-lg)",
            padding: "18px 22px",
            marginBottom: 44,
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
          role="region"
          aria-label="Employer overview"
        >
          <div
            aria-hidden="true"
            style={{
              width: 48,
              height: 48,
              background: "rgba(230,57,70,0.12)",
              border: "1px solid rgba(230,57,70,0.25)",
              borderRadius: "var(--r-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
              flexShrink: 0,
            }}
          >
            🏢
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "1rem" }}>
              Omnie Solutions India Private Limited
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.83rem", marginTop: 2 }}>
              📍 Noida, India · Apr 2022 – Present · 4+ years
            </p>
          </div>
          <span className="badge-green">Active</span>
        </motion.div>

        {/* Timeline */}
        <div
          role="list"
          aria-label="Work history timeline"
          style={{ position: "relative" }}
        >
          {/* Vertical line */}
          <div className="timeline-line" aria-hidden="true" />

          <div className="space-y-8" role="list">
            {experience.map((exp, i) => (
              <div key={exp.id} role="listitem">
                <ExperienceCard exp={exp} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <motion.aside
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            marginTop: 40,
            textAlign: "center",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-md)",
            padding: "14px 24px",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
          aria-label="Total tenure"
        >
          Total tenure at Omnie Solutions India Private Limited:{" "}
          <strong style={{ color: "var(--red)" }}>4+ years (Apr 2022 – Present)</strong>
        </motion.aside>
      </div>
    </main>
  );
}
