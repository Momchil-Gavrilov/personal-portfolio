import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Newsreader } from "next/font/google";
import { DEFAULT_THEME, THEME_SCRIPT } from "@/components/themes";
import "./globals.css";

/*
  Three faces, three jobs. Instrument Sans sets everything structural, IBM
  Plex Mono is reserved for eyebrows, years and other instrumentation, and
  Newsreader appears exactly once, on the story's opening line, where the
  page stops arguing and starts talking.
*/
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
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
    <html
      lang="en"
      /* The server renders the shipped default and the script in <head>
         corrects it during parsing, before first paint. `suppressHydration
         Warning` is what stops React treating that correction as a mismatch
         and re-rendering the page back to green. */
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${plexMono.variable} ${newsreader.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      {/*
        Browser extensions (password managers, Grammarly and similar) inject
        attributes onto <body> before React hydrates, which React reports as a
        mismatch. Nothing in this app renders time, randomness or
        client-only branches, so suppressing here is scoped to exactly that
        case: it applies to this element's attributes only, not to children.
      */}
      <body className="min-h-svh" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
