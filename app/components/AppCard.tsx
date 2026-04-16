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
    <div className="flex items-center gap-2.5 sm:gap-4 bg-white sm:rounded-xl border-b sm:border border-slate-200 sm:border-blue-100 sm:shadow-sm hover:bg-slate-50 sm:hover:shadow-md transition-all duration-200 px-1 py-3 sm:px-4 sm:py-3 group relative">
      {/* Icon / Logo Container */}
      <div className="relative shrink-0 w-[52px] h-[52px] sm:w-16 sm:h-16 ml-1">
        {/* Index Badge on Logo */}
        <div className="absolute -top-1.5 -left-1.5 bg-[#ff6b00] text-white font-bold text-[9px] sm:text-[11px] min-w-[16px] h-[16px] sm:min-w-[20px] sm:h-[20px] rounded flex justify-center items-center shadow-sm z-10 leading-none">
          {index}
        </div>
        
        {/* Logo Image */}
        <div className="w-full h-full rounded-[10px] sm:rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-green-800 to-green-600 flex items-center justify-center cursor-default">
          {game.logoUrl ? (
            <Image
              src={game.logoUrl}
              alt={`${game.name} logo`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : (
            <span className="text-xl sm:text-2xl">{game.icon || "🎮"}</span>
          )}
        </div>
      </div>

      {/* App Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-bold text-slate-800 text-[13px] sm:text-base leading-tight truncate">
          {game.name}
        </h3>
        <div className="flex flex-col mt-1 sm:mt-1.5 gap-[2px] sm:gap-1">
          {game.signupBonus != null && (
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-red-500 font-semibold whitespace-nowrap">
              <span className="shrink-0 text-[11px] sm:text-[13px] leading-none">🎁</span>
              <span className="truncate">Sign Up Bonus ₹{game.signupBonus}</span>
            </div>
          )}
          {game.minWithdraw != null && (
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-emerald-600 font-semibold whitespace-nowrap">
              <span className="shrink-0 text-[11px] sm:text-[13px] leading-none">🏠</span>
              <span className="truncate">Min. Withdrawal ₹{game.minWithdraw}</span>
            </div>
          )}
        </div>
      </div>

      {/* Download Button */}
      <Link
        href={`/app/${game.slug}`}
        className="shrink-0 flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 text-white text-[11px] sm:text-sm font-bold px-3 py-1.5 sm:px-5 sm:py-2 rounded-md shadow-sm active:scale-95 transition-all duration-200 mr-1"
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Download</span>
      </Link>
    </div>
  );
}

