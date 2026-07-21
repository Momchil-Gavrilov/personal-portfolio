import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Momchil Gavrilov · Human Factors & UX Researcher",
  description:
    "Human factors and UX researcher studying how people and technology relate. 4 years of human-machine interaction research, 5 peer-reviewed publications, M.S. Biomedical Engineering at UC Davis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${sourceSans.variable}`}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
