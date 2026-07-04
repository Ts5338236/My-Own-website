import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Aetheric AI | Enterprise AI & Software Engineering Studio",
  description: "We engineer intelligence into every product. Building state-of-the-art AI/ML workflows, enterprise-grade full-stack solutions, and automated SaaS products.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Aetheric AI | Enterprise AI & Software Engineering Studio",
    description: "Building production-ready AI tools and enterprise software systems designed for 4K visual excellence.",
    type: "website",
    locale: "en_US",
    url: "https://aetheric.ai",
    siteName: "Aetheric AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <div className="noise-overlay" />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
