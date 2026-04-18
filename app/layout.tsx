import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_NAME = "All Yono Games";
const SITE_URL = "https://www.allyonoogames.com";
const SITE_DESCRIPTION =
  "All Yono Games – Download All Yono Rummy, Slots, Bingo & Earning Apps. Get ₹200 to ₹1500 Signup Bonus. Yono Rummy, Yono 777, Jaiho Games, Ok Rummy, Hindi 777, Spin 777, Joy Rummy, INR Rummy & 50+ Top Yono Apps with Min Withdrawal ₹100.";

const ALL_KEYWORDS = [
  // Brand
  "all yono games", "yono games", "allyonoogames", "allyonoogames.com",
  // Rummy
  "yono rummy", "ok rummy", "joy rummy", "inr rummy", "boss rummy", "rummy 888",
  "rummy 77", "rummy ludo", "abc rummy", "yn rummy", "yoyo rummy", "rummy 51",
  "rummy 91", "rummy 420", "rummy 365", "rummy nabob", "rummy noble", "gogo rummy",
  "jaiho rummy", "cash rummy pro", "rumble rummy", "game rummy", "love rummy",
  "hi rummy", "top rummy", "ind rummy", "all rummy apps", "yn rummy apk",
  // 777 & Slots
  "yono 777", "spin 777", "hindi 777", "ever 777", "777 game", "diwa 777",
  "my 777", "yono 808 slots", "567 slots", "789 jackpots", "jaiho 777",
  "yono slots", "ind slots", "rani slots", "saga slots", "good slots",
  "jaiho slots", "spin winner", "slots winner", "slots spin", "spin crush",
  "spin lucky", "spin gold", "spin 101", "yoho slots", "yoyo slots",
  "share slots", "ind bingo", "bingo 101",
  // Yono Franchise
  "yono vip", "yono arcade", "yono all games", "all yono apps", "yono games apk",
  "yono new app", "yono app download", "yono all app 2024", "yono all app new 2024",
  // Jaiho
  "jaiho spin", "jaiho arcade", "jaiho win", "jaiho game",
  // Other
  "teen patti gold", "dragon vs tiger", "andar bahar live", "jaldi 5 lottery",
  "color prediction win", "royal cricket t20", "pokka poker",
  "lucky slots king", "ind club", "en 365", "101z app", "3f games",
  "neta vip", "mkm bet", "mdm bet", "mqm bet", "mbm bet",
  // Generic
  "download rummy apk", "signup bonus ₹551", "min withdrawal ₹100",
  "earning apps india", "real money games india", "free bonus rummy",
  "yono games list 2024", "yono games list 2026", "new yono app",
  "all yono games download", "yono games apk download free",
  "best rummy apps india", "top earning apps india",
].join(", ");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Download All Yono Rummy, Slots & Earning Apps`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ALL_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} – Download All Yono Rummy, Slots & Earning Apps`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} – All Yono Games Download`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – Download All Yono Games`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "your-google-search-console-token",
  },
};

// Organisation JSON-LD schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpeg`,
  sameAs: ["https://t.me/+xiZV9WhjGl05OWU9"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@AllYonoGames.com",
    contactType: "customer support",
  },
};

// Website JSON-LD with sitelinks searchbox
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="canonical" href={SITE_URL} />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="rating" content="general" />
        <meta name="category" content="Games, Entertainment, Earning Apps" />
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50"><Providers>{children}</Providers></body>
    </html>
  );
}
