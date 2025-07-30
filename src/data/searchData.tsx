const searchData = [
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



];

export default searchData;
