export const cities = {
  "Taipei City" : ['assets/destinations/taipei.jpg', "Modern capital with night markets and Taipei 101."], 
  "Hualien City" : ['assets/destinations/hualien.jpg', "Coastal town near cliffs and Taroko Gorge."],
  "Yilan City" : ['assets/destinations/yilan.jpg', "Peaceful area known for hot springs and farms."],
  "Taichung City" : ['assets/destinations/taichung.jpg', "Cultural hub and birthplace of bubble tea."],
  "Tainan City" : ['assets/destinations/tainan.jpg', "Oldest city with temples and local snacks."],
  "Kaohsiung City" : ['assets/destinations/kaohsiung.jpg', "Port city with art, beaches, and skyline."],
};

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
