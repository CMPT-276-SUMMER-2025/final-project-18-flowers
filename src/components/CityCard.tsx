// latitude and longitude of Taiwan
const taiwanLatLng = { lat: 23.7, lng: 121.0 };
// 6 cities we're doing for now
const cities = {
  "Taipei City" : 'assets/destinations/taipei.jpg',
  "Hualien City" : 'assets/destinations/hualien.jpg',
  "Yilan City" : 'assets/destinations/yilan.jpg',
  "Taichung City" : 'assets/destinations/taichung.jpg',
  "Tainan City" : 'assets/destinations/tainan.jpg',
  "Kaohsiung City" : 'assets/destinations/kaohsiung.jpg'
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

      if (results && results.length > 0) 
      {
        const card = document.createElement("div")!;
        const imgSrc = cities[cityname as keyof typeof cities];
        console.log(imgSrc);
        card.className = "destination-card";
        card.innerHTML = `<img src=${imgSrc} class='city-image'/><h3>${results[0].name}</h3><p>Some Description</p>`
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