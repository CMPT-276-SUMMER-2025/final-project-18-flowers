import { useState, useEffect } from "react"; // use effect needed for API handling, use state to trigger UI updates 
import { Link } from "react-router-dom"; // use to turn city cards into clickable links 
import { cities } from "../data/cityData"; // get cities object from cityData.tsx 

type Props = { cityname: string }
const taiwanLatLng = { lat: 23.7, lng: 121.0 }; // latitude and longitude of Taiwan

export default function CityCard({ cityname } : Props) {
  const [placeName, setPlaceName] = useState("");

  useEffect(() => {
    async function getCity() {
      const { PlacesService } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary; // access places service

      const dummyMap = document.getElementById('dummy-map') as HTMLDivElement; // create dummy map for PlacesService constructor 
      if (!dummyMap) return (console.log("ERROR: Dummy map could not be found")) // check for error if map can't be accessed

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
        } else {
          console.log("ERROR: Could not find valid result from textSearch()"); // could not find the city 
        }
      });
    }
    getCity(); // call method 
  }, [cityname]); // the effect function will only re-run only when the cityname dependency changes values between renders 

  // assign 2 values to 2 variables through "array destructing assignment"
  // this works because if you look in cityData.tsx, the values are arrays of size 2, ["img value", "description value"]
  const [imgSrc, description] = cities[cityname as keyof typeof cities] || ["", ""]; // 

  // create a clean url path (Hualien%20City -> hualien-city)
  const formatted = cityname.toLowerCase().replace(/\s+/g, "-");

  // Note: For this project, it's heavily recommended to not access DOM such as .innerHTML, or methods like createElement("element")
  // Please use JSX to create and update the UI
  return( 
    <div>
      <Link to={`/destinations/${formatted}`}>
        <div className="dest-card">
          <img src={imgSrc} className="city-img" alt={placeName}/>
          <div className="city-txt">
            <h3>{placeName}</h3>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

// if value on left is (null) or (undefined) use right side value instead (??)

// ! is a TypeScript non-null assertion operator (i.e. I'm sure this value is NOT null or undefined here) => (We already check through the ?? operator)