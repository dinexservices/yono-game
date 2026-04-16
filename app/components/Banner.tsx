import Image from "next/image";

const TELEGRAM_LINK = "https://t.me/+N3fCKqQK5tYxODdl";
const TELEGRAM_DISPLAY = "https://t.me/+N3fCKqQK5tYxODdl";
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
              <span>📱 Join our Telegram</span>
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
