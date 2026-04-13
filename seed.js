// Seed script — run with: node seed.js
// Uses native fetch (Node 18+) and sends JSON to create-game

const API = "http://localhost:8000/api";

const games = [
  {
    name: "Ok Rummy", slug: "ok-rummy", icon: "🃏",
    logoUrl: "https://ui-avatars.com/api/?name=Ok+Rummy&background=1e3a5f&color=FFD700&size=128&bold=true&rounded=true",
    category: "Rummy", rating: 4.5, size: "45-60 MB", signupBonus: 150, minWithdraw: 100,
    downloadUrl: "https://example.com/download/ok-rummy",
    description: "Ok Rummy APK",
    longDescription: "Ok Rummy is a top-rated online rummy application that lets players enjoy classic Indian rummy with a modern twist. New users receive a ₹150 signup bonus.",
    tags: ["rummy", "card game", "teen patti", "online game", "ok rummy apk"],
    isNewGame: false, isFree: true,
  },
  {
    name: "Rumble Rummy", slug: "rumble-rummy", icon: "🎴",
    logoUrl: "https://ui-avatars.com/api/?name=Rumble+Rummy&background=7b2d8b&color=ffffff&size=128&bold=true&rounded=true",
    category: "Rummy", rating: 4.3, size: "38-55 MB", signupBonus: 51, minWithdraw: 100,
    downloadUrl: "https://example.com/download/rumble-rummy",
    description: "Rumble Rummy APK",
    longDescription: "Rumble Rummy brings thrilling rummy action with competitive tournaments and exciting daily challenges. Get ₹51 signup bonus instantly after registration.",
    tags: ["rummy", "card game", "rumble rummy", "online rummy", "cash game", "tournament"],
    isNewGame: false, isFree: true,
  },
  {
    name: "Game Rummy", slug: "game-rummy", icon: "🎮",
    logoUrl: "https://ui-avatars.com/api/?name=Game+Rummy&background=065f46&color=ffffff&size=128&bold=true&rounded=true",
    category: "Rummy", rating: 4.2, size: "42-58 MB", signupBonus: 60, minWithdraw: 100,
    downloadUrl: "https://example.com/download/game-rummy",
    description: "Game Rummy APK",
    longDescription: "Game Rummy is your ultimate destination for playing rummy online with real money. Enjoy ₹60 signup bonus and explore various game modes.",
    tags: ["rummy", "game rummy", "real money", "upi", "card game", "online game"],
    isNewGame: false, isFree: true,
  },
  {
    name: "Spin 777", slug: "spin-777", icon: "🎰",
    logoUrl: "https://ui-avatars.com/api/?name=Spin+777&background=b45309&color=ffffff&size=128&bold=true&rounded=true",
    category: "Slots", rating: 4.4, size: "55-75 MB", signupBonus: 92, minWithdraw: 200,
    downloadUrl: "https://example.com/download/spin-777",
    description: "Spin 777 APK",
    longDescription: "Spin 777 is a premium slot machine app featuring 50+ slot games with stunning graphics. New users get ₹92 signup bonus to start spinning.",
    tags: ["slots", "777", "spin game", "jackpot", "casino", "slot machine", "yono"],
    isNewGame: true, isFree: true,
  },
  {
    name: "Hindi 777", slug: "hindi-777", icon: "🎯",
    logoUrl: "https://ui-avatars.com/api/?name=Hindi+777&background=991b1b&color=FFD700&size=128&bold=true&rounded=true",
    category: "Slots", rating: 4.1, size: "58-100 MB", signupBonus: 41, minWithdraw: 150,
    downloadUrl: "https://example.com/download/hindi-777",
    description: "Hindi 777 APK",
    longDescription: "Hindi 777 online gaming app allows players to enjoy trending slot machine games with smooth gameplay. New users can unlock a ₹41 signup bonus.",
    tags: ["hindi 777", "slots", "hindi game", "777 game", "yono 777", "spin 777"],
    isNewGame: false, isFree: true,
  },
  {
    name: "Yono Rummy", slug: "yono-rummy", icon: "🃏",
    logoUrl: "https://ui-avatars.com/api/?name=Yono+Rummy&background=1d4ed8&color=FFD700&size=128&bold=true&rounded=true",
    category: "Rummy", rating: 4.6, size: "48-65 MB", signupBonus: 200, minWithdraw: 100,
    downloadUrl: "https://example.com/download/yono-rummy",
    description: "Yono Rummy APK",
    longDescription: "Yono Rummy is one of the most trusted rummy platforms in India with over 5 million active players. Enjoy a massive ₹200 signup bonus.",
    tags: ["yono rummy", "rummy", "yono game", "card game", "real cash", "tournament"],
    isNewGame: true, isFree: true,
  },
  {
    name: "Teen Patti Gold", slug: "teen-patti-gold", icon: "♠️",
    logoUrl: "https://ui-avatars.com/api/?name=Teen+Patti&background=92400e&color=FFD700&size=128&bold=true&rounded=true",
    category: "Teen Patti", rating: 4.7, size: "65-90 MB", signupBonus: 120, minWithdraw: 200,
    downloadUrl: "https://example.com/download/teen-patti-gold",
    description: "Teen Patti Gold APK",
    longDescription: "Teen Patti Gold is the most popular card game app in India with over 10 million downloads. Get ₹120 signup bonus.",
    tags: ["teen patti", "teen patti gold", "card game", "3 patti", "andar bahar", "casino"],
    isNewGame: false, isFree: true,
  },
  {
    name: "Lucky Slots King", slug: "lucky-slots-king", icon: "👑",
    logoUrl: "https://ui-avatars.com/api/?name=Lucky+Slots&background=4c1d95&color=FFD700&size=128&bold=true&rounded=true",
    category: "Slots", rating: 4.0, size: "60-85 MB", signupBonus: 75, minWithdraw: 200,
    downloadUrl: "https://example.com/download/lucky-slots-king",
    description: "Lucky Slots King APK",
    longDescription: "Lucky Slots King brings Vegas-style slot action right to your phone. Start with ₹75 bonus and spin your way to massive jackpots.",
    tags: ["lucky slots", "king slots", "casino", "jackpot", "vegas slots", "fruit machine"],
    isNewGame: true, isFree: true,
  },
  {
    name: "Cash Rummy Pro", slug: "cash-rummy-pro", icon: "💰",
    logoUrl: "https://ui-avatars.com/api/?name=Cash+Rummy&background=064e3b&color=ffffff&size=128&bold=true&rounded=true",
    category: "Rummy", rating: 4.4, size: "40-55 MB", signupBonus: 180, minWithdraw: 100,
    downloadUrl: "https://example.com/download/cash-rummy-pro",
    description: "Cash Rummy Pro APK",
    longDescription: "Cash Rummy Pro is the professional rummy platform for serious players. Earn ₹180 signup bonus and participate in high-stakes tournaments.",
    tags: ["cash rummy", "rummy pro", "online rummy", "card game", "skill game", "real money"],
    isNewGame: false, isFree: true,
  },
  {
    name: "Pokka Poker", slug: "pokka-poker", icon: "🂡",
    logoUrl: "https://ui-avatars.com/api/?name=Pokka+Poker&background=1e1e2e&color=FFD700&size=128&bold=true&rounded=true",
    category: "Poker", rating: 4.2, size: "70-95 MB", signupBonus: 250, minWithdraw: 500,
    downloadUrl: "https://example.com/download/pokka-poker",
    description: "Pokka Poker APK",
    longDescription: "Pokka Poker is India's premier online poker destination. Get ₹250 welcome bonus and play Texas Hold'em, Omaha, and Sit-N-Go tournaments.",
    tags: ["poker", "pokka poker", "texas holdem", "card game", "tournament", "casino"],
    isNewGame: true, isFree: true,
  },
  {
    name: "Dragon vs Tiger", slug: "dragon-vs-tiger", icon: "🐉",
    logoUrl: "https://ui-avatars.com/api/?name=Dragon+Tiger&background=7f1d1d&color=ffffff&size=128&bold=true&rounded=true",
    category: "Casino", rating: 4.3, size: "35-50 MB", signupBonus: 88, minWithdraw: 200,
    downloadUrl: "https://example.com/download/dragon-vs-tiger",
    description: "Dragon vs Tiger APK",
    longDescription: "Dragon vs Tiger is a fast-paced casino card game where you bet on Dragon or Tiger to win. Enjoy ₹88 signup bonus and start winning instantly.",
    tags: ["dragon tiger", "casino", "live game", "card game", "fast game", "live casino"],
    isNewGame: false, isFree: true,
  },
  {
    name: "Andar Bahar Live", slug: "andar-bahar-live", icon: "🎲",
    logoUrl: "https://ui-avatars.com/api/?name=Andar+Bahar&background=0f4c75&color=ffffff&size=128&bold=true&rounded=true",
    category: "Casino", rating: 4.5, size: "45-65 MB", signupBonus: 101, minWithdraw: 200,
    downloadUrl: "https://example.com/download/andar-bahar-live",
    description: "Andar Bahar Live APK",
    longDescription: "Andar Bahar Live brings the classic Indian card game online with live dealers and real-time betting. Get ₹101 signup bonus.",
    tags: ["andar bahar", "live casino", "indian card game", "casino", "live dealer", "andar bahar apk"],
    isNewGame: true, isFree: true,
  },
  {
    name: "Jaldi 5 Lottery", slug: "jaldi-5-lottery", icon: "🎱",
    logoUrl: "https://ui-avatars.com/api/?name=Jaldi+5&background=166534&color=FFD700&size=128&bold=true&rounded=true",
    category: "Lottery", rating: 3.9, size: "28-40 MB", signupBonus: 30, minWithdraw: 100,
    downloadUrl: "https://example.com/download/jaldi-5-lottery",
    description: "Jaldi 5 Lottery APK",
    longDescription: "Jaldi 5 Lottery is an exciting number-based lottery game where you pick 5 numbers and win big. Get ₹30 signup bonus.",
    tags: ["lottery", "jaldi 5", "number game", "lucky number", "win cash", "lottery apk"],
    isNewGame: false, isFree: true,
  },
  {
    name: "Color Prediction Win", slug: "color-prediction-win", icon: "🌈",
    logoUrl: "https://ui-avatars.com/api/?name=Color+Win&background=6d28d9&color=ffffff&size=128&bold=true&rounded=true",
    category: "Prediction", rating: 4.1, size: "30-45 MB", signupBonus: 55, minWithdraw: 100,
    downloadUrl: "https://example.com/download/color-prediction-win",
    description: "Color Prediction Win APK",
    longDescription: "Color Prediction Win is the most popular color trading game in India. Predict the winning color to multiply your money. Get ₹55 signup bonus.",
    tags: ["color prediction", "color game", "prediction game", "win money", "color trading", "fast game"],
    isNewGame: true, isFree: true,
  },
  {
    name: "Royal Cricket T20", slug: "royal-cricket-t20", icon: "🏏",
    logoUrl: "https://ui-avatars.com/api/?name=Royal+Cricket&background=0c4a6e&color=ffffff&size=128&bold=true&rounded=true",
    category: "Fantasy", rating: 4.6, size: "80-110 MB", signupBonus: 300, minWithdraw: 200,
    downloadUrl: "https://example.com/download/royal-cricket-t20",
    description: "Royal Cricket T20 APK",
    longDescription: "Royal Cricket T20 is India's fastest-growing fantasy cricket app. Get a massive ₹300 signup bonus and create your dream team to win real cash.",
    tags: ["cricket", "fantasy cricket", "ipl", "t20", "dream team", "fantasy sports", "cricket apk"],
    isNewGame: true, isFree: true,
  },
];

// The createGame endpoint needs multipart/form-data but since logoUrl is already a URL
// we send it as JSON to a JSON-capable endpoint approach:
// Actually we'll POST JSON directly using the game data incl. logoUrl as a field
// The backend createGame reads logoUrl only from req.file.path when file is uploaded
// So we'll POST form fields including logoUrl directly

// Use the Node built-in FormData (Node 18+)
let success = 0;
let skipped = 0;

for (const game of games) {
  const body = new FormData();
  for (const [k, v] of Object.entries(game)) {
    if (Array.isArray(v)) {
      body.append(k, v.join(","));
    } else {
      body.append(k, String(v));
    }
  }
  // Also manually set logoUrl since we're not uploading a file
  // We'll patch createGame to also accept logoUrl in body if no file uploaded

  try {
    const res = await fetch(`${API}/create-game`, {
      method: "POST",
      body,
    });
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch { json = { success: false, message: text }; }

    if (json.success) {
      console.log(`✅ Created: ${game.name}`);
      success++;
    } else {
      console.log(`⚠️  Skipped (${json.message}): ${game.name}`);
      skipped++;
    }
  } catch (e) {
    console.error(`❌ Error: ${game.name}`, e.message);
  }
}

console.log(`\nDone! ${success} created, ${skipped} skipped.`);
