import { useState, useEffect } from "react"; // use effect needed for API handling, use state to trigger UI updates 
import { Link } from "react-router-dom"; // use to turn city cards into clickable links 
import { cities } from "../data/cityData"; // get cities object from cityData.tsx 

/**
 * This is a component for the city cards on the Destination page.
 */

type Props = { cityname: string, ranking: number }
const taiwanLatLng = { lat: 23.7, lng: 121.0 }; // latitude and longitude of Taiwan

/**
 * Dynamically generates a city card from Google Places API based on the city name and ranking.
 * @param cityname containing the name of the city
 * @param ranking containing the ranking of the city
 * @returns cities card with the city name, image, and description
 */
export default function CityCard({ cityname, ranking } : Props) {
  const [placeName, setPlaceName] = useState("");

  useEffect(() => {
    /**
     * Fetches and displaces cities' information from Google Places API using text search and sets the place name's state.
     * @returns a city card with the city name, image, description and order ranking
     */
    async function getCity() {
      const { PlacesService } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary; // access places service

      const dummyMap = document.getElementById('dummy-map') as HTMLDivElement; // create dummy map for PlacesService constructor 

      const service = new PlacesService(dummyMap as HTMLDivElement); // create new instance of object called service to access methods 
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
        }
      });
    }
    getCity(); // call method 
  }, [cityname]); // the effect function will only re-run only when the cityname dependency changes values between renders 

  // assign 2 values to 2 variables through "array destructing assignment"
  // this works because if you look in cityData.tsx, the values are arrays of size 2, ["img value", "description value"]
  const [cityName, imgSrc, description] = cities[cityname as keyof typeof cities] || [" ", "", ""]; // 

  // create a clean url path (Hualien%20City -> hualien-city)
  const formatted = cityname.toLowerCase().replace(/\s+/g, "-");

  // Note: For this project, it's heavily recommended to not access DOM such as .innerHTML, or methods like createElement("element")
  // Please use JSX to create and update the UI
  return( 
    <div>
      <Link to={`/destinations/${formatted}`}>
        <div className="dest-card m-[0.5rem]">
          <img src={imgSrc} className="city-img" alt={placeName}/>
          <p 
          className="text-blue-600 text-xs font-extrabold inline-flex items-center justify-center bg-amber-50 border-amber-500 border-2 
          px-3 py-2 rounded-4xl absolute top-[156px] left-[20px] w-8 h-8"> 
            {ranking}
          </p>  
          <div className="city-txt min-h-[92px] mx-5 mt-5">
            <h3>{placeName || cityName}</h3>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};