import { useState, useEffect } from "react"; // use effect needed for API handling, use state to trigger UI updates 
import { Link } from "react-router-dom"; // use to turn city cards into clickable links 
import { citiesLatLng } from "../data/cityData"; // get cities object from cityData.tsx 

type Props = { cityname: string }
const taiwanLatLng = { lat: 23.7, lng: 121.0 }; // latitude and longitude of Taiwan

export default function CityCard({ cityname } : Props) {
  const [placeName, setPlaceName] = useState("");

  useEffect(() => {
    async function getCity() {
      const { PlacesService } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary; // access places service

      const map = document.getElementById('dummy-map') as HTMLDivElement; // get map for PlacesService constructor 
      if (!map) return (console.log("ERROR: map could not be found")) // check for error if map can't be accessed

      const service = new PlacesService(map as HTMLDivElement); // create new instance of object called service to access methods 
      const status = google.maps.places.PlacesServiceStatus; // access status to get access to status constants

      const myRequest = { // request to feed textSearch method of service 
        language: "en", // prioritize english names of places
        location: taiwanLatLng, // create bias for locations near taiwan 
        query: cityname, // search by the cityname (e.g. Taipei City, Hualien City, etc.)
      };

      service.textSearch(myRequest, (results, currStatus) => {
        // if the response contains a valid result (status.OK)
        if (currStatus === status.OK) {
          if (results && (results.length > 0)) // TypeScript double checking to ensure results is not null
          setPlaceName(results[0].name!); // set place name using useState to the city name
          // extra checking for typescript validity
        } else {
          console.log("ERROR: Could not find valid result from textSearch()"); // could not find the city 
        }
      });
    }
    getCity(); // call method 
  }, [cityname]); // the effect function will only re-run only when the cityname dependency changes values between renders 

  const cityInfo = citiesLatLng.find(city => city.header === cityname);

  const description = cityInfo?.description;
  const region = cityInfo?.region;
  const header = cityInfo?.header;
  const imgSrc = cityInfo?.image;
  // create a clean url path (Hualien%20City -> hualien-city)
  const formatted = cityname.toLowerCase().replace(/\s+/g, "-");

  // Note: For this project, it's heavily recommended to not access DOM such as .innerHTML, or methods like createElement("element")
  // Please use JSX to create and update the UI
  return( 
    <div>
      <Link to={`/destinations/${formatted}`}>
        <div className="region-card ml-0 mt-[24px] lg:ml-[48px] w-[550px] h-[200px] lg:w-[300px] lg:h-[300px]">
          <div>
            <img src={imgSrc} alt={header} className="region-city-img h-[175px]"></img>
            <div className="region-txt">
              <h3 className="region-city-name">{header || placeName}</h3>
              <h3 className="region">{region}</h3>
              <p className="region-description">{description}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};