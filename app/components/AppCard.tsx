import Link from "next/link";
import Image from "next/image";
import type { Game } from "../types";

interface AppCardProps {
  game: Game;
  index: number;
}

export default function AppCard({ game, index }: AppCardProps) {
  if (!game) return null;
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 px-4 py-3 group">
      {/* Index */}
      <span className="text-blue-400 font-bold text-sm w-6 shrink-0 text-right">
        {index}.
      </span>

      {/* Icon / Logo */}
      <Link href={`/app/${game.slug}`} className="shrink-0">
        <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
          {game.logoUrl ? (
            <Image
              src={game.logoUrl}
              alt={`${game.name} logo`}
              width={56}
              height={56}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : (
            <span className="text-2xl">{game.icon || "🎮"}</span>
          )}
        </div>
      </Link>

      {/* App Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/app/${game.slug}`}>
          <h3 className="font-bold text-slate-800 text-sm hover:text-blue-700 transition-colors truncate">
            {game.name}
          </h3>
        </Link>
        <div className="flex flex-col gap-0.5 mt-1">
          {game.signupBonus != null && (
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <span>🎁</span>
              <span>Bonus Upto ₹{game.signupBonus}</span>
            </div>
          )}
          {game.minWithdraw != null && (
            <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
              <span>💳</span>
              <span>Min. Withdraw ₹{game.minWithdraw}</span>
            </div>
          )}
        </div>
      </div>

      {/* New badge */}
      {game.isNewGame && (
        <span className="hidden sm:inline-flex items-center bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full shrink-0">
          NEW
        </span>
      )}

      {/* Download Button */}
      {game.downloadUrl && (
        <a
          href={game.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </a>
      )}
    </div>
  );
}
