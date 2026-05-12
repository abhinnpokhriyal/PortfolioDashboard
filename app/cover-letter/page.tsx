import type { Metadata } from "next";
import CoverLetterPageClient from "./CoverLetterPageClient";

export const metadata: Metadata = {
  title: "Cover Letter",
  description: "View and download Abhinn Pokhriyal's professional cover letter for Frontend Engineer / Software Developer roles.",
};

export default function CoverLetterPage() {
  return <CoverLetterPageClient />;
}
