"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";
import { resumeData } from "@/lib/data";

const fadeUp: Variants = {
  hidden: { y: 20 },
  visible: (i: number) => ({
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

const highlights = [
  { emoji: "⚡", label: "4+ Years Experience", sub: "React.js · TypeScript · Next.js" },
  { emoji: "🏗️", label: "Enterprise Scale", sub: "Pharma domain · AEM · MUI v5" },
  { emoji: "🚀", label: "Performance Focused", sub: "Core Web Vitals · Bundle Optimization" },
  { emoji: "🤖", label: "AI-Driven Dev", sub: "Copilot · Claude · ChatGPT" },
];

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#0a0a0f", minHeight: "100vh" }}>

      <section
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-28 mesh-bg"
        style={{ minHeight: "90vh", display: "flex", alignItems: "center" }}
      >
        <div
          style={{
            position: "absolute", top: "10%", right: "5%",
            width: 400, height: 400,
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            borderRadius: "50%", pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "10%", left: "5%",
            width: 300, height: 300,
            background: "radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%)",
            borderRadius: "50%", pointerEvents: "none",
          }}
        />

        <div className="relative max-w-4xl mx-auto w-full">
          <motion.div
            initial="hidden" animate="visible" custom={0} variants={fadeUp}
            className="inline-flex items-center gap-2 mb-8"
            style={{
              background: "rgba(230,57,70,0.1)",
              border: "1px solid rgba(230,57,70,0.3)",
              borderRadius: 999,
              padding: "6px 16px",
              fontSize: "0.8rem",
              color: "#fca5a5",
              fontWeight: 500,
            }}
          >
            <span style={{ width: 8, height: 8, background: "#22c55e", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
            Open to Frontend Engineer Roles · Delhi / Remote
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.1, color: "#f1f5f9", marginBottom: "0.5rem" }}>
              Hi, I&apos;m{" "}
              <span style={{ color: "#e63946" }}>Abhinn</span>
            </h1>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, color: "#f1f5f9", marginBottom: "1.5rem" }}>
              Frontend Engineer
            </h2>
          </motion.div>

          <motion.p
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            style={{ fontSize: "1rem", color: "#94a3b8", maxWidth: 560, lineHeight: 1.7, marginBottom: "2rem" }}
          >
            {resumeData.summary}
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" custom={3} variants={fadeUp}
            className="flex flex-wrap gap-2 mb-8"
          >
            {["React.js", "TypeScript", "Next.js", "Redux", "AEM", "MUI v5"].map((t) => (
              <span key={t} className="tag-indigo">{t}</span>
            ))}
          </motion.div>

          <motion.div
            initial="hidden" animate="visible" custom={4} variants={fadeUp}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Link
              href="/contact"
              style={{
                background: "#e63946",
                color: "#fff",
                fontWeight: 700,
                padding: "12px 28px",
                borderRadius: 10,
                fontSize: "0.9rem",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "background 0.2s, transform 0.15s",
                boxShadow: "0 0 20px rgba(230,57,70,0.3)",
              }}
              className="hover:scale-105 active:scale-95"
            >
              Contact Me <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/resume"
              style={{
                background: "transparent",
                color: "#f1f5f9",
                fontWeight: 600,
                padding: "12px 28px",
                borderRadius: 10,
                fontSize: "0.9rem",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid rgba(255,255,255,0.15)",
                transition: "border-color 0.2s, transform 0.15s",
              }}
              className="hover:scale-105 active:scale-95 hover:border-white/40"
            >
              <Download className="w-4 h-4" /> Resume
            </Link>
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={5} variants={fadeUp}>
            <SocialLinks variant="icon" />
          </motion.div>
        </div>
      </section>

      <section style={{ backgroundColor: "#0f0f1a", padding: "80px 0" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card"
                style={{ padding: "24px", cursor: "default" }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>{item.emoji}</div>
                <p style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "0.9rem", marginBottom: 4 }}>{item.label}</p>
                <p style={{ color: "#64748b", fontSize: "0.78rem" }}>{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#f1f5f9", marginBottom: 8 }}>Tech Stack</h2>
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Technologies I work with daily</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {resumeData.skills.flatMap((s) => s.items).slice(0, 24).map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.025 }}
                style={{
                  padding: "8px 18px",
                  background: "#12121f",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 999,
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "#94a3b8",
                  cursor: "default",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                className="hover:border-red-500/50 hover:text-red-400"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: "linear-gradient(135deg, rgba(230,57,70,0.15) 0%, rgba(99,102,241,0.15) 100%)",
          borderTop: "1px solid rgba(230,57,70,0.2)",
          borderBottom: "1px solid rgba(99,102,241,0.2)",
          padding: "64px 0",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#f1f5f9", marginBottom: 12 }}>
            Let&apos;s build something great together
          </h2>
          <p style={{ color: "#94a3b8", marginBottom: 28, fontSize: "0.95rem" }}>
            Open to Frontend Engineer / React Developer roles. Let&apos;s connect!
          </p>
          <Link
            href="/contact"
            style={{
              background: "#e63946",
              color: "#fff",
              fontWeight: 700,
              padding: "13px 32px",
              borderRadius: 10,
              fontSize: "0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 0 24px rgba(230,57,70,0.35)",
              transition: "transform 0.15s",
            }}
            className="hover:scale-105 active:scale-95"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
