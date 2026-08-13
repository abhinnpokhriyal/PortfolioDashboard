"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ResumeData } from "@/types/resume";
import SocialLinks from "@/components/SocialLinks";
import { MapPin, Mail, Phone, Calendar, GraduationCap, Cpu, Target } from "lucide-react";

interface Props { data: ResumeData; }

/* ── animation ─────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: EASE },
  }),
};

/* ── data ──────────────────────────────────────────────────────── */
const keyAchievements = [
  { icon: "🔄", title: "MUI v4 → v5",      desc: "Migrated 2 enterprise pharma apps across shared repos with zero downtime." },
  { icon: "🏗️", title: "CMS → AEM",        desc: "End-to-end migration to Adobe Experience Manager; optimised bundles & caching." },
  { icon: "📦", title: "JFrog Migration",   desc: "Streamlined artifact management and improved CI/CD reliability at scale." },
  { icon: "⚡", title: "Perf Optimisation", desc: "Restructured asset delivery — better caching, significantly reduced load time." },
  { icon: "🛡️", title: "Security & Quality","desc": "Resolved critical UI vulnerabilities ensuring stable production releases." },
  { icon: "✅", title: "80% Test Coverage", desc: "Achieved SonarQube Quality Gate compliance via optimised test strategies." },
];

const aiTools = [
  { name: "GitHub Copilot", use: "Code completion & generation" },
  { name: "Claude Sonnet",  use: "Refactoring & debugging" },
  { name: "ChatGPT",        use: "Unit tests & code quality" },
];

/* ── sub-components ────────────────────────────────────────────── */
function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        aria-hidden="true"
        style={{
          width: 36,
          height: 36,
          borderRadius: "var(--r-sm)",
          background: "var(--red-subtle)",
          border: "1px solid var(--border-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--red)",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
          {label}
        </p>
        {href ? (
          <a
            href={href}
            style={{
              color: "var(--text-primary)",
              fontSize: "0.85rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "color 0.2s",
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            className="hover:text-[var(--red)]"
          >
            {value}
          </a>
        ) : (
          <p style={{ color: "var(--text-primary)", fontSize: "0.85rem", fontWeight: 500 }}>{value}</p>
        )}
      </div>
    </div>
  );
}

function AchievementCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="card"
      style={{ padding: "20px 18px" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span aria-hidden="true" style={{ fontSize: "1.3rem" }}>{icon}</span>
        <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-primary)" }}>{title}</p>
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", lineHeight: 1.6 }}>{desc}</p>
    </motion.div>
  );
}

/* ── page ──────────────────────────────────────────────────────── */
export default function AboutClient({ data }: Props) {
  return (
    <main
      id="main-content"
      aria-label="About Abhinn Pokhriyal"
      style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh", padding: "72px 0 80px" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          style={{ marginBottom: 56 }}
        >
          <div className="section-eyebrow" aria-hidden="true">About me</div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              marginBottom: 10,
            }}
          >
            Abhinn{" "}
            <span className="gradient-text-br">Pokhriyal</span>
          </h1>
          <p style={{ color: "var(--red)", fontWeight: 600, fontSize: "0.92rem", marginBottom: 16 }}>
            Frontend Engineer · React.js · TypeScript · Redux · AEM
          </p>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.78, fontSize: "0.97rem", maxWidth: 680 }}>
            Frontend Engineer with 4+ years of experience building, modernising, and optimising enterprise-scale
            web applications in the pharma domain. Specialises in high-performance, scalable frontend systems
            using React.js and TypeScript — with a strong focus on clean architecture and user experience.
          </p>
        </motion.div>

        {/* ── 3-column grid ──────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT COLUMN ──────────────────────────────────── */}
          <motion.aside
            aria-label="Personal information and links"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="space-y-5"
          >
            {/* Personal info */}
            <section
              aria-labelledby="personal-info-heading"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-lg)",
                padding: "22px 20px",
              }}
            >
              <h2
                id="personal-info-heading"
                style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem", marginBottom: 18 }}
              >
                Personal Info
              </h2>
              <div className="space-y-4">
                <InfoRow icon={<Mail className="w-4 h-4" />}     label="Email"    value={data.email}  href={`mailto:${data.email}`} />
                <InfoRow icon={<Phone className="w-4 h-4" />}    label="Mobile"   value={data.phone}  href={`tel:${data.phone}`} />
                <InfoRow icon={<MapPin className="w-4 h-4" />}   label="Location" value={data.location} />
                <InfoRow icon={<Calendar className="w-4 h-4" />} label="Birthday" value="23rd December 1999" />
              </div>
            </section>

            {/* Connect */}
            <section aria-labelledby="connect-heading"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-lg)",
                padding: "22px 20px",
              }}
            >
              <h2 id="connect-heading" style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem", marginBottom: 14 }}>
                Connect
              </h2>
              <SocialLinks variant="full" className="flex-col" />
            </section>

            {/* Education */}
            <section aria-labelledby="education-heading"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-lg)",
                padding: "22px 20px",
              }}
            >
              <h2
                id="education-heading"
                className="flex items-center gap-2"
                style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem", marginBottom: 18 }}
              >
                <GraduationCap className="w-4 h-4" aria-hidden="true" style={{ color: "var(--red)" }} />
                Education
              </h2>
              <div className="space-y-5">
                {data.education.map((edu) => (
                  <div
                    key={edu.id}
                    style={{
                      borderLeft: "2px solid var(--red)",
                      paddingLeft: 14,
                    }}
                  >
                    <p style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "0.87rem" }}>{edu.degree}</p>
                    <p style={{ color: "var(--red)", fontSize: "0.8rem", marginTop: 2 }}>{edu.institution}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.73rem", marginTop: 4 }}>
                      {edu.startYear} – {edu.endYear}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Tools */}
            <section aria-labelledby="ai-tools-heading"
              style={{
                background: "rgba(99,102,241,0.06)",
                border: "1px solid rgba(99,102,241,0.18)",
                borderRadius: "var(--r-lg)",
                padding: "22px 20px",
              }}
            >
              <h2
                id="ai-tools-heading"
                className="flex items-center gap-2"
                style={{ fontWeight: 700, color: "#a5b4fc", fontSize: "0.95rem", marginBottom: 14 }}
              >
                <Cpu className="w-4 h-4" aria-hidden="true" />
                AI Tools I Use
              </h2>
              <ul role="list" className="space-y-3">
                {aiTools.map((t) => (
                  <li key={t.name} className="flex items-start gap-2">
                    <span aria-hidden="true" style={{ color: "var(--violet-mid)", marginTop: 2, flexShrink: 0 }}>▸</span>
                    <div>
                      <span style={{ color: "var(--text-primary)", fontSize: "0.85rem", fontWeight: 600 }}>{t.name}</span>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}> — {t.use}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </motion.aside>

          {/* ── RIGHT COLUMN ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Key achievements */}
            <motion.section
              aria-labelledby="achievements-heading"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <h2
                id="achievements-heading"
                style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "1.15rem", marginBottom: 18 }}
              >
                ⚡ Key Achievements &amp; Impact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {keyAchievements.map((item) => (
                  <AchievementCard key={item.title} {...item} />
                ))}
              </div>
            </motion.section>

            {/* Technical skills */}
            <motion.section
              aria-labelledby="skills-heading"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <h2
                id="skills-heading"
                style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "1.15rem", marginBottom: 18 }}
              >
                Technical Skills
              </h2>
              <div className="space-y-5">
                {data.skills.map((skill) => (
                  <div key={skill.category}>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        marginBottom: 9,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {skill.category}
                    </p>
                    <div className="flex flex-wrap gap-2" role="list" aria-label={skill.category}>
                      {skill.items.map((item) => (
                        <span key={item} role="listitem" className="tag-violet">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Looking for */}
            <motion.section
              aria-labelledby="looking-for-heading"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(230,57,70,0.1), rgba(99,102,241,0.1))",
                  border: "1px solid rgba(230,57,70,0.22)",
                  borderRadius: "var(--r-lg)",
                  padding: "24px 22px",
                }}
              >
                <h2
                  id="looking-for-heading"
                  className="flex items-center gap-2"
                  style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "1rem", marginBottom: 10 }}
                >
                  <Target className="w-4 h-4" aria-hidden="true" style={{ color: "var(--red)" }} />
                  What I&apos;m Looking For
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.75 }}>
                  Frontend Engineer / React Developer roles where I can contribute to large-scale applications,
                  drive performance improvements, and grow into frontend architecture and system design.
                </p>
                <p style={{ color: "var(--red)", fontSize: "0.87rem", marginTop: 12, fontWeight: 600 }}>
                  📩 Open to opportunities · Delhi / Remote
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </main>
  );
}
