"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Zap, Building2, TrendingUp, Bot, ChevronDown } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";
import { resumeData } from "@/lib/data";

/* ── easing ────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── typewriter hook ───────────────────────────────────────────── */
const ROLES = [
  "Frontend Engineer",
  "React.js Specialist",
  "TypeScript Developer",
  "Performance Engineer",
  "AEM Integrator",
];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    const delay   = deleting ? speed / 2 : charIdx === current.length ? pause : speed;

    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else {
        setDeleting(false);
        setWordIdx((w) => (w + 1) % words.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [words, wordIdx, charIdx, deleting, speed, pause]);

  return displayed;
}

/* ── mouse-parallax orb ─────────────────────────────────────────── */
function ParallaxOrb({
  color, size, top, left, right, bottom, strength = 0.025, delay = 0,
}: {
  color: string; size: number;
  top?: string; left?: string; right?: string; bottom?: string;
  strength?: number; delay?: number;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set((e.clientX - window.innerWidth  / 2) * strength);
      my.set((e.clientY - window.innerHeight / 2) * strength);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my, strength]);

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 1.4, ease: EASE }}
      style={{
        position: "absolute",
        top, left, right, bottom,
        width: size, height: size,
        borderRadius: "50%",
        background: color,
        filter: "blur(60px)",
        pointerEvents: "none",
        x: sx, y: sy,
        zIndex: 0,
      }}
    />
  );
}

/* ── floating accent ring ───────────────────────────────────────── */
function Ring({ size, opacity, top, left, right, bottom, delay = 0 }: {
  size: number; opacity: number;
  top?: string; left?: string; right?: string; bottom?: string; delay?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity, rotate: 360 }}
      transition={{ opacity: { delay, duration: 1 }, rotate: { duration: 30, repeat: Infinity, ease: "linear" } }}
      style={{
        position: "absolute", top, left, right, bottom,
        width: size, height: size,
        borderRadius: "50%",
        border: "1px dashed rgba(230,57,70,0.18)",
        pointerEvents: "none", zIndex: 0,
      }}
    />
  );
}

/* ── stat card ──────────────────────────────────────────────────── */
function HeroStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: EASE }}
      style={{
        padding: "16px 20px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "var(--r-md)",
        backdropFilter: "blur(12px)",
        textAlign: "center",
        minWidth: 100,
      }}
    >
      <p
        className="gradient-text-br"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em" }}
        aria-label={`${value} ${label}`}
      >
        {value}
      </p>
      <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 4, fontWeight: 500 }}>{label}</p>
    </motion.div>
  );
}

/* ── section inview wrapper ─────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── highlight card ─────────────────────────────────────────────── */
const highlights = [
  { icon: <Zap     className="w-5 h-5" aria-hidden="true" />, label: "4+ Years",       sub: "React · TypeScript · Next.js", color: "var(--red)",        bg: "var(--red-subtle)",          border: "var(--border-accent)" },
  { icon: <Building2 className="w-5 h-5" aria-hidden="true" />, label: "Enterprise Scale", sub: "Pharma · AEM · MUI v5",   color: "var(--violet-mid)",  bg: "var(--violet-subtle)",       border: "var(--border-violet)" },
  { icon: <TrendingUp className="w-5 h-5" aria-hidden="true" />, label: "65% CI Boost",  sub: "1 500 s → <500 s pipeline", color: "var(--teal)",        bg: "rgba(20,184,166,0.08)",      border: "rgba(20,184,166,0.25)" },
  { icon: <Bot     className="w-5 h-5" aria-hidden="true" />, label: "AI-Driven Dev",   sub: "Copilot · Claude · ChatGPT",  color: "#f59e0b",            bg: "rgba(245,158,11,0.08)",      border: "rgba(245,158,11,0.25)" },
];

const allSkills    = resumeData.skills.flatMap((s) => s.items);
const marqueeItems = [...allSkills, ...allSkills];

/* sort projects chronologically (most recent first) */
function sortProjectsByDate(projects: typeof resumeData.projects) {
  return [...projects].sort((a, b) => {
    const yearA = a.startDate === "Present" ? 9999 : parseInt(a.startDate || "0", 10);
    const yearB = b.startDate === "Present" ? 9999 : parseInt(b.startDate || "0", 10);
    return yearB - yearA;
  });
}

/* ════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const role = useTypewriter(ROLES);
  const sortedProjects = sortProjectsByDate(resumeData.projects);

  return (
    <main id="main-content" style={{ backgroundColor: "var(--bg-base)" }}>

      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <section
        aria-label="Introduction"
        className="relative overflow-hidden"
        style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        {/* ── background layers ── */}
        {/* Grid */}
        <div
          aria-hidden="true"
          className="grid-bg"
          style={{ position: "absolute", inset: 0, opacity: 0.6, zIndex: 0 }}
        />

        {/* Large glowing orbs */}
        <ParallaxOrb color="radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)"  size={700} top="5%"   right="-8%" strength={0.018} delay={0.2} />
        <ParallaxOrb color="radial-gradient(circle, rgba(230,57,70,0.16) 0%, transparent 70%)"   size={500} bottom="0%" left="-10%" strength={0.030} delay={0.5} />
        <ParallaxOrb color="radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 70%)"  size={380} top="45%"  right="15%" strength={0.012} delay={0.8} />

        {/* Decorative dashed rings */}
        <Ring size={600} opacity={0.4} top="-100px" right="-100px" delay={0.6} />
        <Ring size={320} opacity={0.3} bottom="80px" left="-60px" delay={1.0} />

        {/* ── content ── */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28" style={{ zIndex: 1 }}>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: 32 }}
          >
            <div
              role="status"
              aria-live="polite"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(34,197,94,0.07)",
                border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: 999,
                padding: "7px 20px",
                fontSize: "0.78rem",
                color: "#4ade80",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <span className="pulse-dot" aria-hidden="true" />
              Available · Delhi / Remote
            </div>
          </motion.div>

          {/* ── GIANT NAME ── */}
          <div style={{ marginBottom: 20, overflow: "hidden" }}>
            {/* "ABHINN POKHRIYAL" stacked, massive */}
            {["ABHINN", "POKHRIYAL"].map((word, wi) => (
              <div key={word} style={{ overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ delay: 0.1 + wi * 0.12, duration: 0.75, ease: EASE }}
                  style={{
                    fontSize: "clamp(3.5rem, 11vw, 9rem)",
                    fontWeight: 900,
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                    /* gradient fill */
                    background: wi === 0
                      ? "linear-gradient(100deg, #f1f5f9 30%, #94a3b8 100%)"
                      : "linear-gradient(100deg, #e63946 0%, #f59e0b 50%, #6366f1 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block",
                    userSelect: "none",
                  }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* ── Typewriter role line ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 28,
            }}
            aria-label={`Role: ${role}`}
          >
            {/* coloured accent bar */}
            <span
              aria-hidden="true"
              style={{
                width: 4, height: 32, flexShrink: 0,
                background: "linear-gradient(to bottom, var(--red), var(--violet-mid))",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                fontSize: "clamp(1.1rem, 3vw, 1.75rem)",
                fontWeight: 700,
                color: "var(--text-secondary)",
                letterSpacing: "-0.01em",
                minWidth: "16ch",
              }}
            >
              {role}
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: 3, height: "1.1em",
                  background: "var(--red)",
                  marginLeft: 3,
                  verticalAlign: "text-bottom",
                  borderRadius: 1,
                  animation: "blink-cursor 1s step-end infinite",
                }}
              />
            </span>
          </motion.div>

          {/* ── summary ── */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
            style={{
              fontSize: "clamp(0.92rem, 1.8vw, 1.05rem)",
              color: "var(--text-secondary)",
              maxWidth: 560,
              lineHeight: 1.8,
              marginBottom: 36,
            }}
          >
            {resumeData.summary}
          </motion.p>

          {/* ── two-column lower section ── */}
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

            {/* left col: CTAs + social */}
            <div>
              {/* Tech pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.68, duration: 0.5, ease: EASE }}
                className="flex flex-wrap gap-2"
                style={{ marginBottom: 28 }}
                aria-label="Key technologies"
              >
                {["React.js", "TypeScript", "Next.js", "Redux", "AEM", "MUI v5"].map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.72 + i * 0.05, duration: 0.35, ease: EASE }}
                    className="tag-violet"
                    style={{ fontSize: "0.8rem", padding: "5px 14px" }}
                  >
                    {t}
                  </motion.span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.78, duration: 0.5, ease: EASE }}
                className="flex flex-wrap gap-3"
                style={{ marginBottom: 28 }}
              >
                <Link
                  href="/contact"
                  className="btn-primary"
                  style={{ fontSize: "0.92rem", padding: "13px 30px" }}
                >
                  Hire Me <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/resume"
                  className="btn-ghost"
                  style={{ fontSize: "0.92rem", padding: "13px 30px" }}
                >
                  <Download className="w-4 h-4" aria-hidden="true" /> Resume
                </Link>
              </motion.div>

              {/* Social icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <SocialLinks variant="icon" />
              </motion.div>
            </div>

            {/* right col: hero stats */}
            <div
              className="grid grid-cols-2 gap-3"
              style={{ flex: "0 0 auto" }}
              aria-label="Key statistics"
            >
              <HeroStat value="4+"   label="Yrs experience"   delay={0.72} />
              <HeroStat value="65%"  label="CI speed boost"   delay={0.80} />
              <HeroStat value="80%+" label="Test coverage"    delay={0.88} />
              <HeroStat value="0"    label="Downtime migr."   delay={0.96} />
            </div>
          </div>
        </div>

        {/* ── scroll cue ── */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.7 }}
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            zIndex: 1,
          }}
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown
              style={{ width: 22, height: 22, color: "rgba(255,255,255,0.2)" }}
            />
          </motion.div>
        </motion.div>

        {/* ── large ghost text watermark ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -30,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "clamp(5rem, 18vw, 14rem)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.04)",
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          FRONTEND
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          HIGHLIGHTS
      ════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="highlights-heading"
        style={{
          padding: "96px 0",
          backgroundColor: "var(--bg-base)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="section-eyebrow" aria-hidden="true">What I bring</div>
            <h2
              id="highlights-heading"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                marginBottom: 12,
                letterSpacing: "-0.03em",
                maxWidth: 560,
              }}
            >
              Built for scale,{" "}
              <span className="gradient-text-br">designed to perform</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.97rem", maxWidth: 520, marginBottom: 52 }}>
              From 0→1 features to mission-critical migrations in enterprise pharma — I ship production-ready code that lasts.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <article
                  className="card"
                  style={{ padding: "28px 24px", height: "100%" }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      width: 44, height: 44,
                      background: item.bg,
                      border: `1px solid ${item.border}`,
                      borderRadius: "var(--r-md)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: item.color,
                      marginBottom: 16,
                    }}
                  >
                    {item.icon}
                  </div>
                  <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.97rem", marginBottom: 5 }}>
                    {item.label}
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.6 }}>
                    {item.sub}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SKILLS MARQUEE
      ════════════════════════════════════════════════════ */}
      <section
        aria-label="Technologies and skills"
        style={{
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "56px 0",
          overflow: "hidden",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <p className="section-eyebrow" aria-hidden="true">Tech stack</p>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.025em",
            }}
          >
            Technologies I work with daily
          </h2>
        </div>

        <div aria-hidden="true" style={{ overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to right, var(--bg-surface), transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to left, var(--bg-surface), transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div className="marquee-track" style={{ gap: 12 }}>
            {marqueeItems.map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                style={{
                  padding: "9px 22px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 999,
                  fontSize: "0.84rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <ul className="sr-only" aria-label="Full list of skills">
          {allSkills.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURED WORK
      ════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="work-heading"
        style={{ padding: "96px 0", backgroundColor: "var(--bg-base)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="section-eyebrow" aria-hidden="true">Featured work</div>
            <h2
              id="work-heading"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                marginBottom: 12,
                letterSpacing: "-0.03em",
              }}
            >
              Enterprise Projects
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.97rem", maxWidth: 480, marginBottom: 48 }}>
              Healthcare portals, AEM-driven systems, and migration projects at Optum.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sortedProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.1}>
                <article
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r-lg)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
                  }}
                  className="hover:border-[var(--border-accent)] hover:shadow-[0_0_32px_var(--red-glow)] hover:-translate-y-1"
                >
                  {/* top stripe */}
                  <div
                    aria-hidden="true"
                    style={{
                      height: 3,
                      background: i === 0
                        ? "linear-gradient(to right, var(--red), transparent)"
                        : i === 1
                        ? "linear-gradient(to right, var(--violet-mid), transparent)"
                        : "linear-gradient(to right, var(--teal), transparent)",
                    }}
                  />
                  <div style={{ padding: "22px 22px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "0.97rem", marginBottom: 10 }}>
                      {project.name}
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.83rem", lineHeight: 1.68, flex: 1, marginBottom: 16 }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5" aria-label="Tech stack">
                      {project.techStack.slice(0, 4).map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div style={{ marginTop: 36, textAlign: "center" }}>
              <Link href="/projects" className="btn-ghost">
                View all projects <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="cta-heading"
        style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}
      >
        {/* background gradient */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(230,57,70,0.13) 0%, rgba(99,102,241,0.13) 100%)",
            borderTop: "1px solid rgba(230,57,70,0.18)",
            borderBottom: "1px solid rgba(99,102,241,0.18)",
          }}
        />
        {/* ghost watermark */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "clamp(6rem, 22vw, 18rem)",
            fontWeight: 900,
            letterSpacing: "-0.06em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.035)",
            whiteSpace: "nowrap",
            userSelect: "none", pointerEvents: "none",
          }}
        >
          HIRE ME
        </div>

        <div className="relative max-w-3xl mx-auto px-4 text-center" style={{ zIndex: 1 }}>
          <Reveal>
            <p className="section-eyebrow justify-center" aria-hidden="true">Open to work</p>
            <h2
              id="cta-heading"
              style={{
                fontSize: "clamp(1.8rem, 5vw, 3rem)",
                fontWeight: 900,
                color: "var(--text-primary)",
                marginBottom: 16,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Let&apos;s build something{" "}
              <span className="gradient-text-br">great together</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: 36, fontSize: "1.02rem", lineHeight: 1.75, maxWidth: 460, margin: "0 auto 36px" }}>
              Open to Frontend Engineer / React Developer roles. Ping me and let&apos;s connect.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="btn-primary" style={{ fontSize: "0.95rem", padding: "14px 32px" }}>
                Get in touch <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/about" className="btn-ghost" style={{ fontSize: "0.95rem", padding: "14px 32px" }}>
                Learn about me
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* blink cursor keyframe */}
      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </main>
  );
}
