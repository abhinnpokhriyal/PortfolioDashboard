"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqkqwqn";

const contactItems = [
  { icon: "✉️", label: "Email", value: "abhinnpokhriyal@gmail.com", href: "mailto:abhinnpokhriyal@gmail.com" },
  { icon: "📱", label: "Mobile", value: "+91 9599754526", href: "tel:+919599754526" },
  { icon: "📍", label: "Location", value: "Delhi, India" },
  { icon: "🎂", label: "Date of Birth", value: "23rd December 1999" },
];

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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
            "Something went wrong. Please try emailing directly at abhinnpokhriyal@gmail.com"
        );
      }
    } catch {
      const mailtoUrl = `mailto:abhinnpokhriyal@gmail.com?subject=${encodeURIComponent(
        form.subject || "Portfolio Contact from " + form.name
      )}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      )}`;
      window.location.href = mailtoUrl;
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "12px 16px",
    background: "#12121f",
    border: `1px solid ${hasError ? "#e63946" : "rgba(255,255,255,0.1)"}`,
    borderRadius: 10,
    color: "#f1f5f9",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
  });

  return (
    <div style={{ backgroundColor: "#0a0a0f", minHeight: "100vh", padding: "64px 0" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: 8 }}>
            Get in Touch
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem", maxWidth: 480 }}>
            Open to Frontend Engineer / React Developer roles. Whether you have an opportunity or just want to say hi — my inbox is open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            <div style={{ background: "#12121f", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
              <p style={{ fontWeight: 700, color: "#f1f5f9", marginBottom: 20 }}>Contact Info</p>
              <div className="space-y-4">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div style={{
                      width: 38, height: 38,
                      background: "rgba(230,57,70,0.1)",
                      border: "1px solid rgba(230,57,70,0.2)",
                      borderRadius: 10,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1rem", flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ color: "#475569", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} style={{ color: "#f1f5f9", fontSize: "0.85rem", fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
                          className="hover:text-red-400">{item.value}</a>
                      ) : (
                        <p style={{ color: "#f1f5f9", fontSize: "0.85rem", fontWeight: 500 }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <CheckCircle style={{ width: 64, height: 64, color: "#22c55e", marginBottom: 16 }} />
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: "#64748b" }}>Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                    setSubmitError("");
                  }}
                  style={{
                    marginTop: 24, padding: "10px 24px",
                    background: "transparent",
                    border: "1px solid rgba(230,57,70,0.4)",
                    borderRadius: 10,
                    color: "#e63946",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", fontWeight: 600, marginBottom: 6 }}>Your Name</label>
                    <input
                      type="text" value={form.name} placeholder="John Doe"
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                      style={inputStyle(!!errors.name)}
                      className="focus:border-red-500/60"
                    />
                    {errors.name && <p style={{ color: "#e63946", fontSize: "0.75rem", marginTop: 4 }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", fontWeight: 600, marginBottom: 6 }}>Email Address</label>
                    <input
                      type="email" value={form.email} placeholder="john@company.com"
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                      style={inputStyle(!!errors.email)}
                      className="focus:border-red-500/60"
                    />
                    {errors.email && <p style={{ color: "#e63946", fontSize: "0.75rem", marginTop: 4 }}>{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", fontWeight: 600, marginBottom: 6 }}>Subject</label>
                  <input
                    type="text" value={form.subject} placeholder="Frontend Engineer Opportunity at XYZ"
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    style={inputStyle()}
                    className="focus:border-red-500/60"
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", fontWeight: 600, marginBottom: 6 }}>Message</label>
                  <textarea
                    rows={5} value={form.message} placeholder="Tell me about the role or project..."
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                    style={{ ...inputStyle(!!errors.message), resize: "none" }}
                    className="focus:border-red-500/60"
                  />
                  {errors.message && <p style={{ color: "#e63946", fontSize: "0.75rem", marginTop: 4 }}>{errors.message}</p>}
                </div>

                {submitError && (
                  <p style={{ color: "#e63946", fontSize: "0.8rem", background: "rgba(230,57,70,0.08)", border: "1px solid rgba(230,57,70,0.2)", borderRadius: 8, padding: "10px 14px" }}>
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "12px 28px",
                    background: submitting ? "rgba(230,57,70,0.5)" : "#e63946",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    borderRadius: 10,
                    border: "none",
                    cursor: submitting ? "not-allowed" : "pointer",
                    boxShadow: "0 0 20px rgba(230,57,70,0.3)",
                    transition: "transform 0.15s, background 0.2s",
                  }}
                  className={submitting ? "" : "hover:scale-105 active:scale-95 hover:bg-red-600"}
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
