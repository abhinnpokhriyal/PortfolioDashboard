"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        backgroundColor: scrolled ? "rgba(10,10,15,0.95)" : "rgba(10,10,15,0.7)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: "#f1f5f9" }}>
          <span
            style={{
              background: "linear-gradient(135deg, #e63946, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.4rem",
              fontWeight: 800,
            }}
          >
            {"</>"}
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    color: active ? "#e63946" : "#94a3b8",
                    fontWeight: active ? 600 : 400,
                    fontSize: "0.875rem",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    transition: "color 0.2s",
                    display: "block",
                    position: "relative",
                  }}
                  className={active ? "nav-active" : "hover:text-white"}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{ color: "#94a3b8", padding: "8px", borderRadius: "8px" }}
          className="md:hidden hover:text-white transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div
          style={{ backgroundColor: "#0a0a0f", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          className="md:hidden px-4 pb-4"
        >
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{
                      color: active ? "#e63946" : "#94a3b8",
                      fontWeight: active ? 600 : 400,
                      fontSize: "0.875rem",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      display: "block",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
