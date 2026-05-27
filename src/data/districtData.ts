export interface Attraction {
  name: string;
  description: string;
  category: 'nature' | 'culture' | 'history' | 'beaches';
  lng: number; // Real geographic longitude
  lat: number; // Real geographic latitude
}

export interface CulinarySpecialty {
  name: string;
  description: string;
  emoji: string;
}

export interface LongevitySecret {
  title: string;
  description: string;
  icon: string;
}

export interface District {
  id: string;
  name: string;
  japaneseName: string;
  pronunciation: string;
  greeting: string;
  greetingTranslation: string;
  themeColor: string; // Base HSL e.g. "160, 84%, 39%"
  glowColor: string;  // Active neon color hex
  description: string;
  capital: string;
  stats: {
    forestCoverage: number; // percentage
    tourismIndex: number;  // percentage
    longevityScore: number; // percentage
    populationDensity: string; // text description
  };
  keyAttractions: Attraction[];
  culinarySpecialties: CulinarySpecialty[];
  longevitySecrets: LongevitySecret[];
  dialectQuote: {
    phrase: string;
    translation: string;
    meaning: string;
  };
  imagePath: string; // The primary image path
}

export const okinawaDistricts: District[] = [
  {
    id: "kunigami",
    name: "Kunigami (Northern Region)",
    japaneseName: "国頭郡 (北部地区)",
    pronunciation: "Koo-nee-gah-mee",
    greeting: "めんそーれー",
    greetingTranslation: "Mensore (Welcome)",
    themeColor: "142, 70%, 45%", // Greenish emerald
    glowColor: "#10b981",
    description: "The wild, green, and lush northern region of Okinawa, known as 'Yanbaru.' Home to UNESCO World Heritage sub-tropical rainforests, breathtaking coastal cliffs, and pristine marine life. This is where Okinawa's untouched natural beauty thrives.",
    capital: "Nago City",
    stats: {
      forestCoverage: 82,
      tourismIndex: 60,
      longevityScore: 92,
      populationDensity: "Sparse (Rural & Protected Nature Reservoirs)"
    },
    keyAttractions: [
      { name: "Okinawa Churaumi Aquarium", description: "One of the world's largest aquariums, famous for its massive Kuroshio Sea tank housing whale sharks.", category: "culture", lng: 127.8779, lat: 26.6944 },
      { name: "Yanbaru Forest Park", description: "A UNESCO World Heritage ancient sub-tropical forest, home to rare wildlife like the flightless Yanbaru Kuina rail.", category: "nature", lng: 128.2198, lat: 26.7725 },
      { name: "Cape Hedo", description: "The northernmost point of Okinawa Honto, offering wild, sweeping views where the Pacific Ocean meets the East China Sea.", category: "nature", lng: 128.2618, lat: 26.8667 },
      { name: "Kouri Island & Bridge", description: "A stunning 2km bridge over crystal turquoise water leading to an island with beautiful heart-shaped rock formations.", category: "beaches", lng: 128.0267, lat: 26.7022 }
    ],
    culinarySpecialties: [
      { name: "Shikuwasa Juice", description: "Okinawan flat lemon, highly acidic and packed with anti-inflammatory nobiletin.", emoji: "🟢" },
      { name: "Agu Pork", description: "A rare black-pig breed unique to Okinawa, famous for its melt-in-the-mouth tenderness and rich umami.", emoji: "🥓" },
      { name: "Yanbaru Tea", description: "Rich, green tea grown directly in the misty hills of Kunigami's high-altitude fields.", emoji: "🍵" }
    ],
    longevitySecrets: [
      { title: "Pure Yanbaru Water", icon: "💧", description: "Drinking highly alkaline natural mountain water filtered through local limestone rock formations." },
      { title: "Active Farming Lifestyle", icon: "👨‍🌾", description: "Remaining active well into their 90s through daily manual farming and mountain harvesting." },
      { title: "Phyto-nutrient Rich Diet", icon: "🌱", description: "Consuming rare wild forest herbs, antioxidant-packed wild greens, and seasonal tropical citrus fruits." }
    ],
    dialectQuote: {
      phrase: "命どぅ宝 (Nuchi du takara)",
      translation: "Life is the most precious treasure.",
      meaning: "A cornerstone Okinawan philosophy asserting that nothing is more sacred than life, reminding us to live peacefully and respect every living creature."
    },
    imagePath: "/assets/kunigami_yanbaru.jpg"
  },
  {
    id: "nakagami",
    name: "Nakagami (Central Region)",
    japaneseName: "中頭郡 (中部地区)",
    pronunciation: "Nah-kah-gah-mee",
    greeting: "はいさい",
    greetingTranslation: "Haisai (Hello / Greetings)",
    themeColor: "271, 81%, 56%", // Royal Violet
    glowColor: "#a855f7",
    description: "The energetic cultural melting pot of central Okinawa. It elegantly blends ancient Ryukyu heritage (with iconic castle ruins) with a vibrant American-infused international atmosphere, lively street festivals, and active creative arts.",
    capital: "Okinawa City / Uruma City",
    stats: {
      forestCoverage: 24,
      tourismIndex: 85,
      longevityScore: 88,
      populationDensity: "High (Suburban & Highly Commercialized)"
    },
    keyAttractions: [
      { name: "Mihama American Village", description: "A vibrant seaside entertainment resort featuring Ferris wheels, colorful shopping streets, and coastal sunset dining.", category: "culture", lng: 127.7538, lat: 26.3161 },
      { name: "Zakimi Castle Ruins", description: "A UNESCO-listed fortress designed in the 15th century by legendary architect Gosamaru, famous for its beautiful stone walls.", category: "history", lng: 127.7422, lat: 26.4078 },
      { name: "Katsuren Castle Ruins", description: "Perched high on a ridge, this castle offers panoramic ocean views and once served as the seat of the powerful Lord Amawari.", category: "history", lng: 127.8791, lat: 26.3303 },
      { name: "Yomitan Pottery Village", description: "An artist collective preserving traditional Ryukyu 'Yachimun' pottery, complete with giant multi-chambered climbing kilns.", category: "culture", lng: 127.7408, lat: 26.3986 }
    ],
    culinarySpecialties: [
      { name: "Okinawa Soba", description: "Thick wheat noodles served in a hot, rich pork and bonito broth, topped with tender braised pork rib (soki).", emoji: "🍜" },
      { name: "Taco Rice", description: "A creative fusion of American taco ingredients served on Japanese steamed rice, created in Chatan to feed soldiers.", emoji: "🍛" },
      { name: "Beni-Imo Tarts", description: "Breathtaking purple sweet potato paste piped beautifully onto a flaky pastry boat.", emoji: "🍠" }
    ],
    longevitySecrets: [
      { title: "The Moai Support Circle", icon: "👥", description: "Belonging to a lifelong social group of friends who meet regularly to provide emotional, spiritual, and financial help." },
      { title: "Ikigai Focus", icon: "🎯", description: "Maintaining a strong 'reason for being'—such as an active artistic craft (pottery, weaving)—giving motivation every single day." },
      { title: "Sweet Potato Staple", icon: "🍠", description: "Eating nutrient-dense Okinawan purple sweet potato (Beni-Imo), which is low-glycemic and packed with antioxidants." }
    ],
    dialectQuote: {
      phrase: "行逢りば兄弟 (Ichariba choodee)",
      translation: "Once we meet, we are brothers.",
      meaning: "The ultimate Okinawan expression of hospitality and kinship, stating that strangers cease to be strangers once they share a warm conversation."
    },
    imagePath: "/assets/nakagami_yomitan.jpg"
  },
  {
    id: "shimajiri",
    name: "Shimajiri (Southern & Naha)",
    japaneseName: "島尻郡 / 那覇 (南部地区)",
    pronunciation: "Shee-mah-jee-ree",
    greeting: "はいたい",
    greetingTranslation: "Haitai (Greetings - gender respectful)",
    themeColor: "193, 90%, 43%", // Ocean Cyan
    glowColor: "#06b6d4",
    description: "The historical heartbeat, cultural center, and urban core of the prefecture. Shimajiri encompasses Naha, the grand capital of the historic Ryukyu Kingdom, as well as somber world-war peace parks and mysterious prehistoric cave systems.",
    capital: "Naha City (Prefectural Capital)",
    stats: {
      forestCoverage: 12,
      tourismIndex: 96,
      longevityScore: 90,
      populationDensity: "Extremely Dense (Urban Core & Capital Hub)"
    },
    keyAttractions: [
      { name: "Shuri Castle (Shurijo)", description: "The majestic red and gold palace of the Ryukyu Kingdom, beautifully blending Japanese and Chinese architecture.", category: "history", lng: 127.7196, lat: 26.2183 },
      { name: "Kokusai Street", description: "Naha's lively 'International Mile' packed with souvenir shops, Okinawan folk music taverns (Izakayas), and street food.", category: "culture", lng: 127.6896, lat: 26.2152 },
      { name: "Okinawa Peace Memorial Park", description: "A solemn, beautifully landscaped cliff-top park commemorating the tragic Battle of Okinawa with the Cornerstone of Peace monument.", category: "history", lng: 127.7258, lat: 26.0964 },
      { name: "Valley of Gangala", description: "A mysterious limestone valley formed inside a collapsed cave, home to a massive 150-year-old banyan tree and ancient human ruins.", category: "nature", lng: 127.7503, lat: 26.1361 }
    ],
    culinarySpecialties: [
      { name: "Awamori", description: "Okinawa's unique distilled spirit made from long-grain indica rice, fermented with black koji mold and aged in clay pots.", emoji: "🍶" },
      { name: "Goya Champuru", description: "A bitter melon stir-fry with tofu, eggs, and pork, packed with vitamin C and widely known as the king of longevity meals.", emoji: "🍳" },
      { name: "Mozuku Seaweed", description: "Slimy, mineral-rich dark seaweed harvested from pure Okinawan waters, served cold in sweet vinegar.", emoji: "🥗" }
    ],
    longevitySecrets: [
      { title: "Traditional Food as Medicine", icon: "🥗", description: "Adhering to 'Kusuibui' (medicine for the body) by integrating bitter gourd, seaweed, turmeric, and tofu in daily meals." },
      { title: "Walkable Urbanism", icon: "🚶‍♂️", description: "Naha and Shuri's winding stone paths encourage consistent, low-impact exercise through walking every day." },
      { title: "Hara Hachi Bu", icon: "🍽️", description: "The ancient wisdom of eating until you are only 80% full, preventing overeating and preserving long-term digestive health." }
    ],
    dialectQuote: {
      phrase: "なんくるないさ (Nankuru naisa)",
      translation: "In the end, everything will be alright.",
      meaning: "Historically part of a longer phrase, this represents extreme optimism, resilience, and faith that through hard work and time, life's challenges will resolve."
    },
    imagePath: "/assets/shimajiri_shuri.jpg"
  },
  {
    id: "miyako",
    name: "Miyako Islands",
    japaneseName: "宮古郡 (宮古諸島)",
    pronunciation: "Mee-yah-ko",
    greeting: "おーりとーり",
    greetingTranslation: "Oori Toori (Welcome in Miyako)",
    themeColor: "343, 89%, 60%", // Warm Coral Pink / Rose
    glowColor: "#f43f5e",
    description: "A gorgeous cluster of low-lying coral islands situated southwest of the main island. Famed worldwide for having the most spectacular beaches in Japan, glowing turquoise waters ('Miyako Blue'), and a laid-back, slow-paced island atmosphere.",
    capital: "Miyakojima City",
    stats: {
      forestCoverage: 8,
      tourismIndex: 78,
      longevityScore: 94,
      populationDensity: "Moderate (Island Tourism & Sugarcane Fields)"
    },
    keyAttractions: [
      { name: "Yonaha Maehama Beach", description: "Frequently voted the best beach in East Asia, boasting 7 kilometers of powdery, snow-white sand and pristine turquoise water.", category: "beaches", lng: 125.2635, lat: 24.7371 },
      { name: "Irabu Bridge", description: "Japan's longest toll-free bridge stretching 3,540 meters, curving elegantly over the shallow crystal reef flats.", category: "nature", lng: 125.2152, lat: 24.8143 },
      { name: "Higashi-Hennazaki", description: "A narrow, breathtaking 2km green cape stretching into the indigo sea, capped with an elegant white lighthouse.", category: "nature", lng: 125.4308, lat: 24.7239 }
    ],
    culinarySpecialties: [
      { name: "Miyako Soba", description: "Traditional flat noodles where the ingredients (pork ribs and fish cake) are hidden underneath the noodles as a surprise.", emoji: "🍜" },
      { name: "Yukisio (Snow Salt)", description: "An ultra-fine mineral salt derived from clean underground seawater, recognized as holding the world record for mineral variety.", emoji: "🧂" },
      { name: "Miyako Mangoes", description: "Breathtakingly sweet, sun-ripened tropical mangoes grown in highly alkaline limestone soil.", emoji: "🥭" }
    ],
    longevitySecrets: [
      { title: "Mineral-Rich Soil Foods", icon: "🍠", description: "Eating crops grown in alkaline coral-limestone soils, which are uniquely saturated with calcium, magnesium, and trace minerals." },
      { title: "Miyako Sea Salt Hydration", icon: "🧂", description: "Adding Yukisio (Snow Salt) to foods to replenish essential salts and trace electrolytes, combating heat exhaustion." },
      { title: "Deep Sea-Mineral Therapy", icon: "🌊", description: "Immersing regularly in the incredibly clean coral lagoon waters, providing high mineral absorption and relaxation." }
    ],
    dialectQuote: {
      phrase: "ぱかりば後 (Pakariba ato)",
      translation: "When we meet, we become friends.",
      meaning: "Reflects the warm, unpretentious attitude of the Miyako islanders, who value spontaneous community bonds over formal ceremonies."
    },
    imagePath: "/assets/miyako_blue.jpg"
  },
  {
    id: "yaeyama",
    name: "Yaeyama Islands",
    japaneseName: "八重山郡 (八重山諸島)",
    pronunciation: "Yah-eh-yah-mah",
    greeting: "よーらり",
    greetingTranslation: "Yoorori (Welcome in Yaeyama)",
    themeColor: "36, 96%, 48%", // Warm Sunset Orange
    glowColor: "#f59e0b",
    description: "The pristine southernmost and westernmost islands of Japan. It includes Ishigaki (the vibrant hub), Taketomi (famous for its ancient red-tiled traditional village), and the primeval, untamed jungle-covered Iriomote Island.",
    capital: "Ishigaki City",
    stats: {
      forestCoverage: 76,
      tourismIndex: 82,
      longevityScore: 96,
      populationDensity: "Very Sparse (Remote Wilderness & Coral Atolls)"
    },
    keyAttractions: [
      { name: "Kabira Bay", description: "A globally acclaimed bay of swirling emerald and turquoise waters, famous for black pearl farming and glass-bottom boats.", category: "beaches", lng: 124.1432, lat: 24.4533 },
      { name: "Taketomi Preservation Village", description: "A beautifully preserved traditional village where you can ride water buffalo carts along white-sand roads lined with stone walls.", category: "culture", lng: 124.0883, lat: 24.3297 },
      { name: "Iriomote Jungle Cruise", description: "Exploring Japan's largest mangrove forest by boat on the Urauchi River, looking out for the critically endangered Iriomote wildcat.", category: "nature", lng: 123.8219, lat: 24.3168 },
      { name: "Yonaguni Monument", description: "A mysterious massive underwater stone structure off Yonaguni island, debated to be natural or an ancient sunken civilization.", category: "history", lng: 122.9961, lat: 24.4372 }
    ],
    culinarySpecialties: [
      { name: "Yaeyama Soba", description: "Features round noodles served with finely shredded pork and fish cakes, topped with a dash of native island pepper (Pipatsu).", emoji: "🍜" },
      { name: "Ishigaki Beef", description: "Premium, highly marbled black-haired Wagyu beef from cattle raised on the island's sea-salted lush grasslands.", emoji: "🥩" },
      { name: "Yaeyama Kokuto", description: "Pure, artisanal brown sugar rich in minerals and molasses, hand-boiled from fresh tropical sugarcane juice.", emoji: "🟫" }
    ],
    longevitySecrets: [
      { title: "Pure Sugarcane Molasses", icon: "🟫", description: "Using Kokuto (unrefined black sugar) rather than refined white sugar, providing massive iron, potassium, and calcium." },
      { title: "Zero Industrial Stress", icon: "🌌", description: "Living in islands with virtually zero light or air pollution, fostering natural circadian rhythm sleeps and low cortisol." },
      { title: "Sanshin Folk Music Therapy", icon: "🪕", description: "Playing the snake-skin Sanshin lute and dancing Shika-dance in community, reducing anxiety and keeping joints agile." }
    ],
    dialectQuote: {
      phrase: "すまりどぅ宝 (Smari du takara)",
      translation: "An island itself is a treasure.",
      meaning: "Expresses deep environmental stewardship, signifying that the island's sand, wind, sea, and life are irreplaceable riches that must be guarded."
    },
    imagePath: "/assets/yaeyama_kabira.jpg"
  }
];

export interface RouteStop {
  id: string;
  name: string;
  districtId: string;
  description: string;
  travelTimeMin: number; // Cumulative driving time from previous stop
  scenicRating: number;   // 1 to 5
  attractionName: string;
}

export const roadTripStops: RouteStop[] = [
  { id: "naha", name: "Naha City (Start)", districtId: "shimajiri", description: "Pick up your rental car in Naha and drive past the historic Ryukyu stone streets of the capital gateway.", travelTimeMin: 0, scenicRating: 3, attractionName: "Kokusai Street" },
  { id: "shuri", name: "Shuri Royal Castle", districtId: "shimajiri", description: "Walk the beautiful red-tile castle gates and stone-paved paths of Ryukyu kings.", travelTimeMin: 20, scenicRating: 4, attractionName: "Shuri Castle (Shurijo)" },
  { id: "chatan", name: "Chatan (American Village)", districtId: "nakagami", description: "Drive along the central coastline, grabbing lunch at Mihama American Village while enjoying surf views.", travelTimeMin: 35, scenicRating: 4, attractionName: "Mihama American Village" },
  { id: "yomitan", name: "Yomitan Pottery Village", districtId: "nakagami", description: "A quiet, green detour in Yomitan to see local potters handcrafting ceramics near ancient kilns.", travelTimeMin: 25, scenicRating: 4, attractionName: "Yomitan Pottery Village" },
  { id: "onna", name: "Cape Manzamo (Onna Coast)", districtId: "kunigami", description: "Enter the scenic northern region. Stop at Cape Manzamo to view the famous elephant-shaped sea cliff.", travelTimeMin: 30, scenicRating: 5, attractionName: "Kouri Island & Bridge" },
  { id: "motobu", name: "Motobu & Aquarium", districtId: "kunigami", description: "Visit the massive Whale Sharks at Churaumi, then cross the scenic bridge to Kouri Island.", travelTimeMin: 45, scenicRating: 5, attractionName: "Okinawa Churaumi Aquarium" },
  { id: "yanbaru", name: "Yanbaru UNESCO Forest (End)", districtId: "kunigami", description: "Arrive in the deep northern forests. Hike through subtropical ferns and sleep under the star-studded night sky.", travelTimeMin: 60, scenicRating: 5, attractionName: "Yanbaru Forest Park" }
];
