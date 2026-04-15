"use client";

import { useState, useEffect, Activity } from "react";
import { motion } from "framer-motion";
import { ResumeData } from "@/types/resume";
import { resumeData as defaultData } from "@/lib/data";
import ResumeBuilder from "@/components/ResumeBuilder";
import ResumePreview from "@/components/ResumePreview";
import JobDescriptionAnalyzer from "@/components/JobDescriptionAnalyzer";
import PDFDownloadButton from "@/components/PDFDownloadButton";
import { FileText, Edit3, Sparkles, Eye, RotateCcw } from "lucide-react";

type Tab = "preview" | "edit" | "optimize";

export default function ResumePageClient() {
  const [data, setData] = useState<ResumeData>(defaultData);
  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const [highlightKeywords, setHighlightKeywords] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      try { setData(JSON.parse(saved)); } catch {}
    }
  }, []);

  const handleChange = (updated: ResumeData) => {
    setData(updated);
    localStorage.setItem("resumeData", JSON.stringify(updated));
  };

  const handleReset = () => {
    if (confirm("Reset resume to default data? This will clear your edits.")) {
      setData(defaultData);
      localStorage.removeItem("resumeData");
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "preview", label: "Preview", icon: <Eye className="w-4 h-4" /> },
    { id: "edit", label: "Edit Resume", icon: <Edit3 className="w-4 h-4" /> },
    { id: "optimize", label: "ATS Optimizer", icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div style={{ backgroundColor: "#0a0a0f", minHeight: "100vh", padding: "64px 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} style={{ marginBottom: 32 }}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="flex items-center gap-3" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: 6 }}>
                <FileText style={{ width: 32, height: 32, color: "#e63946" }} />
                Resume
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                View, edit, optimize for ATS, and download your resume as PDF.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "9px 16px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  color: "#94a3b8",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                className="hover:border-white/30 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
              <PDFDownloadButton filename="Abhinn_Pokhriyal_Resume.pdf" />
            </div>
          </div>
        </motion.div>

        <div
          style={{
            display: "inline-flex",
            background: "#12121f",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            padding: 4,
            marginBottom: 32,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 18px",
                borderRadius: 9,
                fontSize: "0.85rem",
                fontWeight: activeTab === tab.id ? 700 : 400,
                color: activeTab === tab.id ? "#f1f5f9" : "#64748b",
                background: activeTab === tab.id ? "#e63946" : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div>
            <Activity mode={activeTab === "preview" ? "visible" : "hidden"}>
              <motion.div key="preview-info" initial={{ y: 0 }} animate={{ y: 0 }}
                style={{ background: "#12121f", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
                <p style={{ fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>Resume Preview</p>
                <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: 16 }}>
                  ATS-friendly resume. Use Edit tab to update content, or ATS Optimizer to tailor for a specific job.
                </p>
                {highlightKeywords.length > 0 && (
                  <div style={{
                    background: "rgba(234,179,8,0.08)",
                    border: "1px solid rgba(234,179,8,0.2)",
                    borderRadius: 10,
                    padding: 12,
                  }}>
                    <p style={{ color: "#fbbf24", fontSize: "0.78rem", fontWeight: 600, marginBottom: 8 }}>
                      Highlighting {highlightKeywords.length} matched keywords
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {highlightKeywords.map((kw) => (
                        <span key={kw} style={{
                          background: "rgba(234,179,8,0.15)",
                          border: "1px solid rgba(234,179,8,0.3)",
                          color: "#fbbf24",
                          padding: "2px 8px",
                          borderRadius: 999,
                          fontSize: "0.72rem",
                        }}>{kw}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => setHighlightKeywords([])}
                      style={{ color: "#fbbf24", fontSize: "0.75rem", marginTop: 8, background: "none", border: "none", cursor: "pointer" }}
                    >
                      Clear highlights
                    </button>
                  </div>
                )}
              </motion.div>
            </Activity>

            <Activity mode={activeTab === "edit" ? "visible" : "hidden"}>
              <motion.div key="edit" initial={{ y: 0 }} animate={{ y: 0 }}>
                            <div style={{ background: "#12121f", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 20, marginBottom: 16 }}>
                              <p style={{ fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>Edit Resume</p>
                              <p style={{ color: "#64748b", fontSize: "0.82rem" }}>
                                Changes are saved automatically to your browser. Preview updates in real-time.
                              </p>
                            </div>
                            <ResumeBuilder data={data} onChange={handleChange} />
                          </motion.div>
            </Activity>

            <Activity mode={activeTab === "optimize" ? "visible" : "hidden"}>
              <motion.div key="optimize" initial={{ y: 0 }} animate={{ y: 0 }}
                            style={{ background: "#12121f", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
                            <p style={{ fontWeight: 700, color: "#f1f5f9", marginBottom: 4 }}>ATS Optimizer</p>
                            <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: 20 }}>
                              Paste a job description to get your match score, missing keywords, and tailored suggestions.
                            </p>
                            <JobDescriptionAnalyzer
                              resumeData={data}
                              onHighlight={(kws) => {
                                setHighlightKeywords(kws);
                                setActiveTab("preview");
                              }}
                            />
                          </motion.div>
            </Activity>
          </div>

          <div style={{ overflow: "auto" }}>
            <div style={{
              background: "#12121f",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: 12,
            }}>
              <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden" }}>
                <ResumePreview data={data} highlightKeywords={highlightKeywords} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
