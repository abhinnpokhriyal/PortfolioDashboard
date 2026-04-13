import type { Metadata } from "next";
import ResumePageClient from "./ResumePageClient";

export const metadata: Metadata = {
  title: "Resume",
  description: "View, edit, and download Arjun Mehta's ATS-optimized resume. Includes job description analyzer and match score.",
};

export default function ResumePage() {
  return <ResumePageClient />;
}
