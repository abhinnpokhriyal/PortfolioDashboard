"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

interface Props {
  targetId?: string;
  filename?: string;
}

export default function PDFDownloadButton({ targetId = "resume-preview", filename = "Abhinn_Pokhriyal_Resume.pdf" }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;
      const element = document.getElementById(targetId);
      if (!element) return;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: "#ffffff", logging: false });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
      const imgX = (pdfWidth - canvas.width * ratio) / 2;
      let position = 0;
      while (position < canvas.height) {
        if (position > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", imgX, -(position * ratio), canvas.width * ratio, canvas.height * ratio);
        position += pdfHeight / ratio;
      }
      pdf.save(filename);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "9px 20px",
        background: loading ? "rgba(34,197,94,0.4)" : "#22c55e",
        color: "#fff",
        fontWeight: 700,
        fontSize: "0.82rem",
        borderRadius: 10,
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        boxShadow: "0 0 16px rgba(34,197,94,0.2)",
        transition: "background 0.2s",
      }}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      {loading ? "Generating..." : "Download PDF"}
    </button>
  );
}
