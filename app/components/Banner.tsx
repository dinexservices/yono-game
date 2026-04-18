import Image from "next/image";

const TELEGRAM_LINK = "https://t.me/+xiZV9WhjGl05OWU9";
const TELEGRAM_DISPLAY = "https://t.me/+xiZV9WhjGl05OWU9";
const SITE_URL = "allyonoogames.com";
const SITE_NAME = "All Yono Games";

export default function Banner() {
  return (
    <div className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/banner-bg.png"
          alt="Banner Background"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-900/60 to-blue-800/50" />
      </div>

      {/* Decorative glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-8 -right-8 w-56 h-56 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 left-1/3 w-72 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-6 gap-5">
          {/* Logo */}
          <div className="shrink-0">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-yellow-400/60 shadow-2xl">
              <Image
                src="/logo.jpeg"
                alt={SITE_NAME}
                fill
                className="object-cover"
                sizes="128px"
                priority
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h1 className="text-yellow-300 font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {SITE_NAME}
            </h1>
            <p className="text-white font-semibold text-sm sm:text-base mt-1 drop-shadow">
              {SITE_URL}
            </p>
            <p className="text-blue-100 text-sm sm:text-base mt-2 flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12.002 12.002 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Join our Telegram
              </span>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 hover:text-yellow-200 font-medium underline transition-colors drop-shadow"
              >
                {TELEGRAM_DISPLAY}
              </a>
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/25 shadow">
                🎁 Up to ₹300 Signup Bonus
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/25 shadow">
                💳 Min Withdraw ₹100
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/25 shadow">
                📲 15+ Top Apps
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
