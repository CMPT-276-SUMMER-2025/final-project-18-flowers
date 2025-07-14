// latitude and longitude of Taiwan
const taiwanLatLng = { lat: 23.7, lng: 121.0 };
// 6 cities we're doing for now
const cities = {
  // task: turn value into arrays that holds image src and short description of city *DONE*
  "Taipei City" : ['assets/destinations/taipei.jpg', "Modern capital with night markets and Taipei 101."], 
  "Hualien City" : ['assets/destinations/hualien.jpg', "Coastal town near cliffs and Taroko Gorge."],
  "Yilan City" : ['assets/destinations/yilan.jpg', "Peaceful area known for hot springs and farms."],
  "Taichung City" : ['assets/destinations/taichung.jpg', "Cultural hub and birthplace of bubble tea."],
  "Tainan City" : ['assets/destinations/tainan.jpg', "Oldest city with temples and local snacks."],
  "Kaohsiung City" : ['assets/destinations/kaohsiung.jpg', "Port city with art, beaches, and skyline."],
};

for (const key in cities) {
  console.log(key, cities[key as keyof typeof cities]);
}

export async function cityCard(cityname: string) {
  // const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary; // access new places API
  const { PlacesService } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary; // access places service

  const dummyMap = document.getElementById('dummy-map') as HTMLDivElement; // create dummy map for PlacesService constructor 
  if (!dummyMap) return (console.log("ERROR: Dummy map could not be found")) // check for error if map can't be accessed

  const service = new PlacesService(dummyMap as HTMLDivElement); // create new instance of object called service to access methods 

  const status = google.maps.places.PlacesServiceStatus;

  service.textSearch({ language: "en", location: taiwanLatLng, query: cityname }, (results, currStatus) => {
    // if the response contains a valid result 
    if (currStatus === status.OK) 
    {
      console.log(results);
      const grid = document.getElementById("destinations-grid")!;

      // extra checking for typescript validity
      if (results && results.length > 0) 
      {
        const card = document.createElement("div")!;
        const imgSrc = cities[cityname as keyof typeof cities][0];
        const cityDescription = cities[cityname as keyof typeof cities][1];
        console.log(imgSrc);
        card.className = "destination-card";
        // task: turn into links
        // task: pretty up the cards and add hover effects 
        card.innerHTML = `<img src=${imgSrc} class='city-image'/><div class="city-text"><h3>${results[0].name}</h3><p>${cityDescription}</p></div>`
        grid.append(card);
      }
    } 
    else 
    {
      console.log("ERROR: Could not find valid result from textSearch()");
    }
  });
}

// if value on left is (null) or (undefined) use right side value instead (??)

// ! is a TypeScript non-null assertion operator (i.e. I'm sure this value is NOT null or undefined here) => (We already check through the ?? operator)