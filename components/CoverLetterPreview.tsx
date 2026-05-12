"use client";

interface Props {
  content: string;
}

export default function CoverLetterPreview({ content }: Props) {
  return (
    <div
      id="cover-letter-preview"
      style={{
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: "5mm 10mm",
        maxWidth: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        fontSize: "11pt",
        lineHeight: "1.5",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        borderRadius: "8px",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "16pt", fontWeight: "bold", margin: "0 0 4px 0", color: "#000" }}>
          ABHINN POKHRIYAL
        </h1>
        <div style={{ fontSize: "10pt", color: "#333", marginBottom: "12px" }}>
          Delhi, India | +91 9599754526 | abhinnpokhriyal@gmail.com
        </div>
        <div style={{ fontSize: "10pt", color: "#0066cc", marginBottom: "16px" }}>
          LinkedIn: linkedin.com/in/abhinn-pokhriyal-a26279194
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <p style={{ margin: "0 0 12px 0", fontSize: "11pt", color: "#000", fontWeight: "600" }}>
          Subject: Application for Frontend Engineer / Software Developer Role
        </p>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <p style={{ margin: "0 0 12px 0", fontSize: "11pt", color: "#000" }}>
          Dear Hiring Manager,
        </p>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <p style={{ margin: "0 0 12px 0", fontSize: "11pt", color: "#000", lineHeight: "1.6" }}>
          I am excited to apply for the Frontend Engineer / Software Developer role at your organization. With 4+ years of experience building scalable enterprise healthcare platforms, I specialize in developing high-performance frontend systems using React.js, Next.js, TypeScript, JavaScript (ES6+), and modern frontend architecture practices.
        </p>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <p style={{ margin: "0 0 12px 0", fontSize: "11pt", color: "#000", lineHeight: "1.6" }}>
          Currently, I work as a Frontend Engineer at Optum through Omnie Solutions, where I contribute to large-scale applications focused on scalability, performance, accessibility, and reliability. During my tenure, I improved CI execution performance by 65%, reducing pipeline execution time from 1500 seconds to under 500 seconds and accelerating release cycles across teams. I also achieved 80%+ test coverage within a short timeframe through Jest optimization and improved testing practices, helping reduce production defects and improve application stability.
        </p>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <p style={{ margin: "0 0 12px 0", fontSize: "11pt", color: "#000", lineHeight: "1.6" }}>
          One of my key strengths is taking ownership of complex frontend initiatives end-to-end. I successfully led a large-scale migration from Material UI v4 to v5 across multiple repositories with zero downtime and contributed to a CMS to Adobe Experience Manager (AEM) migration that improved frontend maintainability and content scalability. Alongside feature development, I have focused heavily on performance optimization through lazy loading, code splitting, reusable component systems, and scalable frontend architecture.
        </p>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <p style={{ margin: "0 0 12px 0", fontSize: "11pt", color: "#000", lineHeight: "1.6" }}>
          What excites me most about product-focused engineering roles is the opportunity to solve real user problems while building performant and maintainable systems at scale. I enjoy collaborating with cross-functional teams, improving engineering workflows, and contributing to products where frontend quality and user experience directly impact business outcomes.
        </p>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <p style={{ margin: "0 0 12px 0", fontSize: "11pt", color: "#000", lineHeight: "1.6" }}>
          I would welcome the opportunity to discuss how my technical background, product mindset, and ownership-driven approach can contribute to your engineering team. Thank you for your time and consideration.
        </p>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <p style={{ margin: "0 0 4px 0", fontSize: "11pt", color: "#000" }}>
          Sincerely,
        </p>
      </div>

      <div style={{ marginTop: "32px" }}>
        <p style={{ margin: "0", fontSize: "11pt", color: "#000", fontWeight: "600" }}>
          Abhinn Pokhriyal
        </p>
      </div>
    </div>
  );
}
