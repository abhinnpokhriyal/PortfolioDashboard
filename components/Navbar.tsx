"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/",             label: "Home" },
  { href: "/about",        label: "About" },
  { href: "/projects",     label: "Projects" },
  { href: "/experience",   label: "Experience" },
  { href: "/resume",       label: "Resume" },
  { href: "/cover-letter", label: "Cover Letter" },
  { href: "/contact",      label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname               = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 24);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Trap body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      role="banner"
      style={{
        backgroundColor: scrolled
          ? "rgba(7, 7, 16, 0.92)"
          : "rgba(7, 7, 16, 0.60)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid transparent",
        backdropFilter:         "blur(20px)",
        WebkitBackdropFilter:   "blur(20px)",
        transition: "background-color 0.3s, border-color 0.3s",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Abhinn Pokhriyal — home"
          className="flex items-center gap-2 group"
        >
          <span
            style={{
              background: "linear-gradient(135deg, #e63946 0%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.5rem",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              transition: "filter 0.2s",
            }}
            className="group-hover:brightness-125"
          >
            {"</>"}
          </span>
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}
            className="hidden sm:block group-hover:text-[var(--text-secondary)]"
          >
            abhinn
          </span>
        </Link>

        {/* Desktop nav */}
        <ul
          role="list"
          className="hidden md:flex items-center gap-1"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link${active ? " active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA — desktop only */}
        <Link
          href="/contact"
          aria-label="Contact me"
          style={{
            fontSize: "0.82rem",
            fontWeight: 700,
            padding: "7px 18px",
            borderRadius: "var(--r-sm)",
            background: "var(--red)",
            color: "#fff",
            transition: "background 0.2s, transform 0.15s",
            textDecoration: "none",
          }}
          className="hidden md:inline-flex items-center hover:bg-red-600 active:scale-95"
        >
          Hire Me
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          style={{
            color: "var(--text-secondary)",
            padding: "8px",
            borderRadius: "var(--r-sm)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            transition: "color 0.2s",
          }}
          className="md:hidden hover:text-white"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{
              backgroundColor: "rgba(7,7,16,0.98)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              overflow: "hidden",
            }}
            className="md:hidden"
          >
            <ul
              role="list"
              className="flex flex-col px-4 pb-5 pt-2 gap-1"
            >
              {navLinks.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.045, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "11px 14px",
                        borderRadius: "var(--r-md)",
                        color: active ? "var(--red)" : "var(--text-secondary)",
                        fontWeight: active ? 700 : 500,
                        fontSize: "0.9rem",
                        textDecoration: "none",
                        background: active ? "rgba(230,57,70,0.07)" : "transparent",
                        transition: "background 0.15s, color 0.15s",
                      }}
                      className={active ? "" : "hover:bg-white/5 hover:text-white"}
                    >
                      {active && (
                        <span
                          style={{
                            width: 4,
                            height: 16,
                            background: "var(--red)",
                            borderRadius: 2,
                            flexShrink: 0,
                          }}
                        />
                      )}
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ x: -12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.045, duration: 0.2 }}
                className="pt-2"
              >
                <Link
                  href="/contact"
                  className="btn-primary w-full justify-center"
                  style={{ borderRadius: "var(--r-md)" }}
                >
                  Hire Me
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
