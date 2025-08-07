import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockInterestData } from '../data/cityData';

/**
 * This is a component that displays 
 */

type interestProps = { 
  cityname: string, // cityname
  type: string  // type of place (e.g., amusement_park, chinese_restaurant, etc.)
};

const saveAPICreditsMode = true;    

const InterestTypes = ({ cityname, type } : interestProps) => {

  // Record<Keys, Type> (utility type in TypeScript)
  const colorMap: Record<string, string> = {
    shopping_mall: "bg-blue-500",
    tourist_attraction: "bg-yellow-500",
    amusement_park: "bg-green-500",
    historical_place: "bg-pink-500",
  };
  
  //Determines icon background color based on the type. If the type isn't mapped, a default is used.
  const iconClass = colorMap[type] || "bg-blue-600";

  type Place = {
    id: string;
    displayName?: string | null;
    photoUrl?: string;
    editorialSummary?: string | null;
    description?: string; // ← this was missing
  };

  const [places, setPlaces] = useState<Place[]>([]);
  const [typeHeader, setTypeHeader] = useState('');


  /**
   * Converts a snake_case string into a capitalized, user-friendly header.
   * @param header header string that needs conversion
   * @returns converted string
   */
  function formatHeader(header: string) {
    return header
    .replace(/_/g, " ")
    .split(" ")
    //Capitalizes each word of the formatted string.
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") + 's';
  }

  useEffect(() => {
    //Uses mock data when needed to save API usage.
    if (saveAPICreditsMode) { 
      const header = formatHeader(type);
      setTypeHeader(header);
      setPlaces(mockInterestData[type as keyof typeof mockInterestData]);
      return;
    }

    const formattedType = type.replace(/_/g, " ");
    const header = formatHeader(type);
    setTypeHeader(header);

    //Checks if the result in cache is valid by checking if result is in ASCII characters. 
    const isEnglish = (text: string | undefined | null) =>
      text ? /^[\x00-\x7F]*$/.test(text) : false; 

    const cacheKey = `attractions-${cityname}-${type}`;
    const cacheTimeKey = `${cacheKey}-timestamp`;
    const maxAge = 1000 * 60 * 60 * 6; // Sets the cache to expire after 6 hours.
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = Number(localStorage.getItem(cacheTimeKey));

    //Validates that the age of the cache is less than 6 hours and that the data format is correct. If not, fetches new data.
    if (cachedData && Date.now() - cachedTime < maxAge) {
      try { // If the cache is valid, parse it
        const parsed = JSON.parse(cachedData) as Place[];
        const filtered = parsed.filter(p =>
          typeof p.id === 'string' &&
          typeof p.displayName === 'string' &&
          isEnglish(p.displayName) &&
          typeof p.photoUrl === 'string' &&
          p.photoUrl.startsWith('https://')
        );

        //Limits the number of places shown to first 6.
        if (filtered.length >= 6) {
          setPlaces(filtered.slice(0, 6));
          return;
        }
      } catch (err) { // If parsing fails, we assume the cache is invalid.
        console.warn("Invalid interest cache format. Refetching...");
      }
    }

    // Clears the cache if it's invalid or expired.
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(cacheTimeKey);

    /**
     * Fetches attractions and sets the filtered and formatted places in state.
     */
    async function getAttractions() {
      const { Place, SearchByTextRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
      const myRequest = {
        textQuery: `${cityname} ${formattedType}`, // query 
        fields: ["id", "displayName", "photos"], // Saves cost by specifying only displayName field and photos (essentials tier => cheaper).
        includedType: type, // Only requests tourist attractions.
        rankPreference: SearchByTextRankPreference.RELEVANCE, // Only requests relevant to query. 
        minRating: 3.5, // Only requests places with 4.0 <= rating <= 5.0.
        maxResultCount: 15, // Only requests 15 places total.
        useStrictTypeFiltering: true,
      }

      // oldName: newName 
      const { places: myPlaces } = await Place.searchByText(myRequest) as { places: google.maps.places.Place[] };
      
      const filteredPlaces = myPlaces.filter( // filters the 6 results with english results and results without the word "tour" in them
        (place) => {
          const name = place.displayName;
          return (
            typeof name === "string" &&
            isEnglish(name) &&
            !name.toLowerCase().includes("tour")
          );
        }
      );

      //Transforms each place data into a usable format for rendering.
      const formattedPlaces = filteredPlaces.slice(0, 6).map((place) => { //Only show the first 6 valid results
        const firstPhoto = place.photos?.[0];
        return ({
          id: place.id || ' ',
          displayName: place.displayName,
          photoUrl: firstPhoto?.getURI({ maxWidth: 300, maxHeight: 300 }),
          editorialSummary: place.editorialSummary,
        });
      });
      
      setPlaces(mockInterestData[type as keyof typeof mockInterestData]);
      localStorage.setItem(cacheKey, JSON.stringify(formattedPlaces));
    } 
    getAttractions();
  }, [cityname, type]);
  
  return (
    <>
      <div id="it-container">
        <h1 className="it-title" id={type}><strong>{typeHeader}</strong></h1>
        <div className="it-element-container">
          {/* Renders each place as a clickable Link with image and description. */}
          {places.map((place) => (
            <Link to={`${place.displayName?.toLowerCase().replace(/\s+/g, "-")}`} key={place.id}>
              <div className="it-element">
                {
                  /* Image is only shown if photoUrl exists. */
                  place.photoUrl && 
                  <img src={place.photoUrl} 
                        alt={ place.displayName || 'Interest Attraction' } 
                        className="it-photo"
                  />
                }
                <h3 className='it-name'>{place.displayName}</h3>
                <img src={`/assets/interest-types/${type}.png`} className={`type-icon ${iconClass}`} alt={typeHeader}/>
                <p className='it-description'>{place.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default InterestTypes
