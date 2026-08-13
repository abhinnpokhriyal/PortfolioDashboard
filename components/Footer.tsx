import Link from "next/link";
import { socialLinks } from "@/lib/data";

const LinkedInIcon = () => (
  <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const MailIcon = () => (
  <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  linkedin: <LinkedInIcon />,
  github:   <GitHubIcon />,
  mail:     <MailIcon />,
};

const quickLinks = [
  { href: "/about",      label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects",   label: "Projects" },
  { href: "/resume",     label: "Resume" },
  { href: "/contact",    label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Brand column */}
          <div>
            <Link
              href="/"
              aria-label="Abhinn Pokhriyal — home"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #e63946, #6366f1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "1.5rem",
                  fontWeight: 900,
                }}
              >
                {"</>"}
              </span>
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "var(--text-secondary)",
                  letterSpacing: "0.04em",
                }}
              >
                Abhinn Pokhriyal
              </span>
            </Link>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.82rem",
                lineHeight: 1.65,
                maxWidth: 240,
              }}
            >
              Frontend Engineer specialising in React.js, TypeScript &amp; enterprise-scale applications.
            </p>
            {/* Availability badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                marginTop: 14,
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: 999,
                padding: "4px 12px",
              }}
            >
              <span className="pulse-dot" />
              <span style={{ fontSize: "0.73rem", fontWeight: 600, color: "#4ade80" }}>
                Open to opportunities
              </span>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: 14,
              }}
            >
              Quick Links
            </p>
            <ul role="list" className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.85rem",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                    className="hover:text-[var(--red)]"
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "var(--text-muted)",
                        flexShrink: 0,
                      }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <div>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: 14,
              }}
            >
              Connect
            </p>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={`${link.name} — opens in new tab`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 14px",
                    borderRadius: "var(--r-sm)",
                    background: "transparent",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    fontSize: "0.83rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s, background 0.2s",
                  }}
                  className="hover:border-[var(--border-accent)] hover:text-[var(--red)] hover:bg-[var(--red-subtle)]"
                >
                  {iconMap[link.icon]}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "14px 0",
        }}
      >
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            © {year} Abhinn Pokhriyal. Built with Next.js &amp; Tailwind CSS.
          </p>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            Delhi, India
          </p>
        </div>
      </div>
    </footer>
  );
}
