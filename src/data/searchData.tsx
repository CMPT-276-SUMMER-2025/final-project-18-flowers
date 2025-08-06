const searchData = [
  // Skipped Taipei and New Taipei entries until confirmation of what to do with them
  {
    id: 1,
    name: "Taipei 101 Observatory",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taipei",
    description: "A landmark skyscraper and popular observation deck offering views of Taipei’s skyline.",
    path: "/destinations/taipei-city/taipei-101-observatory"
  },
  {
    id: 2,
    name: "Shilin Night Market",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taipei",
    description: "Taipei’s largest night market, famous for street food, shopping, and local culture.",
    path: "/destinations/shilin-night-market"
  },
  {
    id: 3,
    name: "Taroko Gorge",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Hualien",
    description: "A stunning marble gorge in Taroko National Park, ideal for hiking and nature sightseeing.",
    path: "/destinations/taroko-gorge"
  },
  {
    id: 4,
    name: "Sun Moon Lake",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Nantou",
    description: "Taiwan’s largest natural lake surrounded by mountains and biking trails.",
    path: "/destinations/sun-moon-lake"
  },
  {
    id: 5,
    name: "Jiufen Old Street",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "New Taipei",
    description: "Historic gold mining town with teahouses, narrow alleys, and sea views.",
    path: "/destinations/jiufen-old-street"
  },
  {
    id: 6,
    name: "Alishan Forest Railway",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Chiayi",
    description: "Scenic mountain railway known for sunrise views, cherry blossoms, and forest walks.",
    path: "/destinations/alishan-forest-railway"
  },
  {
    id: 7,
    name: "National Palace Museum",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taipei",
    description: "World-renowned museum showcasing Chinese imperial artifacts and treasures.",
    path: "/destinations/taipei-city/national-palace-museum"
  },
  {
    id: 8,
    name: "Elephant Mountain Trail",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taipei",
    description: "Popular hiking spot offering panoramic views of Taipei and Taipei 101.",
    path: "/destinations/taipei-city/elephant-mountain-trail"
  },
  {
    id: 9,
    name: "Hualien Cultural and Creative Industries Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Hualien",
    description: "A vibrant cultural park featuring art exhibitions, creative workshops, and local crafts.",
    path: "/destinations/hualien-city/hualien-cultural-and-creative-industries-park"
  },
  {
    id: 10,
    name: "Hualien Railway Culture Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Hualien",
    description: "A historical railway park showcasing Hualien’s railway heritage with exhibitions and events.",
    path: "/destinations/hualien-city/hualien-railway-culture-park"
  },
  {
    id: 11,
    name: "Taipingyang Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Hualien",
    description: "A scenic coastal park in Hualien featuring walking paths, gardens, and ocean views.",
    path: "/destinations/hualien-city/taipingyang-park"
  },
  {
    id: 12,
    name: "Hualien Harbor Landscape Bridge",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Hualien",
    description: "A picturesque bridge offering stunning views of Hualien Harbor and the surrounding landscape.",
    path: "/destinations/hualien-city/hualien-harbor-landscape-bridge"
  },
  {
    id: 13,
    name: "Pacific Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Hualien",
    description: "A modern urban park in Hualien featuring recreational areas, gardens, and waterfront views.",
    path: "/destinations/hualien-city/pacific-park"
  },
  {
    id: 14,
    name: "Taiwan Aboriginal Culture Museum",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Hualien",
    description: "A museum dedicated to the rich cultural heritage of Taiwan’s indigenous peoples, showcasing artifacts, art, and traditions.",
    path: "/destinations/hualien-city/taiwan-aboriginal-culture-museum"
  },
  {
    id: 15,
    name: "Youyitsun Cultural and Creative Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Hualien",
    description: "A cultural and creative park in Hualien featuring art installations, workshops, and local crafts.",
    path: "/destinations/hualien-city/youyitsun-cultural-and-creative-park"
  },
  {
    id: 16,
    name: "Heping Square",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Hualien",
    description: "A vibrant public square in Hualien known for its events, markets, and community gatherings.",
    path: "/destinations/hualien-city/hualien-heping-square"
  },
  {
    id: 17,
    name: "Hualien Leisure Marina and Whale Watching",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Hualien",
    description: "A scenic coastal area in Hualien known for its beautiful beaches, walking paths, and ocean views.",
    path: "/destinations/hualien-city/hualien-leisure-marina-whale-watching"
  },
  {
    id: 18,
    name: "Yilan Cultural and Creative Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Yilan",
    description: "A cultural park in Yilan featuring art exhibitions, creative workshops, and local crafts.",
    path: "/destinations/yilan-city/yilan-cultural-and-creative-park"  
  },
  {
    id: 19,
    name: "Yilan Brick Kiln",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Yilan",
    description: "A historical brick kiln in Yilan showcasing traditional brick-making techniques and local craftsmanship.",
    path: "/destinations/yilan-city/yilan-brick-kiln"  
  },
  {
    id: 20,
    name: "Yang Shih Fang Memorial Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Yilan",
    description: "A memorial park in Yilan dedicated to the memory of Yang Shih Fang, featuring gardens and sculptures.",
    path: "/destinations/yilan-city/yang-shih-fang-memorial-park"  
  },
  {
    id: 21,
    name: "Yaokaoshanzhan Village",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Yilan",
    description: "A picturesque village in Yilan known for its scenic views, traditional architecture, and local culture.",
    path: "/destinations/yilan-city/yaokaoshanzhan-village"  
  },
  {
    id: 22,
    name: "Institute of Yilan County History",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Yilan",
    description: "A historical institute in Yilan dedicated to preserving and showcasing the history and culture of Yilan County.",
    path: "/destinations/yilan-city/institute-of-yilan-county-history"  
  },
  {
    id: 23,
    name: "Yilan Riverside Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Yilan",
    description: "A scenic riverside park in Yilan featuring walking paths, gardens, and recreational areas.",
    path: "/destinations/yilan-city/yilan-riverside-park"  
  },
  {
    id: 24,
    name: "Yilan Zhongyang Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Yilan",
    description: "A central park in Yilan City offering green spaces, walking paths, and recreational facilities.",
    path: "/destinations/yilan-city/yilanzhongyang-park"  
  },
  {
    id: 25,
    name: "Taiwan Theater Museum",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Yilan",
    description: "A museum in Yilan dedicated to the performing arts, showcasing exhibitions and performances.",
    path: "/destinations/yilan-city/taiwan-theater-museum"
  },
  {
    id: 26,
    name: "Yuanshan Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Yilan",
    description: "A tranquil park in Yilan featuring lush greenery, walking paths, and scenic views of the surrounding mountains.",
    path: "/destinations/yilan-city/yuanshan-park"
  },
  {
    id: 27,
    name: "Liuhe Night Market",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Kaohsiung",
    description: "A bustling night market in Kaohsiung known for its street food, local snacks, and vibrant atmosphere.",
    path: "/destinations/kaohsiung-city/liuhe-night-market"
  },
  {
    id: 28,
    name: "Dome of Light",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Kaohsiung",
    description: "A stunning glass dome installation in Kaohsiung's Formosa Boulevard MRT Station, known for its vibrant colors and artistic design.",
    path: "/destinations/kaohsiung-city/dome-of-light"
  },
  {
    id: 29,
    name: "Central Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Kaohsiung",
    description: "A large urban park in Kaohsiung featuring walking paths, gardens, and recreational areas.",
    path: "/destinations/kaohsiung-city/central-park"
  },
  {
    id: 30,
    name: "Spring and Autumn Pavilions",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Kaohsiung",
    description: "A beautiful temple complex in Kaohsiung featuring traditional Chinese architecture, gardens, and scenic views of the Lotus Pond.",
    path: "/destinations/kaohsiung-city/spring-and-autumn-pavilions"
  },
  {
    id: 31,
    name: "Kaohsiung Lighthouse",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Kaohsiung",
    description: "A historic lighthouse located at the entrance of Kaohsiung Harbor, offering panoramic views of the sea and city.",
    path: "/destinations/kaohsiung-city/kaohsiung-lighthouse"
  },
  {
    id: 32,
    name: "Glory Pier",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Kaohsiung",
    description: "A scenic waterfront area in Kaohsiung featuring a pier, walking paths, and views of the harbor.",
    path: "/destinations/kaohsiung-city/glory-pier"
  },
  {
    id: 33,
    name: "Lotus Pond Scenic Area",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Kaohsiung",
    description: "A picturesque area in Kaohsiung known for its lotus flowers, temples, and scenic walking paths around the pond.",
    path: "/destinations/kaohsiung-city/lotus-pond-scenic-area"
  },
  {
    id: 34,
    name: "Shoushan Zoo",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Kaohsiung",
    description: "A popular zoo in Kaohsiung featuring a variety of animals, educational exhibits, and beautiful natural surroundings.",
    path: "/destinations/kaohsiung-city/shoushan-zoo"
  },
  {
    id: 35,
    name: "Love River Bay",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Kaohsiung",
    description: "A scenic waterfront area along the Love River, known for its romantic atmosphere, walking paths, and views of the river.",
    path: "/destinations/kaohsiung-city/love-river-bay"
  },
  {
    id: 36,
    name: "Anping Fort",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Tainan",
    description: "A historic fort built by the Dutch in the 17th century, offering insights into Taiwan's colonial past and beautiful views of Tainan.",
    path: "/destinations/tainan-city/anping-fort"
  },
  {
    id: 37,
    name: "Former Tait & Co. Merchant House",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Tainan",
    description: "A well-preserved historical building that showcases the lifestyle of foreign merchants in Tainan during the 19th century.",
    path: "/destinations/tainan-city/former-tait-&-co.-merchant-house"
  },
  {
    id: 38,
    name: "Chihkan Tower",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Tainan",
    description: "A historic tower originally built by the Dutch in the 17th century, now a symbol of Tainan's rich history and culture.",
    path: "/destinations/tainan-city/chihkan-tower"
  },
  {
    id: 39,
    name: "Blueprint Culture & Creative Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Tainan",
    description: "A creative park in Tainan that combines art, culture, and history, featuring exhibitions, workshops, and local crafts.",
    path: "/destinations/tainan-city/blueprint-culture-&-creative-park"
  },
  {
    id: 40,
    name: "Shennong Street",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Tainan",
    description: "A historic street in Tainan known for its well-preserved architecture, traditional shops, and vibrant atmosphere.",
    path: "/destinations/tainan-city/shennong-street"
  },
  {
    id: 41,
    name: "National Museum of Taiwan Literature",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Tainan",
    description: "A museum dedicated to Taiwanese literature, showcasing the works of local authors and the evolution of Taiwanese literary culture.",
    path: "/destinations/tainan-city/national-museum-of-taiwan-literature"
  },
  {
    id: 42,
    name: "Tainan Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Tainan",
    description: "A large urban park in Tainan featuring lush greenery, walking paths, and recreational areas, perfect for relaxation and outdoor activities.",
    path: "/destinations/tainan-city/tainan-park"
  },
  {
    id: 43,
    name: "Tainan Confucius Temple",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Tainan",
    description: "A historic temple dedicated to Confucius, showcasing traditional architecture and cultural significance in Taiwanese education and philosophy.",
    path: "/destinations/tainan-city/tainan-confucius-temple"
  },
  {
    id: 44,
    name: "Tainan Confucius Temple Business District",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Tainan",
    description: "A vibrant business district surrounding the Tainan Confucius Temple, known for its shops, cafes, and cultural atmosphere.",
    path: "/destinations/tainan-city/confucius-temple-business-district"
  },
  {
    id: 45,
    name: "Rainbow Village",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taichung",
    description: "A colorful and artistic village in Taichung, famous for its vibrant murals and community art created by a former soldier.",
    path: "/destinations/taichung-city/rainbow-village"
  },
  {
    id: 46,
    name: "Liuchuan Riverside Walk",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taichung",
    description: "A scenic riverside walkway in Taichung, perfect for leisurely strolls, cycling, and enjoying the natural beauty along the river.",
    path: "/destinations/taichung-city/liuchuan-riverside-walk"
  },
  {
    id: 47,
    name: "Dakeng Scenic Area",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taichung",
    description: "A popular hiking destination in Taichung, known for its lush trails, scenic views, and diverse flora and fauna.",
    path: "/destinations/taichung-city/dakeng-scenic-area"
  },
  {
    id: 48,
    name: "Maple Garden",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taichung",
    description: "A serene urban garden in Taichung featuring beautiful maple trees, walking paths, and a peaceful atmosphere, ideal for relaxation and nature walks.",
    path: "/destinations/taichung-city/maple-garden"
  },
  {
    id: 49,
    name: "Painted Animation Lane",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taichung",
    description: "A vibrant alley in Taichung adorned with colorful murals and street art, showcasing the creativity of local artists and animators.",
    path: "/destinations/taichung-city/painted-animation-lane"
  },
  {
    id: 50,
    name: "Taichung City Seaport Art Center",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taichung",
    description: "A contemporary art center located in Taichung's seaport area, featuring exhibitions, performances, and cultural events.",
    path: "/destinations/taichung-city/taiwan-sun-cake-museum"
  },
  {
    id: 51,
    name: "Taichung Park Pavilion",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taichung",
    description: "A historic pavilion located in Taichung Park, offering a glimpse into the city's history and beautiful views of the surrounding park.",
    path: "/destinations/taichung-city/taichung-park-pavilion"
  },
  {
    id: 52,
    name: "National Taichung Theater",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taichung",
    description: "A modern architectural marvel in Taichung, known for its unique design and hosting various cultural performances and events.",
    path: "/destinations/taichung-city/national-taichung-theater"
  },
  {
    id: 53,
    name: "Calligraphy Greenway",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taichung",
    description: "A scenic green corridor in Taichung that connects various cultural and artistic landmarks, perfect for walking, cycling, and enjoying public art.",
    path: "/destinations/taichung-city/calligraphy-greenway"
  },
  {
    id: 54,
    name: "Zhongzheng Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Keelung",
    description: "A scenic urban park in Keelung featuring lush greenery, walking paths, and recreational areas, perfect for relaxation and outdoor activities.",
    path: "/destinations/keelung-city/zhongzheng-park"
  },
  {
    id: 55,
    name: "Heping Island Geopark",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Keelung",
    description: "A unique coastal park in Keelung known for its geological formations, rock pools, and scenic ocean views, ideal for nature exploration.",
    path: "/destinations/keelung-city/heping-island-geopark"
  },
  {
    id: 56,
    name: "Chaojing Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Keelung",
    description: "A coastal park in Keelung featuring walking paths, gardens, and ocean views, perfect for leisurely strolls and enjoying the sea breeze.",
    path: "/destinations/keelung-city/chao-jing-park"
  },
  {
    id: 57,
    name: "Maritime Plaza",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Keelung",
    description: "A waterfront plaza in Keelung offering stunning views of the harbor, recreational areas, and a vibrant atmosphere for visitors.",
    path: "/destinations/keelung-city/maritime-plaza"
  },
  {
    id: 58,
    name: "Keelung Tower",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Keelung",
    description: "A historic tower in Keelung offering panoramic views of the city and harbor, showcasing the area's maritime heritage.",
    path: "/destinations/keelung-city/keelung-tower"
  },
  {
    id: 59,
    name: "Huzishan Keelung Landmark",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Keelung",
    description: "A prominent landmark in Keelung known for its historical significance and scenic views of the city and harbor.",
    path: "/destinations/keelung-city/huzishan-keelung-landmark"
  },
  {
    id: 60,
    name: "Keelung Miaokou Night Market",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Keelung",
    description: "A famous night market in Keelung known for its delicious street food, local snacks, and vibrant atmosphere, attracting both locals and tourists.",
    path: "/destinations/keelung-city/keelung-miaokou-night-market"
  },
  {
    id: 61,
    name: "Waimushan Fishing Harbor",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Keelung",
    description: "A picturesque fishing harbor in Keelung known for its fresh seafood, scenic views, and vibrant local culture, perfect for a leisurely visit.",
    path: "/destinations/keelung-city/waimushan-fishing-harbor"
  },
  {
    id: 62,
    name: "Buddha's Hand Cave",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Keelung",
    description: "A unique natural cave formation in Keelung resembling a Buddha's hand, offering a serene atmosphere and scenic views of the surrounding area.",
    path: "/destinations/keelung-city/buddha's-hand-cave"
  },
  {
    id: 63,
    name: "Xiaoyeliu",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taitung",
    description: "A stunning coastal area in Taitung known for its unique rock formations, clear waters, and scenic views, perfect for nature lovers and photographers.",
    path: "/destinations/taitung-city/xiaoyeliu"
  },
  {
    id: 64,
    name: "Taitung Seashore Park",
    imgPath: "/assets/destinations/taipei.jpg",
    location: "Taitung",
    description: "A beautiful coastal park in Taitung featuring walking paths, gardens, and ocean views, ideal for leisurely strolls and enjoying the sea breeze.",
    path: "/destinations/taitung-city/taitung-seashore-park"
  },



  



];

export default searchData;
