"use client";

import { useState } from "react";
import { ResumeData } from "@/types/resume";
import { MatchResult } from "@/types/job";
import { extractKeywords } from "@/lib/keywordExtractor";
import { optimizeResume } from "@/lib/resumeOptimizer";
import { Sparkles, CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  resumeData: ResumeData;
  onHighlight: (keywords: string[]) => void;
}

export default function JobDescriptionAnalyzer({ resumeData, onHighlight }: Props) {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const analyze = () => {
    if (!jd.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const analysis = extractKeywords(jd);
      const matchResult = optimizeResume(resumeData, analysis);
      setResult(matchResult);
      onHighlight(matchResult.matchedKeywords);
      setLoading(false);
      setShowDetails(true);
    }, 600);
  };

  const scoreColor = !result ? "#94a3b8"
    : result.score >= 75 ? "#22c55e"
    : result.score >= 50 ? "#f59e0b"
    : "#e63946";

  const scoreBg = !result ? "#475569"
    : result.score >= 75 ? "#22c55e"
    : result.score >= 50 ? "#f59e0b"
    : "#e63946";

  return (
    <div className="space-y-4">
      <div>
        <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", fontWeight: 600, marginBottom: 8 }}>
          Paste Job Description
        </label>
        <textarea
          rows={6}
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the full job description here to analyze keyword match and get tailored suggestions..."
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "#0a0a0f",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            color: "#f1f5f9",
            fontSize: "0.85rem",
            resize: "none",
            outline: "none",
          }}
          className="focus:border-red-500/50 placeholder:text-slate-600"
        />
      </div>

      <button
        onClick={analyze}
        disabled={!jd.trim() || loading}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "11px 22px",
          background: loading || !jd.trim() ? "rgba(230,57,70,0.4)" : "#e63946",
          color: "#fff",
          fontWeight: 700,
          fontSize: "0.875rem",
          borderRadius: 10,
          border: "none",
          cursor: loading || !jd.trim() ? "not-allowed" : "pointer",
          boxShadow: "0 0 16px rgba(230,57,70,0.25)",
          transition: "background 0.2s",
        }}
      >
        <Sparkles className="w-4 h-4" />
        {loading ? "Analyzing..." : "Analyze & Optimize"}
      </button>

      {result && (
        <div className="space-y-4">
          <div style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: 600 }}>ATS Match Score</span>
              <span style={{ fontSize: "2rem", fontWeight: 800, color: scoreColor }}>{result.score}%</span>
            </div>
            <div style={{ width: "100%", background: "rgba(255,255,255,0.07)", borderRadius: 999, height: 8 }}>
              <div style={{ width: `${result.score}%`, height: 8, borderRadius: 999, background: scoreBg, transition: "width 0.7s ease" }} />
            </div>
            <p style={{ color: "#64748b", fontSize: "0.78rem", marginTop: 8 }}>
              {result.score >= 75 ? "Excellent! Your resume is well-optimized for this role."
                : result.score >= 50 ? "Good match! A few tweaks will significantly improve your chances."
                : "Low match. Consider tailoring your resume more closely to this JD."}
            </p>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#e63946", background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}
          >
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showDetails ? "Hide" : "Show"} detailed analysis
          </button>

          {showDetails && (
            <div className="space-y-4">
              <div>
                <h4 className="flex items-center gap-2 mb-2" style={{ color: "#f1f5f9", fontSize: "0.85rem", fontWeight: 600 }}>
                  <CheckCircle className="w-4 h-4" style={{ color: "#22c55e" }} />
                  Matched Keywords ({result.matchedKeywords.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.matchedKeywords.map((kw) => (
                    <span key={kw} style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#86efac", padding: "2px 10px", borderRadius: 999, fontSize: "0.72rem" }}>{kw}</span>
                  ))}
                </div>
              </div>

              {result.missingKeywords.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 mb-2" style={{ color: "#f1f5f9", fontSize: "0.85rem", fontWeight: 600 }}>
                    <XCircle className="w-4 h-4" style={{ color: "#e63946" }} />
                    Missing Keywords ({result.missingKeywords.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.missingKeywords.map((kw) => (
                      <span key={kw} style={{ background: "rgba(230,57,70,0.1)", border: "1px solid rgba(230,57,70,0.25)", color: "#fca5a5", padding: "2px 10px", borderRadius: 999, fontSize: "0.72rem" }}>{kw}</span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="flex items-center gap-2 mb-2" style={{ color: "#f1f5f9", fontSize: "0.85rem", fontWeight: 600 }}>
                  <AlertCircle className="w-4 h-4" style={{ color: "#f59e0b" }} />
                  Suggestions
                </h4>
                <ul className="space-y-2">
                  {result.suggestions.map((s, i) => (
                    <li key={i} style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 8, padding: "10px 14px", fontSize: "0.82rem", color: "#94a3b8", display: "flex", gap: 8 }}>
                      <span style={{ color: "#f59e0b", flexShrink: 0 }}>→</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
