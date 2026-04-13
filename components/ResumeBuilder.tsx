"use client";

import { useState } from "react";
import { ResumeData, WorkExperience, Skill } from "@/types/resume";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  background: "#0a0a0f",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  color: "#f1f5f9",
  fontSize: "0.82rem",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#64748b",
  fontSize: "0.72rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: 4,
};

export default function ResumeBuilder({ data, onChange }: Props) {
  const [openSection, setOpenSection] = useState<string>("basics");

  const update = (field: keyof ResumeData, value: unknown) => onChange({ ...data, [field]: value });
  const toggle = (s: string) => setOpenSection((p) => (p === s ? "" : s));

  return (
    <div className="space-y-3">
      <Accordion title="Basic Info" open={openSection === "basics"} onToggle={() => toggle("basics")}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(["name", "title", "email", "phone", "location", "linkedin", "github", "website"] as const).map((field) => (
            <div key={field}>
              <label style={labelStyle}>{field}</label>
              <input
                type="text"
                value={(data[field] as string) || ""}
                onChange={(e) => update(field, e.target.value)}
                style={inputStyle}
                className="focus:border-red-500/50"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label style={labelStyle}>Summary</label>
            <textarea
              rows={3}
              value={data.summary}
              onChange={(e) => update("summary", e.target.value)}
              style={{ ...inputStyle, resize: "none" }}
              className="focus:border-red-500/50"
            />
          </div>
        </div>
      </Accordion>

      <Accordion title="Work Experience" open={openSection === "experience"} onToggle={() => toggle("experience")}>
        {data.experience.map((exp, idx) => (
          <div key={exp.id} style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 16, marginBottom: 12 }}>
            <div className="flex justify-between items-center mb-3">
              <span style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: 600 }}>
                {exp.title || `Experience ${idx + 1}`}
              </span>
              <button
                onClick={() => update("experience", data.experience.filter((_, i) => i !== idx))}
                style={{ color: "#e63946", background: "none", border: "none", cursor: "pointer", padding: 4 }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              {(["title", "company", "location", "startDate", "endDate"] as const).map((field) => (
                <div key={field}>
                  <label style={labelStyle}>{field}</label>
                  <input
                    type="text"
                    value={(exp[field] as string) || ""}
                    onChange={(e) => {
                      const updated = [...data.experience];
                      updated[idx] = { ...exp, [field]: e.target.value };
                      update("experience", updated);
                    }}
                    style={inputStyle}
                    className="focus:border-red-500/50"
                  />
                </div>
              ))}
            </div>
            <div>
              <label style={labelStyle}>Bullet Points (one per line)</label>
              <textarea
                rows={4}
                value={exp.bullets.join("\n")}
                onChange={(e) => {
                  const updated = [...data.experience];
                  updated[idx] = { ...exp, bullets: e.target.value.split("\n") };
                  update("experience", updated);
                }}
                style={{ ...inputStyle, resize: "none" }}
                className="focus:border-red-500/50"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            const newExp: WorkExperience = { id: `exp${Date.now()}`, title: "", company: "", location: "", startDate: "", endDate: "", current: false, bullets: [""], techStack: [] };
            update("experience", [...data.experience, newExp]);
          }}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#e63946", background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </Accordion>

      <Accordion title="Skills" open={openSection === "skills"} onToggle={() => toggle("skills")}>
        {data.skills.map((skill, idx) => (
          <div key={idx} className="flex gap-2 mb-2 items-start">
            <div className="flex-1 grid grid-cols-3 gap-2">
              <input
                type="text" placeholder="Category" value={skill.category}
                onChange={(e) => {
                  const updated = [...data.skills];
                  updated[idx] = { ...skill, category: e.target.value };
                  update("skills", updated);
                }}
                style={inputStyle}
                className="focus:border-red-500/50"
              />
              <input
                type="text" placeholder="Skills (comma separated)" value={skill.items.join(", ")}
                onChange={(e) => {
                  const updated = [...data.skills];
                  updated[idx] = { ...skill, items: e.target.value.split(",").map((s) => s.trim()) };
                  update("skills", updated);
                }}
                style={inputStyle}
                className="col-span-2 focus:border-red-500/50"
              />
            </div>
            <button
              onClick={() => update("skills", data.skills.filter((_, i) => i !== idx))}
              style={{ color: "#e63946", background: "none", border: "none", cursor: "pointer", padding: 4, marginTop: 2 }}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            const newSkill: Skill = { category: "", items: [] };
            update("skills", [...data.skills, newSkill]);
          }}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#e63946", background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}
        >
          <Plus className="w-4 h-4" /> Add Skill Category
        </button>
      </Accordion>
    </div>
  );
}

function Accordion({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          background: "#12121f",
          color: "#f1f5f9",
          fontWeight: 600,
          fontSize: "0.875rem",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
        className="hover:bg-[#16162a]"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && (
        <div style={{ padding: 16, background: "#0f0f1a" }}>
          {children}
        </div>
      )}
    </div>
  );
}
