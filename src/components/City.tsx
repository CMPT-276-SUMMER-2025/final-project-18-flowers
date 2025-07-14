import { useEffect } from 'react';

const City = () => {
  useEffect(() => {
    async function loadDestinations() {
      const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary; // access new places API
      const { PlacesService } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary; // access places service

      const dummyMap = document.getElementById('dummy-map') as HTMLDivElement; // create dummy map for PlacesService constructor 
      if (!dummyMap) return (console.log("ERROR: Dummy map could not be found")) // check for error if map can't be accessed

      const service = new PlacesService(dummyMap as HTMLDivElement); // create new instance of object called service to access methods 

      // latitude and longitude of Taiwan
      const taiwanLatLng = { lat: 23.7, lng: 121.0 };
      // 6 cities we're doing for now
      const cities = [
        "Taipei City",
        "Hualien City",
        "Yilan City",
        "Taichung City",
        "Tainan City",
        "Kaohsiung City"
      ];

      // const request = { 
      //   language: "en",
      //   location: taiwanLatLng,
      //   query: "",
      //   type: "locality" // pr administrative_area_level_3 = represents smaller administrative divisions like towns or cities which we're focusing rather than Taiwan's 13 counties
      // }

      const status = google.maps.places.PlacesServiceStatus;
      
      cities.forEach(city => {
        service.textSearch({ language: "en", location: taiwanLatLng, query: city }, (results, currStatus) => {
          // if the response contains a valid result 
          if (currStatus === status.OK) {
            console.log(results);
            const grid = document.getElementById("destinations-grid")!;

            if (results && results.length > 0) {
              // if value on left is (null) or (undefined) use right side value instead (??)
              // ! is a TypeScript non-null assertion operator (i.e. I'm sure this value is NOT null or undefined here) => (We already check through the ?? operator)
              results.slice(0, 9).forEach((city) => { 
                const card = document.createElement("div")!;
                card.className = "destination-card";
                card.innerHTML = `<h3>${city.name}</h3><p>Some Description</p>`
                grid.append(card);
              })
            }
          } else {
            console.log("ERROR: Could not find valid result from textSearch()");
          }
        });
      });
    }
    loadDestinations();
  }, []);

  function renderCitySection() {
    return (<div id="destinations-grid"></div>);
  }

  return (
    <>
      {renderCitySection()}
      <div id="dummy-map"></div>
    </>
  );
}

export default City
