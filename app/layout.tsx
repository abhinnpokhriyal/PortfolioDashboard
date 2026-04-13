import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Abhinn Pokhriyal — Frontend Engineer",
    template: "%s | Abhinn Pokhriyal",
  },
  description:
    "Frontend Engineer with 4+ years of experience in React.js, TypeScript, Next.js, and AEM. Building enterprise-scale web applications.",
  keywords: ["Frontend Engineer", "React Developer", "TypeScript", "Next.js", "AEM", "Delhi", "India"],
  authors: [{ name: "Abhinn Pokhriyal" }],
  creator: "Abhinn Pokhriyal",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.style.backgroundColor='#0a0a0f';`,
          }}
        />
      </head>
      <body
        style={{ backgroundColor: "#0a0a0f", color: "#f1f5f9" }}
        className="min-h-screen antialiased"
      >
        <ThemeProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
