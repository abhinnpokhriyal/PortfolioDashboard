"use client";

import { motion } from "framer-motion";
import { WorkExperience } from "@/types/resume";

interface Props { experience: WorkExperience[]; }

const durations: Record<string, string> = {
  exp1: "6 months",
  exp2: "1 yr 11 months",
  exp3: "1 yr 8 months",
};

export default function ExperienceClient({ experience }: Props) {
  return (
    <div style={{ backgroundColor: "#0a0a0f", minHeight: "100vh", padding: "64px 0" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: 8 }}>
            Experience
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
            4+ years building enterprise-scale pharma applications at Omnie Solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.05 }}
          style={{
            background: "linear-gradient(135deg, rgba(230,57,70,0.15), rgba(99,102,241,0.15))",
            border: "1px solid rgba(230,57,70,0.25)",
            borderRadius: 16,
            padding: "20px 24px",
            marginBottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 48, height: 48,
              background: "rgba(230,57,70,0.15)",
              border: "1px solid rgba(230,57,70,0.3)",
              borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.3rem", flexShrink: 0,
            }}
          >
            🏢
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "1rem" }}>Omnie Solutions (I) Pvt Ltd</p>
            <p style={{ color: "#94a3b8", fontSize: "0.82rem", marginTop: 2 }}>📍 Noida, India · Apr 2022 – Present · 4+ years</p>
          </div>
          <div style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: 999,
            padding: "4px 14px",
            fontSize: "0.78rem",
            color: "#86efac",
            fontWeight: 600,
          }}>
            📈 3 Promotions
          </div>
        </motion.div>

        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: 20, top: 0, bottom: 0,
            width: 2,
            background: "linear-gradient(to bottom, #e63946, #6366f1, transparent)",
          }} />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ delay: i * 0.15 }}
                style={{ paddingLeft: 56, position: "relative" }}
              >
                <div style={{
                  position: "absolute", left: 12, top: 6,
                  width: 16, height: 16,
                  borderRadius: "50%",
                  background: i === 0 ? "#22c55e" : "#e63946",
                  border: "3px solid #0a0a0f",
                  boxShadow: i === 0 ? "0 0 10px rgba(34,197,94,0.5)" : "0 0 10px rgba(230,57,70,0.5)",
                }} />

                <div
                  style={{
                    background: "#12121f",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 16,
                    padding: 24,
                    transition: "border-color 0.2s",
                  }}
                  className="hover:border-red-500/30"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "#f1f5f9" }}>{exp.title}</h3>
                      <p style={{ color: "#e63946", fontSize: "0.85rem", marginTop: 2 }}>{exp.company} · {exp.location}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 999,
                        padding: "4px 12px",
                        fontSize: "0.75rem",
                        color: "#94a3b8",
                        display: "inline-block",
                      }}>
                        {exp.startDate} – {exp.current ? <span style={{ color: "#22c55e", fontWeight: 600 }}>Present</span> : exp.endDate}
                      </div>
                      {durations[exp.id] && (
                        <p style={{ color: "#475569", fontSize: "0.72rem", marginTop: 4 }}>{durations[exp.id]}</p>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span style={{ color: "#e63946", marginTop: 6, flexShrink: 0, fontSize: "0.5rem" }}>●</span>
                        <span style={{ color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.65 }}>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: 40,
            textAlign: "center",
            background: "#12121f",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            padding: "16px 24px",
            fontSize: "0.85rem",
            color: "#64748b",
          }}
        >
          Total tenure at Omnie Solutions:{" "}
          <span style={{ color: "#e63946", fontWeight: 700 }}>4+ years (Apr 2022 – Present)</span>
        </motion.div>
      </div>
    </div>
  );
}
