// Server component — exports SEO metadata and renders client component
import type { Metadata } from "next";
import HomeClient from "./_home_client";

const SITE_URL = "https://www.allyonoogames.com";
const SITE_NAME = "All Yono Games";

const allKeywords = [
  "all yono games", "yono games", "allyonoogames.com", "allyonoogames",
  "yono rummy", "yono 777", "jaiho games", "jaiho rummy", "jaiho 777",
  "gono games", "yono all games", "all yono apps 2024", "all yono apps 2026",
  "new yono app 2024", "new yono app 2026",
  "joy rummy", "inr rummy", "boss rummy", "ever 777", "rummy 888", "rummy 77",
  "rummy ludo", "777 game", "abc rummy", "neta vip", "saga slots", "good slots",
  "yono 808 slots", "yoho slots", "yn rummy", "yoyo slots",
  "rummy 51", "mqm bet", "jaiho rummy", "yono arcade", "jaiho spin", "rummy 91",
  "slots spin", "jaiho arcade", "yono vip", "567 slots", "slots winner",
  "mkm bet", "all rummy apps", "ind club", "yono slots", "spin crush",
  "diwa 777", "jaiho slots", "all yono apps", "spin winner", "gogo rummy",
  "ind slots", "spin lucky", "rummy 420", "spin gold", "mdm bet",
  "789 jackpots", "en 365", "ind bingo", "my 777", "101z app",
  "download rummy apk free", "signup bonus ₹500", "signup bonus ₹1000",
  "min withdrawal ₹100", "top earning apps india", "real cash games india",
  "best rummy apps india", "yono games list 2026", "yono games list apk",
  "rummy apk download", "earn money online india",
].join(", ");

export const metadata: Metadata = {
  title: `${SITE_NAME} – Download All Yono Rummy, Slots & Earning Apps 2026`,
  description:
    "All Yono Games – Download Yono Rummy, Joy Rummy, INR Rummy, Jaiho Rummy, Spin 777, Hindi 777, Ok Rummy, Yono VIP & 50+ Top Earning Apps. Get ₹500–₹1500 Signup Bonus. Min Withdraw ₹100. Free APK Download.",
  keywords: allKeywords,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} – Download All Yono Games, Rummy & Slots APK`,
    description:
      "All Yono Games – Yono Rummy, Jaiho 777, Ok Rummy, Game Rummy & 50+ Apps. Get ₹500–₹1500 Bonus. Min Withdraw ₹100. Free APK Download.",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – All Yono Rummy & Slots Apps`,
    description: "Download All Yono Games – Rummy, Slots, Bingo. Get up to ₹1500 Bonus!",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
