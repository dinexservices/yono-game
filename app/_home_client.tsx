"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import AppCard from "./components/AppCard";
import Footer from "./components/Footer";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAllGames } from "@/store/slices/gameSlice";

const CATEGORIES = ["All Apps", "New Apps"];


type HomeClientProps = {
  showFixedCard?: boolean;
  filterByTag?: string;
};

export default function HomeClient({ showFixedCard = false, filterByTag }: HomeClientProps = {}) {
  const dispatch = useAppDispatch();
  const { games, loading, error } = useAppSelector((state) => state.game);

  const [activeTab, setActiveTab] = useState("All Apps");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Only fetch if the store is empty (avoids re-fetching on back-navigation)
    if (games.length === 0) {
      dispatch(fetchAllGames());
    }
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const newGamesCount = games.filter((g) => g.isNewGame).length;

  const filteredGames = useMemo(() => {
    let result = [...games];

    if (activeTab === "New Apps") {
      result = result.filter((g) => g.isNewGame);
    }

    if (filterByTag) {
      const lowerTag = filterByTag.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(lowerTag) ||
          (g.tags || []).some((t) => t.toLowerCase() === lowerTag)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          (g.category || "").toLowerCase().includes(q) ||
          (g.tags || []).some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeTab, searchQuery, games]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Banner />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search apps by name, category, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-blue-200 focus:border-blue-500 rounded-xl text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex justify-center">
          <div className="flex gap-1 bg-white border border-blue-100 rounded-xl p-1 shadow-sm">
            {CATEGORIES.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${activeTab === tab
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                    : "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
                  }`}
              >
                {tab}
                {tab === "New Apps" && newGamesCount > 0 && (
                  <span className="ml-1.5 bg-emerald-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {newGamesCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">Loading games...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-slate-600 font-semibold mb-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* App count */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-slate-700 font-semibold text-sm">
                {filteredGames.length === 0
                  ? "No apps found"
                  : `Showing ${filteredGames.length} app${filteredGames.length !== 1 ? "s" : ""}`}
                {searchQuery && (
                  <span className="text-blue-500 ml-1">for &quot;{searchQuery}&quot;</span>
                )}
              </h2>
              <span className="text-xs text-slate-400 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                {activeTab}
              </span>
            </div>

            {filteredGames.length > 0 ? (
              <div className="flex flex-col gap-3">
                {showFixedCard && (
                  <div className="flex items-center gap-2.5 sm:gap-4 bg-white sm:rounded-xl border-b sm:border border-slate-200 sm:border-blue-100 sm:shadow-sm hover:bg-slate-50 sm:hover:shadow-md transition-all duration-200 px-1 py-3 sm:px-4 sm:py-3 group relative">
                    {/* Icon / Logo Container */}
                    <div className="relative shrink-0 w-[52px] h-[52px] sm:w-16 sm:h-16 ml-1">
                      {/* Index Badge on Logo */}
                      <div className="absolute -top-1.5 -left-1.5 bg-[#ff6b00] text-white font-bold text-[9px] sm:text-[11px] min-w-[16px] h-[16px] sm:min-w-[20px] sm:h-[20px] rounded flex justify-center items-center shadow-sm z-10 leading-none">
                        1
                      </div>
                      
                      {/* Logo Image */}
                      <div className="w-full h-full rounded-[10px] sm:rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-200 flex items-center justify-center cursor-default">
                        <Image src="/logo.jpeg" alt="All Yono Games Logo" width={64} height={64} className="w-full h-full object-cover" unoptimized />
                      </div>
                    </div>

                    {/* App Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h3 className="font-bold text-slate-800 text-[13px] sm:text-base leading-tight truncate">
                        All Yono Game
                      </h3>
                      <div className="flex flex-col mt-1 sm:mt-1.5 gap-[2px] sm:gap-1">
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-red-500 font-semibold whitespace-nowrap">
                          <span className="shrink-0 text-[11px] sm:text-[13px] leading-none">🎁</span>
                          <span className="truncate">Sign Up Bonus ₹1000</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-emerald-600 font-semibold whitespace-nowrap">
                          <span className="shrink-0 text-[11px] sm:text-[13px] leading-none">🏠</span>
                          <span className="truncate">Min. Withdrawal ₹100</span>
                        </div>
                      </div>
                    </div>

                    {/* Download Button */}
                    <Link
                      href="/yono"
                      className="shrink-0 flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 text-white text-[11px] sm:text-sm font-bold px-3 py-1.5 sm:px-5 sm:py-2 rounded-md shadow-sm active:scale-95 transition-all duration-200 mr-1"
                    >
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download</span>
                    </Link>
                  </div>
                )}
                {filteredGames.map((game, idx) => (
                  <AppCard key={game._id} game={game} index={showFixedCard ? idx + 2 : idx + 1} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-slate-600 font-semibold text-lg mb-2">No apps found</h3>
                <p className="text-slate-400 text-sm">Try a different search term or browse other categories.</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveTab("All Apps"); }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
