import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gambare - Learn Japanese with AI",
  description: "A cute and motivational Japanese language learning app powered by AI. Practice conversations, voice, flashcards, and quizzes!",
  keywords: ["Japanese", "Language Learning", "AI", "Flashcards", "Quiz", "Conversation Practice", "がんばれ"],
  authors: [{ name: "Gambare Team" }],
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Gambare - Learn Japanese",
    description: "Practice Japanese with AI conversations, voice exercises, flashcards, and quizzes!",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gambare - Learn Japanese",
    description: "Practice Japanese with AI conversations, voice exercises, flashcards, and quizzes!",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFB6C1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ServiceWorkerRegistration />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
