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
        fontFamily: "'Calibri', 'Arial', 'Helvetica', sans-serif",
        backgroundColor: "#ffffff",
        color: "#1a1a1a",
        padding: "12mm 15mm",
        maxWidth: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        fontSize: "10pt",
        lineHeight: "1.4"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "8mm", paddingBottom: "4mm", borderBottom: "2pt solid #0066cc" }}>
        <h1 style={{ fontSize: "20pt", fontWeight: "bold", margin: "0 0 2mm 0", letterSpacing: "1pt", textTransform: "uppercase", color: "#1a1a1a" }}>
          {data.name}
        </h1>
        <div style={{ fontSize: "11pt", color: "#0066cc", marginBottom: "2mm", fontWeight: "700" }}>
          {data.title}
        </div>
        <div style={{ fontSize: "9pt", color: "#333" }}>
          {data.phone} | {data.email} | {data.linkedin.replace("https://", "")} | {data.location}
        </div>
      </div>

      <Section title="PROFESSIONAL SUMMARY">
        <p style={{ margin: 0, fontSize: "9.5pt", color: "#333", lineHeight: "1.5", textAlign: "justify" }}>
          {highlight(data.summary, highlightKeywords)}
        </p>
      </Section>

      <Section title="TECHNICAL SKILLS">
        <div style={{ fontSize: "9.5pt", lineHeight: "1.5" }}>
          {data.skills.map((skill, idx) => (
            <div key={skill.category} style={{ marginBottom: "2mm" }}>
              <span style={{ fontWeight: "bold", color: "#1a1a1a" }}>
                {skill.category}:
              </span>
              {" "}
              <span style={{ color: "#333" }}>
                {highlight(skill.items.join(", "), highlightKeywords)}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="PROFESSIONAL EXPERIENCE">
        {data.experience.map((exp, idx) => (
          <div key={exp.id} style={{ marginBottom: idx < data.experience.length - 1 ? "5mm" : "0", pageBreakInside: "avoid" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1mm" }}>
              <span style={{ fontWeight: "bold", fontSize: "10.5pt", color: "#1a1a1a" }}>
                {exp.title}
              </span>
              <span style={{ fontSize: "9pt", color: "#555", whiteSpace: "nowrap", marginLeft: "10mm", fontStyle: "italic" }}>
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9.5pt", color: "#333", fontWeight: "600", marginBottom: "2mm" }}>
              <span>{exp.company}</span>
              <span style={{ fontStyle: "italic" }}>{exp.location}</span>
            </div>
            <ul style={{ margin: "0 0 2mm 5mm", padding: 0, fontSize: "9pt", listStyleType: "disc", color: "#333" }}>
              {exp.bullets.map((b, i) => (
                <li key={i} style={{ marginBottom: "1.5mm", lineHeight: "1.4", paddingLeft: "2mm" }}>
                  {highlight(b, highlightKeywords)}
                </li>
              ))}
            </ul>
            <div style={{ fontSize: "8.5pt", color: "#555", fontStyle: "italic", marginTop: "1.5mm", paddingLeft: "5mm" }}>
              <span style={{ fontWeight: "600", fontStyle: "normal", color: "#333" }}>Technologies:</span> {exp.techStack?.join(", ") || "N/A"}
            </div>
          </div>
        ))}
      </Section>

      <Section title="PROJECTS">
        {data.projects.map((proj, idx) => (
          <div key={proj.id} style={{ marginBottom: idx < data.projects.length - 1 ? "4mm" : "0", pageBreakInside: "avoid" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1mm" }}>
              <span style={{ fontWeight: "bold", fontSize: "10.5pt", color: "#1a1a1a" }}>
                {proj.name}
              </span>
              {(proj.startDate || proj.endDate) && (
                <span style={{ fontSize: "9pt", color: "#555", whiteSpace: "nowrap", marginLeft: "10mm", fontStyle: "italic" }}>
                  {proj.startDate || "Recent"} - {proj.endDate || "Present"}
                </span>
              )}
            </div>
            <p style={{ margin: "0 0 2mm 0", fontSize: "9.5pt", color: "#333", lineHeight: "1.4", textAlign: "justify" }}>
              {highlight(proj.description, highlightKeywords)}
            </p>
            {proj.bullets && proj.bullets.length > 0 && (
              <ul style={{ margin: "0 0 2mm 5mm", padding: 0, fontSize: "9pt", listStyleType: "disc", color: "#333" }}>
                {proj.bullets.map((b: string, i: number) => (
                  <li key={i} style={{ marginBottom: "1.5mm", lineHeight: "1.4", paddingLeft: "2mm" }}>
                    {highlight(b, highlightKeywords)}
                  </li>
                ))}
              </ul>
            )}
            <div style={{ fontSize: "8.5pt", color: "#555", fontStyle: "italic", marginTop: "1.5mm", paddingLeft: proj.bullets && proj.bullets.length > 0 ? "5mm" : "0" }}>
              <span style={{ fontWeight: "600", fontStyle: "normal", color: "#333" }}>Technologies:</span> {highlight(proj.techStack.join(", "), highlightKeywords)}
            </div>
          </div>
        ))}
      </Section>

      <Section title="EDUCATION">
        {data.education.map((edu, idx) => (
          <div key={edu.id} style={{ marginBottom: idx < data.education.length - 1 ? "3mm" : "0", pageBreakInside: "avoid" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <span style={{ fontWeight: "bold", fontSize: "10.5pt", color: "#1a1a1a" }}>
                  {edu.degree}
                </span>
                <span style={{ fontSize: "9.5pt", color: "#333", margin: "0 1.5mm" }}>|</span>
                <span style={{ fontSize: "9.5pt", color: "#333", fontWeight: "600" }}>
                  {edu.institution}
                </span>
              </div>
              <span style={{ fontSize: "9pt", color: "#555", whiteSpace: "nowrap", marginLeft: "10mm", fontStyle: "italic" }}>
                {edu.startYear} - {edu.endYear}
              </span>
            </div>
            {edu.gpa && (
              <p style={{ margin: "1mm 0 0 0", fontSize: "9pt", color: "#555" }}>
                <span style={{ fontWeight: "600", color: "#333" }}>GPA:</span> {edu.gpa}
              </p>
            )}
          </div>
        ))}
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "5mm", pageBreakInside: "avoid" }}>
      <h2 
        style={{ 
          fontSize: "11pt",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "1pt",
          color: "#ffffff",
          backgroundColor: "#0066cc",
          padding: "1.5mm 3mm",
          marginBottom: "3mm",
          margin: "0 0 3mm 0",
          borderRadius: "2px"
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
