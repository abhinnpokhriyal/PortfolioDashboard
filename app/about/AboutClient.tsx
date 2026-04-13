"use client";

import { motion } from "framer-motion";
import { ResumeData } from "@/types/resume";
import SocialLinks from "@/components/SocialLinks";

interface Props { data: ResumeData; }

const keyAchievements = [
  { icon: "🔄", title: "MUI v4 → v5 Migration", desc: "Migrated 2 enterprise pharma apps from MUI v4 to v5 including custom component libraries — improving maintainability, theming consistency, and DX." },
  { icon: "🏗️", title: "CMS → AEM Migration", desc: "Led end-to-end migration to Adobe Experience Manager, moving assets to AEM Assets — optimized bundles, improved caching, faster load times." },
  { icon: "📦", title: "JFrog Migration", desc: "Completed JFrog migration for an enterprise application, streamlining artifact management and improving CI/CD reliability." },
  { icon: "⚡", title: "Performance Optimization", desc: "Restructured asset delivery (images, icons, styles), leading to better caching strategies and significantly reduced load time." },
  { icon: "🛡️", title: "Security & Quality", desc: "Resolved critical and high-severity UI vulnerabilities, ensuring secure and stable production releases." },
  { icon: "✅", title: "80% Test Coverage", desc: "Improved test coverage to ~80% and achieved SonarQube Quality Gate compliance through optimized and scalable test strategies." },
];

const S = {
  page: { backgroundColor: "#0a0a0f", minHeight: "100vh", padding: "64px 0" } as React.CSSProperties,
  h1: { fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: 8 } as React.CSSProperties,
  subtitle: { color: "#e63946", fontWeight: 600, fontSize: "0.9rem", marginBottom: 16 } as React.CSSProperties,
  body: { color: "#94a3b8", lineHeight: 1.75, fontSize: "0.95rem", maxWidth: 700 } as React.CSSProperties,
  card: { background: "#12121f", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 } as React.CSSProperties,
  label: { color: "#475569", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 4 },
  value: { color: "#f1f5f9", fontSize: "0.875rem", fontWeight: 500 } as React.CSSProperties,
  sectionTitle: { fontSize: "1.2rem", fontWeight: 700, color: "#f1f5f9", marginBottom: 16 } as React.CSSProperties,
};

export default function AboutClient({ data }: Props) {
  return (
    <div style={S.page}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} style={{ marginBottom: 48 }}>
          <h1 style={S.h1}>About Me</h1>
          <p style={S.subtitle}>🚀 Frontend Engineer | React.js | TypeScript | Redux | AEM | Performance & Optimization</p>
          <p style={S.body}>
            Frontend Engineer with 4+ years of experience building, modernizing, and optimizing enterprise-scale web
            applications in the pharma domain. I specialize in creating high-performance, scalable frontend systems
            using React.js and TypeScript, with a strong focus on clean architecture, maintainability, and user experience.
          </p>
          <p style={{ ...S.body, marginTop: 12 }}>
            I bring hands-on expertise in migrating legacy systems, improving performance, and delivering
            production-grade solutions in complex enterprise environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ y: 10 }} animate={{ y: 0 }} transition={{ delay: 0.1 }} className="space-y-5">

            <div style={S.card}>
              <p style={{ ...S.sectionTitle, marginBottom: 20 }}>Personal Info</p>
              <div className="space-y-3">
                {[
                  { label: "Full Name", value: "Abhinn Pokhriyal" },
                  { label: "Date of Birth", value: "23rd December 1999" },
                  { label: "Location", value: data.location },
                  { label: "Email", value: data.email, href: `mailto:${data.email}` },
                  { label: "Mobile", value: data.phone, href: `tel:${data.phone}` },
                ].map((item) => (
                  <div key={item.label}>
                    <p style={S.label}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} style={{ ...S.value, color: "#e63946", textDecoration: "none" }}>{item.value}</a>
                    ) : (
                      <p style={S.value}>{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={S.card}>
              <p style={{ ...S.sectionTitle, marginBottom: 16 }}>Connect</p>
              <SocialLinks variant="full" className="flex-col" />
            </div>

            <div style={S.card}>
              <p style={{ ...S.sectionTitle, marginBottom: 16 }}>🎓 Education</p>
              <div className="space-y-5">
                {data.education.map((edu) => (
                  <div key={edu.id} style={{ borderLeft: "2px solid #e63946", paddingLeft: 12 }}>
                    <p style={{ color: "#f1f5f9", fontWeight: 600, fontSize: "0.85rem" }}>{edu.degree}</p>
                    <p style={{ color: "#e63946", fontSize: "0.8rem", marginTop: 2 }}>{edu.institution}</p>
                    <p style={{ color: "#475569", fontSize: "0.75rem", marginTop: 4 }}>{edu.startYear} – {edu.endYear}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...S.card, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
              <p style={{ ...S.sectionTitle, color: "#a5b4fc" }}>🤖 AI Tools I Use</p>
              {[
                { name: "GitHub Copilot", use: "Code completion & generation" },
                { name: "Claude Sonnet (v4)", use: "Refactoring & debugging" },
                { name: "ChatGPT", use: "Unit tests & code quality" },
              ].map((t) => (
                <div key={t.name} className="flex items-start gap-2 mb-2">
                  <span style={{ color: "#6366f1", marginTop: 2 }}>▸</span>
                  <div>
                    <span style={{ color: "#f1f5f9", fontSize: "0.85rem", fontWeight: 600 }}>{t.name}</span>
                    <span style={{ color: "#64748b", fontSize: "0.78rem" }}> — {t.use}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-8">

            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.2 }}>
              <p style={S.sectionTitle}>⚡ Key Achievements & Impact</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {keyAchievements.map((item) => (
                  <div
                    key={item.title}
                    style={{ ...S.card, transition: "border-color 0.2s, box-shadow 0.2s" }}
                    className="hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(230,57,70,0.1)]"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
                      <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "#f1f5f9" }}>{item.title}</p>
                    </div>
                    <p style={{ color: "#64748b", fontSize: "0.78rem", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.3 }}>
              <p style={S.sectionTitle}>Technical Skills</p>
              <div className="space-y-4">
                {data.skills.map((skill) => (
                  <div key={skill.category}>
                    <p style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {skill.category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span key={item} className="tag-indigo">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.4 }}>
              <div style={{
                background: "linear-gradient(135deg, rgba(230,57,70,0.15), rgba(99,102,241,0.15))",
                border: "1px solid rgba(230,57,70,0.25)",
                borderRadius: 16,
                padding: 24,
              }}>
                <p style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "1rem", marginBottom: 8 }}>🎯 What I&apos;m Looking For</p>
                <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  Frontend Engineer / React Developer roles where I can contribute to large-scale applications,
                  drive performance improvements, and grow into frontend architecture and system design.
                </p>
                <p style={{ color: "#e63946", fontSize: "0.85rem", marginTop: 10, fontWeight: 600 }}>📩 Open to opportunities</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
