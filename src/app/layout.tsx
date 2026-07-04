import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Primary UI typeface
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Monospace for numeric/label accents (Vercel/Linear style)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sheraztariq.com"),
  title: {
    default: "Sheraz Tariq - AI/ML Engineer | Generative AI, Agentic AI & RAG",
    template: "%s | Sheraz Tariq"
  },
  description: "AI/ML Engineer specializing in Generative AI, agentic (multi-agent) systems, and production RAG. I take LLMs from prototype to scalable, enterprise-grade products — and build the full-stack apps and backends that power them.",
  keywords: [
    "Sheraz Tariq",
    "AI Engineer",
    "AI/ML Engineer",
    "Machine Learning Engineer",
    "Generative AI",
    "Agentic AI",
    "Multi-Agent Systems",
    "RAG",
    "Retrieval-Augmented Generation",
    "LLM Engineer",
    "LangChain",
    "LangGraph",
    "CrewAI",
    "AWS Bedrock",
    "Full Stack AI Developer",
    "React",
    "TypeScript",
    "FastAPI",
    "Supabase",
    "pgvector",
    "ngedu.ai",
    "Professional Portfolio"
  ],
  authors: [
    {
      name: "Sheraz Tariq",
      url: "https://sheraztariq.com/",
    },
  ],
  creator: "Sheraz Tariq",
  publisher: "Sheraz Tariq",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sheraztariq.com/",
    title: "Sheraz Tariq - AI/ML Engineer | Generative AI, Agentic AI & RAG",
    description: "AI/ML Engineer specializing in Generative AI, multi-agent systems, and production RAG. Architect of ngedu.ai — an AI-powered K–12 learning platform.",
    siteName: "Sheraz Tariq Portfolio",
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Sheraz Tariq - AI/ML Engineer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheraz Tariq - AI/ML Engineer | Generative AI, Agentic AI & RAG",
    description: "AI/ML Engineer specializing in Generative AI, multi-agent systems, and production RAG. Architect of ngedu.ai.",
    creator: "@SherazT17522925",
    site: "@SherazT17522925",
    images: [{
      url: "/portfolio.png",
      alt: "Sheraz Tariq - AI/ML Engineer Portfolio"
    }],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      }
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.svg?v=2",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://sheraztariq.com/",
  },
  category: "technology",
  classification: "Portfolio Website",
  other: {
    "google-site-verification": "your-google-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://sheraztariq.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Sheraz Tariq",
              "jobTitle": "AI/ML Engineer — Generative AI, Agentic AI & RAG",
              "url": "https://sheraztariq.com/",
              "image": "https://sheraztariq.com/profile.jpeg",
              "sameAs": [
                  "https://linkedin.com/in/sheraz-tariq-12434a239",
                  "https://github.com/sheraztariq22",
                  "https://x.com/SherazT17522925",
                  "https://www.ngedu.ai",
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "SkilliHire"
              },
              "alumniOf": {
                "@type": "Organization",
                "name": "FAST - National University of Computer and Emerging Sciences (NUCES)"
              },
              "knowsAbout": [
                "Generative AI",
                "Agentic AI",
                "Multi-Agent Systems",
                "Retrieval-Augmented Generation",
                "Large Language Models",
                "Machine Learning",
                "Deep Learning",
                "NLP",
                "Full Stack AI Development"
              ],
              "description": "AI/ML Engineer specializing in Generative AI, agentic (multi-agent) systems, and production RAG. Architect of ngedu.ai, an AI-powered K–12 learning platform."
            })
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          jetbrainsMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}