import type { Metadata } from "next";
import {
  DM_Mono,
  DM_Serif_Display,
  Outfit,
} from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "400",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Jose David Sanabria Aponte",
    template: "%s · JDSA",
  },
  description:
    "Backend Engineer — Go, Python, C#. FinTech, automation, and computer vision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${dmSerifDisplay.variable} ${dmMono.variable} ${outfit.variable} min-h-screen font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
