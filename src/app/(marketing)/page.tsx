import Header from "@/components/marketing/header";
import Hero from "@/components/marketing/hero";
import Features from "@/components/marketing/features";
import HowItWorks from "@/components/marketing/how-it-works";
import CTA from "@/components/marketing/cta";
import Footer from "@/components/marketing/footer";

export const metadata = {
  title: "Track Your Goals and Achievements",
  description:
    "Progress Tracker helps you set, track and achieve your personal and professional goals with powerful analytics and insights. Start your journey to success today.",
  keywords:
    "goal tracking, progress tracking, personal development, achievement tracking, productivity tool",
  openGraph: {
    title: "Progress Tracker - Track Your Goals and Achievements",
    description:
      "Progress Tracker helps you set, track and achieve your personal and professional goals with powerful analytics and insights.",
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Progress Tracker",
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
    title: "Progress Tracker - Track Your Goals and Achievements",
    description:
      "Progress Tracker helps you set, track and achieve your personal and professional goals with powerful analytics and insights.",
    images: ["/og-image.png"],
  },
};

export default async function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
