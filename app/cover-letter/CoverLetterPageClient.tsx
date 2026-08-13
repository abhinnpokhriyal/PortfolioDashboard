"use client";

import { motion } from "framer-motion";
import CoverLetterPreview from "@/components/CoverLetterPreview";
import PDFDownloadButton from "@/components/PDFDownloadButton";
import { FileText } from "lucide-react";

const coverLetterContent = `Subject: Application for Frontend Engineer / Software Developer Role

Dear Hiring Manager,

I am excited to apply for the Frontend Engineer / Software Developer role at your organization. With 4+ years of experience building scalable enterprise healthcare platforms, I specialize in developing high-performance frontend systems using React.js, Next.js, TypeScript, JavaScript (ES6+), and modern frontend architecture practices.

Currently, I work as a Frontend Engineer at Optum through Omnie Solutions India Private Limited, where I contribute to large-scale applications focused on scalability, performance, accessibility, and reliability. During my tenure, I improved CI execution performance by 65%, reducing pipeline execution time from 1500 seconds to under 500 seconds and accelerating release cycles across teams. I also achieved 80%+ test coverage within a short timeframe through Jest optimization and improved testing practices, helping reduce production defects and improve application stability.

One of my key strengths is taking ownership of complex frontend initiatives end-to-end. I successfully led a large-scale migration from Material UI v4 to v5 across multiple repositories with zero downtime and contributed to a CMS to Adobe Experience Manager (AEM) migration that improved frontend maintainability and content scalability. Alongside feature development, I have focused heavily on performance optimization through lazy loading, code splitting, reusable component systems, and scalable frontend architecture.

What excites me most about product-focused engineering roles is the opportunity to solve real user problems while building performant and maintainable systems at scale. I enjoy collaborating with cross-functional teams, improving engineering workflows, and contributing to products where frontend quality and user experience directly impact business outcomes.

I would welcome the opportunity to discuss how my technical background, product mindset, and ownership-driven approach can contribute to your engineering team. Thank you for your time and consideration.

Sincerely,
Abhinn Pokhriyal`;

export default function CoverLetterPageClient() {
  return (
    <div style={{ backgroundColor: "#0a0a0f", minHeight: "100vh", padding: "64px 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} style={{ marginBottom: 32 }}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="flex items-center gap-3" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: 6 }}>
                <FileText style={{ width: 32, height: 32, color: "#e63946" }} />
                Cover Letter
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                View and download your professional cover letter as PDF.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <PDFDownloadButton 
                targetId="cover-letter-preview" 
                filename="Abhinn_Pokhriyal_Cover_Letter.pdf" 
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          <div style={{ overflow: "auto", display: "flex", justifyContent: "center" }}>
            <CoverLetterPreview content={coverLetterContent} />
          </div>
        </div>
      </div>
    </div>
  );
}
