import type { Metadata } from "next";
import { Anton, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexusCRM — Votre CRM piloté par 5 agents IA en parallèle",
  description:
    "Orchestration multi-agents : qualification, relance, scoring, proposition et suivi — tout synchronisé dans votre CRM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${anton.variable} ${ibmPlexSans.variable}`}>
      <body style={{ background: "#eef2ff", fontFamily: "var(--font-body)" }}>
        {children}
      </body>
    </html>
  );
}
