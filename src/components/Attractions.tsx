import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { mockPlacesAttractions } from '../data/cityData';

/**
 * This is a component for the attractions on a CityInterests page. 
 */

type Props = { cityname: string };

const saveAPICost = false; // Set to true to use mock data instead of API calls.

/**
 * Fetches data from Google Places API and displays up to 9 tourist attractions in a given city.
 * @param cityname containing the city name
 * @returns photos of the attractions
 */
const Attractions = ({ cityname } : Props) => {
  // type alias TPlace object that holds id, displayName
  type TPlace = {
    id: string;
    displayName?: string | null;
    photoUrl?: string;
  };

  const [places, setPlaces] = useState<TPlace[]>([]);

  /**
   * Re-fetches attractions whenever cityname changes.
   */
  useEffect(() => {
    localStorage.clear();

    //Checks if Google Maps JS API is not yet loaded.
    if (!window.google || !google.maps) {
      console.warn("Google Maps JS API not yet loaded");
      return;
    }
    //If saveAPICost is true, use mock data instead of API calls.
    if (saveAPICost) { 
      setPlaces(mockPlacesAttractions);
      return; 
    }

    /**
     * Checks if the result is in English by checking if the result is in ASCII characters.
     * @param text string to check if it contains only ASCII characters
     * @returns {boolean} true if the text is in English, false otherwise
     */
    const isEnglish = (text: string | undefined | null) =>
      text ? /^[\x00-\x7F]*$/.test(text) : false; 

    const cacheKey = `attractions-${cityname}`;
    const cacheTimeKey = `${cacheKey}-timestamp`;
    const maxAge = 1000 * 60 * 60 * 6; // Set the cache to expire after 6 hours.
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = Number(localStorage.getItem(cacheTimeKey));

    // If cached data exists and is less than 6 hours old, use it.
    if (cachedData && Date.now() - cachedTime < maxAge) {
      try {
        const parsed = JSON.parse(cachedData) as TPlace[];
        // Filter the cached data to ensure it contains valid id, English display name, and https photo urls.
        const filtered = parsed.filter(p =>
          typeof p.id === 'string' &&
          typeof p.displayName === 'string' &&
          isEnglish(p.displayName) &&
          typeof p.photoUrl === 'string' &&
          p.photoUrl.startsWith('https://')
        );

        //Uses cached data if it has at least 9 valid places.
        if (filtered.length >= 9) {
          setPlaces(filtered.slice(0, 9));
          return;
        }
      } catch (err) { // If parsing fails, we assume the cache is invalid.
        console.warn("Cache invalid or corrupted. Refetching...");
      }
    }

    // Clear the cache if it's invalid or expired.
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(cacheTimeKey);

    /**
     * Fetches real attraction data from Google Places API, filters and formats the results, and caches them in localStorage.
     */
    async function getAttractions() {
      const { Place, SearchByTextRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
      const myRequest = {
        textQuery: `${cityname}'s most visited tourist attractions`, // query 
        fields: ["id", "displayName", "photos"], // save cost by specifying only displayName field and photos (essentials tier => cheaper)
        includedType: "tourist_attraction", // only request tourist attractions
        rankPreference: SearchByTextRankPreference.RELEVANCE, // only request relevant to query 
        minRating: 3.7, // only request places with 4.0 <= rating <= 5.0
        maxResultCount: 24, // requests 15 places total, in case there are invalid results that includes non-english titles
        language: "en",
        region: 'us',
        useStrictTypeFiltering: true,
      }

      // oldName: newName 
      const { places: myPlaces } = await Place.searchByText(myRequest) as { places: google.maps.places.Place[] };

      const filteredPlaces = myPlaces.filter( //Filters the 15 results with only english display names.
        (place) =>
          typeof place.displayName === "string" &&
          isEnglish(place.displayName) && // keep if english
          !place.displayName.toLowerCase().includes("tour") && // exclude if "tour" is included
          !place.displayName.toLowerCase().includes("bell") && 
          !place.displayName.toLowerCase().includes("steles") 
      );

      //Limits the results to 9 and transforms each into a { id, displayName, photoUrl } object.
      const formattedPlaces = filteredPlaces.slice(0, 9).map((place) => { //Only show the first 9 valid results
        const firstPhoto = place.photos?.[0];  
  
        return ({
          // if place.id is undefined, set it to an empty string.
          id: place.id || ' ',
          displayName: place.displayName,
          photoUrl: firstPhoto?.getURI({ maxWidth: 300, maxHeight: 300 })
        });
      });
      
      setPlaces(formattedPlaces);
      localStorage.setItem(cacheKey, JSON.stringify(formattedPlaces));
      localStorage.setItem(cacheTimeKey, String(Date.now()));

    } 
    getAttractions();
  }, [cityname]);
  
  return (
    <>
      <h1 id="attractions-title">Attractions</h1>
      <div id="attractions-container">
        {/* Maps through the places array and renders each place as a link to its own page. */}
        {places.map((place) => (
          <Link to={`${place.displayName?.toLowerCase().replace(/\s+/g, "-")}`} key={place.id}>
            <div className="attractions">
              {
                place.photoUrl && 
                <img src={place.photoUrl} 
                      alt={ place.displayName || 'Tourism Attraction' } 
                      loading="lazy"
                      className="attractions-photo"
                />
              }
              <h3 className='attractions-name'>{place.displayName}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Attractions
