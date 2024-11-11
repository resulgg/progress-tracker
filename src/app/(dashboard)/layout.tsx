import Navbar from "@/components/layout/navbar";
import ProDialog from "@/components/subscription/pro-dialog";

export const metadata = {
  title: "Dashboard",
  description:
    "View and manage your goals, track progress, and analyze your achievements.",
  keywords: [
    "dashboard",
    "goal management",
    "progress analytics",
    "achievement tracking",
    "personal metrics",
  ],
  openGraph: {
    title: "Progress Tracker Dashboard",
    description:
      "View and manage your goals, track progress, and analyze your achievements.",
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Progress Tracker",
    images: [
      {
        url: "/og-dashboard.png",
        width: 1200,
        height: 630,
        alt: "Progress Tracker Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Progress Tracker Dashboard",
    description:
      "View and manage your goals, track progress, and analyze your achievements",
    images: ["/og-dashboard.png"],
  },
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto">
      <Navbar />
      {children}
      <ProDialog />
    </div>
  );
};
export default DashboardLayout;
