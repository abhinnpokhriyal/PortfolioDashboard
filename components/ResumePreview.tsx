"use client";

import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
  highlightKeywords?: string[];
}

function highlight(text: string, keywords: string[]): React.ReactNode {
  if (!keywords.length) return text;
  const pattern = new RegExp(`(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    pattern.test(part) ? (
      <mark key={i} style={{ backgroundColor: "#ffeb3b", color: "#000", padding: "0 2px" }}>
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function ResumePreview({ data, highlightKeywords = [] }: Props) {
  return (
    <div
      id="resume-preview"
      style={{ 
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: "10mm 12mm",
        maxWidth: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        fontSize: "10pt",
        lineHeight: "1.25"
      }}
    >
      {/* Header - ATS Optimized: Simple text, no icons */}
      <div style={{ textAlign: "center", marginBottom: "6px", paddingBottom: "6px", borderBottom: "1.5pt solid #000" }}>
        <h1 style={{ fontSize: "16pt", fontWeight: "bold", margin: "0 0 3px 0", letterSpacing: "0.5pt", textTransform: "uppercase" }}>
          {data.name}
        </h1>
        <div style={{ fontSize: "9pt", color: "#000", marginBottom: "3px" }}>
          {data.email} | {data.phone} | {data.location}
        </div>
        <div style={{ fontSize: "9pt", color: "#000" }}>
          {data.linkedin.replace("https://", "")} | {data.github.replace("https://", "")}
          {data.website && ` | ${data.website.replace("https://", "")}`}
        </div>
      </div>

      {/* Professional Summary */}
      <ATSSection title="PROFESSIONAL SUMMARY">
        <p style={{ margin: 0, fontSize: "9.5pt", color: "#000" }}>
          {highlight(data.summary, highlightKeywords)}
        </p>
      </ATSSection>

      {/* Technical Skills - ATS Friendly: Keywords clearly visible */}
      <ATSSection title="TECHNICAL SKILLS">
        <div style={{ fontSize: "9.5pt" }}>
          {data.skills.map((skill, idx) => (
            <div key={skill.category} style={{ marginBottom: idx < data.skills.length - 1 ? "2px" : "0" }}>
              <span style={{ fontWeight: "bold", color: "#000" }}>
                {skill.category}:
              </span>
              {" "}
              <span style={{ color: "#000" }}>
                {highlight(skill.items.join(", "), highlightKeywords)}
              </span>
            </div>
          ))}
        </div>
      </ATSSection>

      {/* Work Experience - Standard ATS Format */}
      <ATSSection title="PROFESSIONAL EXPERIENCE">
        {data.experience.map((exp, idx) => (
          <div key={exp.id} style={{ marginBottom: idx < data.experience.length - 1 ? "7px" : "0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <span style={{ fontWeight: "bold", fontSize: "10pt", color: "#000" }}>
                  {exp.title}
                </span>
                {" | "}
                <span style={{ fontSize: "9.5pt", color: "#000" }}>
                  {exp.company}, {exp.location}
                </span>
              </div>
              <span style={{ fontSize: "9pt", color: "#000", whiteSpace: "nowrap", marginLeft: "8px" }}>
                {exp.startDate} – {exp.current ? "Present" : exp.endDate}
              </span>
            </div>
            <ul style={{ margin: "2px 0 0 18px", padding: 0, fontSize: "9.5pt", listStyleType: "disc" }}>
              {exp.bullets.map((b, i) => (
                <li key={i} style={{ marginBottom: "1px", color: "#000", lineHeight: "1.3" }}>
                  {highlight(b, highlightKeywords)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ATSSection>

      {/* Projects */}
      <ATSSection title="PROJECTS">
        {data.projects.map((proj, idx) => (
          <div key={proj.id} style={{ marginBottom: idx < data.projects.length - 1 ? "5px" : "0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: "bold", fontSize: "10pt", color: "#000" }}>
                {proj.name}
              </span>
              {proj.liveUrl && (
                <span style={{ fontSize: "8.5pt", color: "#000" }}>
                  {proj.liveUrl.replace("https://", "")}
                </span>
              )}
            </div>
            <p style={{ margin: "1px 0", fontSize: "9.5pt", color: "#000", lineHeight: "1.3" }}>
              {highlight(proj.description, highlightKeywords)}
            </p>
            <p style={{ margin: "1px 0 0 0", fontSize: "9pt", color: "#000" }}>
              <span style={{ fontWeight: "600" }}>Technologies:</span>{" "}
              {highlight(proj.techStack.join(", "), highlightKeywords)}
            </p>
          </div>
        ))}
      </ATSSection>

      {/* Education */}
      <ATSSection title="EDUCATION">
        {data.education.map((edu, idx) => (
          <div key={edu.id} style={{ marginBottom: idx < data.education.length - 1 ? "3px" : "0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <span style={{ fontWeight: "bold", fontSize: "10pt", color: "#000" }}>
                  {edu.degree}
                </span>
                {" | "}
                <span style={{ fontSize: "9.5pt", color: "#000" }}>
                  {edu.institution}
                </span>
              </div>
              <span style={{ fontSize: "9pt", color: "#000", whiteSpace: "nowrap", marginLeft: "8px" }}>
                {edu.startYear} – {edu.endYear}
              </span>
            </div>
            {edu.gpa && (
              <p style={{ margin: "1px 0 0 0", fontSize: "9pt", color: "#000" }}>
                GPA: {edu.gpa}
              </p>
            )}
          </div>
        ))}
      </ATSSection>

      {/* Achievements & Awards */}
      <ATSSection title="ACHIEVEMENTS & AWARDS">
        <div style={{ fontSize: "9.5pt" }}>
          {data.achievements.map((ach, idx) => (
            <div key={ach.id} style={{ marginBottom: idx < data.achievements.length - 1 ? "2px" : "0" }}>
              <span style={{ fontWeight: "600", color: "#000" }}>
                {ach.title} ({ach.year}):
              </span>
              {" "}
              <span style={{ color: "#000" }}>{ach.description}</span>
            </div>
          ))}
        </div>
      </ATSSection>
    </div>
  );
}

// ATS-Optimized Section Component
function ATSSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "7px" }}>
      <h2 
        style={{ 
          fontSize: "11pt",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.5pt",
          color: "#000",
          borderBottom: "1pt solid #000",
          paddingBottom: "2px",
          marginBottom: "4px",
          margin: "0 0 4px 0"
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
