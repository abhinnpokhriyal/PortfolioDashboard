"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

interface Props {
  targetId?: string;
  filename?: string;
}

export default function PDFDownloadButton({
  targetId = "resume-preview",
  filename = "Abhinn_Pokhriyal_Resume.pdf",
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const element = document.getElementById(targetId);
      if (!element) {
        console.error(`Element with id "${targetId}" not found`);
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        ignoreElements: (el) => {
          return false;
        },
        onclone: (clonedDoc) => {
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const computedStyle = window.getComputedStyle(el);
            
            if (computedStyle.color) {
              htmlEl.style.color = computedStyle.color;
            }
            if (computedStyle.backgroundColor) {
              htmlEl.style.backgroundColor = computedStyle.backgroundColor;
            }
            if (computedStyle.borderColor) {
              htmlEl.style.borderColor = computedStyle.borderColor;
            }
          });
        },
      });

      const imgData = canvas.toDataURL("image/png");

      const A4_WIDTH_MM = 210;
      const A4_HEIGHT_MM = 297;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidthMM = A4_WIDTH_MM;
      const imgHeightMM = (canvas.height / canvas.width) * A4_WIDTH_MM;

      let yOffset = 0;

      while (yOffset < imgHeightMM) {
        if (yOffset > 0) pdf.addPage();

        pdf.addImage(
          imgData,
          "PNG",
          0,
          -yOffset,
          imgWidthMM,
          imgHeightMM
        );

        yOffset += A4_HEIGHT_MM;
      }

      pdf.save(filename);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("PDF generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
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
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      {loading ? "Generating..." : "Download PDF"}
    </button>
  );
}
