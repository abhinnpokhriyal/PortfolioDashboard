"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2, Mail, Phone, MapPin, Calendar } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqkqwqn";

interface ContactItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  color: string;
  bg: string;
  border: string;
}

const contactItems: ContactItem[] = [
  {
    icon: <Mail className="w-4 h-4" aria-hidden="true" />,
    label: "Email",
    value: "abhinnpokhriyal@gmail.com",
    href: "mailto:abhinnpokhriyal@gmail.com",
    color: "var(--red)",
    bg: "var(--red-subtle)",
    border: "var(--border-accent)",
  },
  {
    icon: <Phone className="w-4 h-4" aria-hidden="true" />,
    label: "Mobile",
    value: "+91 9599754526",
    href: "tel:+919599754526",
    color: "var(--violet-mid)",
    bg: "var(--violet-subtle)",
    border: "var(--border-violet)",
  },
  {
    icon: <MapPin className="w-4 h-4" aria-hidden="true" />,
    label: "Location",
    value: "Delhi, India",
    color: "var(--teal)",
    bg: "rgba(20,184,166,0.08)",
    border: "rgba(20,184,166,0.22)",
  },
  {
    icon: <Calendar className="w-4 h-4" aria-hidden="true" />,
    label: "Date of Birth",
    value: "23rd December 1999",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.22)",
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: EASE },
  }),
};

/* ── Field ─────────────────────────────────────────────────────── */
function Field({
  id,
  label,
  error,
  required = false,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          color: "var(--text-secondary)",
          fontSize: "0.82rem",
          fontWeight: 600,
          marginBottom: 7,
        }}
      >
        {label}
        {required && (
          <span aria-hidden="true" style={{ color: "var(--red)", marginLeft: 3 }}>*</span>
        )}
      </label>
      {children}
      {error && (
        <p
          role="alert"
          aria-live="polite"
          style={{ color: "var(--red)", fontSize: "0.76rem", marginTop: 5 }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ── main component ────────────────────────────────────────────── */
export default function ContactClient() {
  const uid = useId();

  const [form, setForm]           = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Move focus to first error field
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`${uid}-${firstKey}`)?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || "(No subject)",
          message: form.message,
          _replyto: form.email,
          _subject: `Portfolio Contact: ${form.subject || "New message from " + form.name}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setSubmitError(
          data?.errors?.[0]?.message ||
            "Something went wrong. Please email directly at abhinnpokhriyal@gmail.com"
        );
      }
    } catch {
      const mailtoUrl = `mailto:abhinnpokhriyal@gmail.com?subject=${encodeURIComponent(
        form.subject || "Portfolio Contact from " + form.name
      )}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
      window.location.href = mailtoUrl;
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      id="main-content"
      aria-label="Contact Abhinn Pokhriyal"
      style={{ backgroundColor: "var(--bg-base)", minHeight: "100vh", padding: "72px 0 80px" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          style={{ marginBottom: 52 }}
        >
          <div className="section-eyebrow" aria-hidden="true">Contact</div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              marginBottom: 10,
            }}
          >
            Get in{" "}
            <span className="gradient-text-br">Touch</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.97rem", maxWidth: 500, lineHeight: 1.7 }}>
            Open to Frontend Engineer / React Developer roles. Whether you have an opportunity or just want to say hi — my inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Left — contact info ─────────────────────────── */}
          <motion.aside
            aria-label="Contact information"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="lg:col-span-2 space-y-4"
          >
            <section
              aria-labelledby="contact-info-heading"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-lg)",
                padding: "22px 20px",
              }}
            >
              <h2
                id="contact-info-heading"
                style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem", marginBottom: 20 }}
              >
                Contact Info
              </h2>
              <div className="space-y-4">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "var(--r-sm)",
                        background: item.bg,
                        border: `1px solid ${item.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: item.color,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          style={{
                            color: "var(--text-primary)",
                            fontSize: "0.87rem",
                            fontWeight: 500,
                            textDecoration: "none",
                            transition: "color 0.2s",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "block",
                          }}
                          className="hover:text-[var(--red)]"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ color: "var(--text-primary)", fontSize: "0.87rem", fontWeight: 500 }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Availability note */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(230,57,70,0.08), rgba(99,102,241,0.08))",
                border: "1px solid rgba(230,57,70,0.18)",
                borderRadius: "var(--r-lg)",
                padding: "18px 20px",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
              role="complementary"
              aria-label="Availability status"
            >
              <span className="pulse-dot" style={{ marginTop: 3 }} aria-hidden="true" />
              <div>
                <p style={{ fontWeight: 700, color: "#4ade80", fontSize: "0.87rem", marginBottom: 4 }}>
                  Available for new roles
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.6 }}>
                  Actively looking for Frontend Engineer opportunities. Usually responds within 24 hours.
                </p>
              </div>
            </div>
          </motion.aside>

          {/* ── Right — form ────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="lg:col-span-3"
          >
            {submitted ? (
              /* Success state */
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  borderRadius: "var(--r-lg)",
                  padding: "56px 32px",
                  textAlign: "center",
                }}
                role="status"
                aria-live="polite"
                aria-label="Message sent successfully"
              >
                <CheckCircle
                  style={{ width: 56, height: 56, color: "#22c55e", margin: "0 auto 16px" }}
                  aria-hidden="true"
                />
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
                  Message Sent!
                </h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: 28, lineHeight: 1.7 }}>
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                    setSubmitError("");
                  }}
                  className="btn-ghost"
                  style={{ borderRadius: "var(--r-md)" }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              /* Contact form */
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-lg)",
                  padding: "28px 26px",
                }}
              >
                <h2 style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "1rem", marginBottom: 22 }}>
                  Send a message
                </h2>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field id={`${uid}-name`} label="Your Name" error={errors.name} required>
                      <input
                        id={`${uid}-name`}
                        type="text"
                        value={form.name}
                        placeholder="John Doe"
                        autoComplete="name"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          setErrors({ ...errors, name: "" });
                        }}
                        className={`field-input${errors.name ? " error" : ""}`}
                      />
                    </Field>
                    <Field id={`${uid}-email`} label="Email Address" error={errors.email} required>
                      <input
                        id={`${uid}-email`}
                        type="email"
                        value={form.email}
                        placeholder="john@company.com"
                        autoComplete="email"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          setErrors({ ...errors, email: "" });
                        }}
                        className={`field-input${errors.email ? " error" : ""}`}
                      />
                    </Field>
                  </div>

                  <Field id={`${uid}-subject`} label="Subject">
                    <input
                      id={`${uid}-subject`}
                      type="text"
                      value={form.subject}
                      placeholder="Frontend Engineer Opportunity at XYZ"
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="field-input"
                    />
                  </Field>

                  <Field id={`${uid}-message`} label="Message" error={errors.message} required>
                    <textarea
                      id={`${uid}-message`}
                      rows={5}
                      value={form.message}
                      placeholder="Tell me about the role or project..."
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      onChange={(e) => {
                        setForm({ ...form, message: e.target.value });
                        setErrors({ ...errors, message: "" });
                      }}
                      className={`field-input${errors.message ? " error" : ""}`}
                      style={{ resize: "none" }}
                    />
                  </Field>

                  {/* Submit error */}
                  {submitError && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      style={{
                        color: "var(--red)",
                        fontSize: "0.82rem",
                        background: "var(--red-subtle)",
                        border: "1px solid rgba(230,57,70,0.2)",
                        borderRadius: "var(--r-sm)",
                        padding: "10px 14px",
                      }}
                    >
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    aria-disabled={submitting}
                    className="btn-primary w-full justify-center"
                    style={{
                      borderRadius: "var(--r-md)",
                      opacity: submitting ? 0.7 : 1,
                      cursor: submitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                    Fields marked <span aria-hidden="true" style={{ color: "var(--red)" }}>*</span>{" "}
                    <span className="sr-only">with an asterisk</span> are required.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
