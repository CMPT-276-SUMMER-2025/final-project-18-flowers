// destinations cards data 
export const cities = {
  "Taipei City" : ['Taipei City', '/assets/destinations/taipei.jpg', "Modern capital with night markets and Taipei 101."], 
  "Hualien City" : ['Hualien City', '/assets/destinations/hualien.jpg', "Coastal town near cliffs and Taroko Gorge."],
  "Yilan City" : ['Yilan City', '/assets/destinations/yilan.jpg', "Peaceful area known for hot springs and farms."],
  "Taichung City" : ['Taichung City', '/assets/destinations/taichung.jpg', "Cultural hub and birthplace of bubble tea."],
  "Tainan City" : ['Tainan City', '/assets/destinations/tainan.jpg', "Oldest city with temples and local snacks."],
  "Kaohsiung City" : ['Kaohsiung City', '/assets/destinations/kaohsiung.jpg', "Port city with art, beaches, and skyline."],

  // new destinations
  "New Taipei City" : ['New Taipei City', '/assets/destinations/newtaipei.jpg', "Surrounds Taipei with Jiufen, Shifen, and seaside charm."],
  "Keelung City" : ['Keelung City', '/assets/destinations/keelung.jpg', "Harbor city known for its night market and rainy charm."],
  "Taitung City" : ['Taitung City', '/assets/destinations/taitung.jpg', "East coast escape with ocean views and indigenous culture."],
  "Nantou County" : ['Nantou County', '/assets/destinations/nantou.jpg', "Mountainous heart of Taiwan with scenic landscapes."],
  "Chiayi City" : ['Chiayi City', '/assets/destinations/chiayi.jpg', "Gateway to Alishan with local eats and quiet vibes."],
  "Pingtung County" : ['Pingtung County', '/assets/destinations/pingtung.jpg', "Southern region best known for sunny Kenting beaches."],
  "Miaoli County" : ['Miaoli County', '/assets/destinations/miaoli.jpg', "Hilly region with Hakka culture and seasonal farming."],
  "Changhua County" : ['Changhua County', '/assets/destinations/changhua.jpg', "Historic area with temples and a giant Buddha."]
};

export const mockInterestData = {
  "shopping_mall" : [
    { id: "m1", displayName: "Taipei 101 Shopping Center", description: "Luxury shopping in an iconic skyscraper.", photoUrl: "/assets/interest-attractions/taipei-101-shopping-center.jpg" },
    { id: "m2", displayName: "Q Square Mall", description: "Trendy urban mall near Taipei Main Station.", photoUrl: "/assets/interest-attractions/q-square-mall.jpg" },
    { id: "m3", displayName: "Tai Mall", description: "Spacious mall with shops and entertainment.", photoUrl: "/assets/interest-attractions/tai-mall.jpg" },
    { id: "m4", displayName: "Taipei City Mall", description: "Underground mall for budget shopping.", photoUrl: "/assets/interest-attractions/taipei-city-mall.jpg" },
    { id: "m5", displayName: "Dream Mall", description: "Kaohsiung’s huge mall with a rooftop Ferris wheel.", photoUrl: "/assets/interest-attractions/dream-mall.jpg" },
    { id: "m6", displayName: "T.S. Mall", description: "Modern mall in Tainan with diverse stores.", photoUrl: "/assets/interest-attractions/t-s-mall.jpg" },
  ],
  "amusement_park" : [
    { id: "p1", displayName: "Leofoo Village Theme Park", description: "Safari, rides, and fun for all ages.", photoUrl: "/assets/interest-attractions/leofoo-village-theme-park.jpg" },
    { id: "p2", displayName: "Taipei Children's Amusement Park", description: "Kid-friendly rides and attractions.", photoUrl: "/assets/interest-attractions/taipei-children's-amusement-park.jpg" },
    { id: "p3", displayName: "Window on World Theme Park", description: "Mini world landmarks and theme rides.", photoUrl: "/assets/interest-attractions/window-on-world-theme-park.jpg" },
    { id: "p4", displayName: "Formosan Aboriginal Culture Village", description: "Cultural shows and amusement park.", photoUrl: "/assets/interest-attractions/formosan-aboriginal-culture-village.jpg" },
    { id: "p5", displayName: "LIHPAO Discovery Land", description: "Thrilling rides and water park.", photoUrl: "/assets/interest-attractions/lihpao-discovery-land.jpg" },
    { id: "p6", displayName: "Farglory Ocean Park", description: "Marine-themed park by the coast.", photoUrl: "/assets/interest-attractions/farglory-ocean-park.jpg" },
  ],
  "tourist_attraction" : [  
    { id: "t1", displayName: "Yangmingshan National Park", description: "Hot springs, trails, and mountain views.", photoUrl: "/assets/interest-attractions/yangmingshan-national-park.jpg" },
    { id: "t2", displayName: "Shifen Waterfall", description: "Stunning wide cascade in nature.", photoUrl: "/assets/interest-attractions/shifen-waterfall.jpg" },
    { id: "t3", displayName: "Chiang Kai-shek Memorial Hall", description: "Historic monument with gardens.", photoUrl: "/assets/interest-attractions/chiang-kai-shek-memorial-hall.jpg" },
    { id: "t4", displayName: "Kenting National Park", description: "Tropical beaches and coral reefs.", photoUrl: "/assets/interest-attractions/kenting-national-park.jpg" },
    { id: "t5", displayName: "Shuanglong Waterfalls", description: "Twin waterfalls in a forest setting.", photoUrl: "/assets/interest-attractions/shuanglong-waterfalls.jpg" },
    { id: "t6", displayName: "Taiwan Glass Gallery", description: "Artistic glassworks and exhibits.", photoUrl: "/assets/interest-attractions/taiwan-glass-gallery.jpg" },
  ],
  "historical_place": [
    { id: "h1", displayName: "Chiang Kai-shek Memorial Hall", description: "Monument honoring Taiwan’s former leader.", photoUrl: "/assets/interest-attractions/chiang-kai-shek-memorial-hall.jpg" },
    { id: "h2", displayName: "National Palace Museum", description: "Home to ancient Chinese artifacts.", photoUrl: "/assets/interest-attractions/national-palace-museum.jpg" },
    { id: "h3", displayName: "Anping Fort", description: "Dutch colonial fort in Tainan.", photoUrl: "/assets/interest-attractions/anping-fort.jpg" },
    { id: "h4", displayName: "Bopiliao Historical Block", description: "Restored Qing-era street in Taipei.", photoUrl: "/assets/interest-attractions/bopiliao-historical-block.jpg" },
    { id: "h5", displayName: "Presidential Office Building", description: "Japanese-era government building.", photoUrl: "/assets/interest-attractions/presidential-office-building.jpg" },
    { id: "h6", displayName: "National Taiwan Museum", description: "Natural and cultural history museum.", photoUrl: "/assets/interest-attractions/national-taiwan-museum.jpg" },
  ]
};



// regions map data
export const citiesLatLng = [
  { 
    id: "taipei", 
    coord: { lat: 25.0329, lng: 121.5654 }, 
    header: "Taipei City", 
    description: "The bustling capital of Taiwan, known for Taipei 101, vibrant night markets, and rich cultural heritage.", 
    region: "Northern Taiwan",
    image: "/assets/destinations/taipei.jpg"
  }, // Taipei
  
  { 
    id: "hualien", 
    coord: { lat: 23.9742, lng: 121.6016 }, 
    header: "Hualien City", 
    description: "Home to Taroko Gorge and stunning coastal scenery, offering some of Taiwan's best nature spots.", 
    region: "Eastern Taiwan",
    image: "/assets/destinations/hualien.jpg"
  }, // Hualien
  
  { 
    id: "yilan", 
    coord: { lat: 24.7571, lng: 121.7539 }, 
    header: "Yilan City", 
    description: "Famous for hot springs, lush mountains, and traditional Taiwanese culture.", 
    region: "Northeastern Taiwan",
    image: "/assets/destinations/yilan.jpg"
  }, // Yilan
  
  { 
    id: "kaohsiung", 
    coord: { lat: 22.6273, lng: 120.3014 }, 
    header: "Kaohsiung City", 
    description: "A major port city with art districts, night markets, historical buildings, and skyline.", 
    region: "Southern Taiwan",
    image: "/assets/destinations/kaohsiung.jpg"
  }, // Kaohsiung

  { 
    id: "tainan", 
    coord: { lat: 22.9995, lng: 120.2293 }, 
    header: "Tainan City", 
    description: "The oldest city in Taiwan, known for its rich history, temples, and delicious local snacks.", 
    region: "Southern Taiwan",
    image: "/assets/destinations/tainan.jpg"
  }, // Tainan

  { 
    id: "taichung", 
    coord: { lat: 24.1477, lng: 120.6736 }, 
    header: "Taichung City", 
    description: "A vibrant city with cultural attractions, parks, and access to central Taiwan's mountains.", 
    region: "Central Taiwan",
    image: "/assets/destinations/taichung.jpg"
  }, // Taichung

  // new destinations

  { 
    id: "newtaipei", 
    coord: { lat: 25.0163, lng: 121.4628 }, 
    header: "New Taipei City", 
    description: "Large surrounding area of Taipei with natural escapes, coastal towns, and historic sites.", 
    region: "Northern Taiwan",
    image: "/assets/destinations/newtaipei.jpg"
  }, // New Taipei

  { 
    id: "keelung", 
    coord: { lat: 25.1276, lng: 121.7392 }, 
    header: "Keelung City", 
    description: "Northern port city known for seafood night markets, harbor views, and rainy weather.", 
    region: "Northern Taiwan",
    image: "/assets/destinations/keelung.jpg"
  }, // Keelung

  { 
    id: "taitung", 
    coord: { lat: 22.7579, lng: 121.1507 }, 
    header: "Taitung City", 
    description: "East coast city with indigenous culture, Pacific views, and laid-back island vibes.", 
    region: "Eastern Taiwan",
    image: "/assets/destinations/taitung.jpg"
  }, // Taitung

  { 
    id: "nantou", 
    coord: { lat: 23.9090, lng: 120.6834 }, 
    header: "Nantou County", 
    description: "Landlocked region with mountains, tea farms, and access to scenic nature spots.", 
    region: "Central Taiwan",
    image: "/assets/destinations/nantou.jpg"
  }, // Nantou

  { 
    id: "chiayi", 
    coord: { lat: 23.4750, lng: 120.4497 }, 
    header: "Chiayi City", 
    description: "Gateway to Alishan with history, street food, and a slower southern atmosphere.", 
    region: "Southern Taiwan",
    image: "/assets/destinations/chiayi.jpg"
  }, // Chiayi

  { 
    id: "pingtung", 
    coord: { lat: 22.6767, lng: 120.4902 }, 
    header: "Pingtung County", 
    description: "Southern region best known for Kenting’s beaches, nightlife, and ocean scenery.", 
    region: "Southern Taiwan",
    image: "/assets/destinations/pingtung.jpg"
  }, // Pingtung

  { 
    id: "miaoli", 
    coord: { lat: 24.5599, lng: 120.8209 }, 
    header: "Miaoli County", 
    description: "Hilly area with Hakka heritage, cultural parks, and quiet countryside landscapes.", 
    region: "Northern Taiwan",
    image: "/assets/destinations/miaoli.jpg"
  }, // Miaoli

  { 
    id: "changhua", 
    coord: { lat: 24.0705, lng: 120.5306 }, 
    header: "Changhua County", 
    description: "Central town featuring giant Buddha statues, temples, and traditional local charm.", 
    region: "Central Taiwan",
    image: "/assets/destinations/changhua.jpg"
  } // Changhua
];

// city interests page data 
export const cityInterestsData = {
  "Taipei City" : [
    '/assets/taipei-night.jpeg', 
    "Taipei City (台北市, Táiběi Shì) is the capital and largest metropolitan area of Taiwan, serving as the political, economic, and cultural heart of the island. Located in the Taipei Basin and surrounded by lush mountains, the city offers a unique blend of modern skyscrapers, historic temples, and vibrant street culture. Taipei is renowned for its landmarks, including the towering Taipei 101, the National Palace Museum with its world-class collection of Chinese artifacts, and bustling night markets such as Shilin and Raohe.\n\n Historically, Taipei developed from a small trading settlement during the Qing Dynasty into a major administrative and commercial hub under Japanese rule (1895–1945), which left lasting influences on its architecture and infrastructure. Today, Taipei thrives as a global city, known for its efficient MRT system, thriving tech industry, and diverse culinary scene ranging from street food to Michelin-starred restaurants.\n\n Visitors can soak in hot springs in nearby Beitou, hike Elephant Mountain for panoramic views, or enjoy cultural festivals throughout the year. With its mix of modernity, history, and natural surroundings, Taipei stands as one of Asia’s most dynamic and welcoming cities.",
  ], 
  "Hualien City" : [
    '/assets/city-interests/ci-hualien.jpg', 
    "Hualien City (花蓮市, Huālián Shì) is the largest city on Taiwan's east coast and the seat of Hualien County. Nestled between the Pacific Ocean and the Central Mountain Range, it is renowned for its stunning natural landscapes and relaxed coastal charm. The city serves as a gateway to some of Taiwan's most famous attractions, including Taroko Gorge, one of the island's top scenic wonders. Historically, Hualien was home to indigenous peoples long before Chinese settlers arrived in the Qing Dynasty. The area developed slowly compared to Taiwan's western plains, preserving much of its natural beauty. During Japanese rule (1895–1945), Hualien underwent significant modernization, and many architectural traces from this era remain today. Modern Hualien blends cultural diversity, vibrant night markets, and a slower pace of life with breathtaking views of mountains and ocean. Visitors can enjoy the local cuisine, explore seaside parks, or venture into the surrounding national parks. For those seeking tranquility and nature, Hualien is one of Taiwan's most captivating destinations.",
  ],
  "Yilan City" : [
    '/assets/city-interests/ci-yilan.jpg', 
    "Yilan City (宜蘭市, Yílán Shì) lies along Taiwan's northeastern coast, known for its hot springs, scenic countryside, and strong ties to traditional culture. Surrounded by mountains and ocean, Yilan offers a peaceful alternative to urban life, with attractions like Luodong Night Market, Lanyang Museum, and Jiaoxi's natural hot springs. The area also features rice paddies, farms, and festivals celebrating local art and food. Its laid-back atmosphere and natural beauty make it a favorite weekend getaway for residents of Taipei.",
  ],
  "Taichung City" : [
    '/assets/city-interests/ci-taichung.jpg', 
    "Taichung City (台中市, Táizhōng Shì) is located in central Taiwan and is the island's second-largest city. A cultural and economic hub, Taichung is famous as the birthplace of bubble tea and home to the National Taichung Theater, Rainbow Village, and Fengjia Night Market—one of Asia's largest. With a mix of art, shopping, and urban parks, it offers a youthful, modern vibe. Its central location also makes it a convenient base for exploring nearby mountains, lakes, and temples.",
  ],
  "Tainan City" : [
    '/assets/city-interests/ci-tainan.jpg', 
    "Tainan City (台南市, Táinán Shì) is Taiwan’s oldest city and former capital, rich in temples, forts, and centuries-old streets. Known for its deeply rooted traditions and historic architecture, Tainan offers visitors a journey through time. Famous sites include Chihkan Tower, Anping Old Fort, and the Confucius Temple. The city is equally beloved for its street food scene, featuring dishes like danzai noodles and milkfish soup. Its warm climate and cultural charm make it a must-visit destination.",
  ],
  "Kaohsiung City" : [
    '/assets/city-interests/ci-kaohsiung.jpg', 
    "Kaohsiung City (高雄市, Gāoxióng Shì) is a vibrant southern metropolis and Taiwan’s largest port. Once heavily industrial, Kaohsiung has transformed into a city of art, green spaces, and modern waterfronts. Popular attractions include the Pier-2 Art Center, Liuhe Night Market, Lotus Pond, and the scenic Love River. Its warm weather, expanding metro system, and relaxed coastal vibe appeal to travelers seeking both culture and comfort. It’s also a gateway to southern islands and beaches.",
  ],

  // new destinations
  "New Taipei City" : [
    '/assets/city-interests/ci-newtaipei.jpg',
    "New Taipei City (新北市, Xīnběi Shì) encircles Taipei and is home to many of northern Taiwan's most iconic attractions. It features scenic mountain towns like Jiufen and Pingxi, coastal marvels like Yehliu Geopark, and popular waterfall hikes such as Shifen. With a mix of nature, tradition, and old mining villages turned tourist favorites, New Taipei offers quick escapes from the capital.\n\n Formerly known as Taipei County, it became a special municipality in 2010. Despite being heavily urbanized in areas like Banqiao and Xinzhuang, New Taipei preserves many green spaces and cultural sites that showcase Taiwan’s history and natural beauty. Travelers often day-trip here from Taipei, but the region’s diversity merits longer stays for those exploring the real depth of northern Taiwan."
  ],
  "Keelung City" : [
    '/assets/city-interests/ci-keelung.jpg',
    "Keelung City (基隆市, Jīlóng Shì) is a port city located northeast of Taipei, famous for its maritime culture and seafood-rich night market. Often shrouded in misty rain, Keelung exudes a moody charm with its oceanfront views, colonial remnants, and harbor-side temples. A historic gateway for trade and migration, it has long been one of Taiwan’s most important harbors.\n\n Visitors can explore the colorful Zhengbin Fishing Port, climb to mountain-top forts, or enjoy sea views from Lover's Lake. Its accessibility from Taipei makes it a favored half-day or full-day destination, especially for travelers arriving by cruise ships or seeking coastal vibes."
  ],
  "Taitung City" : [
    '/assets/city-interests/ci-taitung.jpg',
    "Taitung City (台東市, Táidōng Shì) lies on Taiwan’s scenic southeastern coast and serves as a laid-back hub for nature lovers and cultural explorers. Surrounded by mountains and the Pacific Ocean, it’s known for its indigenous heritage, relaxed vibe, and proximity to natural wonders along the East Rift Valley and coastline.\n\n Taitung hosts Taiwan’s annual International Balloon Festival in nearby Luye and is also the launching point for ferries to Green Island and Orchid Island. It’s less developed than the west coast cities, but that’s part of its charm—ideal for those seeking hot springs, cycling paths, or slow travel immersed in Taiwan’s rich aboriginal cultures."
  ],
  "Nantou County" : [
    '/assets/city-interests/ci-nantou.jpg',
    "Nantou County (南投縣, Nántóu Xiàn) is Taiwan’s only landlocked region, located in the mountainous center of the island. Despite lacking a coastline, it’s one of Taiwan’s most popular domestic travel destinations, thanks to Sun Moon Lake, Cingjing Farm, and access to the Central Mountain Range.\n\n Rich in tea-growing culture and forested beauty, Nantou blends agricultural life with tourism, attracting hikers, cyclists, and leisure travelers alike. Visitors can experience scenic cable cars, high-altitude farms, and traditional indigenous villages that reflect the heart of rural Taiwan."
  ],
  "Chiayi City" : [
    '/assets/city-interests/ci-chiayi.jpg',
    "Chiayi City (嘉義市, Jiāyì Shì) is a quiet city in southwestern Taiwan known as the main gateway to the Alishan mountain area. While the city itself is small and laid-back, it has a distinct cultural identity rooted in forestry, railroads, and local cuisine.\n\n Historically shaped by Japanese colonization, Chiayi retains charming relics such as the Chiayi Old Prison and Hinoki Village. Visitors typically use it as a base for exploring Alishan but can enjoy a relaxed stop here with night markets, woodcraft traditions, and friendly hospitality."
  ],
  "Pingtung County" : [
    '/assets/city-interests/ci-pingtung.jpg',
    "Pingtung County (屏東縣, Píngdōng Xiàn) occupies Taiwan’s southern tip and is best known for Kenting National Park, with its sunny beaches, coral reefs, and tropical landscapes. While Kenting draws most visitors, the county also offers cultural and indigenous experiences inland.\n\n Pingtung’s warm climate and coastal beauty make it a favorite for vacations, especially among locals. Though other parts of the county are less tourist-oriented, Kenting alone makes Pingtung a must-visit for beach lovers and festivalgoers alike."
  ],
  "Miaoli County" : [
    '/assets/city-interests/ci-miaoli.jpg',
    "Miaoli County (苗栗縣, Miáolì Xiàn) is a hilly region in north-central Taiwan, known for its Hakka heritage, seasonal farming, and slower rural pace. It lacks the dense tourism infrastructure of Taiwan’s bigger cities, but offers peaceful retreats and cultural depth.\n\n Visitors can explore Hakka villages, try traditional Lei Cha (ground tea), or join seasonal events like strawberry and tung blossom festivals. Miaoli is ideal for travelers looking to experience Taiwan’s countryside and minority cultures away from the usual tourist trail."
  ],
  "Changhua County" : [
    '/assets/city-interests/ci-changhua.jpg',
    "Changhua County (彰化縣, Zhānghuà Xiàn) sits in central Taiwan and is best known for its historical temples, local markets, and the massive Great Buddha statue at Baguashan. While not a major tourism hotspot, it offers a glimpse into Taiwan’s religious traditions and agricultural heritage.\n\n As one of Taiwan’s earliest Han Chinese settlements, Changhua played a key role in early development on the island. Today, it remains an authentic place to explore folk culture, traditional architecture, and a slower pace of life."
  ]
};

// attractions data to save costs while developing for city interests page
export const mockPlacesAttractions = [
  {
    id: '1',
    displayName: 'Chiang Kai-shek Memorial Hall',
    photoUrl: '/assets/attractions/attraction-1.jpg',
  },
  {
    id: '2',
    displayName: 'Taipei 101',
    photoUrl: '/assets/attractions/attraction-2.jpg',
  },
  {
    id: '3',
    displayName: 'Longshan Temple',
    photoUrl: '/assets/attractions/attraction-3.jpg',
  },
  {
    id: '4',
    displayName: 'National Palace Museum',
    photoUrl: '/assets/attractions/attraction-4.jpg',
  },
  {
    id: '5',
    displayName: 'Sun Yat-sen Memorial Hall',
    photoUrl: '/assets/attractions/attraction-5.jpg',
  },
  {
    id: '6',
    displayName: 'Bopiliao Historic Block',
    photoUrl: '/assets/attractions/attraction-6.jpg',
  },
  {
    id: '7',
    displayName: 'Huashan 1914 Creative Park',
    photoUrl: '/assets/attractions/attraction-7.jpg',
  },
  {
    id: '8',
    displayName: 'Maokong Gondola',
    photoUrl: '/assets/attractions/attraction-8.jpg',
  },
  {
    id: '9',
    displayName: 'Beitou Hot Springs',
    photoUrl: '/assets/attractions/attraction-9.jpg',
  },
];

// hotels data to save costs while developing for city interests page
export const mockPlacesHotels = [
  {
    id: 'h1',
    displayName: 'Grand Hotel Taipei',
    photoUrl: '/assets/hotels/hotel-1.jpg',
  },
  {
    id: 'h2',
    displayName: 'Taipei Garden',
    photoUrl: '/assets/hotels/hotel-2.jpg',
  },
  {
    id: 'h3',
    displayName: 'CitizenM Taipei North Gate',
    photoUrl: '/assets/hotels/hotel-3.jpg',
  },
  {
    id: 'h4',
    displayName: 'Palais de Chine',
    photoUrl: '/assets/hotels/hotel-4.jpg',
  },
];

// restaurants data to save costs while developing for city interests page
export const mockPlacesRestaurants = [
  {
    id: 'r1',
    displayName: 'A Joy',
    photoUrl: '/assets/restaurants/res-1.jpg',
  },
  {
    id: 'r2',
    displayName: 'Wind City Moon',
    photoUrl: '/assets/restaurants/res-2.jpg',
  },
  {
    id: 'r3',
    displayName: 'Liaoning Street Night Market',
    photoUrl: '/assets/restaurants/res-3.jpg',
  },
  {
    id: 'r4',
    displayName: 'RAW Taipei',
    photoUrl: '/assets/restaurants/res-4.jpg',
  },
];

export const cityCoordinates = {
  "Taipei City": { lat: 25.0330, lng: 121.5654 },
  "Hualien City": { lat: 23.9878, lng: 121.6044 },
  "Yilan City": { lat: 24.7546, lng: 121.7550 },
  "Kaohsiung City": { lat: 22.6273, lng: 120.3014 },
  "Tainan City": { lat: 22.9999, lng: 120.2270 },
  "Taichung City": { lat: 24.1477, lng: 120.6736 },
  "New Taipei City": { lat: 25.0169, lng: 121.4628 },
  "Keelung City": { lat: 25.1283, lng: 121.7419 },
  "Taitung": { lat: 22.7583, lng: 121.1442 },
  "Nantou County": { lat: 23.8388, lng: 120.9876 },
  "Chiayi City": { lat: 23.4800, lng: 120.4499 },
  "Pingtung County": { lat: 22.6775, lng: 120.4905 },
  "Miaoli County": { lat: 24.5607, lng: 120.8219 },
  "Changhua County": { lat: 24.0681, lng: 120.5440 }
};
