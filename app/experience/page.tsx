import type { Metadata } from "next";
import { resumeData } from "@/lib/data";
import ExperienceClient from "./ExperienceClient";

export const metadata: Metadata = {
  title: "Experience",
  description: "Abhinn Pokhriyal's professional work experience — Software Developer at Omnie Solutions.",
};

export default function ExperiencePage() {
  return <ExperienceClient experience={resumeData.experience} />;
}
