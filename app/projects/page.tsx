import type { Metadata } from "next";
import { resumeData } from "@/lib/data";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Abhinn Pokhriyal's portfolio of enterprise frontend projects built with React.js, TypeScript, and AEM.",
};

export default function ProjectsPage() {
  return <ProjectsClient projects={resumeData.projects} />;
}
