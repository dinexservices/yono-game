import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AppCard from "../../components/AppCard";
import Link from "next/link";
import type { Game } from "../../types";

const SITE_URL = "https://www.allyonoogames.com";
const SITE_NAME = "All Yono Games";
const API = process.env.NEXT_PUBLIC_API_URL || "https://api.allyonoogames.com/api";

async function getGameBySlug(slug: string): Promise<Game | null> {
  try {
    const res = await fetch(`${API}/get-all-game`, { next: { revalidate: 60 } });
    const data = await res.json();
    const games: Game[] = (data.data || []).filter(Boolean);
    return games.find((g) => g.slug === slug) || null;
  } catch {
    return null;
  }
}

async function getAllGames(): Promise<Game[]> {
  try {
    const res = await fetch(`${API}/get-all-game`, { next: { revalidate: 60 } });
    const data = await res.json();
    return (data.data || []).filter(Boolean);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: "App Not Found" };

  const title = `${game.name} APK Download – ₹${game.signupBonus} Signup Bonus | ${SITE_NAME}`;
  const description = `Download ${game.name} APK for free on All Yono Games. Get ₹${game.signupBonus} signup bonus with minimum withdrawal of ₹${game.minWithdraw}. Rated ${game.rating}/5 stars. Category: ${game.category}. ${game.description}`;
  const keywords = [
    game.name,
    `${game.name} APK`,
    `${game.name} download`,
    `${game.name} signup bonus`,
    ...(game.tags || []),
    "all yono games", "yono games", "allyonoogames.com",
    "real money games india", "earning apps india",
  ].join(", ");

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `${SITE_URL}/app/${game.slug}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/app/${game.slug}`,
      siteName: SITE_NAME,
      title,
      description,
      images: game.logoUrl ? [{ url: game.logoUrl, width: 128, height: 128, alt: `${game.name} logo` }] : [],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: game.logoUrl ? [game.logoUrl] : [],
    },
  };
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [game, allGames] = await Promise.all([getGameBySlug(slug), getAllGames()]);

  if (!game) notFound();

  // Related: same category, exclude current game, max 6
  const relatedApps = allGames
    .filter((g) => g._id !== game._id && g.category === game.category)
    .slice(0, 6);

  // If fewer than 3 related in same category, fill with other games
  const related =
    relatedApps.length >= 2
      ? relatedApps
      : allGames.filter((g) => g._id !== game._id).slice(0, 6);

  const rating = game.rating || 0;
  const stars = Array.from({ length: 5 }, (_, i) => ({
    filled: i < Math.floor(rating),
    half: !( i < Math.floor(rating)) && i < rating,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-blue-600 font-medium">{game.name}</span>
        </nav>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: game.name,
              applicationCategory: "GameApplication",
              operatingSystem: "Android",
              offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: rating,
                ratingCount: Math.floor(rating * 1000),
                bestRating: 5,
                worstRating: 1,
              },
              description: game.description,
              url: `${SITE_URL}/app/${game.slug}`,
              image: game.logoUrl,
              author: { "@type": "Organization", name: SITE_NAME },
            }),
          }}
        />

        {/* App Detail Card */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-md p-6 mb-6">
          <div className="flex items-start gap-5">
            {/* Logo */}
            <div className="shrink-0 w-24 h-24 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center">
              {game.logoUrl ? (
                <Image
                  src={game.logoUrl}
                  alt={`${game.name} logo`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  priority
                  unoptimized
                />
              ) : (
                <span className="text-5xl">{game.icon || "🎮"}</span>
              )}
            </div>

            {/* Title + Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-extrabold text-slate-800">{game.name}</h1>
              <p className="text-blue-600 font-medium text-sm mt-0.5">{game.description}</p>
              {game.isNewGame && (
                <span className="inline-flex mt-2 items-center bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                  ✨ New App
                </span>
              )}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-blue-50">
            {/* Rating */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-0.5">
                {stars.map((star, i) => (
                  <svg key={i} className={`w-4 h-4 ${star.filled ? "text-yellow-400" : star.half ? "text-yellow-300" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-slate-600 font-semibold text-sm">{rating} Ratings</span>
            </div>

            {/* Size */}
            <div className="flex flex-col items-center gap-1">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="text-slate-600 font-semibold text-sm">{game.size || "N/A"}</span>
            </div>

            {/* Free/Paid */}
            <div className="flex flex-col items-center gap-1">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-slate-600 font-semibold text-sm">{game.isFree ? "Free" : "Paid"}</span>
            </div>

            {/* Bonus */}
            <div className="flex flex-col items-center gap-1">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <span className="text-slate-600 font-semibold text-sm">₹{game.signupBonus} Bonus</span>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={game.downloadUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-base py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 uppercase tracking-wide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download {game.name} APK
            </a>
            <a
              href="https://t.me/+N3fCKqQK5tYxODdl"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold text-sm py-2.5 rounded-xl transition-all duration-200"
            >
              📱 Join Our Telegram Channel
            </a>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-6">
          <h2 className="text-slate-800 font-bold text-lg mb-3 border-b border-blue-50 pb-3">
            {game.name} APK – Download &amp; Receive ₹{game.signupBonus} Bonus
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">{game.longDescription}</p>

          {/* Key details */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-3">
              <span className="text-xs text-blue-500 font-medium">Category</span>
              <p className="text-slate-700 font-semibold text-sm mt-0.5">{game.category}</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3">
              <span className="text-xs text-emerald-600 font-medium">Signup Bonus</span>
              <p className="text-slate-700 font-semibold text-sm mt-0.5">₹{game.signupBonus}</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-3">
              <span className="text-xs text-orange-500 font-medium">Min Withdraw</span>
              <p className="text-slate-700 font-semibold text-sm mt-0.5">₹{game.minWithdraw}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3">
              <span className="text-xs text-purple-500 font-medium">App Size</span>
              <p className="text-slate-700 font-semibold text-sm mt-0.5">{game.size}</p>
            </div>
          </div>

          {/* Tags */}
          {(game.tags || []).length > 0 && (
            <div className="mt-5">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {(game.tags || []).map((tag) => (
                  <span key={tag} className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-blue-200 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Apps */}
        {related.length > 0 && (
          <div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center font-bold py-3 rounded-t-xl flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Other Related Apps
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex flex-col gap-3 bg-white border border-blue-100 border-t-0 rounded-b-xl p-4 shadow-sm">
              {related.map((relGame, idx) => (
                <AppCard key={relGame._id} game={relGame} index={related.length - idx} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
