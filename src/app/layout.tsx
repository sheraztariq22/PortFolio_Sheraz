import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Load Inter font for non-Apple devices
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Anuj Jain - Full-stack Python Developer & AI Engineer | Professional Portfolio",
    template: "%s | Anuj Jain Portfolio"
  },
  description: "Professional portfolio of Anuj Jain - Full-stack Python Developer & AI Engineer. SIH 2025 Finalist showcasing 25+ automation projects, IoT systems, and AI-powered solutions. Available for internships.",
  keywords: [
    "Anuj Jain",
    "Full-stack Developer", 
    "Python Developer",
    "AI Engineer",
    "Portfolio",
    "Software Developer",
    "Machine Learning",
    "IoT Developer",
    "Web Development",
    "Next.js",
    "React",
    "FastAPI",
    "Django",
    "Automation",
    "LangChain",
    "Smart India Hackathon",
    "Freelancer",
    "AI Chatbot",
    "Professional Portfolio",
    "Developer Portfolio",
    "Tech Portfolio",
    "Internship",
    "Python Automation",
    "Web Scraping",
    "API Development"
  ],
  authors: [
    {
      name: "Anuj Jain",
      url: "https://portfolio.anujjainbatu.tech/",
    },
  ],
  creator: "Anuj Jain",
  publisher: "Anuj Jain",
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
    url: "https://portfolio.anujjainbatu.tech/",
    title: "Anuj Jain - Full-stack Python Developer & AI Engineer | Professional Portfolio",
    description: "Professional portfolio showcasing AI-powered projects, IoT systems, and full-stack development. SIH 2025 Finalist with 25+ automation projects. Available for internships.",
    siteName: "Anuj Jain Portfolio",
    images: [
      {
        url: "https://portfolio.anujjainbatu.tech/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Anuj Jain - Professional Portfolio with AI Chatbot",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuj Jain - Full-stack Python Developer & AI Engineer",
    description: "Professional portfolio showcasing AI projects, IoT systems, and automation solutions. SIH 2025 Finalist available for internships.",
    creator: "@anujainbatu",
    site: "@anujainbatu",
    images: [{
      url: "https://portfolio.anujjainbatu.tech/portfolio.png",
      alt: "Anuj Jain Professional Portfolio"
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
    canonical: "https://portfolio.anujjainbatu.tech/",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://portfolio.anujjainbatu.tech/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Anuj Jain",
              "jobTitle": "Full-stack Python Developer & AI Engineer",
              "url": "https://portfolio.anujjainbatu.tech/",
              "image": "https://portfolio.anujjainbatu.tech/profile.jpeg",
              "sameAs": [
                "https://github.com/anujjainbatu",
                "https://linkedin.com/in/anujjainbatu",
                "https://x.com/anujainbatu"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "alumniOf": {
                "@type": "Organization",
                "name": "SATI"
              },
              "knowsAbout": [
                "Python Development",
                "AI Engineering",
                "Machine Learning",
                "IoT Systems",
                "Web Development",
                "Automation",
                "Full Stack Development"
              ],
              "description": "Full-stack Python Developer & AI Engineer with expertise in building AI-powered solutions, IoT systems, and automation tools. SIH 2025 Finalist with 25+ delivered projects."
            })
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}