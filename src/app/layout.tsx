import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", weight: ["500", "700"] });
const plex = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-plex", weight: ["400", "500", "600"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: { default: "C Mastery", template: "%s · C Mastery" },
  description: "Learn C programming from first printf to pointers and memory, with practice, a code runner and an AI tutor.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

// Applies the saved theme before paint to avoid a flash of the wrong theme.
const themeScript = `try{var t=localStorage.getItem("cm-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${bricolage.variable} ${plex.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full text-[14.5px]">{children}</body>
    </html>
  );
}
