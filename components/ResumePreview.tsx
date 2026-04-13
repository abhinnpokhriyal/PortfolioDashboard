"use client";

import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const LinkedInIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

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
      <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 text-gray-900 dark:text-yellow-100 rounded px-0.5">
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
      className="bg-white text-gray-900 p-8 max-w-[800px] mx-auto font-sans text-sm leading-relaxed"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-4">
        <h1 className="text-2xl font-bold tracking-wide uppercase">{data.name}</h1>
        <p className="text-base font-medium text-gray-600 mt-1">{data.title}</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <Mail className="w-3 h-3" /> {data.email}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3" /> {data.phone}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {data.location}
          </span>
          <span className="flex items-center gap-1">
            <LinkedInIcon /> {data.linkedin.replace("https://", "")}
          </span>
          <span className="flex items-center gap-1">
            <GithubIcon /> {data.github.replace("https://", "")}
          </span>
          {data.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" /> {data.website.replace("https://", "")}
            </span>
          )}
        </div>
      </div>

      <Section title="Professional Summary">
        <p className="text-gray-700">{highlight(data.summary, highlightKeywords)}</p>
      </Section>

      <Section title="Technical Skills">
        <div className="space-y-1">
          {data.skills.map((skill) => (
            <div key={skill.category} className="flex gap-2">
              <span className="font-semibold min-w-[140px] text-gray-800">{skill.category}:</span>
              <span className="text-gray-700">{highlight(skill.items.join(", "), highlightKeywords)}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Work Experience">
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold text-gray-900">{exp.title}</span>
                <span className="text-gray-600"> — {exp.company}, {exp.location}</span>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap ml-2">
                {exp.startDate} – {exp.current ? "Present" : exp.endDate}
              </span>
            </div>
            <ul className="mt-1 space-y-0.5 list-disc list-inside">
              {exp.bullets.map((b, i) => (
                <li key={i} className="text-gray-700">
                  {highlight(b, highlightKeywords)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Projects">
        {data.projects.map((proj) => (
          <div key={proj.id} className="mb-3">
            <div className="flex justify-between items-start">
              <span className="font-bold text-gray-900">{proj.name}</span>
              {proj.liveUrl && (
                <span className="text-xs text-gray-500">{proj.liveUrl.replace("https://", "")}</span>
              )}
            </div>
            <p className="text-gray-700 mt-0.5">{highlight(proj.description, highlightKeywords)}</p>
            <p className="text-gray-600 text-xs mt-0.5">
              <span className="font-semibold">Tech:</span>{" "}
              {highlight(proj.techStack.join(", "), highlightKeywords)}
            </p>
          </div>
        ))}
      </Section>

      <Section title="Education">
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold text-gray-900">{edu.degree}</span>
                <span className="text-gray-600"> — {edu.institution}</span>
              </div>
              <span className="text-gray-500 text-xs whitespace-nowrap ml-2">
                {edu.startYear} – {edu.endYear}
              </span>
            </div>
            {edu.gpa && <p className="text-gray-600 text-xs">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </Section>

      <Section title="Achievements & Awards">
        {data.achievements.map((ach) => (
          <div key={ach.id} className="mb-1 flex gap-2">
            <span className="font-semibold text-gray-800 min-w-fit">{ach.title} ({ach.year}):</span>
            <span className="text-gray-700">{ach.description}</span>
          </div>
        ))}
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}
