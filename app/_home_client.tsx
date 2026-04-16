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
                  <div className="relative overflow-hidden flex items-center gap-4 bg-white rounded-xl border border-blue-100 shadow-sm px-4 py-3 group hover:shadow-md hover:border-blue-200 transition-all duration-200">
                    <div className="absolute top-0 left-0 bg-blue-500 text-white font-bold text-[10px] sm:text-xs px-2 py-0.5 rounded-br-lg z-10 flex items-center justify-center shadow-sm">
                      #1
                    </div>
                    <div className="shrink-0 w-14 h-14 rounded-xl overflow-hidden shadow-md flex items-center justify-center cursor-default">
                      <Image src="/logo.jpeg" alt="All Yono Games Logo" width={56} height={56} className="w-full h-full object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="cursor-default">
                        <h3 className="font-bold text-slate-800 text-sm truncate">All Yono Game</h3>
                      </div>
                      <div className="flex flex-col gap-0.5 mt-1">
                        <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                          <span>🎁</span>
                          <span>Bonus Upto ₹1000</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                          <span>💳</span>
                          <span>Min. Withdraw ₹100</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/yono"
                      className="shrink-0 flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
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
