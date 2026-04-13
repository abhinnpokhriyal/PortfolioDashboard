import type { Metadata } from "next";
import { resumeData } from "@/lib/data";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Abhinn Pokhriyal — Frontend Engineer with 4+ years of experience in React.js, TypeScript, and AEM.",
};

export default function AboutPage() {
  return <AboutClient data={resumeData} />;
}
