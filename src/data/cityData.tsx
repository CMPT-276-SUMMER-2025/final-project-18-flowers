// destinations map data 
export const cities = {
  "Taipei City" : ['/assets/destinations/taipei.jpg', "Modern capital with night markets and Taipei 101."], 
  "Hualien City" : ['/assets/destinations/hualien.jpg', "Coastal town near cliffs and Taroko Gorge."],
  "Yilan City" : ['/assets/destinations/yilan.jpg', "Peaceful area known for hot springs and farms."],
  "Taichung City" : ['/assets/destinations/taichung.jpg', "Cultural hub and birthplace of bubble tea."],
  "Tainan City" : ['/assets/destinations/tainan.jpg', "Oldest city with temples and local snacks."],
  "Kaohsiung City" : ['/assets/destinations/kaohsiung.jpg', "Port city with art, beaches, and skyline."],
};

// regions map data
export const citiesLatLng = [
  { 
    id: "taipei", 
    coord: { lat: 25.0329, lng: 121.5654 }, 
    header: "Taipei City", 
    description: "The bustling capital of Taiwan, known for Taipei 101, vibrant night markets, and rich cultural heritage.", 
    region: "Northern Taiwan" 
  }, // Taipei
  
  { 
    id: "hualien", 
    coord: { lat: 23.9742, lng: 121.6016 }, 
    header: "Hualien City", 
    description: "Home to Taroko Gorge and stunning coastal scenery, offering some of Taiwan's best nature spots.", 
    region: "Eastern Taiwan" 
  }, // Hualien
  
  { 
    id: "yilan", 
    coord: { lat: 24.7571, lng: 121.7539 }, 
    header: "Yilan City", 
    description: "Famous for hot springs, lush mountains, and traditional Taiwanese culture.", 
    region: "Northeastern Taiwan" 
  }, // Yilan
  
  { 
    id: "taichung", 
    coord: { lat: 24.1477, lng: 120.6736 }, 
    header: "Taichung City", 
    description: "A vibrant city with cultural attractions, parks, and access to central Taiwan's mountains.", 
    region: "Central Taiwan" 
  } // Taichung
];

export const cityInterestsData = {
  "Taipei City" : [
    '/assets/destinations/taipei.jpg', 
      "Taipei City (台北市, Táiběi Shì) is the capital and largest metropolitan area of Taiwan, serving as the political, economic, and cultural heart of the island. Located in the Taipei Basin and surrounded by lush mountains, the city offers a unique blend of modern skyscrapers, historic temples, and vibrant street culture. Taipei is renowned for its landmarks, including the towering Taipei 101, the National Palace Museum with its world-class collection of Chinese artifacts, and bustling night markets such as Shilin and Raohe. Historically, Taipei developed from a small trading settlement during the Qing Dynasty into a major administrative and commercial hub under Japanese rule (1895–1945), which left lasting influences on its architecture and infrastructure. Today, Taipei thrives as a global city, known for its efficient MRT system, thriving tech industry, and diverse culinary scene ranging from street food to Michelin-starred restaurants. Visitors can soak in hot springs in nearby Beitou, hike Elephant Mountain for panoramic views, or enjoy cultural festivals throughout the year. With its mix of modernity, history, and natural surroundings, Taipei stands as one of Asia’s most dynamic and welcoming cities.",
  ], 
  "Hualien City" : 
  [
    '/assets/city-interests/ci-hualien.jpg', 
      "Hualien City (花蓮市, Huālián Shì) is the largest city on Taiwan's east coast and the seat of Hualien County. Nestled between the Pacific Ocean and the Central Mountain Range, it is renowned for its stunning natural landscapes and relaxed coastal charm. The city serves as a gateway to some of Taiwan's most famous attractions, including Taroko Gorge, one of the island's top scenic wonders. Historically, Hualien was home to indigenous peoples long before Chinese settlers arrived in the Qing Dynasty. The area developed slowly compared to Taiwan's western plains, preserving much of its natural beauty. During Japanese rule (1895–1945), Hualien underwent significant modernization, and many architectural traces from this era remain today. Modern Hualien blends cultural diversity, vibrant night markets, and a slower pace of life with breathtaking views of mountains and ocean. Visitors can enjoy the local cuisine, explore seaside parks, or venture into the surrounding national parks. For those seeking tranquility and nature, Hualien is one of Taiwan's most captivating destinations.",
  ],
  "Yilan City" : ['/assets/city-interests/ci-yilan.jpg', "Peaceful area known for hot springs and farms."],
  "Taichung City" : ['/assets/city-interests/ci-taichung.jpg', "Cultural hub and birthplace of bubble tea."],
  "Tainan City" : ['/assets/city-interests/ci-tainan.jpg', "Oldest city with temples and local snacks."],
  "Kaohsiung City" : ['/assets/city-iSnterests/ci-kaohsiung.jpg', "Port city with art, beaches, and skyline."],
};

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

export const mockPlacesHotels = [
  {
    id: '1',
    displayName: 'W Taipei',
    photoUrl: '/assets/hotels/hotel-1.jpg',
  },
  {
    id: '2',
    displayName: 'The Grand Hotel',
    photoUrl: '/assets/hotels/hotel-2.jpg',
  },
  {
    id: '3',
    displayName: 'Mandarin Oriental, Taipei',
    photoUrl: '/assets/hotels/hotel-3.jpg',
  },
  {
    id: '4',
    displayName: 'Hotel Eclat Taipei',
    photoUrl: '/assets/hotels/hotel-4.jpg',
  },
];

export const mockPlacesRestaurants = [
  {
    id: 'r1',
    displayName: 'Restaurant A',
    photoUrl: '/assets/restaurants/res-1.jpg',
  },
  {
    id: 'r2',
    displayName: 'Le Palais',
    photoUrl: '/assets/restaurants/res-2.jpg',
  },
  {
    id: 'r3',
    displayName: 'Mazendo',
    photoUrl: '/assets/restaurants/res-3.jpg',
  },
  {
    id: 'r4',
    displayName: 'Coast MMHG',
    photoUrl: '/assets/restaurants/res-4.jpg',
  },
];
