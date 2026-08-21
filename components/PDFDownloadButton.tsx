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
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(targetId);
          if (clonedElement) {
            // Ensure all styles are applied
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              const computedStyle = window.getComputedStyle(el);
              
              // Copy essential styles
              htmlEl.style.color = computedStyle.color;
              htmlEl.style.backgroundColor = computedStyle.backgroundColor;
              htmlEl.style.fontSize = computedStyle.fontSize;
              htmlEl.style.fontWeight = computedStyle.fontWeight;
              htmlEl.style.fontFamily = computedStyle.fontFamily;
              htmlEl.style.lineHeight = computedStyle.lineHeight;
              htmlEl.style.borderColor = computedStyle.borderColor;
              htmlEl.style.borderWidth = computedStyle.borderWidth;
              htmlEl.style.borderStyle = computedStyle.borderStyle;
              htmlEl.style.padding = computedStyle.padding;
              htmlEl.style.margin = computedStyle.margin;
            });
          }
        },
      });

      const imgData = canvas.toDataURL("image/png", 1.0);

      const A4_WIDTH_MM = 210;
      const A4_HEIGHT_MM = 297;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const imgWidthMM = A4_WIDTH_MM;
      const imgHeightMM = (canvas.height / canvas.width) * A4_WIDTH_MM;

      let yOffset = 0;
      let pageCount = 0;

      while (yOffset < imgHeightMM) {
        if (pageCount > 0) pdf.addPage();

        pdf.addImage(
          imgData,
          "PNG",
          0,
          -yOffset,
          imgWidthMM,
          imgHeightMM,
          undefined,
          "SLOW"
        );

        yOffset += A4_HEIGHT_MM;
        pageCount++;
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
