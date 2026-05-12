import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0a0a0f",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "32px 0",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          style={{
            fontWeight: 800,
            fontSize: "1.1rem",
            background: "linear-gradient(135deg, #e63946, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {"</>"}
        </Link>
        <p style={{ fontSize: "0.8rem", color: "#475569" }}>
          © {new Date().getFullYear()} Abhinn Pokhriyal
        </p>
      </div>
    </footer>
  );
}
