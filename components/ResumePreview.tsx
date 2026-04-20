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
        padding: "5mm 10mm",
        maxWidth: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        fontSize: "8.5pt",
        lineHeight: "1.1"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "4px", paddingBottom: "3px", borderBottom: "1.5pt solid #000" }}>
        <h1 style={{ fontSize: "15pt", fontWeight: "bold", margin: "0 0 1px 0", letterSpacing: "0.5pt", textTransform: "uppercase" }}>
          {data.name}
        </h1>
        <div style={{ fontSize: "8pt", color: "#0066cc", marginBottom: "1px", fontWeight: "600" }}>
          {data.title}
        </div>
        <div style={{ fontSize: "7.5pt", color: "#000" }}>
          {data.phone} | {data.email} | {data.linkedin.replace("https://", "")} | {data.location}
        </div>
      </div>

      <Section title="PROFESSIONAL SUMMARY">
        <p style={{ margin: 0, fontSize: "8pt", color: "#000", lineHeight: "1.15" }}>
          {highlight(data.summary, highlightKeywords)}
        </p>
      </Section>

      <Section title="TECHNICAL SKILLS">
        <div style={{ fontSize: "8pt", lineHeight: "1.15" }}>
          {data.skills.map((skill, idx) => (
            <div key={skill.category} style={{ marginBottom: "0.5px" }}>
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
      </Section>

      <Section title="PROFESSIONAL EXPERIENCE">
        {data.experience.map((exp, idx) => (
          <div key={exp.id} style={{ marginBottom: idx < data.experience.length - 1 ? "4px" : "0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5px" }}>
              <span style={{ fontWeight: "bold", fontSize: "8.5pt", color: "#000" }}>
                {exp.title}
              </span>
              <span style={{ fontSize: "7.5pt", color: "#000", whiteSpace: "nowrap", marginLeft: "8px" }}>
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "8pt", color: "#000", fontWeight: "600", marginBottom: "1.5px" }}>
              <span>{exp.company}</span>
              <span>{exp.location}</span>
            </div>
            <ul style={{ margin: "0 0 1.5px 12px", padding: 0, fontSize: "7.5pt", listStyleType: "disc" }}>
              {exp.bullets.map((b, i) => (
                <li key={i} style={{ marginBottom: "0.5px", color: "#000", lineHeight: "1.1", paddingLeft: "1px" }}>
                  {highlight(b, highlightKeywords)}
                </li>
              ))}
            </ul>
            <div style={{ fontSize: "7.5pt", color: "#000", fontStyle: "italic", marginTop: "1px" }}>
              <span style={{ fontWeight: "600", fontStyle: "normal" }}>Technologies Used:</span> {exp.techStack?.join(", ") || "N/A"}
            </div>
          </div>
        ))}
      </Section>

      <Section title="PROJECTS">
        {data.projects.map((proj, idx) => (
          <div key={proj.id} style={{ marginBottom: idx < data.projects.length - 1 ? "3px" : "0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: "bold", fontSize: "8.5pt", color: "#000" }}>
                {proj.name}
              </span>
              {(proj.startDate || proj.endDate) && (
                <span style={{ fontSize: "7.5pt", color: "#000", whiteSpace: "nowrap" }}>
                  {proj.startDate || "Recent"} - {proj.endDate || "Present"}
                </span>
              )}
            </div>
            <p style={{ margin: "0.5px 0", fontSize: "8pt", color: "#000", lineHeight: "1.1" }}>
              {highlight(proj.description, highlightKeywords)}
            </p>
            {proj.bullets && proj.bullets.length > 0 && (
              <ul style={{ margin: "0.5px 0 0 12px", padding: 0, fontSize: "7.5pt", listStyleType: "disc" }}>
                {proj.bullets.map((b: string, i: number) => (
                  <li key={i} style={{ marginBottom: "0.5px", color: "#000", lineHeight: "1.1" }}>
                    {highlight(b, highlightKeywords)}
                  </li>
                ))}
              </ul>
            )}
            <div style={{ fontSize: "7.5pt", color: "#000", fontStyle: "italic", marginTop: "0.5px" }}>
              <span style={{ fontWeight: "600", fontStyle: "normal" }}>Technologies Used:</span> {highlight(proj.techStack.join(", "), highlightKeywords)}
            </div>
          </div>
        ))}
      </Section>

      <Section title="EDUCATION">
        {data.education.map((edu, idx) => (
          <div key={edu.id} style={{ marginBottom: idx < data.education.length - 1 ? "2px" : "0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <span style={{ fontWeight: "bold", fontSize: "8.5pt", color: "#000" }}>
                  {edu.degree}
                </span>
                {" | "}
                <span style={{ fontSize: "8pt", color: "#000" }}>
                  {edu.institution}
                </span>
              </div>
              <span style={{ fontSize: "7.5pt", color: "#000", whiteSpace: "nowrap", marginLeft: "8px" }}>
                {edu.startYear} - {edu.endYear}
              </span>
            </div>
            {edu.gpa && (
              <p style={{ margin: "0.5px 0 0 0", fontSize: "7.5pt", color: "#000" }}>
                GPA: {edu.gpa}
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
    <div style={{ marginBottom: "3px" }}>
      <h2 
        style={{ 
          fontSize: "9.5pt",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.5pt",
          color: "#0066cc",
          backgroundColor: "#f0f0f0",
          padding: "1px 0",
          marginBottom: "2px",
          margin: "0 0 2px 0",
          textAlign: "center"
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
