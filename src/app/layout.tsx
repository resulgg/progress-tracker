import type { Metadata } from "next";
import "@/app/globals.css";
import Providers from "@/components/providers";
import { Bricolage_Grotesque } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "200", "300"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: {
    default: "Progress Tracker",
    template: "%s | Progress Tracker",
  },
  description:
    "Track your goals and achievements with powerful analytics and insights. Set milestones, monitor progress, and celebrate success.",
  keywords: [
    "goal tracking",
    "progress tracking",
    "personal development",
    "achievement tracking",
    "productivity tool",
    "goal setting",
    "milestone tracking",
  ],
  authors: [{ name: "Progress Tracker Team" }],
  creator: "Progress Tracker",
  publisher: "Progress Tracker",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Progress Tracker",
    title: "Progress Tracker - Track Your Goals and Achievements",
    description:
      "Track your goals and achievements with powerful analytics and insights. Set milestones, monitor progress, and celebrate success.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Progress Tracker Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Progress Tracker",
    description:
      "Track your goals and achievements with powerful analytics and insights",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${bricolage.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
